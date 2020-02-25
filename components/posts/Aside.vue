<template>
  <aside
    class="contentNavigation block lg:flex flex-col items-stretch flex-shrink-0 z-30 lg:z-10 flex-grow-0"
    onselectstart="return false"
  >
    <div
      id="contentNavigationInner"
      class="contentNavigationInner fixed z-30 w-full h-screen left-0 flex items-stretch top-0 lg:sticky"
      :class="{ asideCollapsed: !$store.state.app.aside }"
    >
      <div
        class="w-full block flex-auto flex flex-col"
        style="background-color: #F5F7F9;"
      >
        <!--  -->
        <div class="mobileHeader h-16 flex-shrink-0 flex md:hidden">
          <button class="py-2 px-4 focus:outline-none" style="font-size: 24px;" @click="$store.commit('app/toggleAside')">
            <icon-direction />
          </button>
        </div>
        <div v-if="isPostsPath" class="ml-4 md:ml-6" :class="{ 'pb-6 border-b': menuOpen }">
          <div
            class="px-3 py-2 flex items-center cursor-pointer hover:bg-gray-300 border-b"
            @click="menuOpen = !menuOpen"
          >
            <span class="flex-auto flex flex-row items-center break-words">
              <icon-stack class="mr-4" />
              <span v-if="$store.state.posts.folder" class="font-medium">
                {{ $store.state.posts.folder.title }}
              </span>
              <span v-else class="font-medium">
                {{ "归档" }}
              </span>
            </span>
            <span
              class="p-2 text-lg"
              style="color: #9DAAB6;"
              :class="{ 'transform -rotate-90': !menuOpen }"
            >
              <icon-arrow />
            </span>
          </div>
          <div v-if="menuOpen" class="">
            <div
              v-for="(folder, index) in $store.state.posts.menu"
              :key="index"
              class="folderItem"
            >
              <nuxt-link
                :to="'/posts/' + folder.name"
                class="py-2 cursor-pointer flex items-center hover:bg-gray-300"
                draggable="false"
              >
                <span
                  class="px-3 flex-auto break-words font-medium text-sm border-l-4 border-transparent"
                >
                  {{ folder.title }}
                </span>
              </nuxt-link>
            </div>
            <div class="folderItem">
              <nuxt-link
                :to="'/posts/archive'"
                class="py-2 cursor-pointer flex items-center hover:bg-gray-300"
                draggable="false"
              >
                <span
                  class="px-3 flex-auto break-words font-medium text-sm  border-l-4 border-transparent"
                >
                  归档
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="mt-8 pl-4 md:pl-6 h-full overflow-y-auto">
          <template v-if="$route.params.slug && $store.state.posts.folder">
            <div
              v-for="(file, index) in $store.state.posts.folder.posts"
              :key="index"
              class="fileItem border-t border-l border-b border-transparent"
              :class="{
                'border-nuxt-gray bg-white text-nuxt-stress':
                  file.name === $route.params.file
              }"
            >
              <nuxt-link
                :to="'/posts/' + $route.params.slug + '/' + file.name"
                class="px-3 py-2 cursor-pointer flex items-center hover:bg-gray-300"
                draggable="false"
                exact
              >
                <span class="flex-auto break-words font-medium text-sm">
                  {{ file.title }}
                </span>
              </nuxt-link>
            </div>
          </template>
        </div>
        <footer class="asideFooter block relative h-14 md:h-20">
          <ul class="w-full flex justify-center h-full my-auto">
            <li
              v-for="(item, index) in $store.state.app.menu"
              :key="index"
              class="header_nav_link px-4 py-2 flex items-center justify-center"
            >
              <nuxt-link
                :to="{ name: item.name }"
                class="block p-2 opacity-50 hover:opacity-100 opacity-transition text-sm font-bold"
                draggable="false"
              >
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </aside>
</template>

<script>
import iconStack from '~/components/icon/Stack'
import iconArrow from '~/components/icon/Arrow'
import iconDirection from '~/components/icon/Direction'
export default {
  components: {
    iconStack,
    iconArrow,
    iconDirection
  },
  data () {
    return {
      menuOpen: false
    }
  },
  computed: {
    isPostsPath () {
      return this.$route.path.indexOf('posts') > 0
    }
  },
  watch: {
    '$route.path': 'pathChanged'
  },
  methods: {
    pathChanged () {
      this.menuOpen = false
      // console.log(this.$route) // eslint-disable-line
      if (this.$store.state.app.aside) {
        this.$store.commit('app/toggleAside')
      }
    }
  }
}
</script>

<style>
@media screen and (min-width: 1024px) {
  .contentNavigation {
    width: calc((100vw - 1448px) / 2 + 298px);
    padding-left: calc((100vw - 1448px) / 2);
    min-width: 298px;
    background: #f5f7f9;
    border-right: 1px solid #e6ecf1;
  }
}
@media screen and (max-width: 1023px) {
  .contentNavigationInner {
    max-width: 298px;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 4px, rgba(0, 0, 0, 0.28) 0px 4px 8px;
    overflow-y: auto;
    transform: translateX(0px) !important;
    border-right: 1px solid rgb(230, 236, 241);
    /* transition: transform 250ms ease 0s; */
    transition: all 250ms ease 0s;
  }
  .asideCollapsed {
    max-width: 298px;
    transform: translateX(-100%) !important;
    box-shadow: none;
    overflow-y: auto;
    /* transition: transform 250ms ease; */
    transition: all 250ms ease 0s;
    border-right: 1px solid #e6ecf1;
    /* -moz-transition: transform 250ms ease;
    -webkit-transition: transform 250ms ease; */
  }
}

.folderItem a.nuxt-link-active span {
  @apply border-nuxt-stress;
}

.asideFooter:before {
  background: -webkit-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #f5f7f9 100%
  );
  background: -moz-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #f5f7f9 100%
  );
  top: -24px;
  width: 100%;
  height: 24px;
  content: "";
  display: block;
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    #f5f7f9 100%
  );
}

.mobileHeader {
    color: #74818D;
    margin: 0;
    padding: 0;
    box-shadow: 0 1px 1px 0 rgba(116, 129, 141, 0.1);
    align-items: stretch;
    border-bottom: 1px solid #d4dadf;
    background-color: #FFFFFF;
    -webkit-box-align: stretch;
}
</style>
