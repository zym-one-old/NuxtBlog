<template>
  <div />
</template>

<script>
export default {
  asyncData ({ redirect }) {
    return redirect('/posts')
  },
  scrollToTop: true
}
</script>
