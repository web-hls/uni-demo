const INITIALIZE_DATA = 'INITIALIZE_DATA'
const REMER_TOKEN = 'REMER_TOKEN'
const REMER_USER = 'REMER_USER'
const UPDATEUSER = 'UPDATEUSER'

export default {

	// 添加用户信息
	[REMER_USER](state ,user) {
		state.user = user
	},

	// 添加token
    [REMER_TOKEN](state, token) {
        state.token = token
    },

    /*
	初始化信息，
	 */
	[INITIALIZE_DATA](state) {
		state.user = {
			img: "/static/default.jpg",
			sex: 1,
			nackname: "阿珊~",
			birth_day: "2000-01-17",
			brief: "前端工程师，蓝桥签约作者",
		},
		state.token = '';
	},

	[UPDATEUSER](state, userData) {

		for (let i = 0; i < userData.length; i++) {
			const data = userData[i];
			state.user[data.name] = data.data
		}
		console.log(state.user)
	}
}