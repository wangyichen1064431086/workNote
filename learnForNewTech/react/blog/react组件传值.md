### 1. 子组件向父组件传值
父组件
```js
import Nav from 'Nav.js';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  callbackForNav({ selectedTopChannelOrder, selectedSubChannelOrder, selectedTopChannelName, selectedSubChannelName }) {
    this.setState({ 
      selectedTopChannelOrder, 
      selectedSubChannelOrder, 
      selectedTopChannelName, 
      selectedSubChannelName 
    })
  }
  render() {
    return (<Nav channels={navChannelData} dynamicnav={dynamicNav}  defaultSelectedTopChannelOrder={navDefaultTopOrder} defaultSelectedSubChannelOrder={navDefaultSubOrder} callbackFunc={this.callbackForNav} sticky="top" />)
  }
}
```

Nav:
```js
class Nav extends React.Component {
  constructor() {
    this.state = {
      selectedTopChannelOrder:0, 
      selectedSubChannelOrder:-1,
      selectedTopChannelName: "", 
      selectedSubChannelName:""
    }
  }
  static propTypes = {
    callbackFunc: PropTypes.func
  }
  componentDidMount() {
    const {selectedTopChannelOrder, selectedSubChannelOrder, selectedTopChannelName, selectedSubChannelName} = this.state;
    this.props.callbackFunc({selectedTopChannelOrder, selectedSubChannelOrder, selectedTopChannelName, selectedSubChannelName}) 
  }
  clickSubChannle() {
     this.setState({
        selectedTopChannelOrder: topOrder,
        selectedTopChannelName: topName,
        selectedSubChannelOrder: subOrder,
        selectedSubChannelName: subName
    });
    this.props.callbackFunc({
        selectedTopChannelOrder: topOrder,
        selectedTopChannelName: topName,
        selectedSubChannelOrder: subOrder,
        selectedSubChannelName: subName
    });
  }
}
```
### 2. 跨级组件传值
利用context

父组件:
```js
class List extends React.Component {
  static childContextType = {
    color:PropTypes.string
  }

  getChildContext() {
    return {
      color:'red'
    }
  }
  render() {
    return (...)
  }
}
```

子组件:
```js
class ListItem extends React.Component {
  static contextTypes = {
    color:PropTypes.string
  }

  render(){
    return (
      <li style={{background:this.context.color}}>someword</li>
    )
  }
}
```
### 3. 无嵌套关系的组件传值