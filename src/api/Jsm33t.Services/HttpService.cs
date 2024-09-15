
namespace Jsm33t.Services
{
    public class HttpService(HttpClient httpClient) : IHttpService
    {
        private readonly HttpClient _httpClient = httpClient;

        public async Task<string> GetFileContentAsync(string fileUrl)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(fileUrl);

                if (response.IsSuccessStatusCode)
                {
                    // Return the file content as a string
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new HttpRequestException($"Error fetching file. Status code: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while fetching the file: {ex.Message}", ex);
            }
        }
    }
}
