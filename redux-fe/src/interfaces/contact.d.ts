declare type actionTypes = ILoadContactAction | ISaveContactAction | Action;

declare type composeWithDevTools = any;

interface ILoadContactAction extends Action {
    contacts: Array<IContact>;
}

interface ISaveContactAction extends Action {
    contact: IContact;
}

interface IContact {
    id: number;
    title: string;
}

interface ApplicationRootState {
    contactState: ContactState;
}

interface ContactState {
    contacts: Array<IContact>;
    isSaving: boolean;
    isLoading: boolean;
}

