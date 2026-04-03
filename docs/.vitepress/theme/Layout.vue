<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeParticleBackground from './HomeParticleBackground.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomeParticleBackground />
    </template>
  </Layout>
</template>
