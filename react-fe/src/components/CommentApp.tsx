import * as React from 'react'
import { CommentModel } from '../models/CommentModel';
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export interface States {
  comments:CommentModel[];
}

class CommentApp extends React.Component<{},States> {

//state = {comments:new Array<CommentModel>()};
  constructor({},s:States) {
    super({},s)
    this.state = {comments:new Array<CommentModel>()};
// localStorage.getItem()

    let _commonsJson = localStorage.getItem('comments');
    let _comments:Array<CommentModel>;
    if(_commonsJson != null){
      _comments = JSON.parse(_commonsJson); 
    }
    else{
      _comments = new Array<CommentModel>();
    }

     this.state = {comments:_comments};
  }

  handleSubmit (comment:CommentModel) {
    this.state.comments.push(comment);
    this.setState({comments:this.state.comments});
    localStorage.setItem('comments', JSON.stringify(this.state.comments));
    //this.setState(this.state);
    //console.log(comment)
  }

  handleDelete (idx:number) {
    this.state.comments.splice(idx,1);
    this.setState({comments:this.state.comments});
    localStorage.setItem('comments', JSON.stringify(this.state.comments));
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput 
          onSubmit={this.handleSubmit.bind(this)} />
        <CommentList 
          onDelete={this.handleDelete.bind(this)}
          comments={this.state.comments} />
      </div>
    )
  }
}

export default CommentApp