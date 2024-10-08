﻿using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Jsm33t.Repositories
{
    public interface IUserRepository
    {
        public Task<User_ClaimsResponse> UserLogin(User_LoginRequest request);
        public Task<DbResult> UserVerify(User_VerifyRequest request);
        public Task<(DbResult, User_ClaimsResponse,string)> UserSignup(User_SignupRequest request);
        public Task<DbResult> UserAccountRecovery(string username);
        public Task<User_ClaimsResponse> GetGoogleLoginDetails(string Email);
        public Task<(DbResult, User_ClaimsResponse)> GoogleLogin(Payload request);
    }
}
