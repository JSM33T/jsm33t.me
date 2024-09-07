using Jsm33t.Entities.Dedicated;
using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;

namespace Jsm33t.Repositories
{
    public interface IBlogRepository
    {
        public Task<PaginatedResult<Blog_GetBlogs>> GetPaginatedBlogsAsync(Blog_GetRequest request);
        public Task<List<BlogCategory>> GetCategories();
        public Task<Blog> GetBlogDetailsBySlug(string Slug);
        public Task<IEnumerable<BlogAuthor>> GetBlogAuthorsByBlogId(int BlogId);
        public Task<DbResult> AddBlogLike(string Slug, int UserId);
        public Task<bool> GetBlogLikeStatus(string Slug, int UserId);
    }
}
