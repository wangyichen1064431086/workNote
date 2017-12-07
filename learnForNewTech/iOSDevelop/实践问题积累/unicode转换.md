### 方法：
```
  let transform = "Any-Hex/Java"
  if let input = oneChannel as? NSString, let convertedString = input.mutableCopy() as? NSMutableString {
    CFStringTransform(convertedString, nil, transform as NSString, true) //NOTE:把unicode转换为string,待做成一个通用方法
    let oneChannelStr = convertedString as String
    print(oneChannelStr)
  }
```

### 参考stackoverflow
<https://stackoverflow.com/questions/24318171/using-swift-to-unescape-unicode-characters-ie-u1234>