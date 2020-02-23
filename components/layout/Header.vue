<template>
  <header
    class="header w-full inset-x-0 bg-white h-16 md:h-20 fixed top-0 lg:relative z-20 px-4 lg:px-0 m-0 overflow-hidden"
    onselectstart="return false"
  >
    <div
      class="headerContainer mx-auto flex h-full w-full"
      style="max-width: 1448px;"
    >
      <div
        class="headerLeftColumn relative flex items-center justify-between lg:justify-center w-full m-0"
      >
        <div
          class="mobileButton lg:hidden flex cursor-pointer"
          @click.prevent="$store.commit('app/toggleAside')"
        >
          <Menu />
        </div>
        <div class="headerLogo block px-6 lg:px-0 h-full flex items-center justify-center">
          <div class="mobileLogo block md:hidden">
            <a
              href="/"
              class="block flex justify-center items-center w-6 h-6"
              draggable="false"
            >
              <logo />
            </a>
          </div>
          <div class="desktopLogo hidden md:block">
            <a href="/" class="flex flex-row items-center justify-center" draggable="false">
              <div
                class="block flex justify-center items-center w-6 h-6 mr-2 mb-1"
              >
                <logo />
              </div>
              <div
                class="font-extrabold text-lg uppercase whitespace-no-wrap"
              >
                ZYM-ONE
              </div>
            </a>
          </div>
        </div>
        <div class="mobileButton lg:hidden flex" />
      </div>
      <div
        class="headerInnerWrapper ml-24 mr-6 xl:mx-20 hidden lg:flex items-center overflow-hidden flex-grow flex-shrink"
      >
        <ul class="w-full hidden md:flex justify-end my-auto">
          <li v-for="(item,index) in $store.state.app.menu" :key="index" class="header_nav_link px-4 py-2">
            <nuxt-link
              :to="{name: item.name}"
              class="block p-2 opacity-50 hover:opacity-100 opacity-transition text-sm font-bold"
              draggable="false"
            >
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="searchInputWrapper hidden lg:flex">
        <div class="px-4 w-full flex flex-row items-center justify-between">
          <ul class="w-full">
            <full-screen />
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import FullScreen from './header/FullScreen'
import Logo from '~/components/icon/Logo'
import Menu from '~/components/icon/Menu'
export default {
  components: {
    Logo,
    Menu,
    FullScreen
  }
}
</script>

<style>
@media screen and (min-width: 1024px) {
  .headerLeftColumn {
    max-width: 298px;
    justify-content: center;
  }
  .headerLeftColumn::after {
    top: 50%;
    right: 0;
    height: 40px;
    content: " ";
    position: absolute;
    transform: translateY(-50%);
    border-left: 1px solid #e6ecf1;
  }
  .headerLogo {
    width: 250px;
  }
}
.header {
  box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.1);
  border-bottom: 1px solid #d4dadf;
}

.headerInnerWrapper {
  max-width: 750px;
}

.searchInputWrapper {
  position: relative;
  width: 224px;
  align-items: center;
  -webkit-box-align: center;
}
.searchInputWrapper::before {
  top: 50%;
  left: 0;
  height: 40px;
  content: " ";
  position: absolute;
  transform: translateY(-50%);
  border-left: 1px solid #e6ecf1;
}

.header_nav_link a.nuxt-link-active {
  @apply opacity-100;
}
</style>
