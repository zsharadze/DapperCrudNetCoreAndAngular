using DapperCrudAPI.Data;
using DapperCrudAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DapperCrudAPI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ProductController : ControllerBase
    {
        private readonly DapperAccess _dapperAccess;

        public ProductController(DapperAccess dapperAccess)
        {
            _dapperAccess = dapperAccess;
        }

        [HttpGet]
        public async Task<List<Product>> GetAll()
        {
            var result = await _dapperAccess.GetProducts();
            return result;
        }

        [HttpGet]
        public async Task<Product> Get(int id)
        {
            var result = await _dapperAccess.GetProduct(id);
            return result;
        }

        [HttpPost]
        public async Task<int> Create(Product p)
        {
            var result = await _dapperAccess.InsertProduct(p);
            return result;
        }

        [HttpPut]
        public async Task<int> Update(Product p)
        {
            var result = await _dapperAccess.UpdateProduct(p);
            return result;
        }

        [HttpDelete]
        public async Task<int> Delete(int id)
        {
            var result = await _dapperAccess.DeleteProduct(id);
            return result;
        }
    }
}