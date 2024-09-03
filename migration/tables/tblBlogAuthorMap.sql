CREATE TABLE [dbo].[tblBlogAuthorMap]
(
    Id          INT     NOT NULL,

    BlogId      INT     NOT NULL,

    UserId      INT     NOT NULL,
    
    CONSTRAINT FK_BlogAuthorMap_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogAuthorMap_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),

    CONSTRAINT PK_BlogAuthorMap PRIMARY KEY (Id)
);