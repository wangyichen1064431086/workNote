### 方法1：整个目录回退到和线上版本一致
直接删除本地文件，再update时会有冲突，可以这样:

```
svn revert -R . (最后的参数是要revert的路径，.代表所有)
svn update
```

### 2.删除冲突文件
```
svn delete --force xxfold

```

这样删了肯恩再update就update不下来了
