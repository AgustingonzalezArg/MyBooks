export interface IntBook {
    _id?: string;
    idUser: string;
    title: string;
    state: string;
    rating?: number;
    review?: string;
    author: string;
    pages: number;
    readPages?: number;

}