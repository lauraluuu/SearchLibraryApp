using Microsoft.EntityFrameworkCore;
using SearchLibraryApp.Model.Entities;

namespace SearchLibraryApp
{
    public class AppDataContext:DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
        {

        }

        public DbSet<Library> Libraries { get; set; }
    }

}
