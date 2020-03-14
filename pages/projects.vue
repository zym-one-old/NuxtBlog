<template>
  <div
    class="overflow-x-hidden container mx-auto flex flex-row flex-wrap justify-start items-start py-4"
    onselectstart="return false"
  >
    <div
      v-for="(item, index) in projList"
      :key="index"
      class="w-full md:w-1/2 lg:w-1/3 h-64 p-4 "
    >
      <div
        class="w-full h-full proj-card bg-white border rounded shadow-sm hover:border-nuxt-stress overflow-hidden justify-around items-center"
        :style="'background-image: url('+item.image+');'"
      >
        <!-- :style="'background-image: url('+item.image+');'" -->
        <div class="relative z-10 uppercase font-mono font-bold">
          {{ item.title }}
        </div>
        <div class="relative z-10 text-center w-2/3 font-bold">
          {{ item.discriptions }}
        </div>
        <div class="z-10 w-full flex flex-row justify-around ">
          <a
            v-if="item.github"
            class="relative text-center hover:underline cursor-pointer"
            draggable="false"
            :href="item.github"
            target="_blank"
          >
            项目地址
          </a>
          <a
            v-if="item.name"
            class="relative text-center hover:underline  cursor-pointer"
            draggable="false"
            :href="'/projects/' + item.name"
            target="_blank"
          >
            在线预览
          </a>
          <a
            v-if="item.post"
            class="relative text-center hover:underline  cursor-pointer"
            draggable="false"
            :href="item.post"
            target="_blank"
          >
            相关文章
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, params, store: { state, commit } }) {
    const res = await $axios.$get('/api/getProjects')
    const data = {
      projList: res.data
    }
    // console.log(res) // eslint-disable-line
    return data
  },
  scrollToTop: true
}
</script>

<style>
.proj-card {
  box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.2);
  transition: border 250ms ease;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  padding: 1.563rem;
  color: #fff;
  background: #696969 50%;
  background-size: cover;
  -webkit-box-shadow: 0.5rem 0.875rem 2.375rem rgba(39, 44, 49, 0.06),
    0.063rem 0.188rem 0.5rem rgba(39, 44, 49, 0.03);
  box-shadow: 0.5rem 0.875rem 2.375rem rgba(39, 44, 49, 0.06),
    0.063rem 0.188rem 0.5rem rgba(39, 44, 49, 0.03);
  width: 100%;
}
.proj-card::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  /* background: linear-gradient(
    135deg,
    rgba(0, 40, 60, 0.8),
    rgba(0, 20, 40, 0.7)
  ); */
  background: linear-gradient(
    135deg,
    rgba(0, 40, 60, 0.5),
    rgba(0, 20, 40, 0.4)
  );
  -webkit-backdrop-filter: blur(0.05rem);
  backdrop-filter: blur(0.05rem);
}
</style>
