import * as React from 'react'
import Params from '../commons/Params'
import { CommentModel } from '../models/CommentModel';

export interface Props {
  onSubmit(model:CommentModel): void;
}

class CommentInput extends React.Component<Props, CommentModel> {

  constructor(p:Props, s:CommentModel) {
    super(p, s)
    this.state = { username: "", content: "", createdTime:new Date() }
    //this.props = {onSubmit : false}
  }

  private textArea1!: HTMLTextAreaElement;
 
  componentWillMount () {
    //var model = new CommentModel;

    //var params:Params = new Params; 
    this.setState({ username:Params.UserName })
  }

  componentDidMount() {
    //this.textArea1 = this.refs["textarea1"] as HTMLTextAreaElement;
    this.textArea1.focus();
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      // const { username, content } = this.state
      // this.props.onSubmit({ username, content})

      this.setState({createdTime:new Date()});
      this.props.onSubmit(this.state)
    }
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username}
              onBlur={(c)=>{
                Params.UserName=c.currentTarget.value;
                }}
              onChange={(c)=>{
                this.setState({username:c.target.value});
                }} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={this.state.content}
              ref={(c)=>{this.textArea1 = c as HTMLTextAreaElement}} //ref="textarea1"
              onChange={(c)=>{
                this.setState({content:c.target.value});
                }}
              />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

export default CommentInput