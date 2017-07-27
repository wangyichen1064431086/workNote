### Position: 
UIKit -> Views and controls -> UIControl 

<https://developer.apple.com/documentation/uikit/uicontrol>

### TYPE
Class

### Intro
  The base class for controls, which are visual elements that convey a specific action or intention in response to user interactions.(控件的基类，是一些视觉元素，这些视觉元素可以传达特定动作或意图，以响应用户的交互)


### Overview: 
控件实现元素，如按钮（buttons）和 滑块（sliders）。您的app可能用它们来促进导航、收集用户输入或操纵内容。控件使用“目标动作”机制（Target-Action mechanism）来报告用户与app的交互。
        
### Related Knowlege:
#### Target-Action mechanism: 
该机制可以简化使用控件的代码。你可以写操作方法来响应控件特定的事件。例如，你可以写一个操作方法来响应一个slider的值的改变。控件会处理所有的触摸事件所需要的工作，并会决定何时调用你的方法。

#### Action method Definition:
```
     @IBAction func doSomething(){}
```
        
   