﻿using System.Security.Claims;

namespace Jsm33t.Entities.DTO
{
    public class User_ClaimsResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public string Token { get; set; }
        public string AuthMode { get; set; } = "email";
    }
}
