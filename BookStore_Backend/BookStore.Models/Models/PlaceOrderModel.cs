using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Models.Models
{
    public class PlaceOrderModel
    {
        public int userId { get; set; }
        public int[] cartIds { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
