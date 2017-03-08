# Origami学习

<http://origami.ft.com/>
## 1. 首页

使FT数字产品统一化品牌化。使得开发更好，更快，更强。

Origami是一组服务、模块和工具，泳衣帮助构建网站。Origami渴望为FT网站创建一个统一标准的风格和经验，并使得FT的web开发工作更快。


### Origami的模块和服务
Origami的核心是它的服务和模块。

Origami的模块是你页面中的一片片HTML,CSS和JavaScript。其中的一些，像gallery模块，具有一个完全成形的观感。还有一些，像colors或tracking,为你构建自己的界面提供了基础,或者没有提供接口但是提供了一些有用的服务。

不管它们是由什么组成的，这些模块都是被完全测试过的，都是遵守web可访问标准的，在所有浏览器中都能正常工作或者可以优雅降级，并为FT品牌提供一致性体验。看完整的模块列表请访问<http://registry.origami.ft.com/components>

除了模块，Origami还提供了以下服务：

- Polyfill.io：<https://polyfill.io/v2/docs/>自动升级web，写JavaScript应用的时候代码使用最新标准。
- The Image Service:<http://image.webservices.ft.com/v1/>以多种格式和大小交付图片；优化并通过CDN网络传递。

Origami服务和模块都遵守Origami Spec和Coding Standards，以保障他们是高质量的，且具有互通性。所有模块都是在[GitHub](https://github.com/Financial-Times)上开源开发的。

### Origami 工具
以下工具可以帮助你在你的产品中使用模块和服务：

- [Origami Build Tools](https://github.com/Financial-Times/origami-build-tools):将构建Origami组件作为你现有的建站进程的一部分。
- [Origami Build Service](https://origami-build.ft.com/v2/)：使用build service，直接发布组件到你的用户的浏览器。
- [The Registry](http://registry.origami.ft.com/components):从我们的注册表寻找并使用你需要的组件。

### The Spec
Origami 是根据[Origami Spec](http://origami.ft.com/docs/component-spec/)构建的。这保证了模块之间的高质量和互通性。如果你想要为Origami的模块和服务贡献力量，阅读Spec是一个不错的开始的地方。

### 谁在使用Origami?
Origami被广泛应用于FT和一些第三方。


## 2. Introduction
### 这个文档是怎样组织的？
我们有四种类型的文档：

1. Tutorials(指南）：它将帮你快速地了解Origami的一些部分。这些部分是为任何人（开发者，设计师，产品工作者）设计的。对于刚开始的人而言它们是很理想的。
2. Guides:它们会更详细地讨论一个特定的主题。
3. The Spec:所有的Origami组件都是遵照说明书的。你使用Origami的话不需要阅读或理解说明书，但它对你理解Origami更高级的部分是有帮助的。
4. READMES:组件的特定文档是和每个组件保持同步的，也是和模块的注册表以及服务领域同步的。

此处是通用的Tutorials、Guides和Spec的首页。

### Read more sections
略

### Getting help
略

### Modules,Services,Best practices
我们的开发者文档是划分为三个主题的：

-  [Modules](http://origami.ft.com/docs/developer-guide/modules/):使用Origami的UI组件。
- Services:怎样使用Origami的web服务
- General best practice:写前端代码的通用方法和标准

## 3. Modules documentation(模块文档）

### 使用Origami模块
Origami的前端模块包含Sass,JavaScript和标记模板，以创造最好的UI元素。Sass和JavaScript需要构建为压缩的包，然后你可以使用link和script标签来引用子资源。

#### The quick way
<http://origami.ft.com/docs/developer-guide/modules/very-quick-origami/>已看

#### How to pick your build method
<http://origami.ft.com/docs/developer-guide/modules/choosing-your-build-method/>

两种方式：使用build service 和 手动配置

[手动配置说明](http://origami.ft.com/docs/developer-guide/modules/building-modules/)


## 4. 模块学习：

见Origami2……







