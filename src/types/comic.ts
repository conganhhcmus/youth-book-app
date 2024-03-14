export interface ComicBase {
    _id: string;
    name: string;
    thumbnail: string;
    recommend: boolean;
    status: number;
    chapters: {
        id: string;
        name: string;
        updateTime: Date;
        createTime: Date;
    }[];
    genres: {
        _id: string;
        name: string;
    }[];
    author: string;
}

export interface Comic extends ComicBase {
    otherName: string[];
    description: string;
    totalViews: number;
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

export interface ComicModel {
    name: string;
    description: string;
    thumbnail: string;
    recommend: boolean;
    otherName: string[];
    follower: number;
    genres: string[];
    status: number;
    totalViews: number;
    author: string;
    createTime: Date;
    createBy: string;
}

export interface Chapter {
    _id: string;
    comicId: string;
    name: string;
    type: number;
    content: string;
    price: number;
    updateTime: Date;
    createTime: Date;
}

export interface ChapterData {
    data: Chapter[];
    currentPage: number;
    totalPage: number;
}

export interface ChapterModel {
    comicId: string;
    name: string;
    type: number;
    content: string;
    price: number;
    updateTime: Date;
    createTime: Date;
}

export interface Genres {
    _id: string;
    name: string;
    updateTime: Date;
    createTime: Date;
    createBy: string;
}

export interface GenresModel {
    name: string;
    updateTime: Date;
    createTime: Date;
    createBy: string;
}

export interface GenresData {
    data: Genres[];
    currentPage: number;
    totalPage: number;
}
