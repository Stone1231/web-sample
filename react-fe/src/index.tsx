import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import CommentApp from './components/CommentApp';
import TaskApp from './components/TaskApp';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <TaskApp />, //<CommentApp />, //<App />,
  document.getElementById('root') as HTMLElement
);
serviceWorker.unregister();
