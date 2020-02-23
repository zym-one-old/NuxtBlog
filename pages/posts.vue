<template>
  <nuxt-child />
</template>

<script>
export default {
  validate ({ params, store: { state }, redirect }) {
    if (!state.posts.menu) {
      redirect('/docsDir404')
    }
    return state.posts.menu.filter((e) => { return e.name === params.slug }).length > 0 || !params.slug
  },
  layout: 'posts',
  scrollToTop: true
}
</script>
