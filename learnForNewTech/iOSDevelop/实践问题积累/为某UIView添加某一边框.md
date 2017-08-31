```
let border = CALayer()
border.frame = CGRect(x:0, y:0, width:self.bottomToolbar.frame.width, height:1)
border.backgroundColor = UIColor(hex: "#dddddd").cgColor
self.bottomToolbar.layer.addSublayer(border)
```

参考资源:<https://stackoverflow.com/questions/17355280/how-to-add-a-border-just-on-the-top-side-of-a-uiview>