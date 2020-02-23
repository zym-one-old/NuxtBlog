<template>
  <div class="min-h-screen w-full m-0 p-0 flex flex-col" style="background:#f5f7f9;">
    <Header />
    <main class="pt-16 md:pt-20 lg:pt-0 flex flex-auto items-stretch relative">
      <Backdrop :value="$store.state.app.aside" @change="$store.commit('app/toggleAside')" />
      <Aside />
      <div class="bg-white max-w-full relative flex-auto overflow-hidden flex flex-col" :class="{'xl:flex-grow-0':$route.params.file}">
        <nuxt class="h-full" />
        <Footer class="h-12 px-6 lg:px-0 mx-auto lg:mx-20" style="max-width: 750px;" />
      </div>
      <contents v-if="$route.params.file" />
    </main>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Aside from '~/components/posts/Aside'
import Backdrop from '~/components/common/Backdrop'
import Contents from '~/components/posts/Contents'
import Footer from '~/components/layout/Footer'
export default {
  components: {
    Backdrop,
    Header,
    Aside,
    Contents,
    Footer
  }
}
</script>
