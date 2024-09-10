//import global API
import Api from '../api/Api'
const auth = {
    //set namespace true
    namespaced: true,
    //state
    state: {
        //state untuk token, pakai localStorage, untuk menyimpan informasi tentang token JWT
        token: localStorage.getItem('token_yogafit') || '',
        expired_in: localStorage.getItem('expired_in_yogafit') || '',
        //state user, pakai localStorage, untuk menyimpan data user yang sedang login
        user: JSON.parse(localStorage.getItem('user')) || {},

        // permissions: JSON.parse(localStorage.getItem('permissions')) || {},
    },

    //mutations
    mutations: {
        //update state token dan state user dari hasil response
        AUTH_SUCCESS(state, token, user, expired_in) {
            state.token = token // <-- assign state token dengan response token
            state.user = user // <-- assign state user dengan response data user
            state.expired_in = expired_in
        },
        //update state user dari hasil response register / login
        GET_USER(state, user) {
            state.user = user // <-- assign state user dengan response data user
        },
        //fungsi logout
        AUTH_LOGOUT(state) {
            state.token = '' // <-- set state token ke empty
            state.expired_in = ''
            state.user = {} // <-- set state user ke empty array
        }
    },
    //actions
    actions: {

    //action getUser
    getUser({ commit }) {
    //ambil data token dari localStorage
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.get('/user')
        .then(response => {
            //commit ke mutatuin GET_USER dengan hasil response
            commit('GET_USER', response.data.user)
            })
    },

    forgot({ commit },user) {
        return new Promise((resolve, reject) => {
            Api.post('/auth/forgot', {
                //data yang dikirim ke server
                phone: user.phone
            })
            .then(response => {
                resolve(response.data.data)
            }).catch(error => {
            
                reject(error.response.data)
            })
        })
    },
    //action logout
    logout({ commit }) {
        //define callback promise
        return new Promise((resolve) => {
            //commit ke mutation AUTH_LOGOUT
            commit('AUTH_LOGOUT')
            //remove value dari localStorage
            localStorage.removeItem('token_yogafit')
            localStorage.removeItem('user')
            localStorage.removeItem('cartItems')
            localStorage.removeItem('expired_in_yogafit')
            //delete header axios
            delete Api.defaults.headers.common['Authorization']
        //return resolve ke component
        resolve()
        })
    },
    //action login
    login({ commit }, user) {
        //define callback promise
        return new Promise((resolve, reject) => {
            Api.post('/auth/login', {
                //data yang dikirim ke server
                email: user.email,
                password: user.password,
            })
            .then(response => {
                //define variable dengan isi hasil response dari server
                const token = response.data.token
                const user = response.data.users
                const expired_in = response.data.expired_in
                //set localStorage untuk menyimpan token dan datauser
                localStorage.setItem('token_yogafit', token)
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('expired_in_yogafit', expired_in)
                //set default header axios dengan token
                Api.defaults.headers.common['Authorization'] = "Bearer " + token
                //commit auth success ke mutation
                commit('AUTH_SUCCESS', token, user, expired_in)
                //commit get user ke mutation
                commit('GET_USER', user)
                //resolve ke component dengan hasil response
                resolve(response)
            }).catch(error => {
                console.log(error);
                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token_yogafit')
                    localStorage.removeItem('expired_in_yogafit')
                    //reject ke component dengan hasil response
                    reject(error.response.data)
                })
            })
        }
    },

    
    //getters
    getters: {
        //get current user
        currentUser(state) {
            return state.user// <-- return dengan data user
        },

    
        //loggedIn
        isLoggedIn(state) {
            return state.token // return dengan data token
        },
    
    }
}
export default auth