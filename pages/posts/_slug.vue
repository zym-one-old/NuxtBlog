<template>
  <nuxt-child />
</template>

<script>
import { clone } from '~/assets/js/utils'
export default {
  fetch ({ store: { state, commit }, params }) {
    let menu = clone(state.posts.menu)
    menu = menu.filter((e) => {
      return e.name === params.slug
    })
    const folder = menu[0]
    folder.posts.sort((s, t) => {
      const b = s.date
      const a = t.date
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
    if (menu.length > 0) {
      commit('posts/setFolder', folder)
    }
  }
}
</script>
