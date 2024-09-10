CREATE TABLE [dbo].[tblBlogLikes]
(
    Id				INT				PRIMARY KEY,

    BlogId		    INT	            NOT NULL,

	UserId			INT	            NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),

    CONSTRAINT FK_BlogLikes_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),
    CONSTRAINT FK_BlogLikes_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
);