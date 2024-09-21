using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Entities.DTO
{
    public class Blog_AddComment
    {
        public int UserId { get; set; }
        public string BlogSlug { get; set; }
        public int  BlogId{ get; set; }
        public string CommentText { get; set; }
    }
}
