const state = {
  title: '首页'
}

const action = {
  getTitle({commit}, title) {
    commit('setTitle', title)
  }
}

const mutations = {
  'setTitle'(state, title) {
    state.title = title
  }
}

const getter = {
  title: state => title
}

export default {
  state,
  action,
  mutations,
  getter
}
