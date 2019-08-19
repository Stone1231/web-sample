import { combineReducers } from 'redux';
import ContactActions from '../actions/contact-actions';
import * as CONST from "../interfaces/contact-strings"

function init(): ContactState {
    return {
        contacts: [],
        isSaving: false,
        isLoading: false
    }
}

export const ContactReducer = (state: ContactState = init(), action: actionTypes): ContactState => {
    switch(action.type) {
        case CONST.LOAD_CONTACT_INPROGRESS:
            return {...state, isLoading: true};
            //return ObjectAssign({} as ContactState, state, { isLoading: true });

        case CONST.LOAD_CONTACT_SUCCESS:
            var loadAct: ILoadContactAction = action as ILoadContactAction;
            var merged: Array<IContact> = [...state.contacts, ...loadAct.contacts];
            return {
                ...state, 
                contacts: merged, 
                isLoading: false 
            };
            //return ObjectAssign({} as ContactState, state, { contacts: merged, isLoading: false });

        case CONST.SAVE_CONTACT_INPROGRESS:
            return {...state, isSaving: true};
            //return ObjectAssign({} as ContactState, state, { isSaving: true });

        case CONST.SAVE_CONTACT_SUCCESS:
            var saveAct: ISaveContactAction = action as ISaveContactAction;
            return {
                ...state, 
                contacts: [...state.contacts, saveAct.contact], 
                isSaving: false 
            };
            //return ObjectAssign({} as ContactState, state, { contacts: [...state.contacts, saveAct.contact], isSaving: false });

        default:
            return state;
    }
}

export default ContactReducer;
