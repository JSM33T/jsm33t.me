using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Services
{
    public class HttpContextService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpContext _httpContext;
        public HttpContextService(IHttpContextAccessor httpContextAccessor,HttpContext httpContext)
        {
            _contextAccessor = httpContextAccessor;
            _httpContext = httpContext;
        }

        public string GetClaimValue(string claimType)
        {
            var claim = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == claimType);
            return claim?.Value;
        }

        public int GetUserId()
        {
            return int.Parse(GetClaimValue(ClaimTypes.NameIdentifier));
        }

        public string GetUserAgent()
        {
            return _contextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();
        }

    }
}
