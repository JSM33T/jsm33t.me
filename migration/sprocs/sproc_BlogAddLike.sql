CREATE PROCEDURE [dbo].[sproc_BlogAddLike]
    @Slug NVARCHAR(255),
    @UserID INT,
    @Result INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @BlogID INT;

    -- Find the ID of the blog with the given slug
    SELECT @BlogID = BlogID
    FROM tblBlogs
    WHERE Slug = @Slug;

    IF @BlogID IS NOT NULL
    BEGIN
        -- Add the blog like to the BlogLike table
        INSERT INTO tblBlogLikes (BlogID, UserID)
        VALUES (@BlogID, @UserID);

        SET @Result = 0; -- Success
    END
    ELSE
    BEGIN
        SET @Result = 1; -- Blog with the given slug not found
    END
END
