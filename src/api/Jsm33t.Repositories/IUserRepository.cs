using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;

namespace Jsm33t.Repositories
{
    public interface IUserRepository
    {
        public Task<User_ClaimsResponse> UserLogin(User_LoginRequest request);
        public Task<(DbResult, User_ClaimsResponse)> UserSignup(User_SignupRequest request);
    }
}
