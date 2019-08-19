"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var Task_1 = require("../entity/Task");
var app_1 = require("../app");
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    // GET /tasks
    // 全件取得（offset, limitをパラメータに受け取ることも可能）
    TaskService.all = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var tasks, conn, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_1.default.createConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.entityManager.find(Task_1.default, {
                                alias: 'task',
                                offset: query.offset || 0,
                                limit: query.limit || 100
                            })];
                    case 2:
                        // Taskテーブルから全件取得（offset、limitも指定可能）
                        tasks = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        reject({ code: 500, message: err_1.message });
                        return [3 /*break*/, 4];
                    case 4:
                        if (tasks) {
                            resolve({
                                datas: tasks,
                                total: tasks.length,
                                offset: query.offset || 0
                            });
                        }
                        else {
                            reject({
                                code: 404,
                                message: 'タスクが見つかりませんでした'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // GET /tasks/{id}
    // 指定したIDのタスクを取得する
    TaskService.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, conn, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, app_1.default.createConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.entityManager.findOneById(Task_1.default, id)];
                    case 2:
                        // ID指定で1件だけ取得
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        reject({ code: 500, message: err_2.message });
                        return [3 /*break*/, 4];
                    case 4:
                        if (result) {
                            resolve({ data: result });
                        }
                        else {
                            reject({
                                code: 404,
                                message: '指定IDのタスクが見つかりませんでした'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // POST /tasks
    // タスクを登録する
    TaskService.add = function (param) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, task, conn, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        task = new Task_1.default();
                        task.title = param.title;
                        task.is_done = param.is_done || false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, app_1.default.createConnection()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.entityManager.persist(task)];
                    case 3:
                        // データの登録
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        reject({ code: 500, message: err_3.message });
                        return [3 /*break*/, 5];
                    case 5:
                        resolve({ data: result });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // PUT /tasks/{id}
    // 指定したIDのタスクを更新する
    TaskService.update = function (id, param) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, conn, repository, task, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, app_1.default.createConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.getRepository(Task_1.default)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.findOneById(id)];
                    case 3:
                        task = _a.sent();
                        if (!task) {
                            reject({
                                code: 404,
                                message: '指定IDのタスクが見つかりませんでした'
                            });
                        }
                        // 内容を更新する
                        task.title = param.title || task.title;
                        //task.is_done = param.is_done || task.is_done;
                        if (param.is_done !== undefined) {
                            task.is_done = param.is_done;
                        }
                        return [4 /*yield*/, repository.persist(task)];
                    case 4:
                        //console.log(param.is_done);
                        // 変更内容で更新する
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        reject({ code: 500, message: err_4.message });
                        return [3 /*break*/, 6];
                    case 6:
                        resolve({ data: result });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // DELETE /tasks/{id}
    // 指定したIDのタスクを削除する
    TaskService.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var result, conn, repository, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, app_1.default.createConnection()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.getRepository(Task_1.default)];
                    case 2:
                        repository = _a.sent();
                        return [4 /*yield*/, repository.findOneById(id)];
                    case 3:
                        // ID指定で1件だけ取得
                        result = _a.sent();
                        if (!result) {
                            reject({
                                code: 404,
                                message: '指定IDのタスクが見つかりませんでした'
                            });
                        }
                        return [4 /*yield*/, repository.remove(result)];
                    case 4:
                        // データを削除する
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_5 = _a.sent();
                        reject({ code: 500, message: err_5.message });
                        return [3 /*break*/, 6];
                    case 6:
                        resolve({ data: result });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return TaskService;
}());
exports.default = TaskService;
//# sourceMappingURL=TaskService.js.map