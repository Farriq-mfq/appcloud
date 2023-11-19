"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var figlet = require("figlet");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
figlet.text("Setup admin appCloud", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
    var readline;
    return __generator(this, function (_a) {
        console.clear();
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return [2 /*return*/];
        }
        console.log(data);
        readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question("Pilih Menu \n1.Tambah admin\n2.Reset admin database\n3.Reset files database\nnomer : ", function (menu) {
            var menuInt = parseInt(menu);
            if (menuInt === 1) {
                console.clear();
                figlet.text("Tambah admin", function (err, data) {
                    console.log(data);
                    readline.question("Masukan username : ", function (username) {
                        readline.question("Masukan password : ", function (password) { return __awaiter(void 0, void 0, void 0, function () {
                            var createuser, _a, _b, e_1;
                            var _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (!(username.length > 0) && !(password.length > 0)) {
                                            console.warn('input tidak valid');
                                            process.exit();
                                        }
                                        _e.label = 1;
                                    case 1:
                                        _e.trys.push([1, 4, , 5]);
                                        _b = (_a = prisma.users).create;
                                        _c = {};
                                        _d = {
                                            username: username
                                        };
                                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, 10)];
                                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                                _d),
                                                _c)])];
                                    case 3:
                                        createuser = _e.sent();
                                        if (createuser) {
                                            console.info("\n\n===> berhasil membuat admin <===");
                                            process.exit();
                                        }
                                        process.exit();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_1 = _e.sent();
                                        console.warn('\n\n===> Terjadi kesalahan <===');
                                        process.exit();
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                });
            }
            else if (menuInt === 2) {
                console.clear();
                figlet.text("Reset admin", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                    var deleteAll, e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(data);
                                console.log("Loading...");
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["DELETE FROM users"], ["DELETE FROM users"])))];
                            case 2:
                                deleteAll = _a.sent();
                                if (deleteAll)
                                    console.log("Berhasil reset database admin");
                                process.exit();
                                return [3 /*break*/, 4];
                            case 3:
                                e_2 = _a.sent();
                                console.log("Gagal reset database admin");
                                process.exit();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
            else if (menuInt === 3) {
                console.clear();
                figlet.text("Reset files database", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                    var deleteAll, e_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(data);
                                console.log("Loading...");
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["DELETE FROM files"], ["DELETE FROM files"])))];
                            case 2:
                                deleteAll = _a.sent();
                                if (deleteAll)
                                    console.log("Berhasil reset files database");
                                process.exit();
                                return [3 /*break*/, 4];
                            case 3:
                                e_3 = _a.sent();
                                console.log("Gagal reset files database");
                                process.exit();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                console.log("menu tidak tersedia");
                process.exit();
            }
        });
        return [2 /*return*/];
    });
}); });
var templateObject_1, templateObject_2;
