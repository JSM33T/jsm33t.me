using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jsm33t.Entities.Dedicated
{
    public class BlogTagsMap
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public int TagId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
