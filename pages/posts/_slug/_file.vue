<template>
  <div class="flex flex-row relative min-w-0">
    <div class="pageContainer px-6 pb-16 mx-auto lg:px-0 lg:mx-20 flex flex-col flex-auto overflow-auto" style="max-width: 750px;">
      <!--  -->
      <div class="mb-8 border-b-2 border-nuxt-gray">
        <div class="flex py-10 md:items-baseline flex-row">
          <div class="w-full flex flex-row items-stretch justify-between">
            <div class="flex-auto pr-4">
              <h1 class="w-full uppercase">
                <span class="font-medium text-3xl">
                  {{ $store.state.posts.file.title }}
                </span>
              </h1>
            </div>
            <div class="mt-2 flex items-center xl:hidden">
              <a class="flex items-center justify-center h-8 w-8 p-2 text-nuxt-mono hover:text-nuxt-stress" target="_blank" rel="noopener noreferrer" draggable="false" :href="$store.state.posts.repo+'/tree/master/'+$store.state.posts.filePath">
                <icon-github />
              </a>
              <!-- <button class="flex items-center justify-center h-8 w-8 p-2 outline-none focus:outline-none text-nuxt-mono hover:text-nuxt-stress">
                <icon-menu2 />
              </button> -->
            </div>
          </div>
          <div class="discription">
            <!--  -->
          </div>
        </div>
      </div>
      <!--  -->
      <HtmlParser :content="page.body" />
      <page-footer />
      <!-- <Footer class="h-12" /> -->
    </div>
  </div>
</template>

<script>
import HtmlParser from '~/components/common/HtmlParser'
import iconGithub from '~/components/icon/Github'
// import iconMenu2 from '~/components/icon/Menu2'
import pageFooter from '~/components/posts/PageFooter'
// import Footer from '~/components/layout/Footer'

export default {
  components: {
    HtmlParser,
    iconGithub,
    // iconMenu2,
    pageFooter
    // Footer
  },
  fetch ({ store: { state, commit }, params }) {
    const file = state.posts.folder.posts.filter((e) => { return e.name === params.file })
    if (file.length > 0) {
      commit('posts/setFile', file[0])
    }
  },
  async asyncData ({ $axios, params, store: { state, commit } }) {
    // console.log(state.posts.file) // eslint-disable-line
    const path = 'posts/' + params.slug + '/' + params.file + '.md'
    commit('posts/setFilePath', path)
    const res = await $axios.$post('/api/getFile', { path })
    const data = {
      page: res.data
    }
    return data
  },
  validate ({ params, store: { state } }) {
    return params.file
  },
  scrollToTop: true,
  head () {
    return {
      title: this.$store.state.posts.file.title,
      titleTemplate: '%s - ZYMONE',
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.posts.file.description }
      ]
    }
  }
}
</script>
