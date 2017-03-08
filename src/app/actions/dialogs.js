import keyMirror from 'keymirror'

export const types = keyMirror({
  SEND_MESSAGE: null,
  SET_ACTIVE: null,
  SET_SEARCH_STRING: null
})

export function sendMessage (id, message) {
  return {
    type: types.SEND_MESSAGE,
    id,
    message
  }
}

export function setActive (id) {
  return {
    type: types.SET_ACTIVE,
    id
  }
}

export function setSearchString (str) {
  return {
    type: types.SET_SEARCH_STRING,
    str: str.toLowerCase()
  }
}
