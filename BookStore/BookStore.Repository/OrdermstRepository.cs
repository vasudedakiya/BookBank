using BookStore.Models.DataModels;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Repository
{
    public class OrdermstRepository : BaseRepository
    {
        public ListResponse<Ordermst> GetOrdermsts(int pageIndex = 1, int pageSize = 10)
        {
            var query = _context.Ordermsts.AsQueryable();
            List<Ordermst> orders = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

            return new ListResponse<Ordermst>()
            {
                Results = orders,
                TotalRecords = orders.Count(),
            };
        }

        public Ordermst GetOrdermst(int id)
        {
            return _context.Ordermsts.FirstOrDefault(o => o.Id == id);
        }

        public Ordermst AddOrdermst(Ordermst order)
        {
            var enrty = _context.Ordermsts.Add(order);
            _context.SaveChanges();
            return enrty.Entity;
        }

        public Ordermst UpdateOrdermst(Ordermst order)
        {
            var entry = _context.Ordermsts.Update(order);
            _context.SaveChanges();
            return entry.Entity;
        }

        public bool DeleteOrdermst(int id)
        {
            var order = _context.Ordermsts.FirstOrDefault(o => o.Id == id);
            if (order == null)
                return false;

            _context.Ordermsts.Remove(order);
            _context.SaveChanges();
            return true;
        }
    }
}
