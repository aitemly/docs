# Aitemly Docs

Aitemly 项目文档站，基于 [VitePress](https://vitepress.dev/) 构建，部署于 [docs.itemly.com](https://docs.itemly.com)。用于展示项目的设计、功能说明与迭代计划。

## 本地开发

```bash
pnpm install
pnpm run docs:dev
```

访问 http://localhost:5173 预览。

## 构建与预览

```bash
pnpm run docs:build   # 构建静态站点到 docs/.vitepress/dist
pnpm run docs:preview # 本地预览构建结果
```

## 目录结构

- `docs/` — VitePress 站点源码（配置、Markdown 与静态资源）
- `docs/design/` — 设计相关文档
- `docs/guide/` — 功能与使用指南
- `docs/roadmap/` — 迭代计划

## 部署

推送至 `main` 分支后，由 GitHub Actions 自动构建并部署到 GitHub Pages，自定义域名为 **docs.itemly.com**。
