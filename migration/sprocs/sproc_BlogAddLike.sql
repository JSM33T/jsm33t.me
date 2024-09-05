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

            SET @Result = 2; -- Like removed
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
