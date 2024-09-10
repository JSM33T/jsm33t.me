CREATE OR ALTER PROCEDURE [dbo].[sproc_CreateRecovery]
    @UserId NVARCHAR(50),
    @OTP NVARCHAR(10),
    @Result INT OUTPUT
AS
BEGIN
    -- Check if the username exists
    IF EXISTS (SELECT 1 FROM tblUsers WHERE Username = @UserId OR Email = @UserId)
    BEGIN
        -- Update the OTP for the user
        UPDATE tblUsers
        SET OTP = @OTP,DateEdited = GETDATE()
        WHERE Username = @UserId OR Email = @UserId

        -- Set the result to 1 for success
        SET @Result = 1
    END
    ELSE
    BEGIN
        -- Set the result to 0 for failure
        SET @Result = 0
    END
END
