using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SearchLibraryApp.Model.Entities;

namespace SearchLibraryApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _ILibraryService;

        public LibraryController(ILibraryService prILibraryService)
        {
            _ILibraryService = prILibraryService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Library> lResult = _ILibraryService.GetAll();
            return Ok(lResult);
        }

        [HttpGet]
        public IActionResult Search(string prName)
        {
            List<Library> lResult = _ILibraryService.GetByName(prName);
            return Ok(lResult);
        }

        [HttpPut]
        public IActionResult Update(Library prLibrary)
        {
            return Ok(_ILibraryService.Update(prLibrary));
        }

        [HttpPost]
        public IActionResult Save(Library prLibrary)
        {
            return Ok(_ILibraryService.Save(prLibrary));
        }

        [HttpDelete]
        public IActionResult Delete(Library prLibrary)
        {
            _ILibraryService.Delete(prLibrary);
            return Ok();
        }

    }
}
