### 获取频道号的方法的定义

Page>Page>FTChinese>Ad>Banner>AdModel.swift

方法getAdchID

### 获取频道号的方法的调用
Page>Page>Layouts>Page>SuperContentItemViewController.swift

line570:
```
adchID = AdParser.getAdchID(dataObject)
```

方法getAdchID用到了Sponsors这个变量。

### Sponsors定义
Page>Page>Helpers>Ads>Sponsors.swift

定义了struct Sponsors和struct Sponsor

### Sponsors的赋值、更新
Page>Page>Layouts>Page>SuperDataViewController.swift

line1550:
```
func userContentController(_ userContentController: WKUserContentController, didReceive message:WKScriptMessage) {
  ...
  else if message.name == "sponsors" {
    if let body = message.body as? [[String:String]] {
      var sponsors = [Sponsor]()
      for item in body {
        let sponsor = Sponsor(
          tag: item["tag"] ?? "",
          title: item["title"] ?? "",
          adid: item["adid"] ?? "",
          channel: item["channel"] ?? ""
        )
      }
    }
  }
}

...
...
```

***NOTE:***从一个webpage获取到script信息时，该userContentController会自动调用

### 一般频道的数据获取方法
Page>Page>FTChinese>Main>AppNavigation.swift的listapi的值就是获取数据的地址，而该地址的内容是从NEXT的homecontent.html类似的文件上传上去的。

所以最终安卓webapp的频道号也是要解析NEXT中某文件获得。