<template>
  <div class="text-xl mt-40 flex items-center justify-center ">
    <button class=" rounded bg-blue-600  text-white p-4 border-nuxt-gray shadow-lg border-blue-400 shadow-inner focus:outline-none" @click="updateDocs">
      同步文档
    </button>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {

  },
  methods: {
    async updateDocs () {
      await this.$axios.$post('/api/updateRepo')
    }
  }

}
</script>
