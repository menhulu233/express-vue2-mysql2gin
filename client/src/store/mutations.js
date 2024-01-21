import {ADD_USER_INFO, DEL_USER_INFO} from './mutation-types'
export default {
  [ADD_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo;
  },
  [DEL_USER_INFO](state){
    state.userInfo = {};
  },
}
