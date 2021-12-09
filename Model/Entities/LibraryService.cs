namespace SearchLibraryApp.Model.Entities
{
    public class LibraryService : ILibraryService
    {
        public AppDataContext _context { get; set; }
        public LibraryService(AppDataContext context)
        {
            _context = context;
        }
        public List<Library> GetAll()
        {
            return _context.Libraries.ToList();
        }
        public List<Library> GetByName(string prName)
        {
            var linq = from libraries in _context.Libraries select libraries;

            if (!string.IsNullOrWhiteSpace(prName))
                linq = linq.Where(x => x.Name.ToUpper().Contains(prName.ToUpper()));

            return linq.ToList();
        }
        public Library Save(Library prLibrary)
        {
            _context.Libraries.Add(prLibrary);
            _context.SaveChanges();

            return prLibrary;
        }
        public Library Update(Library prLibrary)
        {
            Library lLibraryFromDb = _context.Libraries.FirstOrDefault(x=>x.Id == prLibrary.Id);
            _context.Entry(lLibraryFromDb).CurrentValues.SetValues(prLibrary);
            _context.SaveChanges();

            return lLibraryFromDb;
        }
        public void Delete(Library prLibrary)
        {
            _context.Entry(prLibrary).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;

            _context.SaveChanges();
        }
    }
}
