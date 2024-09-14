CREATE TABLE [dbo].[tblBlogCommentReplies]
(
    Id				INT,

	CommentId		INT	            NOT NULL,

    UserId          INT             NOT NULL,

    Reply           NVARCHAR(MAX)    NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),

    DateEdited		DATETIME		NOT NULL	DEFAULT GETDATE(),


    CONSTRAINT PK_tblBlogCommentReplies PRIMARY KEY (Id),

    CONSTRAINT FK_tblBlogCommentReplies_CommentId FOREIGN KEY (CommentId) REFERENCES tblBlogComments(Id),

    CONSTRAINT FK_BlogCommentReplies_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
);