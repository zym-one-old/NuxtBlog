<template>
  <div class="mt-16">
    <div v-if="footer.previous || footer.next">
      <div class="flex md:flex-row flex-col justify-between">
        <a v-if="footer.previous" class="footer-card hover:border-nuxt-stress w-full text-gray-800 hover:text-nuxt-stress" :href="'/posts/'+$route.params.slug+'/'+footer.previous.name" style="">
          <div class="p-4 flex-shrink-0 fill-current" style="font-size: 24px;transition: color 250ms ease;">
            <icon-direction />
          </div>
          <div class="p-6 flex-auto text-right">
            <div class="block">
              <span
                class="text-xs"
                style="color: #9DAAB6;line-height: 1.625"
              >Previous</span>
            </div>
            <div class="block">
              <span class="font-bold text-sm" style="transition: color 250ms ease;">{{ footer.previous.title }}</span>
            </div>
          </div>
        </a>
        <div v-if="footer.previous && footer.next" class="w-10 h-5" />
        <a v-if="footer.next" class="footer-card hover:border-nuxt-stress  text-gray-800 hover:text-nuxt-stress w-full" :href="'/posts/'+$route.params.slug+'/'+footer.next.name" style="">
          <div class="p-6  flex-auto">
            <div class="block">
              <span
                class=" text-xs"
                style="color: #9DAAB6;line-height: 1.625;"
              >Next</span>
            </div>
            <div class="block">
              <span class="font-bold text-sm" style="transition: color 250ms ease;">{{ footer.next.title }}</span>
            </div>
          </div>
          <div class="p-4 flex-shrink-0 fill-current" style="font-size: 24px;transition: color 250ms ease;">
            <icon-direction :right="true" />
          </div>
        </a>
      </div>
    </div>
    <div
      class="pageFooter mt-6 pt-6 flex flex-row items-center justify-center border-t-2 border-nuxt-gray"
      onselectstart="return false"
    >
      <span class="font-medium font-mono">
        - {{ formateDate($store.state.posts.file.date) }} -
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import iconDirection from '~/components/icon/Direction'
import { formateDate } from '~/assets/js/utils'
export default {
  components: {
    iconDirection
  },
  computed: {
    ...mapState({
      folder: state => state.posts.folder,
      file: state => state.posts.file
    }),
    footer () {
      if (!this.folder.posts || !this.file) {
        return {}
      }
      const current = this.folder.posts.indexOf(this.file)
      let previous = null
      let next = null
      if (current > 0) {
        previous = this.folder.posts[current - 1]
      }
      if (current < this.folder.posts.length - 1) {
        next = this.folder.posts[current + 1]
      }
      //   console.log(current,previous, next) // eslint-disable-line
      return {
        previous,
        next
      }
    }
  },
  methods: {
    formateDate (date) {
      return formateDate(date)
    }
  }
}
</script>

<style>
.footer-card {
  border: 1px solid #e6ecf1;
  display: flex;
  align-items: center;
  justify-self: stretch;
  flex-direction: row;
  position: relative;
  align-self: stretch;
  box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.1);
  transition: border 250ms ease;
  border-radius: 3px;
  text-decoration: none;
  background-color: #ffffff;
  page-break-inside: avoid;
}
</style>
