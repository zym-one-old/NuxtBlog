<template>
  <div class="px-6 lg:px-0 mx-auto lg:mx-20 flex flex-col" onselectstart="return false" style="max-width:750px;">
    <span class="mt-8 mb-6 text-xl text-center lg:text-left font-bold font-serif">
      归档
    </span>
    <div v-for="(item,index) in posts" :key="index" class="my-6 flex flex-col">
      <span class="font-mono font-bold text-gray-700 text-lg text-center lg:text-left">
        {{ formate(item.time)+ ' x ' +item.posts.length }}
      </span>
      <!-- lg:list-disc  lg:ml-4 -->
      <ul class="py-1">
        <li v-for="(item2,index2) in item.posts" :key="index2">
          <div class="my-2 px-6 flex flex-col lg:flex-row lg:justify-between">
            <nuxt-link :to="'/posts/'+item2.folder.name +'/'+item2.name" class="text-gray-700 flex justify-center items-center font-bold hover:text-nuxt-stress text-sm">
              {{ item2.title }}
            </nuxt-link>

            <span class="text-gray-600 text-xs font-bold text-center flex items-center justify-center">
              <nuxt-link :to="'/posts/'+item2.folder.name" class="pr-1 text-blue-600 flex justify-center items-center font-bold hover:text-nuxt-stress text-sm text-center align-middle">
                {{ item2.folder.title }}
              </nuxt-link>
              # {{ formate(item2.date) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- {{ posts }} -->
  </div>
</template>

<script>
import { formateDate } from '~/assets/js/utils'
export default {
  computed: {
    date () {
      const date = []
      this.$store.state.posts.menu.forEach((folder) => {
        folder.posts.forEach((file) => {
          if (!date.includes(file.date.slice(0, 6))) {
            date.push(file.date.slice(0, 6))
          }
        })
      })
      return date.sort((s, t) => {
        if (s < t) { return 1 }
        if (s > t) { return -1 }
        return 0
      })
    },
    posts () {
      const posts = []
      this.date.forEach((e) => {
        posts.push({
          time: e,
          posts: []
        })
      })
      this.$store.state.posts.menu.forEach((i) => {
        i.posts.forEach((e) => {
          posts.forEach((m) => {
            if (m.time === e.date.slice(0, 6)) {
              m.posts.push({ ...e, folder: i })
            }
          })
        })
      })
      //   console.log(posts) // eslint-disable-line
      return posts
    }
  },
  methods: {
    formate (date) {
      return formateDate(date)
    }
  },
  head () {
    return {
      title: '归档',
      titleTemplate: '%s - ZYMONE',
      meta: [
        { hid: 'description', name: 'description', content: '归档' }
      ]
    }
  }
}
</script>
