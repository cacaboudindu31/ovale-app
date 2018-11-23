const {ipcRenderer} = require('electron')
// Listen to messages listed on this array
// then dispatch them on the store
const messageTypes = ['ORDERS', 'TICKERS', 'TRADES', 'BALANCES', 'SETTINGS', 'USER','DECRYPT_SETTINGS','STATUS', 'WEBSOCKET_SUCCESS', 'WEBSOCKET_ERROR', 'WEBSOCKET_PENDING', 'UPDATE_USER', 'REMOVE_ORDER', 'ADD_ORDERS', 'OPEN_SNACKBAR_REDIRECT', 'RESET_DATA'];
// const requestTypes = ['REQUEST_ORDERS', 'REQUEST_TICKERS', 'REQUEST_BALANCES', 'REQUEST_TRADES']

const emit = (type, payload) => ipcRenderer.send(type, payload)

const init = (store) => {
	console.log(ipcRenderer)
  // add listeners to ipc messages so we can re-dispatch them as actions
  if (ipcRenderer) {
   messageTypes.map(type => ipcRenderer.on(type, (event, payload) => store.dispatch({ type, payload })))
  }

  //send all requests for data on start
  // console.log('sending all ws requests...');
  // requestTypes.map(type => emit(type))
}

export {
  init,
  emit
}