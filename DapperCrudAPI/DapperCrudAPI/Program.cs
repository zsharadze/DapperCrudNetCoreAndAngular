
using DapperCrudAPI.Data;
using Microsoft.EntityFrameworkCore;

string MyAllowSpecificOrigins = "localhost-react";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connString = builder.Configuration.GetValue<string>("ConnectionStrings:DefaultConnection");

builder.Services.AddDbContext<TempDbContext>(options =>
                options.UseSqlServer(connString));

builder.Services.AddScoped<DapperAccess>();

builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, builder =>
{
    builder.WithOrigins("http://localhost:4200")
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));


var app = builder.Build();


using (var Scope = app.Services.CreateScope())
{
    var context = Scope.ServiceProvider.GetRequiredService<TempDbContext>();
    context.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
