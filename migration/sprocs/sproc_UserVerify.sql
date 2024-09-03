CREATE OR ALTER PROCEDURE dbo.sproc_UserVerifyAndUpdate
    @Username NVARCHAR(255),
    @OTP NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IsVerified INT;

    SELECT @IsVerified = CASE 
        WHEN EXISTS (
            SELECT 1
            FROM tblUsers 
            WHERE Username = @Username AND OTP = @OTP AND IsVerified = 0
        ) THEN 1 
        ELSE 0 
    END;

    IF @IsVerified = 1
    BEGIN
        UPDATE tblUsers
        SET IsVerified = 1
        WHERE Username = @Username AND OTP = @OTP;
        
        SELECT 0 AS [VerificationResult]; -- Return 1 for user verified
    END
    ELSE
    BEGIN
        SELECT 1 AS [VerificationResult]; -- Return 0 for user not verified
    END
END
