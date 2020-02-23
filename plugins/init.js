export default async function ({ $axios, store: { commit, state }, redirect }) {
  try {
    const info = await $axios.$get('/api/getMenu')
    commit('posts/initPosts', info.data)
    commit('posts/setRepo', 'https://github.com/yiming-zeng/docs')
    // const file = await $axios.$get('/api/getFile', {
    //   path: 'nuxt/20120121_async-data.md'
    // })
    // console.log(info) // eslint-disable-line no-console
  } catch (e) {
    // console.error('初始化失败，未找到文件夹') // eslint-disable-line no-console
    console.error(e) // eslint-disable-line no-console
    // redirect('/docsDir404')
  }
}
