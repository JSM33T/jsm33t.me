using Jsm33t.Entities.DTO;
using Jsm33t.Entities.Shared;
using Jsm33t.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using System.Reflection;

namespace Jsm33t.API.Controllers
{
    [Route("/")]
    [ApiController]
    public class CoreController : FoundationController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMailService _mailService;
        public CoreController(IOptionsMonitor<Jsm33tConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, ITelegramService telegramService, IWebHostEnvironment hostingEnvironment,IMailService mailService) : base(config, logger, httpContextAccessor, telegramService)
        {
            _hostingEnvironment = hostingEnvironment;
            _mailService = mailService;
        }


        //private readonly INotificationService _notificationService = notificationService;
        //private readonly ITelegramService _telegramService = telegramService;

        [HttpGet]
        public async Task<IActionResult> HeartBeat() {
            return await ExecuteActionAsync(async () =>
            {
                int statCode = StatusCodes.Status200OK;
                string message = string.Empty;
                List<string> errors = [];
                User_ClaimsResponse userClaims = null;

                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpPost("kill")]
        [Authorize(Roles = "admin")]
        public IActionResult Restart()
        {
            string appPath = _hostingEnvironment.ContentRootPath;

            ProcessStartInfo info = new()
            {
                FileName = System.Reflection.Assembly.GetEntryAssembly().Location,
                Arguments = string.Join(" ", Environment.GetCommandLineArgs().Skip(1))
            };

            Process.Start(info);

            Environment.Exit(0);

            return Ok("Restarting the application");
        }

        [HttpPost("sendEmail")]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> SendEmail([FromBody] EmailMessage emailMessage)
        {
            await _mailService.SendEmailAsync(emailMessage);

            return Ok("Email has been sent");
        }
    }
}
