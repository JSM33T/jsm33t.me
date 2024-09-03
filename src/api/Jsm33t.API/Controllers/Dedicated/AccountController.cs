using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Enums;
using Jsm33t.Entities.Shared;
using Jsm33t.Repositories;
using Jsm33t.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Jsm33t.API.Controllers.Dedicated
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IUserRepository userRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IUserRepository _userRepo = userRepository;

        [HttpPost("login")]
        [AllowAnonymous]
        #region User Login
        public async Task<IActionResult> Login([FromBody] User_LoginRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> errors = [];
                User_ClaimsResponse userClaims;

                userClaims = await _userRepo.UserLogin(request);

                if (userClaims != null)
                {
                    statCode = StatusCodes.Status200OK;
                    var claims = new[]
                       {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("username", userClaims.FirstName),
                            new Claim("role", userClaims.Role),
                            new Claim("firstname", userClaims.FirstName),
                            new Claim("lastname", userClaims.LastName),
                            new Claim("avatar", userClaims.Avatar),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddDays(7),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);
                }
                else
                {
                    statCode = StatusCodes.Status400BadRequest;
                    message = "Invalid credentials";
                    errors.Add("Please check your creds");
                }


                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        [HttpGet("logout")]
        [Authorize("member")]
        public async Task<IActionResult> Logout()
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> errors = [];
                User_ClaimsResponse userClaims = null;

                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        #region User signup
        public async Task<IActionResult> Signup([FromBody] User_SignupRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> hints = [];
                User_ClaimsResponse userClaims;
                DbResult result;

                (result, userClaims) = await _userRepo.UserSignup(request);

                if (result == DbResult.Conflict)
                {
                    message = "Username not available";
                    statCode = StatusCodes.Status409Conflict;
                    hints.Add("Username not available");
                }
                else if (result == DbResult.Conflict_B)
                {
                    message = "Email is already registered";
                    statCode = StatusCodes.Status409Conflict;
                    hints.Add("Email is already registered");
                    hints.Add("Try logging in instead");
                    hints.Add("Recover your account if you forgot the password");
                }
                else
                {
                    message = "Signed up";
                    statCode = StatusCodes.Status200OK;
                    hints.Add("");
                }

                return (statCode, userClaims, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion
    }
}
