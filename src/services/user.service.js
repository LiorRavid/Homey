import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

// To help debugging from console
window.userService = userService


function getUsers() {
    return storageService.query('userDB')
    // return httpService.get(`user`)
}

async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(userCred) {
    // userCred.score = 10000;
    const user = await storageService.put('userDB', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}
// async function update(user) {
//     await storageService.put('user', user)
//     // user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
//     return user;
// }

async function login(userCred) {
    const users = await storageService.query('userDB')
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    return _saveLocalUser(user)
    
    // const user = await httpService.post('auth/login', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    // userCred.score = 10000;
    const user = await storageService.post('userDB', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit(SOCKET_EMIT_LOGIN, user._id);
    return _saveLocalUser(user)
}
async function logout() {
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit(SOCKET_EMIT_LOGOUT);
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function _saveLocalUser(user) {
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}


// (async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })();



// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

