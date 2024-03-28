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
