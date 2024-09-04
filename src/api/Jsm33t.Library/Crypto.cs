namespace Jsm33t.Library
{
    public static class Crypto
    {
        public static async Task<string> GenerateOTP()
        {
            Random rand = new();
            int otp = rand.Next(1000, 9999); // Generates a random number between 1000 and 9999 (inclusive)
            return otp.ToString();
        }

    }
}
