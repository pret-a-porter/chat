import React, {PureComponent, PropTypes} from 'react'
import { connect } from 'react-redux'
import { graphql, gql, compose } from 'react-apollo'
import Message from '../Message'
import SendMessageForm from '../SendMessageForm'
import styles from './Dialog.css'
import {DialogsQuery} from '../LeftPanel'

class Dialog extends PureComponent {
  constructor (props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    if (this.bottom) {
      this.bottom.scrollIntoView()
    }
  }

  sendMessage (text) {
    const {addMessage, activeDialogId, currenUserId} = this.props
    addMessage({
      variables: {
        dialogId: activeDialogId,
        userId: currenUserId,
        text
      },
      refetchQueries: [{
        query: MessagesQuery,
        variables: { dialogId: activeDialogId }
      }, {
        query: DialogsQuery,
        variables: { userId: currenUserId }
      }]
    })
  }

  render () {
    const {activeDialogId, usersQuery: {users} = {}, messagesQuery: {messages} = {}} = this.props

    if (!users || !messages || !activeDialogId) {
      return <div className={styles.wrapper} />
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.list}>
          {messages.map((message) => {
            const user = users.find(({id}) => id === message.user)
            return (
              <Message key={message.id} avatar={user.avatar} userName={user.name} {...message} />
            )
          })}
          <div ref={(el) => { this.bottom = el }} />
        </div>
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    )
  }
}

Dialog.propTypes = {
  messagesQuery: PropTypes.object,
  usersQuery: PropTypes.object,
  addMessage: PropTypes.func,
  activeDialogId: PropTypes.number,
  currenUserId: PropTypes.number
}

function mapStateToProps (state) {
  return state.dialogs.toJS()
}

const MessagesQuery = gql`
  query Query($dialogId: Int) {
    messages(dialogId: $dialogId) {
      id,
      user,
      text,
      date
    }
  }
`

export default compose(
  connect(mapStateToProps),
  graphql(MessagesQuery, {
    options: ({activeDialogId}) => ({variables: {dialogId: activeDialogId}}),
    name: 'messagesQuery'
  }),
  graphql(gql`
    query Query {
      users {
        id,
        name,
        avatar
      }
    }
  `, {name: 'usersQuery'}),
  graphql(gql`
    mutation addMessage($dialogId: Int!, $userId: Int!, $text: String) {
      addMessage(dialogId: $dialogId, userId: $userId, text: $text) {
        id,
        user,
        text
      }
    }
  `, {
    name: 'addMessage'
  })
)(Dialog)
