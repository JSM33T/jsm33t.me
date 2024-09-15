namespace Jsm33t.Services
{
    public interface IHttpService
    {
        public Task<string> GetFileContentAsync(string fileUrl);
    }
}
