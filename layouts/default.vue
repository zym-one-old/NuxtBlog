<template>
  <div class="min-h-screen w-screen overflow-x-hidden m-0 p-0 flex flex-col bg">
    <Header />
    <Backdrop
      :value="$store.state.app.aside"
      @change="$store.commit('app/toggleAside')"
    />
    <main class="pt-16 md:pt-20 lg:pt-0 flex flex-auto items-stretch relative">
      <Aside class="lg:hidden" />
      <div class="max-w-full relative flex-auto overflow-x-hidden">
        <nuxt />
      </div>
    </main>
    <Footer class="h-12" />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
import Backdrop from '~/components/common/Backdrop'
import Aside from '~/components/posts/Aside'
export default {
  components: {
    Header,
    Footer,
    Aside,
    Backdrop
  }
}
</script>

<style>
.bg {
  /* background-image: linear-gradient(0deg,#f5f5f5 1.1px, transparent 0), linear-gradient(90deg,#f5f5f5 1.1px, transparent 0);
  background-size: 40px 40px;
  background-color: #e8e8e8; */
  background: url("/bg.jpg");
  background-attachment: fixed;
  background-color: #f5f7f9;
  /* background: linear-gradient(45deg,#e91e63,#9c27b0); */
}
</style>
