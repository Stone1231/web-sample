import * as React from 'react'
import TaskList from './TaskList'
import TaskService from '../services/TaskService'
import { TaskModel } from '../models/TaskModel';
import { IListResponse, IOne } from '../models/BaseModel'

export interface States {
  list: Array<TaskModel>;
}

class TaskApp extends React.Component<{}, States> {

  constructor({}, s:States) {
    super({}, s)

    this.state = {list:new Array<TaskModel>()};

    (async () => {
      var res =  await TaskService.getAll();

      //console.log(res.datas);

      // this.state = {
      //   list: res.datas as Array<TaskModel>
      // }

      this.setState({
        list: res.datas
      });

      console.log(this.state.list);

    })();
  }

  render() {
    return (
      <div className='wrapper'>
        Hello TaskApp
          <TaskList list={this.state.list} />
      </div>
    )
  }

}

export default TaskApp