import { fromJS } from 'immutable'
import {types} from '../actions/dialogs'

const initialState = fromJS({
  activeDialogId: null,
  currenUserId: 1,
  searchString: ''
})

export default function data (state = initialState, action) {
  switch (action.type) {
    case types.SET_ACTIVE: return state.set('searchString', '').set('activeDialogId', action.id)
    case types.SET_SEARCH_STRING: return state.set('activeDialogId', null).set('searchString', action.str)
    default:
      return state
  }
}
