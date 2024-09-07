using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Entities.Enums
{
    public enum DbResult
    {
        Success = 0,
        Error = 1,
        Conflict = 2,
        Conflict_B = 22,
        NotFound = 3,
        NotFound_B = 33,
        Expired = 4
    }
}
