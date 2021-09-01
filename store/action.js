

export default {

    addToken({ commit } , token) {
        commit('REMER_TOKEN', token)
    },

    //初始化信息
    initializeData({ commit }) {
        commit('INITIALIZE_DATA');
    }
}