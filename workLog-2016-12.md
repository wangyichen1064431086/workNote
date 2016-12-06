# 1201
## 1.iTunes Connect
在app store 里下载一个app: testflight
 
## 2.新版登陆测试地址
<http://app003.ftmailbox.com/androidapp.html?useNewRegForm>

# 1204
## 1.必问问题
1. 来了先问Oliver那个<http://redmine.ftimg.net/login?back_url=http%3A%2F%2Fredmine.ftimg.net%2F>是谁是管理员，让他帮忙通过认证一下。   账号Bonnie
——— ***已解决***
2. 问卫国哥上次说的那个用于简单实现input右侧固定宽度元素的新属性叫什么。
——— ***下次方便时再问***
## 2.编辑ga
修改为3步走，我编辑的goal为 14.

## 3.webapp: 安卓硬件回退问题
### bug描述
app苹果, app Chrome模拟的苹果和安卓 都没有问题。情况为，即正确退回路径为文章页→频道页→首页。

app安卓：如果点击顺序为首页→频道页→
文章页，则点击左上角退回按钮，直接退回到首页。

### 修复记录
#### 1205pm-1206am 查看相关代码： 
##### （1）hist数组生成代码,即“记录浏览历史”代码：webapp/app/scripts/main.js---1924 readstory函数内部

代码段笔记： webapp-wyc/app/scripts/main_funcs.js 第967行
	

##### （2） 点击回退按钮事件： webapp/app/scripts/main.js--401行
	
	$('.closestory,.back,.backbutton').unbind().bind('click',function() {histback();});

##### （3）histback函数定义： webapp/app/scripts/main.js--401行

代码段笔记： webapp-wyc/app/scripts/main_funcs.js 第1400行

#### 1205am 比较了软硬件退回方式的不同
- 只有苹果的滑动返回是 文章页→
频道页→首页，非按照真正的记录来。
- 其他软件（左上角箭头）返回，和硬件（浏览器返回按钮）返回，都是

#### 1206pm 与强哥协商方法，我这边的代码变动如下：
1. 在main.js的3121行showchannel函数中添加了 ftjavascriptapp.setandroidurl相关代码段。














## 4.next-signup执行不应该挂起后的任务挂起问题
render.js中的 nunjucks.Environment是用在服务器后端的，其中的watch:true用于检查html模板文件变化。而这里是用在前端，不需要检测变化，应改为 watch:false。


nunjucks是node模板引擎也是js模板引擎。

mustache仅仅是js模板引擎，这么用：

		
	<script src="nunjucks"></script>
	
	
	全局变量就有了nunjucks函数，ajax请求一个模板文件，得到以后nunjucks.render(ajax-response, data, function(result) { document.body.innerHTML = result})
	
	在浏览器中渲染模板


# 1205
## 1.继续解决1204任务3.

## 2. 查看兼容性网站
卫国推荐：

<http://jscc.info/>

<http://caniuse.com/#search=onpopstate>








