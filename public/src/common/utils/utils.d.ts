import { Request } from "express";
export declare const getFileUrl: (req: Request, dir: string, filename: string) => string;
type OmitT<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PatialBy<T, K extends keyof T> = OmitT<T, K> & Partial<Pick<T, K>>;
export {};
