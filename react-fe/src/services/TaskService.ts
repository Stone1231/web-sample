

import "whatwg-fetch"

//import Row from "../models/TaskModel"
import { TaskModel } from '../models/TaskModel';

import {IListResponse, IOne} from '../models/BaseModel'
const url: string = 'http://localhost:8080/task';
export default class TaskService {

    constructor() {

        // (async () => {
        //     var list: ITaskListResponse = await this.getAll();
        //     console.log(list);

        //     var model = await this.get(2);
        //     console.log(model);

        //     var modelPost = await this.post();
        //     console.log(modelPost);

        //     var modelPut = await this.put(2);
        //     console.log(modelPut);

        //     var modelDel = await this.delete(4);
        //     console.log(modelDel);

        //     console.log('end');
        // })();

    }

    static async getAll(): Promise<IListResponse<TaskModel>> {
        const res = await fetch(url);
        //const json = await res.json();
        //return json as FreeGeoIP;
        //console.log(res);
        return res.json();
    }

    static async get(id: number): Promise<IOne<TaskModel>> {
        const res = await fetch(url + '/' + id);
        //const json = await res.json();
        //return json as FreeGeoIP;
        return res.json();
    }

    static async post(): Promise<IOne<TaskModel>> {
        let model: TaskModel = new TaskModel();
        model.id = 0;
        model.is_done = true;
        model.title = 'task_test';

        const res = await fetch(url,
            {
                method: "POST",
                body: JSON.stringify(model),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

        return res.json();
    }

    static async put(id: number): Promise<IOne<TaskModel>> {
        let model: TaskModel = new TaskModel();
        model.id = id;
        model.is_done = true;
        model.title = 'reTitle';

        const res = await fetch(url + '/' + id,
            {
                method: "PUT",
                body: JSON.stringify(model),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })

        return res.json();
    }

    static async delete(id: number): Promise<IOne<TaskModel>> {
        const res = await fetch(url + '/' + id,{
            method:"DELETE"
        });
        //const json = await res.json();
        //return json as FreeGeoIP;
        return res.json();
    }
}