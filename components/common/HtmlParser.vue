<template>
  <!-- eslint-disable-next-line -->
  <article class="overflow-hidden block" v-html="content" style="outline: none;overflow-wrap: break-word;"/>
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>
