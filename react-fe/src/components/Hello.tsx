import * as React from 'react';
import './Hello.css';
const PropTypes = require('prop-types');

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

export interface States {
  themeColor: string;
}

class Hello extends React.Component<Props, States> {

  static contextTypes = {
    themeColor: PropTypes.string
  }

  render() {
    const { name, enthusiasmLevel = 1 } = this.props;
    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
         <h1 style={{ color: this.context.themeColor }}>子頁面context小試</h1>
      </div>
    );
  }
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}