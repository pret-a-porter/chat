import React, {PureComponent, PropTypes} from 'react'
import moment from 'moment'
import styles from './LeftPanelItem.css'

export default class LeftPanelItem extends PureComponent {
  static get propTypes () {
    return {
      setActive: PropTypes.func.isRequired,
      id: PropTypes.number.isRequired,
      activeDialogId: PropTypes.number,
      title: PropTypes.string.isRequired,
      text: PropTypes.string,
      avatar: PropTypes.string,
      time: PropTypes.instanceOf(Date)
    }
  }

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.setActive(this.props.id)
  }

  getClassName () {
    const {activeDialogId, id} = this.props
    let className = [styles.item]

    if (id === activeDialogId) {
      className.push(styles.active)
    }

    return className.join(' ')
  }

  render () {
    const {title, text, time, avatar} = this.props

    const avatarStyle = {
      backgroundImage: `url(${avatar})`
    }

    return (
      <div onClick={this.handleClick} className={this.getClassName()}>
        <div className={styles.left}>
          <div className={styles.avatar} style={avatarStyle} />
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {title}
            <span className={styles.time}>
              {moment(time).format('HH:mm')}
            </span>
          </div>
          <div className={styles.text}>
            {text}
          </div>
        </div>
      </div>
    )
  }
}
