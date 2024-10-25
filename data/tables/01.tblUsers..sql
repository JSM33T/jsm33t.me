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
    
    Bio			    NVARCHAR(512)		NOT NULL DEFAULT('Hey there'),

	Avatar			NVARCHAR(256)		NOT NULL DEFAULT 'default',

    [Role]			NVARCHAR(64)		NOT NULL DEFAULT 'member',
	
	GoogleId		NVARCHAR(128)		NULL,

	[Password]		NVARCHAR(128)		NULL,

	[Key]			UNIQUEIDENTIFIER	NOT NULL  DEFAULT NEWID(),

    OTP             NVARCHAR(6)         NOT NULL,
	
	OTPDate			DATETIME			NOT NULL DEFAULT GETDATE(),

	IsActive		BIT					NOT NULL DEFAULT 1,

	IsVerified		BIT					NOT NULL DEFAULT 0,

	ExpPoints		INT					NOT NULL DEFAULT 1000,

	TimeSpent		INT					NOT NULL DEFAULT 300,

    DateAdded       DATETIME			NOT NULL DEFAULT GETDATE(),

	DateEdited      DATETIME			NOT NULL DEFAULT GETDATE(),

    CreationMode    NVARCHAR(64)        NOT NULL DEFAULT 'email'

	-----------------------
	--   CONSTRAINTS   ----
	---------------------

    CONSTRAINT      PK_UserTable PRIMARY KEY (Id),

    CONSTRAINT      UQ_User_Username UNIQUE (Username),
	
	CONSTRAINT      UQ_User_Email UNIQUE (Email)
);
