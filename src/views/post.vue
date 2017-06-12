<template>
<div>
    <Navbar></Navbar>
    <div class="container-Rain__simple post-Rain__simple">
        <div class="post-cover kit-hidden-mb">
            <div class="post-title">测试</div>
        </div>
        <div class="post-cover-mb kit-contrast-hidden-mb">
            <div class="post-title">测试</div>
        </div>
        <div class="row">
            <section class="col-tb-3 kit-hidden-mb"></section>
            <section class="col-tb-6 kit-hidden-mb">
                <article class="rain-markdown">
                    <div v-html="post.content"></div>
                </article>
            </section>
            <section class="col-tb-3 kit-hidden-mb"></section>
            <section class="col-tb-12 kit-contrast-hidden-mb kit-max-mb">
                <article class="mb rain-markdown">
                    <div v-html="post.content"></div>
                </article>
            </section>
        </div>
    </div>
</div>
</template>
<script>
import { Func } from '../vendor/lib';
import Navbar from '../components/Navbar';

export default {
    data () {
        return {
            post: {
                title: '漫展',
                content: `
# webpack+react等技术栈的入门历程
## webpack初识
> Webpack是一个模块打包工具，能够把各种文件（例如：ReactJS、Babel、Coffeescript、Less/Sass等）作为模块进行编译后进行打包。

## webpack安装
首先在命令行中输入\`npm install webpack -g\`
## 创建一个项目
在项目文件夹中创建一个名为learn-react的文件夹，名字可以随便选取
用npm一次性安装这些依赖包
\`\`\`
npm install --save-dev babel-core babel-loader  babel-preset-es2015 babel-preset-react
mkdir learn-react && cd learn-react
npm install webpack -g
\`\`\`
                `
            }
        }
    },
    mounted () {
        this.post.content = Func.parseMarkdown(this.post.content)
    },
    components: {
        Navbar
    }
}
</script>
<style>
.post-cover {
    background-image: url('../assets/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-color: #808080;
    background-attachment: scroll;
    background-size: cover;
    height: 540px;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
.post-cover-mb {
    background-image: url('../assets/img/cover.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-color: #808080;
    background-attachment: scroll;
    background-size: cover;
    height: 300px;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
}
.post-cover .post-title {
    color: #fff;
    font-size: 40px;
    text-align: center;
    padding-top: 140px;
}
.post-cover-mb .post-title {
    color: #fff;
    font-size: 30px;
    text-align: center;
    padding-top: 100px;
}
.post-wrap {
    margin: 80px;
    margin-top: 40px;
    margin-right: 240px;
    border: 2px solid #ccc;
    padding: 20px 50px;
}
.post-Rain__simple {
    margin-bottom: 120px;
}
.title {
    color: #666;
    border-bottom: 2px solid #ccc;
}
.title h2 {
    font-size: 24px;
}
article.mb {
    padding: 30px 30px;
}
</style>