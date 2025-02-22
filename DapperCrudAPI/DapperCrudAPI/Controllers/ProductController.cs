using DapperCrudAPI.Data;
using DapperCrudAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DapperCrudAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : ControllerBase
    {
        private readonly DapperAccess _dapperAccess;

        public ProductController(DapperAccess dapperAccess)
        {
            _dapperAccess = dapperAccess;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Product>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var result = await _dapperAccess.GetProducts();
            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(typeof(Product), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _dapperAccess.GetProduct(id);
            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create(Product p)
        {
            var result = await _dapperAccess.InsertProduct(p);
            return Ok(result);
        }

        [HttpPut]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(Product p)
        {
            var result = await _dapperAccess.UpdateProduct(p);
            return Ok(result);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _dapperAccess.DeleteProduct(id);
            return Ok(result);
        }
    }
}