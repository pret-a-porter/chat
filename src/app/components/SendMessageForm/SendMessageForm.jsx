import React, {PureComponent, PropTypes} from 'react'
import styles from './SendMessageForm.css'

export default class extends PureComponent {
  static get propTypes () {
    return {
      sendMessage: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      message: ''
    }
  }

  handleChange (event) {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type='text'
          placeholder='Ваше сообщение...'
          value={this.state.message}
          onChange={this.handleChange} />
      </form>
    )
  }
}
