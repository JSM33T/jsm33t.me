CREATE TABLE [dbo].[tblBlogSeries]
(
    Id				INT				PRIMARY KEY,

    SeriesName		NVARCHAR(128)	NOT NULL,

	Slug			NVARCHAR(128)	NOT NULL,

    DateAdded		DATETIME		NOT NULL	DEFAULT GETDATE(),
);