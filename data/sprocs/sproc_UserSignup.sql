CREATE OR ALTER PROCEDURE [dbo].[sproc_UserSignup]
    @Firstname NVARCHAR(50),
    @Lastname NVARCHAR(50),
    @Username NVARCHAR(50),
    @Email NVARCHAR(50),
    @Password NVARCHAR(255),
    @otp NVARCHAR(6),
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @NextUserId INT;
	
	SELECT @NextUserId = ISNULL(MAX(Id), 0) + 1 FROM tblUsers;
    -- Check if the username already exists
    IF EXISTS (SELECT 1 FROM tblUsers WHERE Username = @Username)
    BEGIN
        SET @Result = 2; -- Duplicate username
        RETURN;
    END

     IF EXISTS (SELECT 1 FROM tblUsers WHERE Email = @Email)
    BEGIN
        SET @Result = 22; -- Duplicate Email
        RETURN;
    END

    -- Insert the new user
    INSERT INTO tblUsers(Id,Firstname, Lastname, Username, Password, Email, OTP)
    VALUES (@NextUserId,@Firstname, @Lastname, @Username, @Password, @Email, @otp);

    -- Set the result to success before selecting the user details
    SET @Result = 0;

    -- Return the newly inserted user details without a separate result set for the @Result parameter
    SELECT *
    FROM tblUsers
    WHERE Username = @Username AND [Password] = @Password;
END
--DECLARE @Result INT;

--EXEC [dbo].[sproc_UserSignup]
--    @Firstname = 'John',
--    @Lastname = 'Doe',
--    @Username = 'johndroe',
--    @Email = 'johndoe@examrrple.com',
--    @Password = 'password123',
--    @otp = '0000',
--    @Result = @Result OUTPUT;

---- Check the result value
--SELECT @Result as Result;

