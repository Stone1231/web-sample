import * as CONST from "../interfaces/task-strings"

function init(): TaskState {
    return {
        tasks: [],
        task: { id: 0, title: "", is_done: false },
        isSaving: false,
        isLoading: false,
        v_type: 0
    }
}

export const TaskReducer = (state: TaskState = init(), action: actionTypes): TaskState => {
    switch (action.type) {
        case CONST.LOAD_TASKS_INPROGRESS:
            return { ...state, isLoading: true };
        //return ObjectAssign({} as ContactState, state, { isLoading: true });

        case CONST.LOAD_TASKS_SUCCESS:
            let tasksAct: ILoadTasksAction = action as ILoadTasksAction;
            
            return {
                ...state,
                tasks: tasksAct.tasks,
                isLoading: false
            };
        //return ObjectAssign({} as ContactState, state, { contacts: merged, isLoading: false });

        case CONST.LOAD_TASK_SUCCESS:
            let taskAct: ILoadTaskAction = action as ILoadTaskAction;
            
            return {
                ...state,
                task: taskAct.task,
                isSaving: false,
                v_type: 1
            };

        case CONST.SAVE_TASK_INPROGRESS:
            return { ...state, isSaving: true };
        //return ObjectAssign({} as ContactState, state, { isSaving: true });

        case CONST.SAVE_TASK_SUCCESS:
            var saveAct: ISaveTaskAction = action as ISaveTaskAction;
            return {
                ...state,
                tasks: saveAct.tasks,
                isSaving: false,
                v_type: 0
            };
        //return ObjectAssign({} as ContactState, state, { contacts: [...state.contacts, saveAct.contact], isSaving: false });
        case CONST.TASK_ADD:
            return {
                ...state,
                task: init().task,
                v_type: 1
            };
        case CONST.TASK_BACK:
            return {
                ...state,
                v_type: 0
            };
        case CONST.TASK_EDIT:
            return {
                ...state,
                task: init().task,
                v_type: 1
            };
        default:
            return state;
    }
}

export default TaskReducer;
