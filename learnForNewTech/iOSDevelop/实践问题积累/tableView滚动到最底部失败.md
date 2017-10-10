## 问题
通常用
```
let indexPath = IndexPath(row: numberOfRows-1, section: 0)
                self.talkListBlock.scrollToRow(at: indexPath, at: .bottom, animated: false)
```

使得tableView滚动到底部。

但如果tableView.contentSize.height> tableView.frame.size.height，则第一次reloadData后无法生效。

## 解决办法

### 方法1：
第一次reloadData后 延迟一定时间再滚动。可执行如下函数：

```
func tableViewScrollToBottom(animated:Bool) {
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(50)) {
            let numberOfRows = self.talkListBlock.numberOfRows(inSection: 0)
            
            if numberOfRows > 0 {
                let indexPath = IndexPath(row: numberOfRows-1, section: 0)
                self.talkListBlock.scrollToRow(at: indexPath, at: .bottom, animated: animated)
            }
        }
    }
```

### 方法2：在viewDidAppear中执行setContentOffset:

```
override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(false)
        
        if(self.talkListBlock.contentSize.height > self.talkListBlock.frame.size.height) {
            print("here")
            print("talkListBlock.contentSize.height:\(self.talkListBlock.contentSize.height)")
            print("talkListBlock.frame.size.height:\(self.talkListBlock.frame.size.height)")
            let offset = CGPoint(x: 0, y: self.talkListBlock.contentSize.height-self.talkListBlock.frame.size.height)
            self.talkListBlock.setContentOffset(offset, animated: false)
        }
         

    }
```

实践中最后采用了方式1

## 参考资料
<https://stackoverflow.com/questions/26244293/scrolltorowatindexpath-with-uitableview-does-not-work>
<https://stackoverflow.com/questions/2770158/how-to-scroll-to-the-bottom-of-a-uitableview-on-the-iphone-before-the-view-appea>
