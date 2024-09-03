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
        Conflict = -1,
        NotFound = -2,
        Conflict_B = -11,
        Error = 1


    }
}
