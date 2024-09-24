using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;
using Dapper;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;
using Jsm33t.Library;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Jsm33t.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly IOptionsMonitor<Jsm33tConfig> _config;
        private readonly IDbConnection _dbConnection;
        protected readonly ILogger _logger;
        private readonly string _conStr;

        public UserRepository(IOptionsMonitor<Jsm33tConfig> config, ILogger<MessageRepository> logger, IDbConnection dbConnection)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
            _dbConnection = dbConnection;
        }

        public async Task<User_ClaimsResponse> UserLogin(User_LoginRequest request)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Username", request.Username, DbType.String, ParameterDirection.Input);
            parameters.Add("@Password", request.Password , DbType.String, ParameterDirection.Input);

            using var results = await _dbConnection.QueryMultipleAsync("sproc_UserLogin", parameters, commandType: CommandType.StoredProcedure);
            var user = results.Read<User_ClaimsResponse>().SingleOrDefault() ?? null;

            return user;
        }

        public async Task<(DbResult, User_ClaimsResponse)> GoogleLogin(Payload request)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Firstname", request.GivenName, DbType.String, ParameterDirection.Input);
            parameters.Add("@Lastname", request.FamilyName, DbType.String, ParameterDirection.Input);
            parameters.Add("@Username", request.Email, DbType.String, ParameterDirection.Input);
            parameters.Add("@Email", request.Email, DbType.String, ParameterDirection.Input);
            parameters.Add("@GoogleId", request.Subject, DbType.String, ParameterDirection.Input);
            parameters.Add("@Avatar", request.Picture, DbType.String, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            using var results = await _dbConnection.QueryMultipleAsync("sproc_GoogleLogin", parameters, commandType: CommandType.StoredProcedure);
            var user = results.ReadSingleOrDefault<User_ClaimsResponse>() ?? null;
            var result = (DbResult)parameters.Get<int>("@Result");
            return (result, user);
        }

        public async Task<User_ClaimsResponse> GetGoogleLoginDetails(string Email)
        {
            var parameters = new DynamicParameters();

            parameters.Add("@Username", Email, DbType.String, ParameterDirection.Input);

            using var results = await _dbConnection.QueryMultipleAsync("sproc_UserLogin", parameters, commandType: CommandType.StoredProcedure);
            var user = results.Read<User_ClaimsResponse>().SingleOrDefault() ?? null;

            return user;
        }

        public async Task<(DbResult, User_ClaimsResponse,string)> UserSignup(User_SignupRequest request)
        {
            string otp = await Crypto.GenerateOTP();
            var parameters = new DynamicParameters();
            parameters.Add("@Firstname", request.Firstname, DbType.String, ParameterDirection.Input);
            parameters.Add("@Lastname", request.Lastname, DbType.String, ParameterDirection.Input);
            parameters.Add("@Username", request.Username, DbType.String, ParameterDirection.Input);
            parameters.Add("@Email", request.Email, DbType.String, ParameterDirection.Input);
            parameters.Add("@Password", request.Password, DbType.String, ParameterDirection.Input);
            parameters.Add("@otp", otp, DbType.String, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            using var results = await _dbConnection.QueryMultipleAsync("sproc_UserSignup", parameters, commandType: CommandType.StoredProcedure);
            var user = results.ReadSingleOrDefault<User_ClaimsResponse>() ?? null;
            var result = (DbResult)parameters.Get<int>("@Result");
            return (result, user,otp);
        }

        public async Task<DbResult> UserVerify(User_VerifyRequest request)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", request.Username, DbType.String, ParameterDirection.Input);
            parameters.Add("@OTP", request.OTP, DbType.String, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _dbConnection.ExecuteAsync("sproc_UserVerifyAndUpdate", parameters, commandType: CommandType.StoredProcedure);

            var result = parameters.Get<int>("@Result");
            return (DbResult)result;
        }

        public async Task<DbResult> UserAccountRecovery(string username)
        {
            var otp = await Crypto.GenerateOTP();
            var parameters = new DynamicParameters();
            parameters.Add("@UserId", username, DbType.String, ParameterDirection.Input);
            parameters.Add("@OTP", otp, DbType.String, ParameterDirection.Input);
            parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await _dbConnection.ExecuteAsync("sproc_CreateRecovery", parameters, commandType: CommandType.StoredProcedure);

            var result = parameters.Get<int>("@Result");
            return (DbResult)result;
        }
    }
}
