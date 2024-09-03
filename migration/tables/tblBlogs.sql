CREATE TABLE [dbo].[tblBlogs]
(
    Id              INT				PRIMARY KEY,

    BlogName		NVARCHAR(256)   NOT NULL,

	[Description]	NVARCHAR(512)	NOT NULL,

    Slug            NVARCHAR(128)   NOT NULL,

    Tags            NVARCHAR(128)   NOT NULL,

    CategoryId      INT             NOT NULL    FOREIGN KEY REFERENCES tblBlogCategories(Id),

    DateAdded       DATETIME        NOT NULL    DEFAULT GETDATE(),

    IsActive        BIT             NOT NULL    DEFAULT 1
);

go