# ftc-share
<https://github.com/FTChinese/ftc-share>

## 1.README.md
基于FT的o-share组件修改得到的社会媒体和URL分享按钮。

- 提供了分享产品的URL的能力
- 使用一套标准化的媒体图标
- 为链接提供一个可复制的表示法

### Getting started

最简单的标记是这样使用的：

	<div data-o-component="o-share"
    class="o-share"
	    data-o-share-links="{{links}}"
	    data-o-share-url="{{url}}"
	    data-o-share-title="{{title}}"
	    data-o-share-summary="{{summary}}">
	</div>

不同的属性选项如下：

- links:一个小写的社交网站的list,用空格分隔
- url:需要分享的URL
- title:需要分享的内容的标题
- summary:需要分享的内容概要

不同的社交网站如下（按照在中国的使用频率排列）：

- Wechat
- Weibo
- Linkedin
- Facebook
- Twitter

试运行

1. node 切换版本到 v6.2.2
2. npm install
3. 安装4.0的gulp

		如果安装过全局的 gulp 的话先卸载之
	
			$ npm uninstall gulp -g
		
		安装全局的 gulp 4.0
		
			$ npm install "gulpjs/gulp#4.0" -g
		
		到项目目录里删掉本地的 gulp
	
			$ npm rm gulp --save-dev
	
		安装本地的 gulp 4.0
	
			$ npm install "gulpjs/gulp#4.0" --save-dev

4. bower install
5. gulp serve 

#### JavaScript
举例说明一下JavaScript：

	import Share from 'ftc-share'
	var shareInstance = new Share(document.querySelector('[data-o-component=o-share]'));

该标记将生成o-share的实例。其结构如下：

	<ul>
	    <li class="o-share__action o-share__wechat">
	        <a href="" title="分享到微信">
	            <i>微信</i>
	        </a>
	    </li>
	</ul>

你也可以通过允许静态方法Share.init，在你的页面演练一下所有的例子，其会返回包含所有o-share实例的数组。

你也可以在HTML中使用script标签引入dist目录下的编译后的版本。它没有外部依赖，你可以直接使用它：

	<script src="ftc-share/dist/ftc-share.js" />

#### Events
该模块会在根元素上触发以下事件。

- oShare.ready - 当一个分享链接的行为被初始化的时候触发
- oShare.open - 当一个分享链接被打开（作为点击按钮的结果，以弹出或飞出的形式打开）的时候触发
- oShare.copy - 当URL被复制的时候触发

#### Sass

	@import 'o-share/main';

我们也支持静态模式。如果你想要使用所有默认的o-share的样式，你需要将$o-share-is-silent设置为false：

	$o-share-is-silent: false;
	@import 'o-share/main';

如果不这样，你仅仅能使用我们的mixins来设置你的自定义类。

### SASS API
我们提供默认的图标图片。除了默认的那组图片外，还有3组可选的图片和相关颜色集可供选择。如果你想要使用可选的其他图组集，你需要设置 $o-share-use-default-icon为false,并且引用oShareIcons混合器：

	$o-share-is-silent: false;
	$o-share-use-default-icon: false;
	@import 'o-share/main';
	@include oShareIcons($set);

$set参数可以是以下任意一种：

- polychrome
- duotone
- monochrome

其他混合器：

- oShareBase:设置每个图标容器的布局
- oShareActionLink:针对url-icon(默认输出的最后一种）设置样式
- oShareLinkTooltip:当你悬停在图标上时出现的提示框
- oShareSetIconSize($size):设置图标大小
- oShareActionIcon($name, $color:'white', $bgcolor:'wechat', $bghovercolor: false)：此处的$color、$bgcolor和$bghovercolor应该是颜色值或者o-colors palette中的一个值。$bghovercolor需要能接收一个false值以关闭悬停的影响。


每一个图标的官方颜色都已经被添加到o-colors的pallete，或者你可以直接从以下list中得到值：

	$o-share-icon-colors: (
	    wechat:#609700,
	    weibo: #e6162d,
	    linkedin:#0977b6,
	    facebook: #3c5a99,
	    twitter: #6aa9e0,
	    url: #27757b
	);
	

### JS API
oShare接收一个可选的config对象，其优先级高与container元素的data属性：

	var config = {
	    links: ['wechat', 'weibo', 'linkedin'],
	    url: window.location.href,
	    title: 'Syria oil map',
	    summary: 'How the Isis oil economy works, explained through the journey of a barrel of oil in Syria',
	};

如果你不给config传值，script将会先取到container的data属性所涉及到的相关信息。如果没有指定data属性，就会使用一个内部回调的config对象，其会搜索页面的meta标签以作为summary值的开放图谱，和title元素的value作为title的值。你应该在你的HTML文件中至少提供一个带有如下属性和值的meta标签：

	<meta property="og:description" content="summary of the article" />

## 2. html部分

### gulp.js
任务mustache:

	gulp.task('mustache', function () {
	  const DEST = '.tmp';
	
	  return gulp.src('./demos/src/index.mustache')
	    .pipe($.data(function(file) {
	      return readFilePromisified('./demos/src/data.json')
	        .then(function(value) {
	          return JSON.parse(value);
	        });
	    }))   
	    .pipe($.mustache({}, {
	      extension: '.html'
	    }))
	    .pipe(gulp.dest(DEST));
	});
		
- 把./demos/src/index.mustache模板用./demos/src/data.json中的数据填充完整，最后生成index.html
- 该./demos/src/index.mustache 中的{{>../../main}}部分导入的是根目录下的main.mustache子模板

更多有关mustache请见mustache参考手册 <http://mustache.github.io/mustache.5.html>

### main.mustache
#### 源码片段

		{{# o-share.withWechat}}
		<li class="o-share__action o-share__wechat">
			<a href="http://www.ftchinese.com/m/corp/qrshare.html?title={{title}}&url={{url}}&ccode=2C1A1408" target="_blank">
				<i>微信</i>
				<svg><use xlink:href="/bower_components/ftc-icons/sprite/social-icons.svg#social-wechat"></use></svg>
			</a>
		</li>
		{{/ o-share.withWechat}}

#### 说明

- 该处的{{# o-share.withWechat}}...{{/ o-share.withWechat}}表明这是一个key为o-share.withWechat的mustache块；而o-share.withWechat的值来自data.json,其为true,故该板块显示。 尝试将其值改为false，则页面中对应元素就没有了。

***疑问：***

这里这个版块里面a标签里的{{title}}不应该从o-share.withWechat下面一层层往上找吗？它咋一下就找到了最外层的title？

## 3. JavaScript部分

### （1）gulp.js
任务scripts:

	gulp.task('scripts', () => {
	  return rollup({
	    entry: 'demos/src/demo.js',
	    plugins: [
	      // bowerResolve(),
	      // commonjs(),
	      buble()
	    ],
	    cache: cache,
	  }).then(function(bundle) {
	    cache = bundle;
	
	    return bundle.write({
	      format: 'iife',
	      moduleName: 'Share',
	      moduleId: 'ftc-share',
	      dest: '.tmp/scripts/ftc-share.js',
	      sourceMap: true,
	    }).then(function() {
	      browserSync.reload('ftc-share.js');
	    });
	  });
	});


将demos/src/demo.js打包成为.tmp/scripts/ftc-share.js

最后在main.mustache中引入：

	<script type="text/javascript" src="scripts/ftc-share.js"></script>

### （2） demos/src/demo.js

#### 源码

	import Share from '../../main';//从导入ftc-share\main.jsShare类

	Share.init();//执行Share类的方法init()

从ftc-share\main.js中导入Share类

#### 说明
- import：该新特性属于 **ES6**规范,import语句用于导入从外部模块、其他脚本导出的函数。详见《ES6学习.md》,更多关于ES6详见<http://es6.ruanyifeng.com/>

### （3）ftc-share\main.js

#### 源码

	import Share from './src/js/share';//从share.js导入Share类
	
	const constructAll = function() {
		Share.init();//针对body元素，选中其所有属性data-o-component的值为o-share的子元素，并对这些子元素创建Share类实例，从而得到这些Share实例构成的数组
		document.removeEventListener('o.DOMContentLoaded', constructAll);//移除DOMContentLoaded事件绑定的constructAll函数
	};
	
	document.addEventListener('o.DOMContentLoaded', constructAll);//为DOMContentLoaded事件绑定constructAll函数
	
	export default Share;//再导出Share类

从ftc-share/src/js/share.js中导入Share类，再导出Share类。



#### 说明：
- DOMContentLoaded事件：页面文档完全加载并解析完毕之后,会触发DOMContentLoaded事件，HTML文档不会等待样式文件,图片文件,子框架页面的加载，即此时文档还没有加载这些文件只加载解析了页面文档(对比load事件，其可以用来检测HTML页面是否完全加载完毕(fully-loaded))。
- 不明白这里的DOMContentLoaded事件为什么是o.DOMContentLoaded事件***待问卫国哥***
- 查看属性data-o-component的值为o-share的元素：在index.mustache中。

### (4)ftc-share/src/js/share.js

#### 1. 定义常量socialUrls

	const socialUrls = {
		wechat: {
			name: "微信",
			url: "http://www.ftchinese.com/m/corp/qrshare.html?title={{title}}&url={{url}}&ccode=2C1A1408"
		},
		weibo: {
			name: "微博",
			url: "http://service.weibo.com/share/share.php?&appkey=4221537403&url={{url}}&title=【{{title}}】{{summary}}&ralateUid=1698233740&source=FT中文网&sourceUrl=http://www.ftchinese.com/&content=utf8&ccode=2G139005"
		},
		linkedin: {
			name: "领英",
			url: "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{summary}}&source=FT中文网"
		},
		facebook: {
			name: "Facebook",
			url: "http://www.facebook.com/sharer.php?u={{url}}"
		},
		twitter: {
			name: "Twitter",
			url: "https://twitter.com/intent/tweet?url={{url}}&amp;text=【{{title}}】{{summary}}&amp;via=FTChinese"
		}
	};

其为一个对象

***疑问：为何这几个url的参数不一样？？***
#### 2.定义函数getOgContent(metaEl):获取指定元素（其实就是某个meta元素）的'content'属性值

	function getOgContent(metaEl) {//metaEl：为一个css选择器字符串或一个HTML元素变量
		if (!(metaEl instanceof HTMLElement)) {//如果metaEl不是元素变量，即如果其为css选择器字符串
			metaEl = document.querySelector(metaEl);//则选出该选择器可以选中的第一个元素
		}
		return metaEl.hasAttribute('content') ? metaEl.getAttribute('content') : '';//如果该元素具有'content'属性，则返回这个属性值；否则返回''
	}

##### 说明：
- 以getOgContent('meta[property="og:title"]')为例，index.mustache中的meta为：

		<meta property="og:title" content="{{ogTitle}}"/>
	而{{ogTitle}}的值是从data.json中取的，在data.json中有：

		"ogTitle": "FTC Share Demo",
	故getOgContent('meta[property="og:title"]')的结果为"FTC Share Demo"


##### 参数
- metaEl：为一个css选择器字符串或一个HTML元素变量


#### 3.定义常量对象defaultConfig

	const defaultConfig = {
		links: ['wechat', 'weibo', 'linkedin', 'facebook', 'twitter'],
	
		url: window.location.href || '',//当前页面的href
		summary: getOgContent('meta[property="og:description"]'),
		title: getOgContent('meta[property="og:title"]')//来自<meta>元素的content值，而该content值又来自data.json中的数据
	};

##### 说明：
- 函数getOgContent(metaEl）参见上述2.的定义
- 以getOgContent('meta[property="og:title"]')为例，index.mustache中的meta为：

		<meta property="og:title" content="{{ogTitle}}"/>
	而{{ogTitle}}的值是从data.json中取的，在data.json中有：

		"ogTitle": "FTC Share Demo",
	故getOgContent('meta[property="og:title"]')的结果为"FTC Share Demo"

#### 4.定义类Share

	class Share {//类名为Share

		///定义类的构造方法constructor
		constructor(rootEl, config) {

			///定义this.rootE1：其为一个指定元素（不指定就为body)，且该元素具有属性data-o-share--js值为''
			if (!rootEl) {//如果rootE1为false,则为其赋值document.body
				rootEl = document.body;
			} else if (!(rootEl instanceof HTMLElement)) {如果rootE1不是HTMLElement的类型（那就是选择器字符串），则获取该选择器可以选中的第一个元素
				rootEl = document.querySelector(rootEl);
			}
			rootEl.setAttribute('data-o-share--js', '');//为rootE1设置属性'data-o-share--js'的值为''
	
			this.rootEl = rootEl;//实例对象的rootE1属性值即为rootE1

			///定义this.config:其为包含rootE1属性信息的对象，形如{links:xx，url:xx，title:xx，summary:xx}
			if (!config) {//如果config为false
				config = {};//创建一个新对象，等于 config=new Object()

				config.links = rootEl.hasAttribute('data-o-share-links') ? rootEl.getAttribute('data-o-share-links').split(' ') : defaultConfig.links;//如果rootE1具有'data-o-share-links'属性，则config.links为'data-o-share-links'值以空格分隔的数组，否则为defaultConfig.linkes（见上定义）


				config.url = rootEl.getAttribute('data-o-share-url') || defaultConfig.url;//如果rootE1具有'data-o-share-url'属性，则config.url为'data-o-share-url'值，否则为defaultConfig.url
	
				config.title = rootEl.getAttribute('data-o-share-title') || defaultConfig.title;//如果rootE1具有'data-o-share-title'属性，则config.title为'data-o-share-title'值，否则为defaultConfig.title

				config.summary = rootEl.getAttribute('data-o-share-summary') || defaultConfig.summary;//如果rootE1具有'data-o-share-summary'属性，则config.title为'data-o-share-summary'值，否则为defaultConfig.summary
			}
			this.config = config;

			///定义this.openWindows
			this.openWindows = {};//this.openWindows为新的空的对象
	
			if (rootEl.children.length === 0) {//如果rootE1不含有子元素节点
				this.render();//在实例上执行render()和addClickEvent()
				this.addClickEvent();//***待看***
			}
		}
		
		///定义类的render方法：为rootE1元素增加一个ul列表子元素，该ul包含li包含a包含i,每一项分别对应defaultConfit.links数组的每项
		render() {
			const ulElement = document.createElement('ul');//创建一个ul元素为常量ulElement
	
			for (let i = 0, len = this.config.links.length; i < len; i++) {//遍历当前实例的config.links数组的每一项
				const link = this.config.links[i];//常量link存储config.links[i],eg:"wechat"
				const linkName = socialUrls[link].name;//常量linkName存储socialUrls[link].name,eg:"微信"
				
				const liElement = document.createElement('li');//创建一个li元素为常量liElement
				liElement.className = 'o-share__action o-share__' + link;//设置该li元素的class为"o-share_action o-share_(eg:wechat)"
				
				const aElement = document.createElement('a');//创建一个a元素为常量aElement
				aElement.href = this.generateSocialUrl(link);//设置该a元素的href为this.generateSocialUrl(link)
				aElement.setAttribute('title', '分享到'+linkName);//设置该a元素的title为， eg:分享到微信
				
				const iElement = document.createElement('i');//创建一个i元素为常量iElement
				iElement.innerHTML = linkName;//设置该i元素的innerHTML为linkName，eg:"微信"
				aElement.appendChild(iElement);//将该i元素添加为li元素的子元素
	
				liElement.appendChild(aElement);//将该a元素添加为li元素的子元素
				ulElement.appendChild(liElement);//将该li元素添加为ul元素的子元素
			}
			this.rootEl.appendChild(ulElement);//将该ul元素添加为rootE1元素的子元素
		}

		///定义类的addClickEvent方法：点击rootEl后，要执行shareSocial（target.href）
		addClickEvent() {
			this.rootEl.addEventListener('click', (e) => {
				var target = e.target;
				e.preventDefault();
				while (target.nodeName.toLowerCase() !== 'a') {//如果该target（即实际点击的元素)并不为a
					target = target.parentNode//则target指向当前元素的父元素
				}
				this.shareSocial(target.href);//当前实例执行shareSocial方法 ***待看***
			});
		}

		///定义类的shareSocial方法:打开指定url的一个新窗口
		shareSocial(url) {
			if (url) {//如果url存在
				if (this.openWindows[url] && !this.openWindows[url].closed) {//如果当前实例的openWindows对象的url对象存在，且该url属性的closed属性为false
					this.openWindows[url].focus();//对该openWindows[url]对象执行聚焦事件
				} else {
					this.openWindows[url] = window.open(url, '', 'width=646,height=436');//否则就以一个宽高固定的窗口打开该url地址
				}
			}
		}

		///定义类的generateSocialUrl方法:替换处理好socialUrls[(eg.wechat)].url中的{{xx}}
		generateSocialUrl (socialNetwork) {//参数可为eg:"wechat"
			let templateUrl = socialUrls[socialNetwork].url;//定义块级变量templateUrl为某一社交平台的url
			templateUrl = templateUrl.replace('{{url}}', encodeURIComponent(this.config.url))
				.replace('{{title}}', encodeURIComponent(this.config.title))
				.replace('{{summary}}', encodeURIComponent(this.config.summary));//将该url字符串中的几个字符串"{{url}}"/"{{title}}"/"{{summary}}"替换成编码过的当前实例的config的对应url/title/summary
	
			return templateUrl;
		}
		
		///定义类的静态方法init：对于指定el元素（不指定则为body)，选中其所有属性data-o-component的值为o-share的子元素，并对这些子元素创建Share类实例，最终返回这些Share实例构成的数组
		static init(el) {
			const shareInstances = [];//创建一个常量shareInstances为一个空数组
	
			if (!el) {//如果el为false,则el为document.body
				el =document.body;
			} else if (!el instanceof HTMLElement) {//如果el不是HTMLElement类型，即其为选择器字符串，则el获取满足该选择器的元素
				el = document.querySelector(el);
			}
	
			const shareElements = el.querySelectorAll('[data-o-component=o-share]');//创建一个常量shareElements,为所有"data-o-component"属性值为"o-share"的元素
	
			for (let i = 0; i < shareElements.length; i++) {
				shareInstances.push(new Share(shareElements[i]));//为每一个shareElements[i]（即所有"data-o-component"属性值为"o-share"的元素）创建Share类的实例，并push到shareInstances中
	
			}
	
			return shareInstances;//返回填充好的shareInstances数组
		}
		
	}

##### 说明
-  Class：为ES6内容，具体参见《ES6学习.md》的3.class，更多参见<http://es6.ruanyifeng.com/#docs/class>或
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>及红宝书P159
-  static关键字：Class的静态方法。**类相当于实例的原型，所有在类中定义的方法，都会被实例继承**。如果在一个方法前，**加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用**，这就称为“静态方法”。具体参见《ES6学习.md》的6.class的静态方法。
- 最终在html中动态生成的一组图标元素结构如下：

	 		<div class="o-share o-share--default" data-o-component="o-share">
				<ul>
					<li class="o-share_action o-share__wechat">
						<a href="http://www.ftchinese.com/m/corp/qrshare.html?title=FTC Share Demo&url=当前页面的url&ccode=2C1A1408" title="分享到微信">
							<i>
								微信
							</i>
						</a>
					</li>
					<li class="o-share_action o-share__weibo">
						<a href=".." title="分享到微博">
							<i>
								微博
							</i>
						</a>
					</li>
					...
				</ul>
	
			</div>

***待解决疑问：为什么i元素里的文字没有在图标上显示出来？***

## 4.css部分
### （1）ftc-share\gulpfile.js
任务sytles:将ftc-share/demos/src/demo.scss进行编译等等处理，最后得到ftc-share/.tmp/styles/demo.css

	gulp.task('styles', function styles() {
	  const DEST = '.tmp/styles';
	
	  return gulp.src('demos/src/demo.scss')
	    .pipe($.changed(DEST))
	    .pipe($.plumber())
	    .pipe($.sourcemaps.init({loadMaps:true}))
	    .pipe($.sass({
	      outputStyle: 'expanded',
	      precision: 10,
	      includePaths: ['bower_components']
	    }).on('error', $.sass.logError))
	    .pipe($.postcss([
	      cssnext({
	        features: {
	          colorRgba: false
	        }
	      })
	    ]))
	    .pipe($.sourcemaps.write('./'))
	    .pipe(gulp.dest(DEST))
	    .pipe(browserSync.stream({once: true}));
	});

最后在index.mustache的head中写入：

	<link rel="stylesheet" type="text/css" href="styles/demo.css">

### （2）ftc-share/demos/src/demo.scss
#### 源码

  @import "../../main";

导入ftc-share/main.scss

### (3)ftc-share/main.scss
####  源码

	@import "o-colors/main";
	@import "ftc-icons/main";
	
	@import "src/scss/variables";
	@import "src/scss/color";
	@import 'src/scss/functions';
	@import "src/scss/mixins";
	@import "src/scss/share";

导入各个scss

### （4）ftc-share/src/scss/_variables.scss
定义一系列变量

#### 源码

   	///silent模式：type为Boolea
	$o-share-is-silent: true !default;
	
	$o-share-link-size: 32px !default;
	$o-share-link-padding: 4px !default;
	
	$o-share-icon-size: 24px !default;
	$o-share-icon-radius: 50% !default;
	
	///可接受的社交网络图标的list.
	$o-share-icon-names: (wechat, weibo, linkedin, facebook, twitter);

#### 说明
- $o-share-icon-size是这样通过$o-share-link-size和$o-share-link-padding计算得到的： $o-share-link-size - 2 * $o-share-link-padding,即32-4*2

### (5)ftc-share/src/scss/_colors.scss

#### 选择颜色主题：$o-share-themes

	$o-share-themes: () !default;
	
	$o-share-themes: map-merge((
		default: (fill: 'white'),
		dark: (fill: 'white', background: 'transparent'),
		default-hover: (fill: 'white', background:'grey-tint1',  hover: 'default'),
	
		teal: (fill: 'white', background: 'grey-tint1', hover: 'teal-2'),
		
		tint: (fill: 'pink-tint4', background: 'transparent', hover: 'pink-tint2'),
	), $o-share-themes);


##### 说明：
- fill：用于设置svg的path的颜色；background：用于设置包裹icon的a元素的背景色；hover:用于设置a元素悬停时的颜色
- 设置的颜色将反馈给图标的默认颜色，其是在'ftc-icons'模块通过$o-icos-palette定义的
- 你应该至少设置'fill'或'background',否则会使用图标的默认颜色，这会使得图标不能分辨，因为其前景色和背景色会是一样的。

### （6）ftc-share/src/scss/_fuctions.scss

#### 1. 定义函数：@function oShareGetThemeCase($theme, $property)
获取某主题中某属性的pallete颜色,注意该颜色为o-color的pallete的颜色名而非css3中真正的颜色值。

	@function oShareGetThemeCase($theme, $property) {
		@if (not map-has-key($o-share-themes, $theme)) {//如果该$property参数不是$o-share-themes的key，那么返回null
			@return null;
		}
		$theme-value: map-get($o-share-themes, $theme);//获取某主题的颜色描述map，即$theme这个key对应键值，eg.(fill: 'white', background: 'transparent')

		$color-name: map-get($theme-value, $property);//获取该主题颜色描述map中指定某项属性（eg. fill/background/hover）的值
	
		@if ($color-name == null) {
			@return null;
		}
		@return $color-name;
	}

##### 参数
- $theme: 为o-share的主题之一，即$o-share-themes这个map的其中一个key值
- $property:为主题中设定的某项属性名称，即fill/background/hover之一

#### 2. 定义函数：@function oShareGetColorFor($theme,$property)
获取指定主题的指定属性的Css3颜色值

	@function oShareGetColorFor($theme, $property) {
		
		$color-name: oShareGetThemeCase($theme, $property);//获取指定主题的指定属性的颜色值
	
		@if ($color-name == null) {//如果$color-name值为null，则返回false
			@return false;
		}
	
		@if ($color-name == 'default') {//如果$color-name为'default'，则返回default
			@return $color-name;
		}

		@return oColorsGetPaletteColor($color-name);//如果$color-name不为false则返回palette中该颜色名的css3颜色值。

	}

##### 说明
- 函数oColorsGetPaletteColor的定义在o-color模块中，分析说明详见《Origami2_ocolor.md》


##### 参数
- $theme: 为o-share的主题之一，即$o-share-themes这个map的其中一个key值
- $property:为主题中设定的某项属性名称，即fill/background/hover之一

### （7）ftc-share/src/scss/_mixins.scss

#### 1.定义混合器:@mixin oShareCustomBase($classname: o-share)
使得某样式块可以出现在.#{classname}_action a的选择器中

	@mixin oShareCustomBase($classname: o-share) {
		.#{$classname}__action {
			a {
				@content;
			}
		}
	}
##### 说明：
- 关于@content的说明，见《SASS学习.md》的10.4）
- ***下述用法举例不知道对不对，对于@content的理解有待加强**

##### 用法举例：***仅根据自己的理解***

	@include oShareCustomBase{
		oShareSetIconStyle {
			padding: 10px;
			background-color: #000000;
			border-radius: 50%;
			i {
			  	width: 30px;
				height: 30px;
			}
		}
	}

解析为：
	
	.o-share_action a .oShareSetIconStyle {
		padding: 10px;
		background-color: #000000;
		border-radius: 50%;
	}
	
	.o-share_action a .oShareSetIconStyle i {
	  	width: 30px;
		height: 30px;
	}

#### 2.定义混合器@mixin oShareSetIconBackground
设置图标的a元素的background值

	@mixin oShareSetIconBackground($name, $color:'default', $classname: o-share) {
		.#{$classname}__#{$name} {

			@if $color == 'default' {//如果$color值为'default'
				$iconname: 'social-'+$name;//设置$iconname为$o-color-pallete中的一个颜色名称
				$color: oColorsGetPaletteColor($iconname);//得到$iconname在$o-color-pallete对应的CSS3颜色值
			}
			a {
				background-color: $color;
			}
		}
	}
##### 说明
- 函数oColorsGetPaletteColor的定义在o-color模块中，用于获取指定颜色名称在$o-color-pallete对应的CSS3颜色值，分析说明详见《Origami2_ocolor.md》

##### 参数
- $name:type为String,为$o-share-icon-names中的其中一个，$o-share-icon-names: (wechat, weibo, linkedin, facebook, twitter)，定义于$ftc-share/src/scss/_variables.scss
- $color:type为String,需要时一个十六进制值。用于设置图标之下的背景色。我们建议使用o-colors函数

#### 3.定义混合器@mixin oShareSetTheme
更改或添加$o-share-themes中的主题内容。

	@mixin oShareSetTheme($theme, $property, $color) {
		$propmap: ($property: $color);//把$property和$color组成一个map
	
		@if (map-has-key($o-share-themes, $theme)) {//如果$o-share-themes中具有该$theme
			$propmap: map-merge(map-get($o-share-themes, $theme), $propmap);//把$o-share-themes中的该theme值更新为该$propmap
		}
	
		$newmap: ($theme: $propmap);//如果$o-share-themes中没有这个$theme，则将其拼成新的theme的map
	
		$o-share-themes: map-merge($o-share-themes, $newmap) !global;//将新theme map添加到$o-share-themes
	}

##### 参数
- $theme:type为String,为o-share的主题之一，即$o-share-themes这个map的其中一个key值
- $property:type为String,为该主题要应用于的属性，为'fill'/'background'/'hover'其中之一
- $color:type为$color,为$o-colors-palette中的颜色名之一

#### 4.定义混合器oShareSetIconGap
定义图标间距。

	@mixin oShareSetIconGap($padding, $classname: o-share) {
		.#{$classname}__action {
			a {
				padding: $padding + 0px;
			}
		}
	}

解析后得到：

	.o-share__action a{
		padding:xx px
	}
##### 参数
- $padding:这是包含icon图标的a元素的padding值。


#### 5. 设置图标边框半径

	@mixin oShareSetIconRadius($radius, $classname: o-share) {
		.#{$classname}__action {
			a {
				border-radius: $radius;
			}
		}
	}

##### 参数
- $radius:一个px或%值，这将设置包围图标的a元素的border半径。

#### 6.定义混合器oShareSetIconSize


	@mixin oShareSetIconSize($width, $height:null, $classname: o-share) {

		@if ($height == null) {
			$height: $width
		}
		.#{$classname}__action {
			i {
				width: $width + 0px;
				height: $height + 0px;
			}
		} 
	}
##### 说明
- $o-share-icon-size在_variables.scss中设置

##### 参数
- $width:设置图标包含的元素的宽度，默认通过$o-share-icon-size设置为24px
- $height:设置图标包含的元素的高度，默认是null，使用$width的值。

### (8)ftc-share/src/scss/share.scss

#### 1. 定义基本的混合器oShareBase

产生基本的share样式。

**如果你想要自定义所有图标的观感，就需要为混合器oShareCustomBase传递内容块。**

	@mixin oShareBase($classname: o-share) {
		.#{$classname} {//就是.o-share
			display: inline-block;
			ul {
				margin: 0;
				padding: 0;
				// Clearfix:***不懂这是啥意思???***
				&:after {
					clear: both;
					content: '';
					display: table;
				}
			}
		}
		.#{$classname}__action {//就是.o-share_action
		// Float everything to avoid gaps in HTML.:***也不是很懂这样做的目的？***
			float: left;
			margin: 0 5px 0 0;
			list-style-type: none;
			
			i {
				float: left;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: 50%;
	
				width: $o-share-icon-size;//默认为24px，在_variables.scss中定义的
				height: $o-share-icon-size;
				text-indent: -($o-share-icon-size * 1000);//首行缩进24000px，目的是把图标上的文字“微信”“微博”这种移到右右右右右边去
				white-space: nowrap;
				overflow: hidden;
			}//这里id的background-image是动态生成的
			a {
				float: left;
				text-decoration: none;
				padding: 4px;			
				border-radius: $o-share-icon-radius;
				&:hover {
					opacity: 0.8;
				}
			}
		}	
	}

##### 说明：

- css属性text-indent：规定文本块中首行文本的缩进。eg:

		p{
		  text-indent:50px;
		}

##### 参数
- $classname:基本的class名称，默认为o-share

#### 2. 定义混合器oShareIconFor
设定某主题(e.g. dark/teal)下某社交网站图标（eg.wechat)的相关样式

	@mixin oShareIconFor($name, $theme: 'default', $classname: o-share) {
		$iconname: "social-" + $name;//即为social_wechat
	
		$fill: oColorsGetPaletteColor($iconname);//返回palette中该颜色名的css3颜色值。
		$background: oColorsGetPaletteColor($iconname);
		$hover: oColorsGetPaletteColor($iconname);

	
		@if ($theme == null) {
			$theme: 'default';
		}
		
		$theme-fill: oShareGetColorFor($theme, fill);//获取$theme主题中fill属性的css颜色值
		$theme-background: oShareGetColorFor($theme, background);
		$theme-hover: oShareGetColorFor($theme, hover);
	
		@if($theme-fill and ($theme-fill != 'default')) {
			$fill: $theme-fill;//如果$theme-fill存在且$theme-fill不为default，则将$fill重新赋值为$theme-fill
		}
		@if($theme-background and ($theme-background != 'default')) 
			$background: $theme-background//如果$theme-background存在且$theme-ground不为default，则将$background重新赋值为$theme-background
		}
		@if($theme-hover and ($theme-hover != 'default')) {
			$hover: $theme-hover;//如果$theme-hover存在且其不为default，则将$hover重新赋值为$theme-hover
		}
	
		.#{$classname}__#{$name} {//.o-share_wechat
			a {	
				background-color: $background;
				@if ($theme-hover) {
					&:hover {
						background-color: $hover;
					}					
				}
			}
			i {
				background-image: sassvg($iconname, $fillcolor: $fill);//来自ftc-icon模块，待看该模块
			}
		}
	}
##### 说明
- 函数oColorsGetPaletteColor的定义在o-color模块中，用于获取指定颜色名称在$o-color-pallete对应的CSS3颜色值，分析说明详见《Origami2_ocolor.md》。
- 函数oShareGetColorFor($theme,$property)定义在_function.css中，获取指定主题的指定属性的Css3颜色值。
- 函数sassvg在ftc-icons模块中定义，用于创建动态svg。定义代码为于ftc-icons\scss\sassvg\_sasssvg.scss。

##### 参数
- $name:type为String,是$o-share-icon-names之一，$o-share-icon-names在_variables.scss中定义：

		$o-share-icon-names: (wechat, weibo, linkedin, facebook, twitter);
- $theme:type为String,是$o-share-themes之一，$o-share-themes在_color.css中定义：

		$o-share-themes: map-merge((
			default: (fill: 'white'),
			dark: (fill: 'white', background: 'transparent'),
			default-hover: (fill: 'white', background:'grey-tint1',  hover: 'default'),
		
			teal: (fill: 'white', background: 'grey-tint1', hover: 'teal-2'),
			
			tint: (fill: 'pink-tint4', background: 'transparent', hover: 'pink-tint2'),
		), $o-share-themes);
- $classname:class名称，默认为.o-share


#### 3. 定义一系列混合器：用于预设一系列主题
混合器oShareIconDefault:创建每个社交网站图标的默认样式

		@mixin oShareIconDefault {
			@each $name in $o-share-icon-names {//遍历(wechat, weibo, linkedin, facebook, twitter)
				@include oShareIconFor($name);//对每一个社交网站名称(eg.wechat)引用oShareIconFor,$theme为default
			}
		}

混合器oShareIconTeal:创建每个社交网站图标的teal主题的样式

		@mixin oShareIconTeal {
			@each $name in $o-share-icon-names {
				@include oShareIconFor($name, teal);
			}
		}

混合器oShareIconTint:创建每个社交网站图标的tint主题的样式

		@mixin oShareIconTint {
			@each $name in $o-share-icon-names {
				@include oShareIconFor($name, tint);
			}
			@include oShareCustomBase {
				border-radius: 3px;
			}
			
		}

混合器oShareIconDark:创建每个社交网站图标的dark主题的样式

		@mixin oShareIconDark {
			@each $name in $o-share-icon-names {
				@include oShareIconFor($name, dark);
			}
			@include oShareCustomBase {
				border: 1px solid #fff;
			}
		}	

#### 4. 定义混合器oShareSpriteBase和oShareSpriteIcon
设置svg主题的图标样式

***svg相关知识学习，暂略***

	@mixin oShareSpriteBase($radius: null, $width: $o-share-icon-size, $height: $o-share-icon-size, $classname: o-share) {

		.#{$classname} {
			display: inline-block;
			ul {
				margin: 0;
				padding: 0;
				// Clearfix
				&:after {
					clear: both;
					content: '';
					display: table;
				}
			}
		}
	
		.#{$classname}__action {
			float: left;
			margin: 0 5px 0 0;
			list-style-type: none;
	
			i {
				display: none;
			}
			svg {
				float: left;
				width: $width;
				height: $height;
				background-color: transparent;
			}
			a {
				float: left;
				text-decoration: none;
				padding: 4px;
				@if ($radius != null) {
					border-radius: $radius;
				}
			}
			@content;
		}
	}
	
	@mixin oShareSpriteIcon($name, $classname: o-share) {
		$iconname: "social-" + $name;
	
		$iconcolor: oColorsGetPaletteColor($iconname);
	
		.#{$classname}__#{$name} {
			a {
				background-color: $iconcolor;
			}
			svg {
				fill: oColorsGetPaletteColor('white');
			}
		}
	}






		

