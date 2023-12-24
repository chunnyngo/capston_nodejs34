"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileFilter = void 0;
const common_1 = require("@nestjs/common");
function uploadFileFilter(...mimetypes) {
    return (req, file, callback) => {
        if (!mimetypes.some((m) => file.mimetype.includes(m))) {
            callback(new common_1.UnsupportedMediaTypeException(`File type is not matching: ${mimetypes.join(', ')}`), false);
            return;
        }
        callback(null, true);
    };
}
exports.uploadFileFilter = uploadFileFilter;
//# sourceMappingURL=upload-file.filter.js.map