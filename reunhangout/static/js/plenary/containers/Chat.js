import React from "react";
import _ from "lodash";
import {connect} from "react-redux";
import * as BS from "react-bootstrap";
import * as A from "../actions";
import {urlRegex} from "../../utils";
import * as style from "../../../scss/pages/plenary/_chatstyle.scss"
import Whiteboard from './Whiteboard';


/**
 * Split 'text' into an array of react components or strings that represent the
 * message content, but with URLs transformed into links.
 */
const linkify = (text) => {
  let splitter = new RegExp(urlRegex, 'gim');
  let parts = text.split(splitter);
  return parts.map(function(part, i) {
    if (i % 2 === 1) {
      return <a href={part} target='_blank' rel='nofollow noopener noreferrer'>
        {part}
      </a>
    } else {
      return part;
    }
  });
}

/**
 * Split 'text' into an array of react components or strings, where at-names
 * are highlighted.
 */
const atnamify = (text, users, msgId) => {
  let parts = text.split(/(?:\b|^|\s)@([a-z0-9]+)/gim);
  return parts.map(function(part, i) {
    if (i % 2 === 1) {
      var normalized = part.replace(/\s/g, "").toLowerCase();
      var mentioned = _.find(users, (user) => {
        return user.username.toLowerCase().indexOf(normalized) === 0;
      });
      if (mentioned) {
        return <span>
          {' '}
          <AtName text={`@${part}`} mentioned={mentioned} id={`atname-${msgId}-${i}`}/>
        </span>
      }
    }
    return part;
  });
}

class AtName extends React.Component {
  render() {
    return <span className='atname'>
      <BS.OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={
        <BS.Popover id={this.props.id}>
          {this.props.mentioned.username}
        </BS.Popover>
      }>
        <span>{this.props.text}</span>
      </BS.OverlayTrigger>
    </span>
  }
}

class ChatMessage extends React.Component {
  render() {
    let msg = this.props.msg;
    let markedUp = this.markup(msg.message);
    let avatar = msg.user.image || "../../../../media/assets/default_avatar.jpg";
    return <div className={`chat-message${msg.highlight ? " highlight" : ""}`}>
      <img src={avatar} className="user-avatar" />
      <div className="chat-message-text">
        <span className='userName'>{msg.user.username}</span>
        <br></br>
        <span className='message'>{markedUp}</span>
      </div>
    </div>
  }

  markup(message) {
    let linked = linkify(message);
    let atnamed = linked.map((part, i) => {
      if (_.isString(part)) {
        return atnamify(part, this.props.presence.members, this.props.msg.id);
      }
      return part;
    });
    let markedUp = _.flatten(atnamed).map((part, i) => {
      return <span key={i}>{part}</span>;
    });
    return markedUp;
  }
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {highlight: false}
  }
  componentDidMount() {
    let chatLog = this.refs.chatLog;
    chatLog.scrollTop = chatLog.scrollHeight
  }
  componentWillUpdate() {
    let chatLog = this.refs.chatLog;
    this.shouldScrollBottom = chatLog.scrollTop + chatLog.offsetHeight === chatLog.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      let chatLog = this.refs.chatLog;
      chatLog.scrollTop = chatLog.scrollHeight
    }
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onSendMessage({
    message: this.state.value,
    highlight: this.state.highlight
    });
    this.setState({value: ""});
  }
  render() {
    let is_admin = this.props.auth.is_admin
    return <div className="chat-container">
      <Whiteboard />
        <div className="chat-box">
        <div
          className="chat-log"
          ref="chatLog">
        {this.props.chat_messages.map((msg, i) => {
          return <ChatMessage msg={msg} plenary={this.props.plenary}
          presence={this.props.presence} key={`${i}`} auth={this.props.auth} />
        })}
        </div>
        <form className={
                `chat-input${this.props.plenary.chat.state === "error" ? " has-error" : ""}`
              }
              onSubmit={(e) => this.onSubmit(e)}>
          { is_admin ?
            <BS.FormGroup>
              <BS.InputGroup>
                {this.props.plenary.chat.state === "error" ?
                  <BS.HelpBlock>{this.props.plenary.chat.error}</BS.HelpBlock> : "" }
                <BS.FormControl
                  className="chat-composer"
                  type='text'
                  placeholder='Chat...'
                  disabled={this.props.plenary.chat.state === "sending"}
                  value={(this.state && this.state.value) || ""}
                  onChange={(e) => this.setState({value: e.target.value})} />
                  <BS.InputGroup.Addon>
                    <input type="checkbox"
                      name="highlight"
                      id="highlight"/>
                      <label for="highlight">
                        <BS.Glyphicon glyph="exclamation-sign" />
                      </label>
                  </BS.InputGroup.Addon>
              </BS.InputGroup>
            </BS.FormGroup>
            :
            <BS.FormGroup>
                {this.props.plenary.chat.state === "error" ?
                  <BS.HelpBlock>{this.props.plenary.chat.error}</BS.HelpBlock> : "" }
                <BS.FormControl
                  className="chat-composer"
                  type='text'
                  placeholder='Chat...'
                  disabled={this.props.plenary.chat.state === "sending"}
                  value={(this.state && this.state.value) || ""}
                  onChange={(e) => this.setState({value: e.target.value})} />
            </BS.FormGroup> }
        </form>
      </div>
    </div>
  }
};

export default connect(
  // map state to props
  (state) => ({
    chat_messages: state.chat_messages,
    presence: state.presence,
    plenary: state.plenary,
    auth: state.auth,
  }),
  (dispatch, ownProps) => ({
    onSendMessage: (payload) => dispatch(A.sendChatMessage(payload))
  })
)(Chat);
