using System.Diagnostics;

namespace SearchLibraryApp.DependencyInjection
{
    public class ConsoleWriter : IConsoleWriter
    {
        public void Write()
        {
            Debug.WriteLine("Testing Dependency Injection...");
        }
    }
}
