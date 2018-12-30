/**
 * Created by 开心 on 2018/8/1.
 */
import Vue from "vue";
import axios from 'axios'
import qs from 'qs'

export default {
  state: {
    currentUser: {
      get UserName() {
        return localStorage.getItem("currentUser_name");
      },
      get UserToken() {
        return localStorage.getItem('currentUser_token')
      }
    }
  },
  mutations: {
    setUser(state, {user_name, user_token}) {
      //  这里把token储存
      localStorage.setItem("currentUser_name", user_name);
      localStorage.setItem('currentUser_token', user_token)
    }
  },
  actions: {
    userLogin(context, {user_name, user_pass}) {
      var self = this
      var mobile = user_name
      var password = user_pass
      var type = 0
      var data = {
        mobile, password,type
      }
      // const baseURl="http://47.92.11e2.244:8777"
      axios({
        method: "post",
        url: this.$store.state.url+'/account/login',
        data: qs.stringify(data)
      }).then(res => {
        if (res.data['code'] == '0') {
          var token = res.data.data
          if (token != "") {
            // 后端API验证通过
            // 调用上面mutations里定义的方法
            context.commit("setUser", {"user_name": user_name, "user_token": token});
            console.log(token)
          }
        } else {
          console.log('响应失败');
        }
      });
    }
  }
}
