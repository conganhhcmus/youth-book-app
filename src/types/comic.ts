export interface ComicBase {
    id: string;
    title: string;
    thumbnail: string;
    latest_chapter: {
        id: string;
        name: string;
        updated_at: Date;
    }[];
    genres: {
        id: string;
        name: string;
    }[];
    authors: string;
}

export interface Comic extends ComicBase {
    other_name: string[];
    short_description: string;
    total_views: number;
}

export interface ComicData {
    data: Comic[];
    currentPage: number;
    totalPage: number;
}

export interface ComicBaseData {
    data: ComicBase[];
    currentPage: number;
    totalPage: number;
}
