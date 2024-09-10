CREATE TABLE [dbo].[tblBlogCategories]
(
    Id				INT 	PRIMARY KEY,

    CategoryName	NVARCHAR(128)	NOT NULL,

	Slug			NVARCHAR(128) NOT NULL,

	Priority		INT, 
	NOT NULL,
					DEFAULT(10)

    DateAdded		DATETIME 
					NOT NULL 
					DEFAULT GETDATE(),
);