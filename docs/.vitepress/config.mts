import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Aitemly Docs',
  description: 'Aitemly project documentation — design, features, and iteration roadmap',
  base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '设计', link: '/design/' },
      { text: '功能', link: '/guide/' },
      { text: '迭代计划', link: '/roadmap/' },
    ],
    sidebar: {
      '/design/': [
        {
          text: '设计',
          items: [{ text: '概述', link: '/design/' }],
        },
      ],
      '/guide/': [
        {
          text: '功能',
          items: [{ text: '概述', link: '/guide/' }],
        },
      ],
      '/roadmap/': [
        {
          text: '迭代计划',
          items: [{ text: '概述', link: '/roadmap/' }],
        },
      ],
    },
  },
})
