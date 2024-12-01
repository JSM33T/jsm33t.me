using Google.Apis.Auth;
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
using static Google.Apis.Auth.GoogleJsonWebSignature;


namespace Jsm33t.API.Controllers.Dedicated
{
    public class GoogleLoginRequest
    {
        public string IdToken { get; set; }
    }

    [Route("api/account")]
    [ApiController]
    public class AccountController(IMailService mailService, IOptionsMonitor<Jsm33tConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IUserRepository userRepository) : FoundationController(config, logger, httpContextAccessor, telegramService)
    {
        private readonly IUserRepository _userRepo = userRepository;
        private readonly IMailService _mailService = mailService;


        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> hints = [];
                User_ClaimsResponse userClaims;

                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { config.CurrentValue.logins.GoogleClientId }
                };

                Payload payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken, settings);

                (DbResult res, userClaims) = await _userRepo.GoogleLogin(payload);

                //userClaims = await _userRepo.GetGoogleLoginDetails(payload.Email);

                statCode = StatusCodes.Status200OK;
                var claims = new[]
                   {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.NameIdentifier,userClaims.Username),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("id", userClaims.Id.ToString()),
                            new Claim("username", userClaims.FirstName),
                            new Claim("role", userClaims.Role),
                            new Claim("firstname", userClaims.FirstName),
                            new Claim("lastname", userClaims.LastName ?? string.Empty),
                            new Claim("avatar", userClaims.Avatar),
                            new Claim("authMode", userClaims.AuthMode),
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

                statCode = StatusCodes.Status200OK;
                message = "Logged In..";

                return (statCode, userClaims, message, hints);
            }, "GoogleLogin");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        #region User Login
        public async Task<IActionResult> Login([FromBody] User_LoginRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> hints = [];
                User_ClaimsResponse userClaims;

                userClaims = await _userRepo.UserLogin(request);

                if (userClaims != null)
                {
                    statCode = StatusCodes.Status200OK;
                    var claims = new[]
                       {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.NameIdentifier,userClaims.Username),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("id", userClaims.Id.ToString()),
                            new Claim("username", userClaims.FirstName),
                            new Claim("role", userClaims.Role),
                            new Claim("firstname", userClaims.FirstName),
                            new Claim("lastname", userClaims.LastName ?? string.Empty),
                            new Claim("avatar", userClaims.Avatar),
                            new Claim("authMode", userClaims.AuthMode),
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

                    statCode = StatusCodes.Status200OK;
                    message = "Logged In..";

                }
                else
                {
                    statCode = StatusCodes.Status400BadRequest;
                    message = "Invalid credentials";
                    hints.Add("Please check your creds");
                }


                return (statCode, userClaims, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        // [HttpGet("logout")]
        // [Authorize("member")]
        // public async Task<IActionResult> Logout()
        // {
        //     return await ExecuteActionAsync(async () =>
        //     {
        //         int statCode = default;
        //         string message = string.Empty;
        //         List<string> errors = [];
        //         User_ClaimsResponse userClaims = null;

        //         return (statCode, userClaims, message, errors);
        //     }, MethodBase.GetCurrentMethod().Name);
        // }

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
                string otp = string.Empty;

                (result, userClaims, otp) = await _userRepo.UserSignup(request);

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
                    EmailMessage emailMessage = new()
                    {
                        Recipients = [userClaims.Email],
                        Subject = "otp subject",
                        Body = otp + " asas"
                    };

                    await _mailService.SendEmailAsync(emailMessage);
                    message = "Signed up";
                    statCode = StatusCodes.Status200OK;
                    hints.Add("you have signed up .Please verify your email");
                }

                return (statCode, userClaims, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        [HttpPost("verify")]
        [AllowAnonymous]
        #region User signup
        public async Task<IActionResult> Verify([FromBody] User_VerifyRequest request)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> hints = [];
                DbResult result;

                result = await _userRepo.UserVerify(request);


                if (result == DbResult.Success)
                {
                    message = "Account verified";
                    statCode = StatusCodes.Status200OK;
                    hints.Add("Account has been registered");
                    hints.Add("Now you can proceed to login");
                }
                else
                {
                    message = "Invalid OTP";
                    statCode = StatusCodes.Status400BadRequest;
                    hints.Add("Check if OTP and username are valid");
                }

                return (statCode, result, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        [HttpPost("recover")]
        [AllowAnonymous]
        #region User recovery
        public async Task<IActionResult> RecoveryRequest(string username)
        {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = default;
                string message = string.Empty;
                List<string> hints = [];
                DbResult result;

                result = await _userRepo.UserAccountRecovery(username);


                if (result == DbResult.Success)
                {
                    message = "Recovery request accepted";
                    statCode = StatusCodes.Status200OK;
                    hints.Add("Please check your email for the OTP");
                }
                else
                {
                    message = "Error occured while adding request";
                    statCode = StatusCodes.Status400BadRequest;
                    hints.Add("Please check your username");
                }

                return (statCode, result, message, hints);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

    }
}
