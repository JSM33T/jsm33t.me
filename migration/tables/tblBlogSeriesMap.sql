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