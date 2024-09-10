CREATE OR ALTER PROCEDURE [dbo].[sproc_BlogAddLike]
    @Slug NVARCHAR(255),
    @UserID INT,
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @BlogId INT;
    DECLARE @LikeId INT;
	DECLARE @NewId INT;
 SELECT @NewId = ISNULL(MAX(Id), 0) + 1 FROM tblBlogLikes;
    -- Find the ID of the blog with the given slug
    SELECT @BlogId = Id
    FROM tblBlogs
    WHERE Slug = @Slug;

    IF @BlogId IS NOT NULL
    BEGIN
        -- Check if the user already liked the blog
        SELECT @LikeId = Id
        FROM tblBlogLikes
        WHERE BlogId = @BlogId AND UserId = @UserID;

        IF @LikeId IS NOT NULL
        BEGIN
            -- Remove the like if it exists
            DELETE FROM tblBlogLikes
            WHERE Id = @LikeId;

            SET @Result = 0; -- Like removed
        END
        ELSE
        BEGIN
            -- Add the blog like to the BlogLike table
            INSERT INTO tblBlogLikes (Id, BlogId, UserId)
            VALUES (@NewId, @BlogId, @UserID);

            SET @Result = 0; -- Like added
        END
    END
    ELSE
    BEGIN
        SET @Result = 1; -- Blog with the given slug not found
    END
END
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_CheckAndAddMessage]
    @Content    NVARCHAR(512),
    @Name       NVARCHAR(128) = 'anonymous',
    @Email      NVARCHAR(128) = 'na',
    @Topic      NVARCHAR(128) = 'general',
    @Origin     NVARCHAR(256) = '/',
    @Result     INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if a message with the same content and email exists
    IF EXISTS (SELECT 1 
               FROM tblMessages 
               WHERE Content = @Content AND Email = @Email)
    BEGIN
        -- Message with same content and email exists, set result to -1
        SET @Result = 2;
    END
    ELSE
    BEGIN
        -- Get the next Id by adding 1 to the maximum current Id
        DECLARE @NewId INT;
        SELECT @NewId = ISNULL(MAX(Id), 0) + 1 FROM tblMessages;

        -- Insert the new message with the calculated Id
        INSERT INTO tblMessages (Id, Content, [Name], Email, Topic, Origin, DateAdded)
        VALUES (@NewId, @Content, @Name, @Email, @Topic, @Origin, GETDATE());

        -- Set result to 0 to indicate success
        SET @Result = 0;
    END
END;
GO

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
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_GetBlogAuthorsByBlogId]
    @BlogId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.Id AS Id,
        u.FirstName + ' ' + u.LastName as Name,
        u.Username,
        u.Email,
        u.Avatar
    FROM 
        tblBlogAuthorMap aam
    INNER JOIN 
        tblUsers u ON aam.UserId = u.Id
    WHERE 
        aam.BlogId = @BlogId;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_GetBlogLikeStatus]
    @Slug VARCHAR(255), -- Assuming the Slug is a VARCHAR type
	@UserId INT,
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @BlogID INT;

    -- Retrieve BlogID from tblBlogs based on the provided Slug
    SELECT @BlogID = Id
    FROM tblBlogs
    WHERE Slug = @Slug;

    IF @BlogID IS NULL
    BEGIN
        SET @Result = 3; -- Blog not found
        RETURN;
    END

    -- Check if the BlogID exists in tblBlogLikes
    IF EXISTS (SELECT 1 FROM tblBlogLikes WHERE BlogID = @BlogID AND UserId = @UserId)
    BEGIN
        SET @Result = 0; -- Blog ID exists in tblBlogLikes
    END
    ELSE
    BEGIN
        SET @Result = 33; -- Blog ID not found in tblBlogLikes
    END
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_GetPaginatedBlogs]
    @PageNumber INT,
    @PageSize INT,
    @SearchString NVARCHAR(128) = NULL,
    @Category NVARCHAR(128) = NULL,
    @Tag NVARCHAR(128) = NULL,
    @Year INT = NULL,
    @FromDate DATETIME = NULL,
    @ToDate DATETIME = NULL
AS
BEGIN
    -- Ensure valid input for page number and page size
    IF @PageNumber < 1 SET @PageNumber = 1;
    IF @PageSize < 1 SET @PageSize = 10;

    -- Check if @FromDate is greater than @ToDate
    IF @FromDate IS NOT NULL AND @ToDate IS NOT NULL AND @FromDate > @ToDate
    BEGIN
        RAISERROR('Invalid date range: FromDate cannot be greater than ToDate.', 16, 1);
        RETURN;
    END

    -- Calculate total record count
    DECLARE @TotalRecords INT;
    DECLARE @TotalPages INT;

    -- Build the dynamic SQL query
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = '
    SELECT @TotalRecords = COUNT(*)
    FROM tblBlogs
    WHERE 1 = 1';

    -- SearchString condition
    IF @SearchString IS NOT NULL OR @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND BlogName LIKE ''%'' + @SearchString + ''%''';
    END

    -- Category condition
    IF @Category IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblBlogCategories
            WHERE Id = CategoryId
            AND CategoryName = @Category
        )';
    END

    -- Tag condition
    IF @Tag IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND Tags LIKE ''%'' + @Tag + ''%''';
    END

    IF @Year IS NOT NULL AND @Year != ''
    BEGIN
        SET @SQL = @SQL + ' AND YEAR(DateAdded) = @Year';
    END

    -- Date range conditions
    IF @FromDate IS NOT NULL AND @FromDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND DateAdded >= @FromDate';
    END

    IF @ToDate IS NOT NULL AND @ToDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND DateAdded <= @ToDate';
    END

    -- Calculate total record count
    EXEC sp_executesql @SQL, 
        N'@SearchString NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @TotalRecords INT OUTPUT',
        @SearchString, @Category, @Tag, @Year, @FromDate, @ToDate, @TotalRecords OUTPUT;

    -- Calculate total pages
    SET @TotalPages = CASE 
                        WHEN @TotalRecords % @PageSize = 0 THEN @TotalRecords / @PageSize
                        ELSE (@TotalRecords / @PageSize) + 1
                      END;

    -- Fetch paginated records
    SET @SQL = '
 SELECT 
    a.Id,
    a.BlogName,
    a.Slug,
    a.Tags,
	a.Description,
    a.CategoryId,
    ac.CategoryName,
    a.DateAdded,
    @PageNumber AS CurrentPage,
    @TotalPages AS TotalPages
FROM tblBlogs a
LEFT JOIN tblBlogCategories ac ON a.CategoryId = ac.Id
    WHERE 1 = 1 AND IsActive = 1';

    -- Add conditions as before
    IF @SearchString IS NOT NULL AND @SearchString != ''
    BEGIN
        SET @SQL = @SQL + ' AND BlogName LIKE ''%'' + @SearchString + ''%''';
    END

    IF @Category IS NOT NULL AND @Category != ''
    BEGIN
        SET @SQL = @SQL + ' AND EXISTS (
            SELECT 1
            FROM tblBlogCategories
            WHERE Id = CategoryId
            AND CategoryName = @Category
        )';
    END

    IF @Tag IS NOT NULL AND @Tag != ''
    BEGIN
        SET @SQL = @SQL + ' AND Tags LIKE ''%'' + @Tag + ''%''';
    END

    IF @Year IS NOT NULL AND @Year != ''
    BEGIN
        SET @SQL = @SQL + ' AND YEAR(a.DateAdded) = @Year';
    END

    IF @FromDate IS NOT NULL  AND @FromDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND a.DateAdded >= @FromDate';
    END

    IF @ToDate IS NOT NULL AND @ToDate != ''
    BEGIN
        SET @SQL = @SQL + ' AND a.DateAdded <= @ToDate';
    END

    SET @SQL = @SQL + '
    ORDER BY a.DateAdded DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY';

    -- Execute the paginated query
    EXEC sp_executesql @SQL, 
        N'@SearchString NVARCHAR(128), @Category NVARCHAR(128), @Tag NVARCHAR(128), @Year INT, @FromDate DATETIME, @ToDate DATETIME, @PageNumber INT, @PageSize INT, @TotalPages INT',
        @SearchString, @Category, @Tag, @Year, @FromDate, @ToDate, @PageNumber, @PageSize, @TotalPages;

    -- Output pagination information
    SELECT 
        @TotalRecords AS TotalRecords,
        @PageNumber AS CurrentPage,
        @TotalPages AS TotalPages,
        @PageSize AS PageSize;
END;
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_GetPasswordByUsername]
    @Username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Password]
    FROM tblUsers
    WHERE Username = @Username;
END
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_UserLogin]
    @Username NVARCHAR(255),
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN
        SELECT *
        FROM tblUsers 
        WHERE Username = @Username AND [Password] = @Password and IsVerified = 1;
    END
END
GO

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
GO

CREATE OR ALTER PROCEDURE [dbo].[sproc_UserVerifyAndUpdate]
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
GO