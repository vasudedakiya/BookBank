using BookStore.Models.DataModels;

using BookStore.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers
{
    [Route("api/orderdtl")]
    [ApiController]
    public class OrderdtlController : ControllerBase
    {
        readonly OrderdtlRepository _orderdtlRepository = new();

        [HttpGet("list")]
        public IActionResult GetOrderdtls(int pageIndex = 1, int pageSize = 10)
        {
            var orders = _orderdtlRepository.GetOrderdtls(pageIndex, pageSize);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderdtl(int id)
        {
            var orderdtl = _orderdtlRepository.GetOrderdtl(id);
            if(orderdtl == null)
                return NotFound();
            return Ok(orderdtl);
        }

        [HttpPost("add")]
        public IActionResult AddOrderdtl(Orderdtl orderdtl)
        {
            if(orderdtl == null)
                return BadRequest("Order Is Empty");

            var res = _orderdtlRepository.AddOrderdtl(orderdtl);
            return Ok(res);
        }

        [HttpPut("update")]
        public IActionResult UpdateOrderdtl(Orderdtl order)
        {
            if (order == null)
                return BadRequest();

            var res = _orderdtlRepository.UpdateOrderdtl(order);
            return Ok(res);
        }

        [HttpDelete("delete")]
        public IActionResult DeleteOrderdtl(int id)
        {
            if (id == 0)
                return BadRequest("Id is null");
            var res = _orderdtlRepository.DeleteOrderdtl(id);
            return Ok(res);
        }

    }

}
