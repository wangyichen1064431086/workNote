- 在NEXT\app\templates\partials\nav.html中加入：

第127行左右即是特别报道目录下的二级目录加入:

```
 <li><a href="/channel/teawithft.html">与FT共进下午茶</a></li>

```

- 在NEXT\app\templates\partials\ajax-nav.html的line34行左右也要加入相关新目录

- 在NEXT\app\scripts\o-nav.js的line255行左右要修改:
```
ajax.getData('/m/corp/ajax-nav.html?bbbbbbb'
```
此处请求地址后面的参数要修改，否则有缓存一直无法更新三级目录