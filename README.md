# mushroom-online-admin

> 使用nuxt搭建的蘑菇在线后台管理系统

### 项目构建与运行

``` bash
# 创建项目
npx create-nuxt-app <项目名>

# 安装依赖【切换到项目根目录】
npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### 导入全局样式

> 在 `nuxt.config.js` 的 `css` 中进行配置

```javascript
module.exports = {
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@/assets/scss/main.scss'
  	]
}
```

### 组件样式中导入图片

> 图片/静态资源路径需要通过 `~` 导入

```scss
<style lang="scss" scoped>
	.logo {
        height: 60px;
        background-image: url(~assets/images/logo.png);
        background-size: cover;
        background-color: #989898;
    }
</style>
```

