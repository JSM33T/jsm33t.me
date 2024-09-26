
CREATE OR ALTER PROCEDURE [dbo].[sproc_GoogleLogin]
    @Firstname NVARCHAR(50),
    @Lastname NVARCHAR(50),
    @Username NVARCHAR(256),
    @Email NVARCHAR(256),
    @GoogleId NVARCHAR(255),
    @Avatar NVARCHAR(256),
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @NextUserId INT;
	
	SELECT @NextUserId = ISNULL(MAX(Id), 0) + 1 FROM tblUsers;
   
    IF NOT EXISTS (SELECT 1 FROM tblUsers WHERE Email = @Email)
    BEGIN
		INSERT INTO tblUsers(Id,Firstname, Lastname, Username, Avatar, Email,GoogleId,OTP)
		VALUES (@NextUserId,@Firstname, @Lastname, @Username, @Avatar, @Email,@GoogleId,0000);
    END
	ELSE
	BEGIN
		UPDATE tblUsers
		SET Avatar = @Avatar,
		AuthMode = 'both',
		GoogleId = @GoogleId
		WHERE Email = @Email
	END

    SET @Result = 0;

    SELECT *
    FROM tblUsers
    WHERE Email = @Email;
END

