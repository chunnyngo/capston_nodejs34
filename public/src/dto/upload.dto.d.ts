export interface InterfaceUploadFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
export declare class FileUploadDto {
    movie: {
        type: 'string';
        format: 'binary';
    };
}
