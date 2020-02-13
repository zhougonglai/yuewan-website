[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/zhougonglai/yuewan-website)

# 雷神研发用项目

## 项目安装

```bash
# 项目环境安装
npm i

# 开发
npm run serve

#编译
npm run build

# deploy
npm run sls
```

## 项目基础

- nuxt style desgin / nuxt 项目结构设计
- new request design / 新请求设计
- @serverless/tencent-website / 腾讯云 sls

### nuxt 项目结构设计

- Layout + Pages 路由模拟
- PrerenderSPAPlugin 预渲染 Plugin

### 新请求设计

- src/utils/request.js 请求封装
- src/services/\* 业务逻辑封装
- src/services/api/\* 业务逻辑 Mock
- src/store/modules/\* 业务逻辑

serverless 相关: [serverless](https://serverless.com/cn/)
