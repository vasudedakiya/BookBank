using BookStore.Models.DataModels;
using BookStore.Models.Models;
using BookStore.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace BookStore.Api.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class PlaceOrderController : ControllerBase
    {
        Orderdtl _orderdtl = new();
        Ordermst _ordermst = new();
        OrdermstController _ordermstController = new();
        OrderdtlController _orderdtlController = new();
        CartRepository _cartRepository = new();
        BookRepository _bookRepository = new();


        [HttpPost("add")]
        public IActionResult PlaceOrder(PlaceOrderModel placeOrder)
        {
            if (placeOrder == null)
                return BadRequest("Place order is empty");
            var order = new Ordermst()
            {
                Userid = placeOrder.userId,
                Orderdate = DateTime.Now,
                Totalprice = placeOrder.TotalPrice,
            };

            var res = _ordermstController.AddOrdermst(order);
            var orderId = res.Id;
            var totalItem = placeOrder.cartIds.Count();

            for(int i = 0; i < totalItem; i++)
            {
                var cart = _cartRepository.GetCart(placeOrder.cartIds[i]);
                var bookID = cart.Bookid;

                var book  = _bookRepository.GetBook(bookID);

                var orderdtl = new Orderdtl()
                {
                    Bookid = bookID,
                    Quantity = cart.Quantity,
                    Totalprice = (book.Price * cart.Quantity),
                    Ordermstid = orderId,
                    Price = book.Price,
                };

                _orderdtlController.AddOrderdtl(orderdtl);
                _cartRepository.DeleteCart(placeOrder.cartIds[i]);
            }

            return Ok("true");

        }

    }
}
