export interface Dashboard {
    payment: { name: string; value: number }[];
    totalComics: { name: string; value: number };
    totalViews: { name: string; value: number };
    totalUsers: { name: string; value: number };
}
