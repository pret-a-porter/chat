import React, {PropTypes} from 'react'
import moment from 'moment'
import styles from './Message.css'

export default function Message ({avatar, userName, text, date}) {
  const avatarStyle = {
    backgroundImage: `url(${avatar})`
  }

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.avatar} style={avatarStyle} />
      </div>
      <div className={styles.right}>
        <div className={styles.user}>
          {userName}
          <span className={styles.time}>
            {moment(new Date(+date)).format('HH:mm')}
          </span>
        </div>
        {text}
      </div>
    </div>
  )
}

Message.propTypes = {
  userName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}
