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
