import TaskService from '../services/TaskService'
import { IListResponse, IOne } from '../models/BaseModel'

export default class FetchTest {
    constructor() {

        (async () => {
            var list = await TaskService.getAll();
            console.log(list);

            var model = await TaskService.get(2);
            console.log(model);

            var modelPost = await TaskService.post();
            console.log(modelPost);

            var modelPut = await TaskService.put(2);
            console.log(modelPut);

            var modelDel = await TaskService.delete(4);
            console.log(modelDel);

            console.log('end');
        })();
    }
}

var obj = new FetchTest();