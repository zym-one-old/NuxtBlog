<template>
  <div class="hidden xl:block flex flex-shrink-0 bg-white flex-grow mr-auto relative" onselectstart="return false">
    <div class="tocWarp flex flex-col flex-auto max-w-full py-10 relative sticky top-0" style="width: 224px;">
      <div class="h-full overflow-x-hidden scrolling-touch" style="overflow:overlay;">
        <div class="pageSideOption relative mb-6 flex felx-col flex-shrink-0 flex-grow-0 overflow-hidden hover:bg-gray-200" style="min-width: 220px">
          <a target="_blank" rel="noopener noreferrer" draggable="false" :href="$store.state.posts.repo+'/tree/master/'+$store.state.posts.filePath" class="py-1 px-4 w-full flex items-center flex-row text-gray-700 hover:text-nuxt-stress">
            <div class="flex items-center justify-center h-5 w-5 mr-2 fill-current">
              <icon-github />
            </div>
            <span class="flex items-center text-sm pt-1 fill-current">View on GitHub</span>
          </a>
        </div>
        <div v-if="hList && hList.length>0" class="pageSideOption flex flex-col relative">
          <div class="px-4 mb-2 w-full flex items-center flex-row text-nuxt-mono">
            <div class="flex items-center justify-center h-4 w-4 mr-2 fill-currents">
              <icon-menu2 />
            </div>
            <span class="flex items-center text-sm text-nuxt-mono">Contents</span>
          </div>
          <ul class="w-full">
            <li v-for="(content,index) in hList" :key="index" class="px-4 pl-6 w-full text-sm py-1 text-gray-700 hover:text-nuxt-stress truncate" :class="{'font-semibold text-nuxt-stress': current === index}">
              <a :href="content.id" draggable="false" :class="'px-'+content.level" @click.prevent="scrollTo(content.id)">
                {{ content.name }}
              </a>
            </li>
          </ul>
        </div>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import iconGithub from '~/components/icon/Github'
import iconMenu2 from '~/components/icon/Menu2'
export default {
  components: {
    iconGithub,
    iconMenu2
  },
  data () {
    return {
      setInter: null,
      hList: null,
      current: 0
    }
  },
  computed: {
    fileInfo () {
      return this.$store.state.fileInfo
    },
    contents () {
      const c = []
      if (this.hList) {
        this.hList.forEach((content) => {
          const el = document.getElementById(content.id.slice(1))
          if (el) {
            c.push(el.offsetTop)
          }
        })
      }
      return c
    }
  },
  watch: {
    '$route.fullPath': 'hashChanged'
  },
  mounted () {
    this.setHList()
    this.$nextTick(() => {
      window.addEventListener('scroll', throttle(() => this.scrolled(), 100))
      if (this.$route.hash.length) {
        this.scrollTo(this.$route.hash)
      }
      this.scrolled()
    })
  },
  methods: {
    hashChanged (toPath, fromPath) {
      toPath = toPath.split('#')
      fromPath = fromPath.split('#')
      // eslint-disable-next-line
      // console.log(toPath)
      this.$nextTick(() => {
        this.scrollTo(this.$route.hash)
        this.setHList()
      })
    },
    plevel (level) {
      switch (level) {
        case '1': return 0
        case '2': return 3
        case '3': return 6
      }
    },
    setHList () {
      this.$nextTick(() => {
        const hList = []
        const article = document.getElementsByTagName('article')
        const tageNames = ['H1', 'H2', 'H3']
        if (article[0] && article[0].children) {
          for (let i = 0; i < article[0].children.length; i++) {
            if (tageNames.includes(article[0].children[i].tagName)) {
              hList.push({
                id: '#' + article[0].children[i].id,
                name: article[0].children[i].textContent,
                level: this.plevel(article[0].children[i].tagName[1])
              })
            }
          }
        }
        this.hList = hList
      })
    },
    scrolled () {
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const doc = document.documentElement
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      const el = this.contents.find((pos) => {
        return pos > top + (h / 8)
      })
      // eslint-disable-next-line
    //   console.log(this.contents[0],top,h)
      this.current = (el ? this.contents.indexOf(el) : this.contents.length) - 1
    },
    scrollTo (id) {
      if (this._scrolling) {
        return
      }
      this._scrolling = true
      // if (id !== this.$route.hash) {
      //   this.$router.push(this.$route.fullPath.split('#')[0] + id)
      // }
      this.$nextTick(() => {
        const el = document.getElementById(id.slice(1))
        if (!el) {
          this._scrolling = false
          return
        }
        const to = el.offsetTop - 0
        const doc = document.documentElement
        let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
        const diff = (to > top ? to - top : top - to) / 25
        let i = 0
        window.clearInterval(this.setInter)
        this.setInter = window.setInterval(() => {
          top = (to > top) ? top + diff : top - diff
          window.scrollTo(0, top)
          i++
          if (i === 25) {
            this._scrolling = false
            window.clearInterval(this.setInter)
          }
        }, 10)
      })
    }
  }
}
</script>

<style>
.tocWarp {
  height: calc(100vh - 5rem)
}
.pageSideOption::before {
  top: 0;
  left: 0;
  height: 100%;
  content: " ";
  position: absolute;
  border-left: 1px solid #E6ECF1;
}
</style>
