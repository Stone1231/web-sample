/* eslint-disable import/first */

// require('es6-promise/auto');

import React from 'react';
import logo from './logo.svg';
import './App.css';


import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import ContactComponent from './components/contact-component';
import TaskIndexComponent from './components/task-index';

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <div>
            {/*<ContactComponent />*/}            
            <TaskIndexComponent />
        </div>
    </Provider>
  );
}

export default App;

// ReactDOM.render(
//     <Provider store={store}>
//         <div>
//             {/*<ContactComponent />*/}
//             <TaskIndexComponent />
//         </div>
//     </Provider>,
//     document.getElementById('app')
// );
