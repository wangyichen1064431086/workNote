### 1.全局变量sections存储需要追踪的元素
Line19:
```
var sections = document.querySelectorAll('.block-container, .footer-container, .bn-ph, .mpu-container, #story_main_mpu, .in-story-recommend');
```

### 2.在函数viewablesInit中循环遍历sections数组，对于每个sections[j]，依据其所处的位置等等条件，得到一个viewables[j]


### 3.在函数trackViewables中发送ga
line127
```
...
ga('send','event', ec, 'In View', viewables[k].id, {'nonInteraction':1});
···
```

注意发送有一个先决条件是 viewables[j].viewed === false

### 4.不断调用viewablesInit和trackViewables函数。