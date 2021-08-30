const INITIALIZE_DATA = 'INITIALIZE_DATA'
const REMER_TOKEN = 'REMER_TOKEN'

export default {

    [REMER_TOKEN](state, token) {
        state.token = token
    },

    /*
	初始化信息，
	 */
	[INITIALIZE_DATA](state) {
		state.user = {};
		state.token = '';
	},
}