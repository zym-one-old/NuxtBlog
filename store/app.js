export const state = () => ({
  aside: false,
  fullScreen: false,
  // menu: [{ name: 'posts', title: 'Posts' }, { name: 'about', title: 'About' }]
  menu: [{ name: 'posts', title: 'Posts' }]
})

export const mutations = {
  toggleAside (state) {
    state.aside = !state.aside
  },
  togglefullScreen (state, value) {
    state.fullScreen = value
  }
}

export const actions = {

}
