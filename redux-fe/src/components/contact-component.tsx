import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
// import * as $ from "jquery";
import ContactActions from '../actions/contact-actions';

interface Props {
    dispatch?: Dispatch<Action<ApplicationRootState>>;
    contacts?: Array<IContact>;
    isSaving?: boolean;
    isLoading?: boolean;
}

class ContactComponent extends React.Component<Props, {}> {
    title: string;

    constructor(props: Props) {
        super(props);
        this.title = '';
    }

    componentDidMount() {
        if(this.props.dispatch){
            this.props.dispatch(ContactActions.loadContactsAsync());
        }        
    };

    save = () => {
        var contact: IContact = {
            id: new Date().getTime(),
            title: this.title
        }
        if(this.props.dispatch){
            this.props.dispatch(ContactActions.saveContactAsync(contact) as any);
        }        
    };

    setTitle = (e: any) => {
        this.title = e.target.value;
    };

    contactRow = (c: IContact, idx: number): JSX.Element => {
        return <li key={idx}>{c.title}</li>;
    };

    render() {
        return (
            <div>
                <div>
                    <input type='text' onChange={this.setTitle} />&nbsp;&nbsp;&nbsp;
                    <button onClick={this.save}>Save</button>
                    {this.props.isSaving && 
                        <strong><i>&nbsp;&nbsp;&nbsp;saving, please wait...</i></strong>
                    }
                    {this.props.isLoading && 
                        <strong><i>&nbsp;&nbsp;&nbsp;loading contacts, please wait...</i></strong>
                    }
                </div>

                <div>
                    <ul>
                    {this.props.contacts &&
                         this.props.contacts.map(this.contactRow) }
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: ApplicationRootState, props: Props): Props {
    return {
        // dispatch: props.dispatch,
        contacts: state.contactState.contacts,
        isSaving: state.contactState.isSaving,
        isLoading: state.contactState.isLoading
    };
}

const ContactComponentContainer = connect(mapStateToProps)(ContactComponent);

export default ContactComponentContainer;