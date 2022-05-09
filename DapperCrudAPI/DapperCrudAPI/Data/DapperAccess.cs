using System;
using Dapper;
using DapperCrudAPI.Models;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace DapperCrudAPI.Data
{
    public class DapperAccess
    {
        private readonly IConfiguration _configuration;
        public DapperAccess(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Product>> GetProducts()
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string selectQuery = @"SELECT * FROM [dbo].[Products]";

                var result = await db.QueryAsync<Product>(selectQuery);
                return result.ToList();
            }
        }

        public async Task<Product> GetProduct(int id)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string selectQuery = @"SELECT * FROM [dbo].[Products] WHERE Id = @Id";

                var result = await db.QuerySingleOrDefaultAsync<Product>(selectQuery, new { Id = id });
                return result;
            }
        }

        public async Task<int> InsertProduct(Product product)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                product.CreatedDate = DateTime.Now;
                string insertQuery = @"INSERT INTO [dbo].[Products] ([Name], [CreatedDate]) VALUES (@Name, @CreatedDate)";
                var result = await db.ExecuteAsync(insertQuery, product);

                return result;
            }
        }

        public async Task<int> UpdateProduct(Product product)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string updateQuery = @"UPDATE [dbo].[Products] SET Name = @Name WHERE Id = @Id";

                var result = await db.ExecuteAsync(updateQuery, new
                {
                    product.Name,
                    product.Id
                });

                return result;
            }
        }

        public async Task<int> DeleteProduct(int id)
        {
            using (IDbConnection db = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                string deleteQuery = @"DELETE FROM [dbo].[Products] WHERE Id = @Id";

                var result = await db.ExecuteAsync(deleteQuery, new
                {
                    Id = id
                });

                return result;
            }
        }

    }
}
