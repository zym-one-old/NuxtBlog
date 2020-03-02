<template>
  <nuxt-child />
</template>

<script>
export default {
  fetch ({ store: { state, commit }, params }) {
    const menu = state.posts.menu.filter((e) => {
      return e.name === params.slug
    })
    const folder = menu[0]
    folder.posts.sort((s, t) => {
      const b = s.date
      const a = t.date
      if (a < b) { return -1 }
      if (a > b) { return 1 }
      return 0
    })
    if (menu.length > 0) {
      commit('posts/setFolder', folder)
    }
  }
}
</script>
