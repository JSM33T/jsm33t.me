
using Jsm33t.Entities.Enums;
using Microsoft.AspNetCore.Http;
using Telegram.Bot.Types;

namespace Jsm33t.Services
{
    public class HttpService(HttpClient httpClient,IHttpContextAccessor httpContextAccessor) : IHttpService
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly HttpContext? _httpContext = httpContextAccessor?.HttpContext ?? null;

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

        public async Task<int?> GetUserId()
        {
            if (_httpContext == null) return null;
            
            var userClaims = _httpContext.User.Claims;
            var userId = userClaims.FirstOrDefault(c => c.Type == "id")?.Value;

            return userId != null ? int.Parse(userId) : null;
        }

        public async Task<string?> GetUsername()
        {
            if (_httpContext == null) return null;

            var userClaims = _httpContext.User.Claims;
            var username = userClaims.FirstOrDefault(c => c.Type == "username")?.Value;

            return username ?? null;
        }

    }
}
