import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import TaskActions from '../actions/task-actions';

export interface Props {
    dispatch?: Dispatch<Action<ApplicationRootState>>;
    tasks?: Array<ITask>;
    isLoading?: boolean;
}

class TaskListComponent extends React.Component<Props, {}> {
    // constructor(p:Props) {
    //     super(p);
    // }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.loadTasksAsync());
        }        
    };

    add = () => {
        // var task: ITask = {
        //     title: "",
        //     is_done:false
        // }
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.TaskAdd() as any);
        }        
    };

    read = (id: number) => {
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.loadTaskAsync(id) as any);
        }        
    }

    delete = (id: number) => {
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.deleteTaskAsync(id) as any);
        }        
    }

    render() {
        return (
            <div>
                <button onClick={this.add}>Create</button>
                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>bool</th>
                            <th>edit</th>
                            <th>del</th>
                        </tr>
                        {this.props.tasks && this.props.tasks.map((item, i) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.is_done}</td>
                                <td>
                                    <button onClick={
                                        (e) => {
                                            this.read(item.id);
                                        }
                                    }>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={
                                        (e) => {
                                            this.delete(item.id);
                                        }
                                    }>
                                        Del
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {this.props.isLoading &&
                    <strong><i>&nbsp;&nbsp;&nbsp;loading contacts, please wait...</i></strong>
                }
            </div>
        )
    }
}

function mapStateToProps(state: ApplicationRootState, props: Props): Props {
    return {
        // dispatch: props.dispatch,
        tasks: state.taskState.tasks,
        isLoading: state.taskState.isLoading
    };
}

const TaskListComponentContainer = connect(mapStateToProps)(TaskListComponent);

export default TaskListComponentContainer;