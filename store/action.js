export default {
    //初始化信息
    initializeData({ commit }) {
        commit('INITIALIZE_DATA');
    },

    // 添加token
    addToken({ commit }, token) {
        commit('REMER_TOKEN', token)
    },

    // 添加用户信息
    addUsers({ commit }, user) {
        commit('REMER_USER', user)
    },

    // 更新用户信息
    updateUser({ commit }, user) {
        commit('UPDATEUSER', user)
    }
}