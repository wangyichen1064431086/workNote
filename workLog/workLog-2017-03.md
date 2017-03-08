# 0301
## 1. 继续整理特别报道的变量设置

# 0303
## 1. 继续整理特别报道的变量设置
- 有了统一的整理格式
- 基本整理完了一遍
- 对模板文件index.html、tag.html有了进一步的理解
- 只差继续对block.html中涉及的变量进行进一步的整理了

## 2. 汇报了recommend In Story的情况

# 0306
## 1.NEXT的story.js待优化

## 2.继续整理变量

## 3.开始继续抄autograph
1. 安装nvm latest 安装7.7.1版的node以支持async/await

# 0307
## 1. 抄写卫国哥的autograph

## 2. 研究频道页金融市场 <http://www7.ftchinese.com/channel/markets.html>

	1. 在libs\application\controllers\ft.php中：
	
			publlick function channel()
			{
				  ......
				  $filename = $this->uri->rsegment(3);
				  $tpl_file_path = 'channel/'.$filename;//此处是'channel/markets.html'

				  $this->tpl->display($tpl_file_path);//对应目录即frontend/tpl/channel/markets.html
			}

	2. 在frontend/tpl/channel/markets.html中：
	 
		 		<%if ($smarty.get.n==1 || date("Ymd",$smarty.now) >= 20160615 || $smarty.server.HTTP_HOST=="www.corp.ftchinese.com" || $smarty.server.HTTP_HOST=="next.ftchinese.com") && !preg_match("/marketing|events/is",$smarty.server.REQUEST_URI) %>
					...
					<%assign var=PageTitle value="金融市场"%>
					<%assign var="tagstory" value=$channelData.story%>//$tagstory存储文章数据
					<%include file="next/html/tag.html"%>//即引入了next/html/tag.html

	3.  在next/html/tag.html中：
	
		 其$tag_name为空，$pageId也为空，$PageTitle为"金融市场"，执行：

		
			<%if $tagstory%>
				<%assign var="allstory" value=$tagstory%>
			<%/if%>
			<%include file="next/partials/tag-block.html"%>

	4. 在next/partials/tag-block.html中：
		
		

	