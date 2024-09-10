CREATE TABLE [dbo].[tblBlogComments]
(
    Id				INT,

    BlogId		    INT	            NOT NULL,

	UserId			INT	            NOT NULL,

    Comment         NVARCHAR(MAX)    NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),

    DateEdited		DATETIME		NOT NULL	DEFAULT GETDATE(),


    CONSTRAINT PK_tblBlogComments PRIMARY KEY (Id)

    CONSTRAINT FK_BlogComments_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogComments_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
);