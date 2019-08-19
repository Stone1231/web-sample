import * as React from 'react'
import { CommentModel } from '../models/CommentModel';

export interface Props {
  comments:CommentModel[];
  onDelete(idx:number): void;
}

class CommentList extends React.Component<Props,{}> {

  // constructor() {
  //   super()
  // }
  handleDelete(idx:number) {
    if (this.props.onDelete) {
      this.props.onDelete(idx);
    }
  }

  render() {
    // const comments: CommentModel[] = [
    //   { username: 'Jerry', content: 'Hello' },
    //   { username: 'Tomy', content: 'World' },
    //   { username: 'Lucy', content: 'Good' }
    // ]

    return (
      <div>
        {this.props.comments.map((item, i) =>
          <div className='comment'>
            <div className='comment-user'>
              <span>{item.username} </span>：
          </div>
          <p>{item.content}</p>
          <span className='comment-createdtime'>
          {
            item.createdTime ?
            item.createdTime.toLocaleString() : 'nodate'
          }
          </span>
          <span 
            onClick={this.handleDelete.bind(this,i)}
            className='comment-delete'>
            删除
          </span>
        </div>
        )}
      </div>
    )
  }
}

export default CommentList