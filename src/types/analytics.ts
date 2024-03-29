export interface Analytics {
    userId: string;
    username: string;
    totalViewComic: number;
    totalViewChapter: number;
}

export interface AnalyticsData {
    data: Analytics[];
    currentPage: number;
    totalPage: number;
}

export interface AnalyticsDetail {
    userId: string;
    username: string;
    comicName: number;
    chapterName: number;
    createTime: Date;
}

export interface AnalyticsDetailData {
    data: AnalyticsDetail[];
    currentPage: number;
    totalPage: number;
}
