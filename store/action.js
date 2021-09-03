

export default {

    // 添加token
    addToken({ commit} , token) {
        commit('REMER_TOKEN', token)
    },

    // 添加用户信息
    addUsers({ commit }, user) {
        commit('REMER_USER', user)
    },

    //初始化信息
    initializeData({ commit }) {
        commit('INITIALIZE_DATA');
    },

    updateUser({commit }, user) {
        commit('UPDATEUSER', user)
    }
}