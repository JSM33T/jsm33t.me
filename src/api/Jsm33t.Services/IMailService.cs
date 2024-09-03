using Jsm33t.Entities.Shared;

namespace Jsm33t.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(EmailMessage emailMessage);
    }
}
