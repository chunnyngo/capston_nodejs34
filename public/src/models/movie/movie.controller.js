"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const config_1 = require("@nestjs/config");
const movie_dto_1 = require("./movie-dto/movie.dto");
const upload_dto_1 = require("../../dto/upload.dto");
const user_dto_1 = require("../user/dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const common_dto_1 = require("../../dto/common.dto");
const multer_1 = require("multer");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const role_guard_1 = require("../../common/guards/role.guard");
const upload_file_filter_1 = require("../../common/exceptions/upload-file.filter");
let MovieController = class MovieController {
    constructor(movieService, configService) {
        this.movieService = movieService;
        this.configService = configService;
    }
    async getBanner() {
        return this.movieService.getBanner();
    }
    async getMovieInfo(maPhim) {
        return this.movieService.getMovieInfo(maPhim);
    }
    async getMovieList(tenPhim) {
        return await this.movieService.getMovieList(tenPhim);
    }
    async getMoviePagination(query) {
        return await this.movieService.getMoviePagination(query);
    }
    uploadImage(maPhim, req, file) {
        const filelimit = Number(this.configService.get('MOVIE_FILE_LIMIT'));
        if (file.size > filelimit * 1024 * 1024) {
            fs_1.default.unlinkSync(process.cwd() + '/' + this.configService.get('MOVIE_URL') + '/' + file.filename);
            throw new common_1.PayloadTooLargeException('File too larges');
        }
        return this.movieService.uploadImage(req, maPhim, file.fieldname);
    }
    async createMovie(movieInfo) {
        return await this.movieService.creatMovie(movieInfo);
    }
    async updateMovie(updateInfo) {
        return await this.movieService.updatemovie(updateInfo);
    }
    async deleteMovie(maPhim) {
        return await this.movieService.deleteMovie(maPhim);
    }
};
__decorate([
    (0, common_1.Get)('layDanhSachBanner'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getBanner", null);
__decorate([
    (0, common_1.Get)('layThongTinPhim/:maPhim'),
    __param(0, (0, common_1.Param)('maPhim', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieInfo", null);
__decorate([
    (0, common_1.Get)('layDanhSachPhim'),
    (0, swagger_1.ApiQuery)({ name: 'tenPhim', required: false }),
    __param(0, (0, common_1.Query)('tenPhim', new common_1.DefaultValuePipe(''))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieList", null);
__decorate([
    (0, common_1.Get)('layDanhSachPhimPhanTrang'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationMovieQuery]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMoviePagination", null);
__decorate([
    (0, common_1.Post)('upload/:maPhim'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Movie Image',
        type: upload_dto_1.FileUploadDto,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('movie', {
        fileFilter: (0, upload_file_filter_1.uploadFileFilter)('jpg', 'jpeg', 'png', 'webp'),
        storage: (0, multer_1.diskStorage)({
            destination: process.env.MOVIE_URL,
            filename(req, file, callback) {
                callback(null, Date.now() + '_' + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('maPhim', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('ThemPhim'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Put)('CapNhatPhim'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)('XoaPhim/:maPhim'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Param)('maPhim', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovie", null);
MovieController = __decorate([
    (0, common_1.Controller)('QuanLyPhim'),
    (0, swagger_1.ApiTags)('Quản lý phim'),
    __metadata("design:paramtypes", [movie_service_1.MovieService,
        config_1.ConfigService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map