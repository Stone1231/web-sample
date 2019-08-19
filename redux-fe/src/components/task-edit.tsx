import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
// import * as $ from "jquery";
import TaskActions from '../actions/task-actions';

interface Props {
    dispatch?: Dispatch<Action<ApplicationRootState>>;
    task?: ITask;
    isSaving?: boolean;
}

class TaskEditComponent extends React.Component<Props, {}> {
    title?: string;
    is_done?: boolean;

    constructor(props: Props) {
        super(props);
        if(this.props.task){
            this.title = this.props.task.title;
            this.is_done = this.props.task.is_done;
        }
    }

    back = () => {
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.TaskBack() as any);
        }        
    };

    save = () => {
        var task: ITask = {
            id: this.props.task ? this.props.task.id : 0,
            title: this.title ? this.title : "",
            is_done: this.is_done? this.is_done : false
        }
        if(this.props.dispatch){
            this.props.dispatch(TaskActions.saveTaskAsync(task) as any);
        }        
    };

    render() {
        return (
            <div>
                {this.props.task && this.props.task.id > 0 &&
                    <div>
                        id:{this.props.task.id} <br/>
                    </div>
                }

                title:
                <input
                    defaultValue={this.title}
                    type='text'
                    onChange={(e) => {
                        this.title = e.target.value;
                        //this.props.task.title = e.target.value;
                    }}
                />
                <br />
                is done:
                <input
                    type='checkbox'
                    value='is done'
                    defaultChecked = {this.is_done}
                    onChange={(e) => {
                        this.is_done = e.target.checked;
                    }}
                />
                <br/>
                <button onClick={this.save}>Save</button>
                <button onClick={this.back}>Back</button>
                {this.props.isSaving &&
                    <strong><i>&nbsp;&nbsp;&nbsp;saving, please wait...</i></strong>
                }
            </div>
        )
    }
}

function mapStateToProps(state: ApplicationRootState, props: Props): Props {
    return {
        // dispatch: props.dispatch,
        task: state.taskState.task,
        isSaving: state.taskState.isSaving
    };
}

const TaskEditComponentContainer = connect(mapStateToProps)(TaskEditComponent);

export default TaskEditComponentContainer;