using BookStore.Models.DataModels;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Repository
{
    public class OrderdtlRepository : BaseRepository
    {
        public ListResponse<Orderdtl> GetOrderdtls(int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Orderdtls.AsQueryable(); 
            List<Orderdtl> orders = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new ListResponse<Orderdtl>()
            {
                Results = orders,
                TotalRecords = query.Count(),
            };
        }

        public Orderdtl GetOrderdtl(int id)
        {
            return _context.Orderdtls.FirstOrDefault(c => c.Id == id);
        }

        public Orderdtl AddOrderdtl(Orderdtl order)
        {
            var entry = _context.Orderdtls.Add(order);
            _context.SaveChanges();
            return entry.Entity;
        }

        public Orderdtl UpdateOrderdtl(Orderdtl order)
        {
            var entry = _context.Orderdtls.Update(order);
            _context.SaveChanges();
            return entry.Entity;
        }

        public bool DeleteOrderdtl(int id)
        {
            var order = _context.Orderdtls.FirstOrDefault(c => c.Id == id);
            if(order == null)
                return false;

            _context.Orderdtls.Remove(order);
            _context.SaveChanges();
            return true;
        }


    }
}
