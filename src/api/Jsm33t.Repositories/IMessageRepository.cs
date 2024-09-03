using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;

namespace Jsm33t.Repositories
{
    public interface IMessageRepository
    {
        public Task<DbResult> CheckAndAddMessage(Message_AddRequest messageRequest);
    }

}
