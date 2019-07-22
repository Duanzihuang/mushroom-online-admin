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

### 嵌套路由

> 参考：https://zh.nuxtjs.org/api/components-nuxt-child/

### 导航守卫

#### 步骤：

```javascript
1、在 plugins 新建一个 router.js 的文件，并且写好导航守卫的代码
    export default ({ app }) => {
        app.router.beforeEach((to, from, next) => {
            console.log(to.path)
            console.log(next)
        })
    }

2、在 nuxt.config.js 中的 `plugins` 导入 router.js 文件
	plugins: ['@/plugins/element-ui', '~/plugins/router']
```

### 权限校验

> 注意：nuxt是服务端渲染，在导航守卫中获取不到 `window`
>
> https://www.zhangyangjun.com/post/vue-ssr-and-nuxt-actual-combat.html
>
> 使用前后端配合的方式来实现路由

#### 步骤：

```
参考：https://www.jb51.net/article/139804.htm
```



