import * as React from 'react'

import TaskInput from './TaskInput'

import { IListResponse, IOne } from '../models/BaseModel'
import { TaskModel } from '../models/TaskModel';

export interface States {

}

export interface Props {
  list: Array<TaskModel>;
}

class TaskList extends React.Component<Props, States> {

  render() {
    return (
      <div className='wrapper'>
        Hello TaskList
          <TaskInput />
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>bool</th>
              <th>edit</th>
              <th>del</th>
            </tr>
            {this.props.list.map((item, i) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.is_done}</td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>


      </div>
    )
  }

}

export default TaskList