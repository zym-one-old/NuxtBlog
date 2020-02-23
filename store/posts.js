export const state = () => ({
  menu: null,
  folder: null,
  file: null,
  filePath: null,
  repo: null
})

export const mutations = {
  initPosts (state, data) {
    state.menu = data
  },
  setFolder (state, data) {
    state.folder = data
  },
  setFile (state, data) {
    state.file = data
  },
  setFilePath (state, data) {
    state.filePath = data
  },
  setRepo (state, data) {
    state.repo = data
  }
}

export const actions = {

}
