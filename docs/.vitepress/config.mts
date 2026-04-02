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
      { text: '博客', link: '/blog/' },
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
      '/blog/': [
        {
          text: '博客',
          items: [{ text: '概述', link: '/blog/' }],
        },
      ],
      '/roadmap/': [
        {
          text: '迭代计划',
          items: [{ text: '概述', link: '/roadmap/' }],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aitemly' },
    ],
  },
})
