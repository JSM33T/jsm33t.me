CREATE TABLE [dbo].[tblUsers]
(
	---------------------
	--		PROPS      --
	---------------------

    Id              INT					NOT NULL,

    FirstName		NVARCHAR(256)		NOT NULL,

	LastName		NVARCHAR(256)		NOT NULL DEFAULT '',

	Username        NVARCHAR(128)		NOT NULL,

	Email			NVARCHAR(256)		NOT NULL,

	Avatar			NVARCHAR(256)		NOT NULL DEFAULT 'default',

    [Role]			NVARCHAR(64)		NOT NULL DEFAULT 'member',
	
	GoogleId		NVARCHAR(128)		NULL,

	[Password]		NVARCHAR(128)		NULL,

	[Key]			UNIQUEIDENTIFIER	NOT NULL  DEFAULT NEWID(),

    OTP             NVARCHAR(6)         NOT NULL,

	IsActive		BIT					NOT NULL DEFAULT 1,

	IsVerified		BIT					NOT NULL DEFAULT 0,

	ExpPoints		INT					NOT NULL DEFAULT 1000,

	TimeSpent		INT					NOT NULL DEFAULT 300,

    DateAdded       DATETIME			NOT NULL DEFAULT GETDATE(),

	DateEdited      DATETIME			NOT NULL DEFAULT GETDATE(),

	---------------------
	--   CONSTRAINTS   --
	---------------------

    CONSTRAINT      PK_UserTable PRIMARY KEY (Id),

    CONSTRAINT      UQ_User_Username UNIQUE (Username),
	CONSTRAINT      UQ_User_Email UNIQUE (Email)
);
GO

CREATE TABLE [dbo].[tblMessages]
(
	---------------------
	--		PROPS      --
	---------------------
    Id              INT				NOT NULL,

    Content			NVARCHAR(512)	NOT NULL,

	[Name]          NVARCHAR(128)	NOT NULL	DEFAULT 'anonymous',

	Email			NVARCHAR(128)	NOT NULL	DEFAULT 'na',

    Topic           NVARCHAR(128)	NOT NULL	DEFAULT 'general',

    Origin          NVARCHAR(256)	NOT NULL	DEFAULT '/',

    DateAdded       DATETIME		NOT NULL	DEFAULT GETDATE(),

	---------------------
	--   CONSTRAINTS   --
	---------------------

    CONSTRAINT      PK_MessageTable		PRIMARY KEY (Id),

    CONSTRAINT      UQ_MessageContent	UNIQUE (Content)
);
GO

CREATE TABLE [dbo].[tblBlogCategories]
(
    Id				INT 
					PRIMARY KEY,

    CategoryName	NVARCHAR(128)
					NOT NULL,

	Slug			NVARCHAR(128)
					NOT NULL,

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);
GO

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
GO

CREATE TABLE [dbo].[tblBlogAuthorMap]
(
    Id          INT     NOT NULL,

    BlogId      INT     NOT NULL,

    UserId      INT     NOT NULL,
    
    CONSTRAINT FK_BlogAuthorMap_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogAuthorMap_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),

    CONSTRAINT PK_BlogAuthorMap PRIMARY KEY (Id)
);
GO

CREATE TABLE [dbo].[tblBlogLikes]
(
    Id				INT				PRIMARY KEY,

    BlogId		    INT	            NOT NULL,

	UserId			INT	            NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),

    CONSTRAINT FK_BlogLikes_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),
    CONSTRAINT FK_BlogLikes_UserId FOREIGN KEY (UserId) REFERENCES tblUsers(Id),
);
GO

CREATE TABLE [dbo].[tblBlogSeries]
(
    Id				INT				PRIMARY KEY,

    SeriesName		NVARCHAR(128)	NOT NULL,

	Slug			NVARCHAR(128)	NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),
);
GO

CREATE TABLE [dbo].[tblBlogSeriesMap]
(
    Id          INT     NOT NULL,

    BlogId      INT     NOT NULL,

    SeriesId    INT     NOT NULL,
    
    CONSTRAINT FK_BlogSeriesMap_BlogId FOREIGN KEY (BlogId) REFERENCES tblBlogs(Id),

    CONSTRAINT FK_BlogSeriesMap_UserId FOREIGN KEY (SeriesId) REFERENCES tblBlogSeries(Id),

    CONSTRAINT PK_BlogSeriesMap PRIMARY KEY (Id)
);
GO