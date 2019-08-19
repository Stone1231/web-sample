import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import TaskActions from '../actions/task-actions';

import TaskListComponent from '../components/task-list';
import TaskEditComponent from '../components/task-edit';

interface Props {
    dispatch?: Dispatch<Action<ApplicationRootState>>;
    tasks?: Array<ITask>;
    isSaving?: boolean;
    isLoading?: boolean;
    v_type?: number;
}

class TaskIndexComponent extends React.Component<Props, {}> {

    listV:JSX.Element;
    editV:JSX.Element;
    constructor(props: Props){
        super(props);
        this.listV = <TaskListComponent />;
        this.editV = <TaskEditComponent />;
    }

    componentDidMount() {
        //this.props.dispatch(TaskActions.loadTasksAsync());
    };

    createView = (): JSX.Element => {
        switch (this.props.v_type) {
            case 1:
                return this.editV;
            default:
                return this.listV;
                //return <TaskListComponent/>;
        }
    };

    render() {
        return (
            <div>
                {this.createView()}
            </div>
            // <div>
            //     <div style={{display:this.props.v_type==0 ? 'block' : 'none' }}><TaskListComponent /></div>
            //     <div style={{display:this.props.v_type==1 ? 'block' : 'none'}}><TaskEditComponent /></div>
            // </div>
        )
    }
}

function mapStateToProps(state: ApplicationRootState, props: Props): Props {
    return {
        tasks: state.taskState.tasks,
        isSaving: state.taskState.isSaving,
        isLoading: state.taskState.isLoading,
        v_type:state.taskState.v_type
    };
}

const TaskIndexComponentContainer = connect(mapStateToProps)(TaskIndexComponent);

export default TaskIndexComponentContainer;

