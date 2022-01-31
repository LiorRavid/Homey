import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from './socket.service'
const STORAGE_KEY_ORDER = 'order'
var gWatchedUser = null;

export const orderService = {

    getOrders,
    getById,
    remove,
    update
    
}

// To help debugging from console
window.userService = userService


function getOrders() {
    return storageService.query('orderDB')
    // return httpService.get(`order`)
}

async function getById(orderId) {
    const order = await storageService.get('orderDB', orderId)
    // const order = await httpService.get(`order/${orderId}`)
    // gWatchedUser = user;
    return order;
}
function remove(orderId) {
    return storageService.remove('orderDB', orderId)
    // return httpService.delete(`order/${orderId}`)
}

async function update(orderCred) {
    // userCred.score = 10000;
    const order = await storageService.put('orderDB', orderCred)
    // const user = await httpService.put('order/signup', orderCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return order;
}