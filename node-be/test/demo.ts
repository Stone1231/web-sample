import Service from '../services/TaskService';

import Row from '../entity/Task';

 async function demo() {
    // GET /tasks
    const getAll = await Service.all({ offset: 0, limit: 10 });
    console.log(getAll);
 
    // POST /tasks
    const post = await Service.add({ title: 'test', id:1 });
    console.log(post);

    // POST /tasks
    var row:Row = new Row();
    row.id=0;
    row.is_done = true;
    row.title='modelTest';
    const postModel = await Service.add(row);
    console.log(postModel);

    // GET /tasks/{id}
    const getById = await Service.get(1);
    console.log(getById);
 
    // PUT /tasks/{id}
    const put = await Service.update(1, { title: 'updated', is_done: true, id:1 });
    console.log(put);
 
    // DELETE /tasks/{id}
    const deleteById = await Service.delete(1);
    console.log(deleteById);

    return null;
}
 
// 実行
demo();