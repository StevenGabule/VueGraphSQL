import store from '../store/index'

export default (to, from, next) => {
    if (!store.getters.user) {
        next({
            path: '/signin'
        })
    } else {
        next();
    }
}