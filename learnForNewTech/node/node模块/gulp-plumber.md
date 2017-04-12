### 9.gulp-plumber
防止管道因为来自gulp插件的错误而导致的中断。

这个补丁插件修复了Node的piping流的问题。简言之，就是说它替代了 pipe方法，并移除了error事件上的标准的onerror事件处理器，而这种标准事件处理器默认会在出错时阻断管道。

API:
#### （1）plumber([options])
返回一个流，其修复了管道线中的下一个pipe方法。