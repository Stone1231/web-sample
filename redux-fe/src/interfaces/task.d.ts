// declare type actionTypes = ILoadContactAction | ISaveContactAction | Action;

// declare type composeWithDevTools = any;

interface Action {
    type: string;
}

interface ILoadTasksAction extends Action {
    tasks: Array<ITask>;
}

interface ILoadTaskAction extends Action {
    task: ITask;
}

interface ISaveTaskAction extends Action {
    tasks: Array<ITask>;
}

interface ITask {
    id: number;
    title: string;
    is_done: boolean;
}

interface ApplicationRootState {
    taskState: TaskState;
}

interface TaskState {
    tasks: Array<ITask>;
    task: ITask;
    isSaving: boolean;
    isLoading: boolean;
    v_type:number;
}

