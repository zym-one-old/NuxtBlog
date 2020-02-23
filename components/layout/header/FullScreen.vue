<template>
  <li class="xl:pl-6 lg:pl-4 py-2 flex items-center">
    <!-- 全屏 -->
    <button
      id="rfs"
      class="flex items-center focus:outline-none"
      :class="{'hidden':fullScreen}"
    >
      <nui-fs class="hover:text-nuxt-stress" />
    </button>
    <button
      id="efs"
      class="flex items-center focus:outline-none"
      :class="{'hidden':!fullScreen}"
    >
      <nui-efs class="hover:text-nuxt-stress" />
    </button>
  </li>
</template>

<script>
import nuiFs from '~/components/icon/Fs'
import nuiEfs from '~/components/icon/Efs'
export default {
  components: {
    nuiFs,
    nuiEfs
  },
  computed: {
    fullScreen () {
      return this.$store.state.app.fullScreen
    }
  },
  mounted () {
    this.rfs()
    this.efs()
  },
  methods: {
    rfs () {
      const viewFullScreen = document.getElementById('rfs')
      if (viewFullScreen) {
        viewFullScreen.addEventListener('click', () => {
          let docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.msRequestFullscreen) {
            docElm = document.body // overwrite the element (for IE)
            docElm.msRequestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          }
          this.$store.commit('app/togglefullScreen', true)
        }, false)
      }
    },
    // 退出全屏
    efs () {
      const cancelFullScreen = document.getElementById('efs')
      if (cancelFullScreen) {
        cancelFullScreen.addEventListener('click', () => {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
          this.$store.commit('app/togglefullScreen', false)
        }, false)
      }
    }
  }
}
</script>
