using DapperCrudAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DapperCrudAPI.Data
{
    /// <summary>
    /// temporary dbcontext to create database automatically
    /// </summary>
    public class TempDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public TempDbContext(DbContextOptions<TempDbContext> options)
            : base(options)
        {
        }
    }
}
