using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using BookStore.Models.DataModels;

namespace BookStore.Models.Models
{
    public class GetCartModel
    {
        public GetCartModel() { }
        public GetCartModel(int id, int userID, Book book, int quantity)
        {
            CartId = id;
            UserId = userID;
            this.book = book;
            Quantity = quantity;

        }


        public int CartId { get; set; }
        public int UserId{ get; set; }
        public Book book { get; set; }
        public int Quantity { get; set; }
    }
}
