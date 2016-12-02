# NEXT项目学习
参考资源链接：

- node原生模块学习：<https://nodejs.org/docs/latest/api/>
- npm上的各种node模块学习：<https://www.npmjs.com/package/browser-sync>
## 1. gulpfile.js
### 1.函数 getUrltoFile
向目标url发出请求得到数据，并将数据写入指定文件

	function getUrltoFile (urlSource, fileName) {

	 ///定义一个对象option（其中用到了url模块），其即为urlSource解析而成的对象
	  var options = {
	      host: url.parse(urlSource).hostname,
	      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
	  }
	  console.log (options.path);

	 ///获取向urlSource请求得到的数据，并将数据写入fileName
	  var request = http.request(options, function (res) {
	      var data = '';
	      res.on('data', function (chunk) {//连续获取从服务器请求得到的数据chunk
	          data += chunk;
	      });
	      //console.log (data);
	      res.on('end', function () {
	        var fs = require('fs');
	        fs.writeFile(fileName, data, function(err) {//数据获取完毕后写入文件filename
	            if(err) {
	                return console.log(err);
	            }
	            console.log(urlSource);
	            console.log('writen to');
	            console.log(fileName);
	        });
	      });
	  });
	  request.on('error', function (e) {
	      console.log(e.message);
	  });
	  request.end();
	}

#### 说明：
- url模块：node原生模块，详见《node模块学习.md》29.
- unescape(string)函数：为JavaScript全局对象，可对通过escape编码的字符串进行解码。参数类型为String,必需。Eg:
		
		var test1="Visit W3School!"
		
		test1=escape(test1)
		document.write (test1)//Visit%20W3School%21
		
		test1=unescape(test1)
		document.write(test1)//Visit W3School!
	
	ECMAScript3已从标准中删除了它，反对使用它。应该用decodeURI()和decodeURIComponent()取而代之。

	详见<http://www.w3school.com.cn/jsref/jsref_unescape.asp>

- fs模块：node原生模块

#### 参数
- urlSource:获取数据的目标url字符串
- fileName：写入数据的目标文件
	
### 2. 任务origami
向origami网站请求所需o-gallery模块数据,并写入路径./app/origami/o-gallery

	gulp.task('origami', function () {
	  getUrltoFile('http://origami-build.ft.com/v2/bundles/js?modules=o-gallery@^1.7.6', './app/origami/o-gallery.js');
	  getUrltoFile('http://origami-build.ft.com/v2/bundles/css?modules=o-gallery@^1.7.6', './app/origami/o-gallery.css');
	});

### 3.函数 getBodyFromUrl(urlSource,fileName)
从'app/index.html'读取文件内容，并用urlSource指定的文件的body部分替换掉
app/index.html的body部分，然后输出到fileName指定的文件里。

	function getBodyFromUrl (urlSource, fileName) {

	  var options = {
	      host: url.parse(urlSource).hostname,
	      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
	  }
	  console.log (options.path);
	  var req = http.request(options, function (res) {
	      var data = '';
	      res.on('data', function (chunk) {
	          data += chunk;
	      });
	      res.on('end', function () {
	        var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;//指定一个正则表达式pattern
	        var array_matches = pattern.exec(data);//对从urlSource获取的数据按照pattern进行捕获

	        var fileContent = fs.readFileSync('app/index.html', 'utf8');//同步读取app/index.html，这样好在读完后再进行下一步
	        fileContent = fileContent.replace(pattern, array_matches[0]);//将读取的app/index.html中符合pattern形式的部分替换为array_matches[0]

	        fs.writeFile(fileName, fileContent, function(err) {//将fileContent写入文件fileName
	            if(err) {
	                return console.log(err);
	            }
	            console.log(urlSource);
	            console.log('writen to');
	            console.log(fileName);
	        });
	      });
	  });
	  req.on('error', function (e) {
	      console.log(e.message);
	  });
     
	  req.end();
	}

### 4.任务home
用"http://www.ftchinese.com/m/corp/p0.html?'+thedatestamp"的body来替换app/index.html的body

	gulp.task('home',function(){
		var thedatestamp=new Date().getTime();//返回当前日期的毫秒数，这其实是为了随便产生一个数，好让下面这个网址"http://www.ftchinese.com/m/corp/"没有缓存
		getBodyFromUrl('http://www.ftchinese.com/m/corp/p0.html?'+thedatestamp,'index.html')
	})

#### 疑问：
- 为什么要用"http://www.ftchinese.com/m/corp/p0.html?'+thedatestamp"的body来替换app/index.html的body?（***已解决***）

**答案：** 为了修改方便，http://www.ftchinese.com/m/corp/p0.html对应的文件夹路径是dev_www/frontend/tpl/corp/p0.html,然后这个p0.html含有一句话

	<%include file="next/html/manual.html"%>

这句话是引用了 "dev_www/frontend/tpl/next/html/manual.html"文件。那么修改的时候就直接修改这个manual.html就行了。而这个"dev_www/frontend/tpl/next/html/manual.html"文件又是由NEXT的"app/templates/html/manual.html"拷贝过去的。

关于manual.html见下 二级标题2.
### 5. 任务copy
在任务build完成的前提下才能执行，就是对一些文件拷贝到正式环境中

	gulp.task('copy', ['build'], function () {//gulp3.+的写法，即任务copy执行前先执行任务build

	  var thedatestamp = new Date().getTime();//当前日期的毫秒数
	
	  gulp.src('app/origami/*.css')//把'app/origami/*.css'拷入服务器上的这几个地方
	    .pipe(gulp.dest('../dev_www/frontend/static/n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/styles'));
	  
	  gulp.src('app/origami/*.js')//把'app/origami/*.js'拷入服务器这几个地方
	    .pipe(gulp.dest('../dev_www/frontend/static/n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/scripts'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/scripts'));
	
	  gulp.src('dist/styles/*.css')//把'dist/styles/*.css'拷入服务器的这几个地方
	    .pipe(gulp.dest('../dev_www/frontend/static/n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/styles'));
	
	  gulp.src('dist/styles/partials/*.css')//把dist/styles/partials/*.css'拷入服务器的这几个地方
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/styles'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/styles'));
	
	  gulp.src('dist/scripts/*.js')
	    .pipe(gulp.dest('../dev_www/frontend/static/n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/scripts'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/scripts'));
	
	  gulp.src('dist/m/marketing/*')// 把"dist/m/marketing/"下的html文件，拷入下面两个地方，因为广告就是html文件，所以不需要像js和css那样通过static网址引用
	    .pipe(gulp.dest('../dev_www/frontend/tpl/marketing'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/marketing'));
	
	  gulp.src('app/api/page/*')//把"app/api/page/*"下的json文件，拷入下面两个地方
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/api/page'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/api/page'));
	
	  gulp.src('dist/**/*')//把dist下的所有文件都拷贝到后台cms和测试后台的pagemaker中
	    .pipe(gulp.dest('../dev_cms/pagemaker'))
	    .pipe(gulp.dest('../testing/dev_cms/pagemaker'));
	
	  gulp.src('app/api/**/*')//把app/api下的所有文件（都是json文件）拷入后台和测试后台的"pagemaker/api"中
	    .pipe(gulp.dest('../dev_cms/pagemaker/api'))
	    .pipe(gulp.dest('..testing/dev_cms/pagemaker/api'));
	
	  gulp.src('app/templates/p0.html')//把app/templates下的p0.html文件进行正则替换后拷入正式环境和测试环境的frontend/tpl/corp中
	    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
	    .pipe($.replace(/(\r\n)+/g, '\r\n'))
	    .pipe($.replace(/(\n)+/g, '\n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/corp'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/corp'));
	
	  gulp.src('app/templates/partials/**/*')//把app/templates/partials下的html文件进行正则处理后拷入正式和测试环境的frontend/tpl/next/partials中
	    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
	    .pipe($.replace(/(\r\n)+/g, '\r\n'))
	    .pipe($.replace(/(\n)+/g, '\n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/partials'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/partials'));
	
	  gulp.src('app/templates/html/**/*')//把app/templates/html下的html文件进行正则处理后拷入正式的和测试环境的frontend/tpl/next/html中
	    .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))
	    .pipe($.replace(/(\r\n)+/g, '\r\n'))
	    .pipe($.replace(/(\n)+/g, '\n'))
	    .pipe(gulp.dest('../dev_www/frontend/tpl/next/html'))
	    .pipe(gulp.dest('../testing/dev_www/frontend/tpl/next/html'));
	
	
	  var fileName = '../dev_www/frontend/tpl/next/timestamp/timestamp.html';
	  var fileName2 = '../testing/dev_www/frontend/tpl/next/timestamp/timestamp.html';
	  
	  fs.writeFile(fileName, thedatestamp, function(err) {//把当前日期的毫秒数thedatestamp写入fileName（即正式环境的'/frontend/tpl/next/timestamp/timestamp.html')中
	      if(err) {
	          return console.log(err);
	      }
	      console.log(thedatestamp);
	      console.log('writen to');
	      console.log(fileName);
	  });
	  fs.writeFile(fileName2, thedatestamp, function(err) {//把当前日期的毫秒数thedatestamp写入fileName2（即测试环境的'/frontend/tpl/next/timestamp/timestamp.html')
	      if(err) {
	          return console.log(err);
	      }
	      console.log(thedatestamp);
	      console.log('writen to');
	      console.log(fileName2);
	  });
	
	});
#### 说明：
1. css和js每个文件都拷贝三份：
	1. '../dev_www/frontend/static/n'：用于外链引用静态资源，就是可以从www.static.chinese.com/下引用静态文件。
	2. '../dev_www/frontend/tpl/next/styles':用于文档内嵌样式
	3. '../testing/dev_www/frontend/tpl/next/styles'：测试环境中拷贝一份和正式环境中一模一样路径的静态文件。
	  
2. 关于这几个正则替换的作用

		 .pipe($.replace(/([\r\n])[ \t]+/g, '$1'))//将包含\r或\n再加上若干\t的地方，全都用第一个捕获组[\r\n]替换
		    .pipe($.replace(/(\r\n)+/g, '\r\n'))//把有多个\r\n的地方，替换为一个\r\n
		    .pipe($.replace(/(\n)+/g, '\n'))//把有多个\n的地方，替换为一个\n
		
    效果***待自己实操***
		
#### 新疑问
1. app下的api是专门存放json文件的哈，ga存放谷歌分析相关数据，page存放页面数据对吗？这是自己写的吗？

### 6.任务story ***没用任务***
获取backyard中当前日期条件下的指定网页（e.g.<https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/2016-8-24>)中的json数据，并将其写入到'./app/api/page/stories.json'。

		gulp.task('story', function () {
			  var thisday = new Date();//获取当前日期和时间
			  var theyear = thisday.getFullYear();//获取当前4位数的年份
			  var themonth = thisday.getMonth() + 1;//获取当前月份，因为0表示1月，故这里要+1
			  var theday =  thisday.getDate();//返回当前日期中的天数（1到31）
			  var thedatestamp = theyear + '-' + themonth + '-' + theday;//按照Y-M-D的形式拼成时间戳
		
			  var urlSource = 'https://backyard.ftchinese.com/falcon.php/cmsusers/login';//其位置为cms\libs\smarty\templates,为backyard的登录界面
			  
			  ////以下用到http模块和url模块
			  var options = {
			      host: url.parse(urlSource).hostname,
			      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
			  }
	
	
		  	////以下用到request模块
			request.post({//这一步是完成了登录的过程吗？没懂。。。实现不了自动化的登录，所以不行
			    url: 'https://backyard.ftchinese.com/falcon.php/cmsusers/login',//请求的目标地址即backyard登录页面
			    form: {"username":"", "password":""},
			    headers: {//设置请求头
			      'User-Agent': 'request'
			    }
			}, function(error, response, body){
			    var storyapi = 'https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/' + thedatestamp;//值为https://backyard.ftchinese.com/falcon.php/homepage/getstoryapi/2016-8-24，是白色网页上面只有一堆json数据
		
		    	var headers = {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
				'Cache-Control':'max-age=0',
				'Connection':'keep-alive',
				'Cookie':'FTSTAT_ok_times=22; _ga=GA1.3.637326541.1424081173; campaign=2015spring5; _gscu_2081532775=0.7.0.5%7C2483082596632ej013%7C1424859625967%7C8%7C3%7C27%7C0; __utma=65529209.637326541.1424081173.1449122460.1454643214.25; __utmz=65529209.1449122460.24.6.utmcsr=EmailNewsletter|utmccn=1D110215|utmcmd=referral; __utmv=65529209.visitor_DailyEmail; __gads=ID=cd878295be28de40:T=1454986613:S=ALNI_MbkpbmkeeFOrhk1DVu05zuKdgqPmw; SIVISITOR=Ni42NzQuOTg3MjQ2MjgyMzk4Ny4xNDU0OTg2NjE0Mzc0Li0xZDZkODE5Ng__*; ccode=1P110215; faid=97e09ef664648f4bcc02a418e06717d3; ftn_cookie_id=1455247531.176777595; PHPSESSID=f8b0d2f63c554af8a5c8ef8a79b4c4bb; _ga=GA1.2.637326541.1424081173; ftcms_uid=13; ftcms_username=oliver.zhang; ftcms_groups=editor',//为啥要设置这么多cookie?这些cookie都是代表啥意思啊。。。。这些cookie都已经过期了没有用
				'Host':'backyard.ftchinese.com',
				'Upgrade-Insecure-Requests':'1',
		     }
		
		    
			    request.get({//在回调函数中使用request.get，即等到前面request.post执行完了才再执行request.get，作用为获取storyapi的json数据
			        url: storyapi,//url为前述拼好的storyapi的
			        headers: headers//headers为前述设置好的headers
			    },function(error, response, body){
			
			        var fileName = './app/api/page/stories.json';
			        fs.writeFile(fileName, body, function(err) {//将获取的json数据写入'./app/api/page/stories.json'
			            if(err) {
			                return console.log(err);
			            }
			            console.log(storyapi);
			            console.log('writen to');
			            console.log(fileName);
			        });
			    });
			    
			
			});
			
		});


这个任务可以先略，因为无法实现自动登录backyard这一过程，所以不能完成获取json的数据。

### 7.函数postDatatoFile(urlSource, postData, fileName)

发送json数据postData到urlSource，并将从urlSource返回的数据写入文件fileName。

	function postDatatoFile (urlSource, postData, fileName) {
	  var url = require('url');
	  var querystring = require('querystring');
	  var post_data = JSON.stringify(postData);//把postData对象处理为Json字符串
	  var http = require('http');
	  var options = {
	      host: url.parse(urlSource).hostname,
	      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search),
	      method: 'post',
	      headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': post_data.length
	      }
	  }
	  var request = http.request(options, function (res) {//从urlSource获取数据data
	      var data = '';
	      res.on('data', function (chunk) {
	          data += chunk;
	      });
	      res.on('end', function () {
	        var fs = require('fs');
	        fs.writeFile(fileName, data, function(err) {//把获取的数据data写入fileName
	            if(err) {
	                return console.log(err);
	            }
	            console.log(urlSource);
	            console.log('post data writen to');
	            console.log('fileName');
	        }); 
	      });
	  });
	  request.on('error', function (e) {
	      console.log(e.message);
	  });
	  request.write(post_data);//发送数据post_data到urlSource
	  request.end();
	}

#### 参数
- postData：类型为Object，为要发送的数据对象
- urlSource:发送请求的目标url
- fileName:请求获取的数据写入的目标文件

#### 疑问***先自己研究***
关于node的http模块，到底什么时候用http模块的request什么时候用request模块？

### 8.任务'nav'
将数据message发送到'http://m.ftchinese.com/eaclient/apijson.php'，并将其返回的数据写入'./app/api/page/nav.json'

	gulp.task('nav', function () {
	
	  var message = {};
	  message.head = {};
	  message.head.transactiontype = '11001';
	  message.head.source = 'web';
	  message.body = {};
	  message.body.ielement = {};

	  postDatatoFile('http://m.ftchinese.com/eaclient/apijson.php', message, './app/api/page/nav.json');
	});


#### 疑问：
- 该nav.json存储的数据是干嘛用的？
- 处理post_data的apijson.php是怎样的，为什么放在http://m.ftchinese.com下

### 9.任务style
将来自'app/styles/main*.scss'的scss文件处理为css文件输出到'.tmp/styles'。

	gulp.task('styles', function () {
	  const DEST = '.tmp/styles';
	
	  return gulp.src(['app/styles/main*.scss'])
	    .pipe($.changed(DEST)) //来自gulp-changed模块，只处理改变的文件
	    .pipe($.plumber()) //来自gulp-plumber模块，防止管道因为来自gulp插件的错误而导致的中断。

	    .pipe($.sourcemaps.init({loadMaps:true})) //gulp-sourcemaps模块，把一些方法打包，然后这些浏览器端不支持的方法就可以在浏览器端使用了
	    .pipe($.sass({ //gulp-sass模块，处理sass为css
	      outputStyle: 'expanded',//最常用的输出风格
	      precision: 10,//用于决定最终CSS文件中的小数位数
	      includePaths: ['bower_components']//Sass编译器可以据此决定@import的路径。
	    }).on('error', $.sass.logError))
	    .pipe($.postcss([//gulp-postcss模块：将CSS输送到好几个处理器，但只解析一次CSS,这个处理器此处就是cssnext生成的
	      cssnext({ //postcss-cssnext模块：是PostCSS模块的插件，帮助你使用最新的CSS语法。它会将CSS转换成兼容性更好的CSS，这样你就不需要等待浏览器的支持了。
	        features: {
	          colorRgba: false
	        }
	      })
	    ]))
	    .pipe($.sourcemaps.write('./'))//和$.sourcemaps.init（）是配对使用的
	    .pipe(gulp.dest(DEST)); 
	});

#### 疑问
- 这么多css文件分别是啥作用？为什么不弄一个总的scss文件导入其他scss呢？问帆总（***已问***）

这些css基本按照功能划分，然后带main-的都是最后要用的，其他的都是被main-引用的文件。

### 10.任务ad
将一堆(好像是广告的）html文件从'app/m/marketing/*'复制到'dist/m/marketing'

	gulp.task('ad', function () {
	  return gulp.src('app/m/marketing/*')
	    .pipe(gulp.dest('dist/m/marketing'));
	});
#### 疑问：
这个路径里面的6个html文件是都是广告的吗？这个路径的作用是什么，是专门放广告吗？

#### 说明：
广告的逻辑是可以看scripts下的ad.js文件。

### 11. 任务jshint

	gulp.task('jshint', function () {
	  return gulp.src('app/scripts/**/*.js')
	    .pipe($.jshint())
	    .pipe($.jshint.reporter('jshint-stylish'))
	    .pipe($.jshint.reporter('fail'));
	});

#### 说明：
- gulp-jshint模块：其用来检测JavaScript代码中的错误和潜在问题

#### 疑问：
- app/scripts中的js文件都直接放在app/scripts/下，没有放在app/scripts/**/下呀？？
- 这些js分别是干什么用的？按照什么来划分的不同的js文件？
- 最后没有什么都没有输出是不是说明js没有什么问题？


### 12.任务html
将'app/*.html'中引入的js,css及html本身进行压缩优化。将app下的html文件、app下的styles下的css文件、app下的scripts下的js文件，以及.tmp下的css文件都经过压缩后输出到dist下

此处在执行任务'html'之前是要先执行任务'styles'。

	gulp.task('html', ['styles'], function () {
	  return gulp.src('app/*.html')
	    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
	    .pipe($.if('*.js', $.uglify()))
	    .on('error', $.util.log)
	    .pipe($.if('*.css', $.cssnano()))
	    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
	    .pipe(gulp.dest('dist'));
	});
	
#### 说明：
- gulp-useref模块：解析HTML文件中的构建块，以替换未经优化的scripts和stylesheets，详见《node模块学习.md》中的17.
- gulp-if模块：处理指定的资源，还是见《node模块学习.md》中的17.
- gulp-uglify模块：压缩文件
- gulp-util模块:提供了一些针对gulp插件的有用的函数。
- gulp-cssnano模块：压缩css
- gulp-htmlmin模块：压缩html
- html主要就有三个：首页index.html,频道页tag.html，文章页story.html

### 13.任务images
把app/images下的图片进行压缩，然后输出到dist/images下
	gulp.task('images', function () {
	  return gulp.src('app/images/**/*')
	    .pipe($.cache($.imagemin({
	      progressive: true,
	      interlaced: true
	    })))
	    .pipe(gulp.dest('dist/images'));
	});

#### 说明
- gulp-imagemin模块：压缩png,gpeg,gif和svg图片。详见《node模块学习.md》16.
- gulp-cache模块:针对gulp的缓存代理插件

#### 疑问
- 这里为啥要使用catche模块，为什么不直接就pipe($.imagemin({...}))呢？
- 这里的'app/images/\*\*/\*'从实际效果来看是取到了'app/images/\*'，感觉/\*\*/\*应该是取了两层才对。。。哪里又讲这个\*/的用法的？？（***这个先自己研究***）

### 14.任务fonts

	gulp.task('fonts', function () {
	  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
	    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
	    .pipe($.flatten())
	    .pipe(gulp.dest('dist/fonts'));
	});

#### 说明：
- 模块main-bower-files：从你安装的bower包中获取主文件。
- concat是连接字符串的方法
- gulp-filter模块：该模块可以使用通配符过滤原始文件。
- gulp-flatten模块:移除或替换文件的相关路径。

#### 疑问
- 还不太懂模块main-bower-files包，此处'main-bower-files'获取的主文件是什么？是bower.json文件中指定的'main'字段吗？这里我指定了main，但结果却是'[]'
- 这里并无fonts相关文件夹，是不是这个任务时没用的？

### 15.任务extras ***没用***

	gulp.task('extras', function () {
	  return gulp.src([
	    'app/*.*',
	    '!app/*.html',
	    'node_modules/apache-server-configs/dist/.htaccess'
	  ], {
	    dot: true
	  }).pipe(gulp.dest('dist'));
	});


#### 疑问
- '!app/*.html':这个是啥意思
- 还不是很懂这个任务的作用***先自己研究***

### 16.任务del
删除'.tmp','dist'路径下的内容。

	gulp.task('clean', function() {
	  return del(['.tmp/**', 'dist']).then(()=>{
	    console.log('dir .tmp and dist deleted');
	  });
	});

#### 疑问
- 这里是吧.tmp和dist两个文件夹整个删除了，那么.tmp/\*\*和.tmp/有何区别呢？这里关于\*的通配符的规律在哪里学习呢？***自己学习***

### 17.任务connect
先执行任务styles，再执行一些对静态文件的优化工作，然后监听本地9000端口，然后就可以在 http://localhost:9000看到最后的效果。

	gulp.task('connect', ['styles'], function () {//先进行styles任务再进行下面的任务
	  var serveStatic = require('serve-static');
	  var serveIndex = require('serve-index');
	  var app = require('connect')()
	    .use(require('connect-livereload')({port: 35729}))//从35729端口下载script
	    .use(serveStatic('.tmp'))//为.tmp提供服务
	    .use(serveStatic('app'))//为app提供服务
	    .use('/bower_components', serveStatic('bower_components'))//看不懂。。？？
	    .use(serveIndex('app'));
	  require('http').createServer(app)//感觉这个app就是提供了这个本地服务器的文件路径的作用，不知道对不对。。。
	    .listen(9000, '0.0.0.0')
	    .on('listening', function () {
	      console.log('Started connect web server on http://localhost:9000');
	    });
	});


#### 说明
- serve-static模块：为静态文件提供服务。
- serve-index模块：为目录列表提供服务。
- connect模块:高性能中间件框架。看书《Nodejs实战》第6章。
- connect-livereload模块：是一个connect中间件，用于为响应添加动态加载的script。
- http模块：node原生模块，参见<https://nodejs.org/docs/latest/api/http.html>

#### 疑问***待先自己研究***
- 其不能自动打开localhost:9000，和ig-tmeplate中serve任务使用browser-sync直接打开localhost:3000不一样。

### 18.任务wiredep ***没用***
在'app/styles/\*.scss'和'app/\*.html'中引入bower文件。

	gulp.task('wiredep', function () {
	  var wiredep = require('wiredep').stream;
	
	  gulp.src('app/styles/*.scss')
	    .pipe(wiredep())
	    .pipe(gulp.dest('app/styles'));
	
	  gulp.src('app/*.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('app'));
	});

#### 说明：

- wiredep模块参见《node模块学习.md》43.

#### 疑问:

1. 源文件里面并没有bower/endbower占位符，故应该该任务没用吧？？
2. wiredep不是针对html的吗，.scss也可以用其处理吗？

### 19.任务watch
监控改变的文件资源，并重新加载浏览器页面

	gulp.task('watch', ['connect'], function () {
	  $.livereload.listen();
	
	  // watch for changes
	  gulp.watch([
	    'app/*.html',
	    '.tmp/styles/**/*.css',
	    'app/scripts/**/*.js',
	    'app/images/**/*'
	  ]).on('change', $.livereload.changed);
	
	  gulp.watch('app/styles/**/*.scss', ['styles']);//当'app/styles/**/*.scss'发生变化时，执行styles任务
	  gulp.watch('bower.json', ['wiredep']);//当'bower.json'发生变化时，执行wiredep任务
	});

#### 说明：

- gulp-livereload模块：监控文件的改变并重新加载你的web浏览器页面。参见《node模块学习.md》44.
- gulp.watch的3.9.1版本和4.0版本区别还是挺大的。

#### 疑问：
- 此处livereload.changed这样的用法和文档上好像不一样，是不是这里就是函数livereload.changed（path)，然后path就是前面的一串？
- .tmp路径下的文件似乎才是处理过的后面要使用的，那app路径下的文件的改变为什么也要使用livereload.changed?

### 20.任务serve 
先执行connect和watch，然后自动打开http://localhost:9000

	gulp.task('serve', ['connect', 'watch'], function () {
	  require('opn')('http://localhost:9000');
	});

#### 说明：
- opn模块：打开某个网站、文件。参见《node模块学习.md》46.

### 21.任务build
依次执行任务'jshint', 'html', 'images', 'fonts', 'extras', 'ad'，然后输出其压缩文件大小。

	gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'ad'], function () {
	  return gulp.src('dist/**/*')
		.pipe($.size({
			 title: 'build',
			 gzip: true//仅展示该项目的压缩文件大小
			}));
	});


说明：

- gulp-size模块：用于展示本项目文件的大小。参见《node模块学习.md》7.

### 22.任务default
先执行任务clean，再执行任务build

	gulp.task('default', ['clean'], function () {
	  gulp.start('build');
	});

#### 疑问
- gulp.start（）...有这个API吗？似乎3.9和4.0都没有。。。3.9的API文档<https://github.com/gulpjs/gulp/blob/master/docs/API.md>

### 23.任务requestdata ***没用***
获取'http://www.ftchinese.com/m/corp/p0.html?' + dateStamp的页面代码，然后对其body元素的内容进行处理，然后将该body的内容作为数据存入'views/next/body.html'

	gulp.task('requestdata', function(done) {
	  const dateStamp = new Date().getTime();//获取日期的毫秒数
	  const url = 'http://www.ftchinese.com/m/corp/p0.html?' + dateStamp;
	
	  request(url, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	      const $ = cheerio.load(body, {
	        decodeEntities: false
	      });
	      $('#roadblock').remove();//进行一系列的JQuery操作，移除这些元素
	      $('.header-container').remove();
	      $('.nav-place-holder').remove();
	      $('.footer-container').remove();
	      $('#overlay-login').remove();
	      $('.app-download-container').remove();
	      const data = $('body').html();//data是body元素的内容
	
		  ///将data写入'views/next/body.html'文件中
	      fs.writeFile('views/next/body.html', data, function(err) {
	        if (err) {return done(err)}
	        done();
	      });
	    }
	  });
	});

#### 说明
- request模块：简化版的HTTP请求的客户端。参见《node模块学习.md》31.
- cheerio模块： Cheerio是jQuery的核心实现模块。参见《node模块学习.md》22.。
- view文件应该是卫国哥写的

#### 疑问
1. 这个'views/next/body.html'装的是啥模块？为什么要专门这样读出来到一个单独的html文件？
2. http://www.ftchinese.com/m/corp/p0.html对应的文件夹路径是dev_www/frontend/tpl/corp/p0.html,然后这个p0.html含有一句话

	<%include file="next/html/manual.html"%>

这句话是引用了 "dev_www/frontend/tpl/next/html/manual.html"文件。
这个http://www.ftchinese.com/m是干嘛用的？然后整个的引用结构是怎样的？

## NOTE:
- 路径'dev_www/frontend/tpl/'对应 'http://www.ftchinese.com/m/'
- 路径"dev_www/frontend/static/"对应"http://static.ftchinese.com”
## app/ad.js
广告系统的逻辑:

通过iframe引入marketing/a.html等等，marketing/a.html又引入了广告商的文件，然后，这里面的c是关键，而c又是从广告的url得来的。

## 2. 首页NEXT/app/templates/html/manual.html

该部分为首页的body部分，即该文档的body元素部分用于替换掉NEXT/app/index.html中的body部分。

### 1.使用php设置一些变量

	<%if $pageId == ""%>//如果变量$pageId为空
		<%assign var="pageId" value="home"%>//设置变量pageId值为home
	<%/if%>

	<%assign var="p" value=$nextmodel->getPublishJson($pageId)|json_decode:true%>//设置变量p值为$nextmodel对象下的一个属性

	<%assign var="adchannelID" value="`$p.meta.adid`"%>//设置变量adchannelID的值为数组变量$p.meta.adid

	<%if !isset($adchannelID)||$adchannelID==""%>
		<%assign var="adchannelID" value="1100"%>//如果没有设置adchannelID或adchannelID为空，则设置其value为1100
	<%/if%>

	<%assign var="itemIds" value="'0000'"%>//设置变量itemIds的值为'0000'

	<%foreach from=$p.sections item=section%>//循环遍历数组$p.sections，并将其作为变量$section来引用
		<%if $section.type == "block"%>//如果数组数组项type的值为block

			<%foreach from=$section.lists item=list%>//内层循环遍历数组section的一项lists
				<%foreach from=$list.items item=item%>//更内层循环遍历lists的每一项中的items项
					<%assign var="itemIds" value="`$itemIds`,'`$item.id`'"%>//设置变量itemIds的值为$itemIds
				<%/foreach%>
			<%/foreach%>

		<%/if%>
	<%/foreach%>

	<%assign var="itemIdsArray" value=$itemIds|replace:"'":""%>//设置变量itemIdsArray的值为 $itemIds的值且去掉其中的'。

#### 说明：
- smarty中点号"."：用来使用赋值了的数组变量的。参见<http://www.smarty.net/docs/zh_CN/language.variables.tpl#language.variables.assoc.arrays>
- {foreach}：Smarty内置函数，用于循环数组，语法{foreach $arrayvar as $itemvar}或{foreach from=$myarray key="mykey" item="myitem"}，用法：

		<?php
		$arr = array('red', 'green', 'blue');
		$smarty->assign('myColors', $arr);
		?>

		<ul>
		{foreach $myColors as $color}
		    <li>{$color}</li>
		{/foreach}
		</ul>

- "`$itemIds`,'`$item.id`'"：Smarty基本语法——双引号内嵌入变量，详见《Smarty学习.md》3.1
- replace:对变量进行简单的替换和搜索，详见《Smarty学习.md》5.1

#### 疑问：
- isset是自定义的smarty函数吗？smarty自定义函数没有……是自定义的话，是在哪里定义的？整个这个smarty的入口文件什么的结构是怎样的？***待问孙宇***
- 这里涉及到的变量有:
	- pageId:页面Id值
	- p:？
	- adchannelID:广告Id值
	- itemIds:？
	- itemIdsArray:？


### 以下是其body部分（**重点**只有这部分用到其实）

### 1. 一个JS函数：checkB()
	<script>checkB();</script>

#### 疑问：
- 这是干嘛的？

### 2.导入一个partials下的html文件
	     <%include file="next/partials/wechat-icon.html"%>

该wechat-icon.html位于NEXT\app\templates\partials下，内容为：
#### （1）一些变量定义：
	///根据story_pic数组的smallbutton、cover、bigbutton等数组项的值是否不为空，给wechatImage变量定义不同的值
	<%if $story_pic.smallbutton != ""%>
		<%assign var="wechatImage" value=$story_pic.smallbutton%>
	<%elseif $story_pic.cover != ""%>
		<%assign var="wechatImage" value=$story_pic.cover%>
	<%elseif $story_pic.bigbutton != ""%>
		<%assign var="wechatImage" value=$story_pic.bigbutton%>
	<%else%>
		<%assign var="wechatImage" value="http://static.ftchinese.com/img/friend-share-icon.jpg"%>
	<%/if%>

	///又对wechatImage进行了一些赋值处理。。不太明白，先略
	<%assign var="wechatImage" value=$wechatImage|urlencode%>
	<%assign var="wechatImage" value="https://image.webservices.ft.com/v1/images/raw/`$wechatImage`?source=ftchinese&width=300&height=300&quality=lowest"%>

#### (2)一个script：
	<script>
		var gUaOfPage = navigator.userAgent || navigator.vendor || "";//定义gUaOfPage为 用户代理字符串（navigator.userAgent） 或 浏览器品牌 （navigator.vendor）或空
		if (/micromessenger/i.test(gUaOfPage)) {//如果变量gUaOfPage中含有"micromessenger"字样，则整个页面变白，实为变成了一个隐藏的img
		document.write ('<div class="hide"><img src="<%$wechatImage%>" width="0" height="0" /></div>');
		}
	</script>
#### 说明：
- 用户代理字符串中的micromessenger表示微信浏览器。

#### 疑问：
- 这里关于微信浏览器就变白，为什么要这样处理？为什么要用一个隐藏的img?
- story_pic数组长什么样？目测长这样 story_pic=[smallbutton,cover,bigbutton] 干嘛用的？

### 3.如果$pageId为"home"时应该有的代码
好像就是一些广告系统的处理东西。

	 <%if $pageId == "home"%>

            <script>var gPageId = 'home';</script>//设置gPageId变量值为'home'

            <%if $smarty.get.ad != 'no'%>//如果数组smarty[get][ad]不为no——这个smarty数组长啥样，在哪定义的？

                <%assign var="ad" value=$publishhtml->get_publish_html("ad")%>//设置变量ad值为publishhtml.get_publish_html("ad")——这个publishhtml对象长啥样，在哪定义的？
				
				///roadblock的div块
                <div id=roadblock style="margin:0 auto;position:relative;width:700px;text-align:center;">

                    <script type="text/javascript">
                        var thisday1 = new Date();//当前日期时间
                        var todaydate1 = thisday1.getFullYear() + "-" + (thisday1.getMonth() + 1) + "-" + thisday1.getDate();//得到形如"2016-9-2"的当前日期
                        var fullsc = GetCookie("rb2");
                        var loadFullAtEnd = false;
                        var fullPageAdchId = '10000014';
                        var testFullPageAd = false;
                        if (window.adchID !== '1000' && window.adchID !== undefined && /[0-9]{4}/.test(window.adchID)) {
                            fullPageAdchId =  window.adchID + '0014';
                            testFullPageAd = true;
                        }
                        if ((fullsc == null && w>490 && isTouchDevice() === false && (todaydate1 == "<%$ad.fullscreen1%>" || todaydate1 == "<%$ad.fullscreen2%>" || todaydate1 == "<%$ad.fullscreen3%>" || todaydate1 == "<%$ad.fullscreen4%>" || todaydate1 == "<%$ad.fullscreen5%>")) || testFullPageAd === true) {
                            document.write('<scr' + 'ipt type="text/jav' + 'ascript" src="http://dolphin.ftimg.net/s?z=ft&amp;c=' + fullPageAdchId + '&amp;slot=645072137&amp;_sex=101&amp;_trip=1&amp;_lux=1&amp;_dc=2&amp;_mm=2&amp;_sz=2&amp;_am=2" charset="gbk"></scr' + 'ipt>');
                        } else if (fullsc == null) {
                            loadFullAtEnd = true;
                        }
                        setTimeout(function () {
                            stickyBottomPrepare();
                            stickyAdsPrepare();
                        }, 9000);
                    </script>
                </div>
            <%/if%>
        <%/if%>

#### 说明
好像就是广告系统的东西，先略。

### 4.设置两个变量

	 <%assign var="bannerCount" value=0%>
     <%assign var="mpuCount" value=0%>

#### 疑问：
- 变量bannerCount、mpuCount分别指的是啥？***问孙宇***

### 5.根据数组p[sections]的各项下的[type]值来确定导入partial下的哪个html文件。
	
	   <%foreach from=$p.sections item=section%>//将数组p[sections]的各项以section作为变量名来循环

            <%if $section.type == "header"%>//如果section[type]值为"header"

                <%if $pageId != "" && $pageId != "home"%>//如果pageId不为空且不为"home"
                    <%include file="next/partials/tag-header.html"%>//导入"app/templates/partials/tag-header.html"
                <%else%>
                    <%include file="next/partials/header.html"%>//否则导入"app/templates/partials/header.html"
                <%/if%>

                <%include file="next/partials/nav.html"%>//导入"app/templates/partials/nav.html"

            <%elseif $section.type == "banner"%>//如果section[type]值为"banner"

                <%include file="next/partials/banner.html"%>//导入"partials/banner.html"

                <%if $section.image && $section.image == ""%>//如果section[image]不为空，则上述表达式为false,进入else语句设置bannerCount的值加1；如果section[image]为空，则什么也不做
                <%else%>
                    <%assign var="bannerCount" value=$bannerCount+1%>
                <%/if%>

            <%elseif $section.type == "block"%>//如果section[type]值为"block"

                <%include file="next/partials/block.html"%>//导入"partials/block.html"

                <%if $section.side != "" && $section.side != "none"%>//如果section[side]不为空且不为none,则变量mpuCount加1
                	<%assign var="mpuCount" value=$mpuCount+1%>
                <%/if%>

            <%elseif $section.type == "footer"%>//如果section[type]值为"footer"

                <%include file="next/partials/footer.html"%>//导入"partials/footer.html"

            <%elseif $section.type == "topbelt"%>//如果section[type]值为"topbelt"

                <%include file="next/partials/topbelt.html"%>//导入"partials/topbelt.html"

            <%elseif $section.type == "include" && $section.from != ""%>//如果section[type]值为"include"且section[from]不为空

                <%assign var="includeSide" value=$section.side%>//设置变量includeSide值为section[side]

                <%assign var="includeSideAlign" value=$section.sideAlign%>//设置includeSideAlign值为section[sideAlign]

                <%include file="next/partials/`$section.from`.html"%>//导入partials下名称等于section[from]的html文件
            <%/if%>

        <%/foreach%>

此处涉及的partials文件如下：

- header.html:详见3.1
- nav.html:详见3.3
- banner.html
- block.html
- footer.html
- topbelt.html

#### 疑问
关于数组p[sections] 到底长什么样？ 目测其每个数组项下具有数组项[type]，且该项（ 即p[sections][type] )值为"header"或"banner"或"block"或"footer"或"topbelt"。另外p[sections][from]又是什么东西？




	
### 6.导入"partials/QrCode.html"

	 <%include file="next/partials/QrCode.html"%>

此处涉及的partials文件QrCode.html详见3.9


## 3.app/templates/partial下的一系列html文件

### 3.1 partials/header.html"
其是此处导入的第一部分。

#### 1. header标签块
代码为：

	<header class="header-container">
	  <div class="header-inner">
	    <div class="masthead"></div>
	    <div class="header-side header-left expandable">
	      <div class="current-edition">
	        <%if $curr_lang == "big5"%>
	            <span>繁体中文</span>
	            <a href="http://www.ftchinese.com/">简体中文</a>
	        <%else%>
	            <span>简体中文</span>
	            <a href="http://big5.ftchinese.com/">繁体中文</a>
	        <%/if%>
	        <a href="http://www.ft.com/">英文</a>
	      </div>
	    </div>
	    <div class="header-side header-right">
	        <span class="visitor-box">
	            <a onclick="showOverlay('overlay-login')">登录</a>
	            <a class="more last" href="http://user.ftchinese.com/register">免费注册</a>
	        </span>
	        <span class="member-box">
	            <a href="/users/mystories">我的FT</a>
	            <a id="ft-login-your-account" href="/users/cp">设置</a>
	            <a id="ft-login-logout" href="http://user.ftchinese.com/logout">登出</a>
	        </span>
	    </div>
	  </div>
	</header>

即网站的最最最上方的第一行。即这个部分：
<img src="img/ft_header.png" alt="header"/>

***细节先略，后面再看***

##### 2. 导入"partials/login-overlay.html"
代码为：

	<%include file="next/partials/login-overlay.html"%>

关于login-overlay.html详见3.2

### 3.2 "partials/login-overlay.html"

		<div class="overlay-container" id="overlay-login">
	    <div class="overlay-inner">
	        <div class="overlay-bg" data-parentid="overlay-login"></div>
	        <div class="overlay-content-outer">
	            <div class="overlay-content-inner">
	                <div class="overlay-content">
	                    <div class="overlay-title">登录<i class="overlay-close" data-parentid="overlay-login">×</i></div>
	                    <form method="post" action="/users/login">
	                    <div class="input-title" id="login-reason"></div>
	                    <div class="input-title">电子邮件/用户名</div>
	                    <div class="input-container"><input type="text" class="input-oneline" name="username" id="ft-login-input-username"></div>
	                    <div class="input-title">密码</div>
	                    <div class="input-container"><input type="password" class="input-oneline" name="password"></div>
	                    <div class="input-title input-submit-container"><input type="checkbox" class="checkbox" value="1" checked="checked" name="saveme" id="ft-login-input-remember">记住我
	                    <input class="input-submit" type="submit" value="提交"></div>
	                    <div class="input-title"><a href="/users/findpassword" class="blue-link">找回密码</a></div>
	                    <div class="input-title"><a href="http://user.ftchinese.com/register" class="blue-link">免费注册</a></div>
	                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>

这就是登录弹窗，平常display为none,在点击了“登录”按钮后display变为"block",且其是相对浏览器绝对定位"position:fixed"。即这个部分： 

<img src="img/ft_login-overlay.png"/>

***细节先略，后面再看***

### 3.3 "partials/nav.html"	
#### （1）一系列smarty变量设置

	///如果变量topnav值为空，则定义变量topnav="home",navHome="on nosub"
	<%if $topnav==""%>
		<%assign var="topnav" value="home"%>
		<%assign var=navHome value=" on nosub"%>
	<%/if%>
	
	///根据变量subnav的不同值，选择为navTools或navFollow或navRSS三者中的哪一个赋值为"on"
	<%if $subnav=="tools"%>//如果subnav值为"tools"
		<%assign var=navTools value=" on"%>//定义变量navTools值为"on"
	<%elseif $subnav=="follow"%>//如果subnav值为"follow"
		<%assign var=navFollow value=" on"%>//定义变量navFollow值为"on"
	<%elseif $subnav=="rss"%>//如果subnav值为"rss"
		<%assign var=navRSS value=" on"%>//定义变量navRSS值为"on"
	<%/if%>
	
	///根据变量thirdnav的不同值，选择为11个变量中的哪一个赋值为"aria-selected=true"
	<%if $thirdnav=="basicsetting"%>
		<%assign var="navBasicsetting" value=" aria-selected=true"%>
	<%elseif $thirdnav=="changeicon"%>
		<%assign var="navChangeicon" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="maillist"%>
		<%assign var="navMaillist" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="snsapi"%>
		<%assign var="navSnsapi" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="commentstory"%>
		<%assign var="navCommentstory" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="favstorylist"%>
		<%assign var="navFavstorylist" value=" aria-selected=true"%>
	<%elseif $thirdnav=="eventhome"%>
		<%assign var="navEventHome" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="eventupcoming"%>
		<%assign var="navEventUpcoming" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="eventprevious"%>
		<%assign var="navEventPrevious" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="eventsponsorship"%>
		<%assign var="navEventSponsorship" value=" aria-selected=true"%> 
	<%elseif $thirdnav=="eventabout"%>
		<%assign var="navEventAbout" value=" aria-selected=true"%>
	<%/if%>

##### 疑问
这大概是三重导航菜单的相关变量的设置。

#### （2）嵌入一块php代码

	<%php%>
		$filename = "../frontend/tpl/next/api/page/nav.json"; 
		$handle = fopen($filename, "r"); 
		$json = fread($handle, filesize ($filename)); 
		fclose($handle); 
		$page = json_decode($json, true); 
		$this->assign("p", $page);
	<%/php%>

暂略。

##### 说明
- Smarty内置函数{php}详见《Smarty学习.md》7.6,该函数其实已经被废弃


#### (3)再定义几个Smarty变量

	<%assign var="navData" value=$p.body.odatalist%>//定义变量navData为p[body][odatalist]
	<%if $topnav == ""%>//如果变量topnav值为空，则定义topnav值为"home"
		<%assign var="topnav" value="home"%>
	<%/if%>

##### 疑问
- 这navData、topnav俩变量是干嘛用的？p[body][odatalist]又是干嘛用的？

#### （4）根据变量navData的值使用不同的div元素块
	
	<%if $navData != null && $navData|@count > 0%>
	  <div class="o-nav__placeholder">
	     ...
	  </div>

	<%else%>

	  <div class="o-nav__placeholder">
	 	...
	  </div>
	  <script>
		ga('send','event', 'CatchError', 'JSON File: Navigation', '<%$smarty.server.SERVER_ADDR%>: ' + window.location.href, {'nonInteraction':1});
	  </script>

	<%/if%>

此部分即为网站的三级导航部分，即为：

<img src="img/nav.png">

***细节先略，后面再看***

### 3.4 partials/?.html

此处生成了一个class="site-map"的div，但目前还没找到具体是partials下的哪一个文件生成的。

### 3.5 partials/banner.html
此处在首页生成的代码为：
	
	<div class="banner-container">
		...
	</div>

此部分即为网站的横幅广告部分，即为此部分：

<img src="img/banner.png">

#### 源码分析

	<%if $smarty.get.ad != "no" && $hideBanner != "yes"%>//如果smarty[get][ad]的值不为"no"，且hideBanner值不为"yes"

		///根据pageId的值的不同，将bannerType赋值为banner或tagbanner
		<%if $pageId == "home"%>//如果pageId值为home,则将bannerType赋值为banner
			<%assign var="bannerType" value="banner"%>

		<%elseif $pageId != ""%>//如果pageId为不是"home"的其他值，则将bannerType赋值为tagbanner
			<%assign var="bannerType" value="tagbanner"%>

		<%elseif !preg_match("/story|interactive/is",$smarty.server.REQUEST_URI)%>//看不懂
			<%assign var="bannerType" value="tagbanner"%>

		<%else%>//其他情况，将bannerType赋值为banner
			<%assign var="bannerType" value="banner"%>
		<%/if%>

		///根据section[url]的不同值来给sectionLink赋上不同值
		<%if $section.url && $section.url != ""%>//如果section[url]存在，则将secctionLink赋值为"href=\"`$section.url`\"
			<%assign var="sectionLink" value=" href=\"`$section.url`\" target=_blank"%>

		<%else%>//否则将sectionLink赋值为空字符串
			<%assign var="sectionLink" value=""%>
		<%/if%>

		
		///根据section[image]和section[fit]的是否为空来给figureClasss赋值
		<%if $section.image && $section.image != "" && $section.fit != ""%>//如果section[image]不为空，且section[fit]不为空，则将figurClass赋值为" `$section.fit`"
			<%assign var="figureClass" value=" `$section.fit`"%>

		<%else%>//否则，figureClass为空字符串
			<%assign var="figureClass" value=""%>
		<%/if%>

		///为image1、image2赋值
		<%assign var="image1" value=$section.image|default:$section.highImpactImage%>//设置image1的值为section[image]

		<%assign var="image2" value=$section.highImpactImage|default:$section.image%>//设置image2的值为section[hightImpactImage
		
		///根据section[image]和section[fit]的值的情况，来决定用什么样的div
		<%if $section.image && $section.image != "" && $section.fit == ""%>//如果section[image]不为空，且section[fit]不为空，则显示如下div
			
			<div class="block-image-container">
				<a<%$sectionLink%>><img src="<%$section.image%>"></a>
			</div>

		<%else%>//否则显示如下div

			<div class="banner-placeholder<%$figureClass%>">

				<div class="banner-container">

					<div class="banner-inner">

						<div class="banner-content">

							<%if $section.image == ""%>//如果section[image]为空，则执行如下js操作（好像会导入一个iframe什么的）

						  		<script type="text/javascript">
									document.write (writeAd('<%$bannerType%>'));
								</script>

						  	<%else%>

						  		<a<%$sectionLink%> class="P-hide">
									<figure class="loading" data-url="<%$image1%>"></figure>
								</a>
						  		<a<%$sectionLink%> class="P-only">
									<figure class="loading" data-url="<%$image2%>"></figure>
								</a>

						  	<%/if%>

						</div>
					</div>
				</div>
			</div>
		<%/if%>
	<%/if%>

#### 疑问
- 这里涉及的变量有smarty[get][ad]、hideBanner、pageId、bannerType、image1、image2、section[image]和section[fit]，具体啥意思？***慢慢磨就懂了***
- bannerType的两种分别意义是啥？

### 3.6 "partials/block.html"
每两个banner之间的部分为一个block。即为如下的整个部分：

 <img src="img/block.png" alt="block">

直到遇到下一个banner结束。在网页的审查元素中看到的即是class为"block-container"的和"banner-container"的交替出现（在最后是有连续出现几个banner-container)

#### 源码分析

暂略

大概看了一下，好像是根据条件判断各种类型的排版，然后foreach出来每个文章块？

### 3.7 "partials/footer.html"

此部分为


#### 源码分析
##### （1）一系列“关于我们”“加入我们”等链接 
此部分为 
	
<img src="img/footer.png" alt="footer">


	<div class="footer-container"><div class="footer-inner">
		<div>
			<a href="/m/corp/aboutus.html">关于我们</a>
			<a href="/jobs/?from=ft">加入我们</a>
			<a href="/m/corp/faq.html">问题回馈</a>
			<a href="/m/corp/contact.html">联系方式</a>
			<a href="/m/corp/partner.html">合作伙伴</a>
			<a href="/m/corp/service.html">服务条款</a>
			<a href="/m/corp/sales.html">广告业务 </a>
			<a href="/m/corp/copyright.html">版权声明</a>
			<a href="/m/marketing/ftc.html">最新动态</a>
		</div>
		<p>
			<span class="copyright"><b>© The Financial Times Ltd <%$smarty.now|date_format:"%Y"%></b></span> 
			<span><acronym title="Financial Times">FT</acronym> and 'Financial Times' are trademarks of The Financial Times Ltd.</span>
		</p>
		
	</div></div>

##### (2)“刷新本页缓存”部分

此部分为

<img src="img/footer_refresh.png" alt="footer_refresh">

	<%if $debug_model == 1%>//在debug_model值为1的时候显示这一块
		<div style="text-align: center; background-color: #FFFFFF; font-size: 38px; margin: 20px;font-weight:bold;">
			<a title="刷新本页CDN与服务器缓存" href="/index.php/marketing/flushcache?url=http://www7.ftchinese.com<%$smarty.server.REQUEST_URI|urlencode%>">刷新本页缓存</a>
		</div>
	<%/if%>

###### 疑问
debug_model是决定显示什么样的刷新缓存提示的吧？还有什么样的？

##### （3）
	
	///在页面脚本无效时，noscript部分会显示
	<noscript>
		<iframe src="//www.googletagmanager.com/ns.html?id=GTM-KP4V3G" height="0" width="0" style="display:none;visibility:hidden">
		</iframe>
    </noscript>
	<script>
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-KP4V3G');
	</script>

###### 疑问
- 此处的noscript和script都是在干嘛的？


### 3.9 "partials/QrCode.html"

	<div class="app-download-container">
	    <a href="http://app.ftchinese.com/download.html?utm_source=marketing&utm_medium=campaign&utm_campaign=QRCODE02" target="_blank">
	        <div>FT中文网客户端</div>
	        <figure class="loading" data-url="http://s.ftimg.net/img/qr/qr90-2.png"></figure>
	        <div>点击或扫描下载</div>
	    </a>
	</div>
	
	<div class="app-download-container wechat">
	    <a href="/m/corp/follow.html" target="_blank">
	        <div>FT中文网微信</div>
	        <figure class="loading" data-url="http://i.ftimg.net/picture/6/000060716_piclink.jpg"></figure>
	        <div>扫描关注</div>
	    </a>
	</div>

这是两个矩形块，相对浏览器绝对定位，位于浏览器窗口右侧中间部分。但其display为none,即使display设为block的也只能看到两个阴影块。故不清楚这是干嘛的。

#### 疑问
这俩相对浏览器窗口绝对定位的块又看不到，是干嘛的？