import React, {PureComponent, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { graphql, gql, compose } from 'react-apollo'
import LeftPanelItem from '../LeftPanelItem'
import Search from '../Search'
import {setActive} from '../../actions/dialogs'
import styles from './LeftPanel.css'

class LeftPanel extends PureComponent {
  render () {
    const {usersQuery: {users} = {}, dialogsQuery: {dialogs} = {}, searchString} = this.props

    if (!users || !dialogs) {
      return null
    }

    return (
      <aside className={styles.left}>
        <Search />
        {dialogs.map(({id: dialogId, user: userId, messages}) => {
          const lastMessage = messages[messages.length - 1]
          const user = users.find(({id}) => id === userId)
          if (!user.name.toLowerCase().includes(searchString)) {
            return null
          }
          return (
            <LeftPanelItem
              key={dialogId}
              activeDialogId={this.props.activeDialogId}
              setActive={this.props.setActive}
              id={dialogId}
              text={lastMessage.text}
              time={new Date(+lastMessage.date)}
              avatar={user.avatar}
              title={user.name} />
          )
        })}
      </aside>
    )
  }
}

LeftPanel.propTypes = {
  dialogsQuery: PropTypes.object,
  usersQuery: PropTypes.object,
  setActive: PropTypes.func.isRequired,
  activeDialogId: PropTypes.number,
  searchString: PropTypes.string
}

function mapStateToProps (state) {
  return state.dialogs.toJS()
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({setActive}, dispatch)
}

export const DialogsQuery = gql`
  query Query($userId: Int!) {
    dialogs(userId: $userId) {
      id,
      user,
      messages {
        text,
        date
      }
    }
  }
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(DialogsQuery, {
    options: ({currenUserId}) => ({variables: {userId: currenUserId}}),
    name: 'dialogsQuery'
  }),
  graphql(gql`
    query Query {
      users {
        id,
        name,
        avatar
      }
    }
  `, {name: 'usersQuery'})
)(LeftPanel)
