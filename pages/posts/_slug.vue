<template>
  <nuxt-child />
</template>

<script>
export default {
  fetch ({ store: { state, commit }, params }) {
    const menu = state.posts.menu.filter((e) => {
      return e.name === params.slug
    })
    if (menu.length > 0) {
      commit('posts/setFolder', menu[0])
    }
  }
}
</script>
