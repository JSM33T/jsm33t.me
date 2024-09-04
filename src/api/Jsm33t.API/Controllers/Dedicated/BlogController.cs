using Jsm33t.Entities.Dedicated;
using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;
using Jsm33t.Repositories;
using Jsm33t.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Jsm33t.API.Controllers.Dedicated
{
    [Route("api/blog")]
    [ApiController]
    public class BlogController(IOptionsMonitor<Jsm33tConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IBlogRepository BlogRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IBlogRepository _BlogRepo = BlogRepository;

        [HttpPost("search")]
        #region Paginated blogs with search criteria
        public async Task<IActionResult> GetBlogsByPagination([FromBody] Blog_GetRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = StatusCodes.Status200OK;
                string message = string.Empty;
                List<string> hints = [];
                PaginatedResult<Blog_GetBlogs> result;

                result = await _BlogRepo.GetPaginatedBlogsAsync(request);

                if (result.TotalRecords == 0)
                {
                    statusCode = StatusCodes.Status404NotFound;
                    message = "Not found";
                    hints.Add("no Blogs match this criteria");
                }

                return (statusCode, result, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        #endregion

        [HttpGet("load/{year}/{slug}")]
        #region load blog by slug
        public async Task<IActionResult> GetStuff(string slug, string year)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = default;
                string message = string.Empty;
                List<string> hints = [];
                Blog_GetDetails BlogDetails = new();
                Blog Blog = new();

                var filePath = Path.Combine("wwwroot", "content","blogs", year, slug, $"content.md");
                Blog = await _BlogRepo.GetBlogDetailsBySlug(slug);
                if (Blog != null)
                {
                    BlogDetails.Slug = Blog.Slug;
                    BlogDetails.Name = Blog.BlogName;
                    BlogDetails.DateAdded = Blog.DateAdded;
                    BlogDetails.Id = Blog.Id;

                    if (System.IO.File.Exists(filePath))
                    {
                        BlogDetails.Content = await System.IO.File.ReadAllTextAsync(filePath);
                        statusCode = StatusCodes.Status200OK;
                        BlogDetails.Authors = await _BlogRepo.GetBlogAuthorsByBlogId(BlogDetails.Id);
                        message = "Retrieved";
                    }
                }
                else
                {
                    message = "not found";
                    statusCode = StatusCodes.Status404NotFound;
                    hints.Add("NO blog found with this criteria");
                    BlogDetails = null;
                    
                }
               

                return (statusCode, BlogDetails, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        #endregion

        [HttpGet("details/{slug}")]
        #region Get blog details post loading
        public async Task<IActionResult> GetCategoryStuff(string slug)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = default;
                string message = string.Empty;
                List<string> hints = [];
                Blog blog;

                blog = await _BlogRepo.GetBlogDetailsBySlug(slug);
                if (blog  != null)
                {
                    message = "retrieved";
                    statusCode = StatusCodes.Status200OK;
                }
                else
                {
                    hints.Add("No blog found with this criteria");
                }

                return (statusCode, blog, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        [HttpGet("getcategories")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCategoryStuff([FromServices] IMemoryCache memoryCache)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = default;
                string message = string.Empty;
                List<string> hints = [];

                if (!memoryCache.TryGetValue("Categories", out List<BlogCategory> categories))
                {
                    await Task.Delay(2000);
                    categories = await _BlogRepo.GetCategories();

                    if (categories.Count > 0)
                    {
                        message = "retrieved";
                        statusCode = StatusCodes.Status200OK;

                        memoryCache.Set("Categories", categories, TimeSpan.FromMinutes(10));
                    }
                }
                else
                {
                    message = "retrieved from cache";
                    statusCode = StatusCodes.Status200OK;
                }

                return (statusCode, categories, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }


        [HttpGet("addlike")]
        [Authorize]
        #region Get categories on side pane
        public async Task<IActionResult> AddBlogLike(BlogLikeDTO likeRequest)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statusCode = default;
                string message = string.Empty;
                List<string> hints = [];
                DbResult result = default;

                int UserId = 1;

                result = await _BlogRepo.AddBlogLike(likeRequest.Slug,UserId);

                return (statusCode, 0, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }

        #endregion
   
   
    }
}
