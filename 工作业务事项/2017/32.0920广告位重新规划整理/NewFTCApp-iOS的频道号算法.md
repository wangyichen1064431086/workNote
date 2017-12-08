### 获取频道号的方法的定义

Page>Page>FTChinese>Ad>Banner>AdModel.swift

函数getAdchID

### 获取频道号的方法的调用
Page>Page>Layouts>Page>SuperContentItemViewController.swift

line570:
```
adchID = AdParser.getAdchID(dataObject)
```

其中用到了Sponsors这个变量。

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

从一个webpage获取到script信息时，该userContentController会自动调用