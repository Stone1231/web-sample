import Task from '../entity/Task';
import { ITask } from '../entity/Task';
import Store from '../app';

export interface ITaskOne {
        data: Task
}

export interface ITaskList {
        datas: Task[]
}

export interface IPageInfo {
        total: number,
        offset: number
}

export interface ITaskListResponse extends ITaskList, IPageInfo { }

export interface IParameters {
        offset?: number,
        limit?: number
}

export default class TaskService {
    constructor() {
    }

    // GET /tasks
    // 全件取得（offset, limitをパラメータに受け取ることも可能）
    static all(query: IParameters): Promise<ITaskListResponse> {

        return new Promise(async (resolve, reject) => {
            let tasks: Task[] | undefined;

            try {
                const conn = await Store.createConnection();
                // Taskテーブルから全件取得（offset、limitも指定可能）
                tasks = await conn.entityManager.find(Task, {
                    alias: 'task',
                    offset: query.offset || 0,
                    limit: query.limit || 100
                });

            } catch (err) {
                reject({ code: 500, message: err.message });

            }

            if (tasks) {
                resolve({
                    datas: tasks,
                    total: tasks.length,
                    offset: query.offset || 0
                });
            } else {
                reject({
                    code: 404,
                    message: 'タスクが見つかりませんでした'
                });
            }
        });
    }

    // GET /tasks/{id}
    // 指定したIDのタスクを取得する
    static get(id: number): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            let result: Task | undefined;

            try {
                const conn = await Store.createConnection();
                // ID指定で1件だけ取得
                result = await conn.entityManager.findOneById(Task, id);

            } catch (err) {
                reject({ code: 500, message: err.message });

            }

            if (result) {
                resolve({ data: result });
            } else {
                reject({
                    code: 404,
                    message: '指定IDのタスクが見つかりませんでした'
                })
            }
        });
    }

    // POST /tasks
    // タスクを登録する
    static add(param: ITask): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            let result: Task | undefined;

            const task = new Task();
            task.title = param.title;
            task.is_done = param.is_done || false;

            try {
                const conn = await Store.createConnection();
                // データの登録
                result = await conn.entityManager.persist(task);

            } catch (err) {
                reject({ code: 500, message: err.message });

            }

            resolve({ data: result });
        });
    }

    // PUT /tasks/{id}
    // 指定したIDのタスクを更新する
    static update(id: number, param: ITask): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            let result: Task | undefined;

            try {
                const conn = await Store.createConnection();
                const repository = await conn.getRepository(Task);
                // ID指定で1件だけ取得
                const task = await repository.findOneById(id) as Task;

                if (!task) {
                    reject({
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    })
                }

                // 内容を更新する
                task.title = param.title || task.title;
                //task.is_done = param.is_done || task.is_done;
                if(param.is_done !== undefined){
                    task.is_done = param.is_done;
                }
                //console.log(param.is_done);

                // 変更内容で更新する
                result = await repository.persist(task);

            } catch (err) {
                reject({ code: 500, message: err.message });

            }

            resolve({ data: result });
        });
    }

    // DELETE /tasks/{id}
    // 指定したIDのタスクを削除する
    static delete(id: number): Promise<ITaskOne> {
        return new Promise(async (resolve, reject) => {
            let result: Task | undefined;

            try {
                const conn = await Store.createConnection();
                const repository = await conn.getRepository(Task);
                // ID指定で1件だけ取得
                result = await repository.findOneById(id);

                if (!result) {
                    reject({
                        code: 404,
                        message: '指定IDのタスクが見つかりませんでした'
                    });
                }

                // データを削除する
                result = await repository.remove(result as Task);
            } catch (err) {
                reject({ code: 500, message: err.message });

            }

            resolve({ data: result });
        });
    }
}