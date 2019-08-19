import * as CONST from "../interfaces/task-strings";
import { Dispatch, Action } from 'redux';
import 'whatwg-fetch';

import { IListResponse, IOne } from '../interfaces/base';

export default class TaskActions {

    constructor() {

    }

    static url: string = 'http://localhost:8080/task';

    static async getAll(): Promise<IListResponse<ITask>> {
        const res = await fetch(this.url);
        return res.json();
    }

    static async get(id: number): Promise<IOne<ITask>> {
        const res = await fetch(this.url + '/' + id);
        return res.json();
    }

    static async post(model: ITask): Promise<IOne<ITask>> {
        const res = await fetch(this.url,
            {
                method: "POST",
                body: JSON.stringify(model),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

        return res.json();
    }

    static async put(model: ITask): Promise<IOne<ITask>> {
        const res = await fetch(this.url + '/' + model.id,
            {
                method: "PUT",
                body: JSON.stringify(model),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
        return res.json();
    }

    static async delete(id: number): Promise<IOne<ITask>> {
        const res = await fetch(this.url + '/' + id, {
            method: "DELETE"
        });

        return res.json();
    }

    public static loadTasksSuccess(tasks: Array<ITask>): ILoadTasksAction {
        var action: ILoadTasksAction = {
            type: CONST.LOAD_TASKS_SUCCESS,
            tasks: tasks
        };

        return action;
    }

    public static loadTasksInProgress(): Action {
        var action: Action = {
            type: CONST.LOAD_TASKS_INPROGRESS
        };

        return action;
    }

    public static loadTasksAsync(): Promise<Array<ITask>> | any {
        return ((dispatch: Dispatch) => {
            dispatch(TaskActions.loadTasksInProgress());
            return new Promise<Array<ITask>>(async (resolve, reject) => {

                let res = await this.getAll();

                //var tmp: Array<ITask> = res.datas;
                console.log(res.datas);
                resolve(res.datas);
            }).then((values: Array<ITask>) => {
                dispatch(TaskActions.loadTasksSuccess(values));
            });;
        });
    }

    public static loadTaskSuccess(task: ITask): ILoadTaskAction {
        var action: ILoadTaskAction = {
            type: CONST.LOAD_TASK_SUCCESS,
            task: task
        };

        return action;
    }

    public static loadTaskAsync(id: number): Promise<ITask> | any {
        return ((dispatch: Dispatch) => {

            return new Promise<ITask>(async (resolve, reject) => {
                let res = await this.get(id);
                resolve(res.data);
            }).then((value: ITask) => {
                dispatch(TaskActions.loadTaskSuccess(value));
            });
        });
    }

    public static saveTaskSuccess(tasks: Array<ITask>): ISaveTaskAction {
        var action: ISaveTaskAction = {
            type: CONST.SAVE_TASK_SUCCESS,
            tasks: tasks
        };

        return action;
    }

    public static saveTaskInProgress(): Action {
        var action: Action = {
            type: CONST.SAVE_TASK_INPROGRESS
        }

        return action;
    }

    /*  
        http://redux.js.org/docs/advanced/AsyncActions.html
        http://www.datchley.name/es6-promises/
    */
    public static saveTaskAsync(task: ITask): Promise<Array<ITask>> | any {
        return ((dispatch: Dispatch) => {
            dispatch(TaskActions.saveTaskInProgress());

            return new Promise<Array<ITask>>(async (resolve, reject) => {

                let res: IListResponse<ITask>;
                if (task.id > 0) {
                    res = await this.put(task).then(() => {
                        return this.getAll();
                    });
                }
                else {
                    res = await this.post(task).then(() => {
                        return this.getAll();
                    });
                }
                //console.log(task);
                resolve(res.datas);
            }).then((value: Array<ITask>) => {
                dispatch(TaskActions.saveTaskSuccess(value));
            });
        });
    }

    public static deleteTaskAsync(id: number): Promise<Array<ITask>> | any {
        return ((dispatch: Dispatch) => {
            dispatch(TaskActions.saveTaskInProgress());

            return new Promise<Array<ITask>>(async (resolve, reject) => {

                let res: IListResponse<ITask>;

                res = await this.delete(id).then(() => {
                    return this.getAll();
                });

                //console.log(task);
                resolve(res.datas);
            }).then((value: Array<ITask>) => {
                dispatch(TaskActions.saveTaskSuccess(value));
            });
        });
    }

    public static TaskAdd(): Action {
        var action: Action = {
            type: CONST.TASK_ADD
        }

        return action;
    }

    public static TaskBack(): Action {
        var action: Action = {
            type: CONST.TASK_BACK
        }

        return action;
    }
}