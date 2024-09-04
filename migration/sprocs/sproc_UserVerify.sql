CREATE OR ALTER PROCEDURE dbo.sproc_UserVerifyAndUpdate
    @Username NVARCHAR(255),
    @OTP NVARCHAR(255),
    @Result INT OUTPUT
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
            
            SET @Result = 0;
        END
    ELSE
        BEGIN
            SET @Result = 1;
        END
END
