export class Book {
    id?: number;
    title: string;
    author: string;

    constructor(data?: Partial<Book>) {
        this.id = data?.id || 0;
        this.title = data?.title || '';
        this.author = data?.author || '';
    }
}