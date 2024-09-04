using Jsm33t.Entities.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Jsm33t.Services
{
    public class MailService : IMailService
    {
        private readonly SmtpClient _client;

        private readonly IOptionsMonitor<Jsm33tConfig> _config;
        private readonly SmtpSettings _smtpConfig;
        private readonly ILogger<MailService> _logger;
        public MailService(IOptionsMonitor<Jsm33tConfig> config, ILogger<MailService> logger)
        {
            _config = config;
            _logger = logger;
            _smtpConfig = _config.CurrentValue.SmtpSettings;
            _client = new SmtpClient
            {
                Host = _smtpConfig.Server,
                Port = _smtpConfig.Port,
                EnableSsl = _smtpConfig.EnableSSL,
                Credentials = new NetworkCredential(_smtpConfig.Username, _smtpConfig.Password) // replace with your SMTP username and password
            };

        }
        public async Task SendEmailAsync(EmailMessage emailMessage)
        {
            if (emailMessage == null || emailMessage.Recipients == null || !emailMessage.Recipients.Any())
            {
                throw new ArgumentException("Invalid email message");
            }

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpConfig.FromEmail),
                Subject = emailMessage.Subject,
                Body = emailMessage.Body
            };

            foreach (var recipient in emailMessage.Recipients)
            {
                mailMessage.To.Add(new MailAddress(recipient));
            }

            await _client.SendMailAsync(mailMessage);
        }
    }
}
