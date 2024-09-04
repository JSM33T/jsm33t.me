using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Services
{
    public interface IHttpContextService
    {
        string GetClaimValue(string claimType);
        int GetUserId();
        string GetUserAgent();
    }
}
