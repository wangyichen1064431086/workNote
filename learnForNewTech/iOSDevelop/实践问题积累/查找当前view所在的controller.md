参见<https://stackoverflow.com/questions/1372977/given-a-view-how-do-i-get-its-viewcontroller>

实际可用方法(Swift3)：

```
extension UIView {
    var parentViewController: UIViewController? {
        var parentResponder: UIResponder? = self
        while parentResponder != nil {
            parentResponder = parentResponder!.next
            if let viewController = parentResponder as? UIViewController {
                return viewController
            }
        }
        return nil
    }
}
```

