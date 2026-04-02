<script setup lang="ts">
import { useRouter, withBase } from 'vitepress'
import { data as posts } from './posts.data'

const router = useRouter()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function navigate(url: string) {
  router.go(withBase(url))
}
</script>

<template>
  <div class="blog-list">
    <p v-if="posts.length === 0" class="no-posts">暂无文章</p>
    <article
      v-for="post in posts"
      :key="post.url"
      class="blog-post"
      @click="navigate(post.url)"
    >
      <time class="post-date">{{ formatDate(post.frontmatter.date) }}</time>
      <h2 class="post-title">
        <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
      </h2>
      <p v-if="post.frontmatter.description" class="post-description">
        {{ post.frontmatter.description }}
      </p>
      <div v-if="post.frontmatter.tags?.length" class="post-tags">
        <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.blog-list {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 0;
}

.blog-post {
  padding: 24px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: opacity 0.25s;
}

.blog-post:hover {
  opacity: 0.7;
}

.blog-post:first-child {
  padding-top: 0;
}

.blog-post:last-child {
  border-bottom: none;
}

.post-date {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-description {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 10px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.no-posts {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 48px 0;
}
</style>
