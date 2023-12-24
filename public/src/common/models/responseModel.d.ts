export declare class PagiRes<T> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    items: Array<T>;
    constructor(resItems: Partial<PagiRes<T>>);
    res(): {
        currentPage: number;
        itemsOnThisPage: number;
        totalPages: number;
        totalItems: number;
        items: T[];
    };
}
