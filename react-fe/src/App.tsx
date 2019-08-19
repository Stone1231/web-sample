import * as React from 'react';
import './App.css';
import Hello from './components/Hello';
const logo = require('./logo.svg');
const PropTypes = require('prop-types');

export interface States {
  themeColor: string;
}

class App extends React.Component<{}, States> {

  constructor() {
    super({})
    this.state = { themeColor: 'red' }
  }

  getChildContext() {
    return { themeColor: this.state.themeColor }
  }

  static childContextTypes = {
    themeColor: PropTypes.string //ex 設定顏色
  }

	changeColor() {
		this.setState({ themeColor: 'green' })
	};  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1 style={{ color: this.state.themeColor }}>根頁面context小試</h1>
        <Hello name="reactApp" enthusiasmLevel={3}></Hello>
        <input type="button" value="改顏色" onClick={this.changeColor.bind(this)}/>

      </div>
    );
  }
}

export default App;
