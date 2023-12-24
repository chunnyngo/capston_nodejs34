"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagiRes = void 0;
class PagiRes {
    constructor(resItems) {
        Object.assign(this, resItems);
    }
    res() {
        return {
            currentPage: this.currentPage,
            itemsOnThisPage: this.items.length,
            totalPages: Math.ceil(this.totalItems / this.itemsPerPage),
            totalItems: this.totalItems,
            items: this.items,
        };
    }
}
exports.PagiRes = PagiRes;
//# sourceMappingURL=responseModel.js.map