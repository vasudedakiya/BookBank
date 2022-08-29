using BookStore.Models.DataModels;
using BookStore.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Repository
{
    public class CartRepository : BaseRepository
    {
        public List<Cart> GetCartItems(string keyword)
        {
            keyword = keyword?.ToLower()?.Trim();
            var query = _context.Carts.Include(c => c.Book).Where(c => keyword == null || c.Book.Name.ToLower().Contains(keyword)).AsQueryable();
            return query.ToList();
        }

        //public List<Cart> GetCartById(int id)
        //{
        //    List<Cart> cartItems = new List<Cart>();
        //    int a;

        //    var query = _context.Carts.Include(c => c.User).Where(c => c.User.Id == id).AsQueryable();
        //    cartItems = query.ToList();


        //    //ListResponse<Cart> cart = new ListResponse<Cart>()
        //    //{
        //    //    Results = cartItems,
        //    //    TotalRecords = a,
        //    //};
        //    return cartItems;
        //}



        public async Task<List<Cart>> GetCartById(int id)
        {
            //List<Cart> cartlist = new List<Cart>();
            //int a;

            //var query = _context.Carts.Where(c => c.Userid == id).Select(c => c.User).ToList();
            var query = await _context.Carts.Where(c => c.Userid == id).ToListAsync();

            //a = query.Count();

            //ListResponse<Cart> cart = new ListResponse<Cart>()
            //{
            //    Results = query,
            //    TotalRecords = a,
            //};

            return query;
        }

        public Cart GetCart(int id)
        {
            return _context.Carts.FirstOrDefault(c => c.Id == id);
        }

        public Cart AddCart(Cart category)
        {
            var entry = _context.Carts.Add(category);
            _context.SaveChanges();
            return entry.Entity;
        }

        public Cart UpdateCart(Cart category)
        {
            var entry = _context.Carts.Update(category);
            _context.SaveChanges();
            return entry.Entity;
        }

        public bool DeleteCart(int id)
        {
            var cart = _context.Carts.FirstOrDefault(c => c.Id == id);
            if (cart == null)
                return false;

            _context.Carts.Remove(cart);
            _context.SaveChanges();
            return true;
        }
    }
}
