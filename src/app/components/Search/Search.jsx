import React, {PropTypes, PureComponent} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setSearchString} from '../../actions/dialogs'
import styles from './Search.css'

class Search extends PureComponent {
  static get propTypes () {
    return {
      setSearchString: PropTypes.func,
      searchString: PropTypes.string.isRequired
    }
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.setSearchString(e.target.value)
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <input
          value={this.props.searchString}
          placeholder='Поиск...'
          className={styles.input}
          type='text'
          onChange={this.handleChange} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    searchString: state.dialogs.toJS().searchString
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({setSearchString}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
