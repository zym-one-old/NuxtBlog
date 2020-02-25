<template>
  <div class="px-6 lg:px-0 mx-auto lg:mx-20 flex flex-col" onselectstart="return false" style="max-width:750px;">
    <span class="mt-8 mb-6 text-lg text-center lg:text-left font-bold uppercase">
      - {{ $store.state.posts.folder.title }} -
    </span>
    <article>
      <blockquote>
        <p v-for="(item,index) in $store.state.posts.folder.discription" :key="index">
          {{ item }}
        </p>
      </blockquote>
    </article>
    <div class="mb-6 flex flex-col">
      <!-- <span class="font-mono font-bold text-gray-700 text-lg text-center lg:text-left">
        {{ $store.state.posts.folder.title }}
      </span> -->
      <!-- lg:list-disc  lg:ml-4 -->
      <ul class="">
        <li v-for="(item2,index2) in $store.state.posts.folder.posts" :key="index2">
          <div class="my-2 px-6 flex flex-col lg:flex-row lg:justify-between">
            <nuxt-link :to="'/posts/'+$route.params.slug +'/'+item2.name" class="text-gray-700 flex justify-center font-bold hover:text-nuxt-stress text-sm">
              {{ item2.title }}
            </nuxt-link>
            <span class="text-gray-600 text-xs font-bold text-center flex items-center justify-center">
              {{ formate(item2.date) }}
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
  mounted () {
    // console.log( this.$store.state.posts.folder) // eslint-disable-line
  },
  methods: {
    formate (date) {
      return formateDate(date)
    }
  },
  head () {
    return {
      title: this.$store.state.posts.folder.title,
      titleTemplate: '%s - ZYMONE',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.posts.folder.description }
      ]
    }
  }
}
</script>
