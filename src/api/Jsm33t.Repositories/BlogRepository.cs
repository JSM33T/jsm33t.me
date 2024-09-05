
using Dapper;
using Jsm33t.Entities.Dedicated;
using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Jsm33t.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        protected readonly IOptionsMonitor<Jsm33tConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private string _conStr;

        public BlogRepository(IOptionsMonitor<Jsm33tConfig> config, ILogger<BlogRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }

        public async Task<PaginatedResult<Blog_GetBlogs>> GetPaginatedBlogsAsync(Blog_GetRequest request)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);

            var parameters = new
            {
                request.PageNumber,
                request.PageSize,
                SearchString = string.IsNullOrEmpty(request.SearchString) ? string.Empty : request.SearchString,
                Category = string.IsNullOrEmpty(request.Category) ? null : request.Category,
                Tag = string.IsNullOrEmpty(request.Tag) ? null : request.Tag,
                Year = request.Year ?? null,
                FromDate = request.FromDate ?? null,
                ToDate = request.ToDate ?? null
            };

            var results = await dbConnection.QueryMultipleAsync("sproc_GetPaginatedBlogs", parameters, commandType: CommandType.StoredProcedure);

            var Blogs = results.Read<Blog_GetBlogs>().ToList();
            var paginationInfo = results.ReadSingle<dynamic>();

            return new PaginatedResult<Blog_GetBlogs>
            {
                Items = Blogs,
                TotalRecords = (int)paginationInfo.TotalRecords,
                CurrentPage = (int)paginationInfo.CurrentPage,
                TotalPages = (int)paginationInfo.TotalPages
            };
        }


        public async Task<List<BlogCategory>> GetCategories()
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = @" SELECT 
            c.Id, 
            c.CategoryName, 
            c.Slug, 
            c.DateAdded,
            (SELECT COUNT(*) FROM tblBlogs bm WHERE bm.CategoryId = c.Id) AS BlogCount
            FROM 
            tblBlogCategories c
";

            var categories = await dbConnection.QueryAsync<BlogCategory>(query);
            return categories.ToList();
        }

        public async Task<Blog> GetBlogDetailsBySlug(string Slug)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);
            var query = $"SELECT * FROM tblBlogs WHERE Slug = '{Slug}'";

            Blog Blog = await dbConnection.QuerySingleOrDefaultAsync<Blog>(query, new { Slug = Slug });

            if (Blog != null)
            {
                Blog.Authors = await GetBlogAuthorsByBlogId(Blog.Id);
            }
            else
            {
                Blog.Authors = [];
            }

            return Blog;
        }

        public async Task<IEnumerable<BlogAuthor>> GetBlogAuthorsByBlogId(int BlogId)
        {
            using IDbConnection dbConnection = new SqlConnection(_conStr);

            // Stored procedure call with Dapper
            var authors = await dbConnection.QueryAsync<BlogAuthor>(
                "sproc_GetBlogAuthorsByBlogId",
                new { BlogId },
                commandType: CommandType.StoredProcedure
            );

            return authors;
        }

        public async Task<DbResult> AddBlogLike(string Slug,int UserId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Slug", Slug, DbType.String, ParameterDirection.Input);
            parameters.Add("@UserID", UserId, DbType.Int32, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _dbConnection.ExecuteAsync("sproc_BlogAddLike", parameters, commandType: CommandType.StoredProcedure);

            var result = parameters.Get<DbResult>("@Result");
            return result;
        }


    }
}
