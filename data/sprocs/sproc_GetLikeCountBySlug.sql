-- =============================================
-- Author:			JSM33T
-- Create date:		2024-09-18
-- Description:		Gets like count by blog slug
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sproc_GetLikeCountBySlug]
	@Slug     NVARCHAR(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	COUNT(*) as LikeCount 
	FROM	tblBlogLikes L, tblBlogs B 
	WHERE	B.Slug = @Slug 
			AND L.BlogId = B.Id

END
