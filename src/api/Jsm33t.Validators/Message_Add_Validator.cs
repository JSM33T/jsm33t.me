using Jsm33t.Entities.DTO;
using FluentValidation;

namespace Jsm33t.Validators
{
    public class MessageRequestValidator : AbstractValidator<Message_AddRequest>
    {
        public MessageRequestValidator()
        {
            RuleFor(x => x.Name)
               .NotEmpty().WithMessage("Name is required")
               .MaximumLength(128).WithMessage("Name is too long");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format")
                .MaximumLength(256).WithMessage("Email too long");

            RuleFor(x => x.Content)
                .NotEmpty().WithMessage("Message is required")
                .MinimumLength(5).WithMessage("Message too short")
                .MaximumLength(512).WithMessage("Message too long");

            RuleFor(x => x.Topic)
                .NotEmpty().WithMessage("Topic is required")
                .MaximumLength(128).WithMessage("Topic too long");
        }
    }
}
