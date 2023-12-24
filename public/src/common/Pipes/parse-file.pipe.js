"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseFile = void 0;
const common_1 = require("@nestjs/common");
let ParseFile = class ParseFile {
    transform(files, metadata) {
        if (files === undefined || files === null) {
            throw new common_1.BadRequestException('Validation failed (file expected)');
        }
        if (Array.isArray(files) && files.length === 0) {
            throw new common_1.BadRequestException('Validation failed (files expected)');
        }
        return files;
    }
};
ParseFile = __decorate([
    (0, common_1.Injectable)()
], ParseFile);
exports.ParseFile = ParseFile;
//# sourceMappingURL=parse-file.pipe.js.map