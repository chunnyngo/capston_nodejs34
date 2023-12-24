"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileUrl = void 0;
const getFileUrl = (req, dir, filename) => {
    const url = req.protocol + "/" + req.get('host') + dir + "/" + filename;
    return url;
};
exports.getFileUrl = getFileUrl;
//# sourceMappingURL=utils.js.map