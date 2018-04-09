1. 完成git提交相关步骤
```
git add .
git commit -m "xxx"
```

2. 修改version && git 打标签
```
 npm version major/minor/patch
```
package.json会改变version字段值，然后也会自动加一个git的tag。假设version 字段自动变为1.3.4。


另外，此处git如果想手动打标签可以这样(当只想发布git release却不想更新npm的时候可以这样)
```
git tag -a v1.3.4 -m 'my version 1.3.4'
```

3. git 发布到远程
最好是保持npm的版本和git release的版本一致，所以有必要先将git tag发布出来:
```
git push
git push origin v1.3.4
```

4. npm发布
如果是该包第一次发布：
```
npm whoami //验证你的凭据已存储在客户端
npm publish --access=public //如果是公开包这样发布，如果不是公开的包则去掉--access=public即可

```

如果是该包已经发布过，现在只是更新：

```
npm publish
```

然后去npmjs.com看一下你的包是否已经发布/更新