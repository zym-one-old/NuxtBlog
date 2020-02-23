<template>
  <div class="px-2 container mx-auto h-full max-w-screen overflow-x-hidden" onselectstart="return false">
    <section id="resume">
      <div class="uppercase font-mono font-bold text-2xl  md:text-3xl text-center pt-10">
        - Resume -
      </div>
      <div class="flex lg:flex-row flex-col justify-center lg:py-10">
        <div id="resume-info" class="p-6 flex items-center flex-col lg:w-2/5">
          <div id="avatar">
            <img :src="imgSrc" class="h-32 w-32 md:h-32 md:w-32 rounded-full mx-auto mb-6 shadow-xl" draggable="false">
            <div class="text-center">
              <div class="text-2xl md:text-3xl">
                {{ data.name }}
              </div>
              <div v-if="data.identity && data.identity.length >0" class="text-gray-500 md:text-xl text-lg">
                {{ data.identity }}
              </div>
            </div>
          </div>
          <ul id="contact" class="flex items-center justify-center my-6">
            <li v-if="data.github && data.github.length >0" class="outerLink">
              <a class=" block  h-10 w-10 flex items-center hover:text-nuxt-stress text-gray-700" :href="data.github" target="_blank">
                <uni-github class="fill-current " />
              </a>
            </li>
            <li v-if="data.bilibili && data.bilibili.length >0" class="outerLink">
              <a class=" block flex items-center hover:text-nuxt-stress text-gray-700" :href="data.bilibili" target="_blank">
                <uni-bilibili class="fill-current h-12 w-12" />
              </a>
            </li>
            <li v-if="data.weibo && data.weibo.length >0" class="outerLink">
              <a class=" block flex items-center hover:text-nuxt-stress text-gray-700" :href="data.weibo" target="_blank">
                <uni-weibo class="fill-current h-12 w-12" />
              </a>
            </li>
            <li v-if="data.mail && data.mail.length >0" class="outerLink">
              <a class=" block flex items-center hover:text-nuxt-stress text-gray-700" :href="'mailto:'+data.mail" target="_blank">
                <uni-mail class="fill-current w-12 h-12" />
              </a>
            </li>
          </ul>
        </div>
        <div id="resume-summery" class="text-left p-3  md:p-6 lg:w-3/5 my-6 md:my-auto">
          <div class="text-2xl md:text-3xl font-semibold uppercase text-left mb-2">
            概要
          </div>
          <div class="mb-6 text-lg">
            <div class="mb-4">
              <p v-for="(item,index) in data.summery" :key="index">
                {{ item }}
              </p>
            </div>
          </div>

          <div class="md:flex">
            <div class="md:w-2/5 mb-4 md:mb-auto">
              <div class="text-lg md:text-xl font-semibold mb-2">
                # 兴趣爱好
              </div>
              <ul class="md:text-lg ml-8" style="list-style-type: square;">
                <li v-for="(item, index) in data.interests" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="md:w-3/5">
              <div class="text-lg md:text-xl font-semibold mb-2">
                # 教育经历
              </div>
              <div class="flex">
                <uni-education class="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-4" />
                <div>
                  <div class="text-base">
                    {{ data.education.info }}
                  </div>
                  <div class="text-base text-gray-800">
                    {{ data.education.school }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import uniGithub from '~/components/icon/Github'
import uniMail from '~/components/icon/Mail'
import uniEducation from '~/components/icon/Education'
import uniWeibo from '~/components/icon/Weibo'
import uniBilibili from '~/components/icon/Bilibili'
export default {
  components: {
    uniGithub,
    uniMail,
    uniEducation,
    uniWeibo,
    uniBilibili
  },
  scrollToTop: true,
  async asyncData ({ $axios }) {
    const resume = await $axios.$get('/api/getResume')
    // console.log(resume) // eslint-disable-line
    const data = {
      imgSrc: require('~/static/avatar.jpg'),
      data: resume.data
    }
    return data
  },
  head () {
    return {
      title: '关于',
      titleTemplate: '%s - ZYMONE',
      meta: [
        { hid: 'description', name: 'description', content: '曾一鸣的简历等' }
      ]
    }
  }
}
</script>

<style>
.outerLink {
  @apply  mr-6;
}
.outerLink:last-child {
  @apply  mr-0;
}
#resume-summery p {
  color: inherit;
  margin-bottom: 10px !important;
  position: relative;
  line-height: 1.6;
}

#resume-summery p:last-child {
  margin-bottom: 0 !important;
}
</style>
