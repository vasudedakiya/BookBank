using BookStore.Models.DataModels;
using BookStore.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers
{
    [Route("api/ordermst")]
    [ApiController]
    public class OrdermstController : Controller
    {
        readonly OrdermstRepository _ordermstRepository = new();

        [HttpGet("list")]
        public IActionResult GetOrdermsts(int pageIndex = 1, int pageSize = 10)
        {
            var order = _ordermstRepository.GetOrdermsts(pageIndex, pageSize);
            return Ok(order);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrdermst(int id)
        {
            var ordermst = _ordermstRepository.GetOrdermst(id);
            if (ordermst == null)
                return BadRequest();
            return Ok(ordermst);
        }

        [HttpPost("add")]
        public Ordermst AddOrdermst(Ordermst order)
        {
            var res = _ordermstRepository.AddOrdermst(order);
            return res;
        }

        [HttpPut("update")]
        public IActionResult UpdateOrdermst(Ordermst order)
        {
            if (order == null)
                return BadRequest();

            var res = _ordermstRepository.UpdateOrdermst(order);
            return Ok(res);
        }

        [HttpDelete("delete")]
        public IActionResult DeleteOrdermst(int id)
        {
            if (id == 0)
                return BadRequest("Id is null");

            var res = _ordermstRepository.DeleteOrdermst(id);
            return Ok(res);
        }

    }
}
