CREATE TABLE [dbo].[tblBlogLikes]
(
    Id				INT,

    BlogId		    INT	            NOT NULL,

	UserId			INT	            NOT NULL,

    Priority        INT             DEFAULT(1)

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),


    CONSTRAINT PK_tblBlogLikes PRIMARY KEY (Id)

    CONSTRAINT FK_BlogLikes_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogLikes_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
);