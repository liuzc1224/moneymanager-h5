# wap-escr
react15.x + react-router3.x + redux + redux-saga + reselect + isomorphic-fetch

## Build Setup

``` bash
# install dependencies
npm install or cnpm install or yarn install

# serve with hot reload at localhost:auto
npm start

# build for test and production with minification
npm run daily
```

# react项目开发规范

* [基本规则](#基本规则)
* [命名规范](#命名规范)
* [组件结构](#组件结构)
* [jsx书写规范](#jsx书写规范)

## 基本规则
* 原则上单个文件只能包含一个组件，且与组件样式和图片放在同一个文件夹内。
* 尽量不要使用React.createElement方法来实例化组件。
* 不要使用React.createClass方法来声明组件。
* 复杂的组件要拆分成多个子组件。
* 如果一个组件有多个子组件组成，且没有在别的组件使用，可以把子组件和父组件共同放在一个文件夹内，如果index.js暴露出来，文件夹采用帕斯卡命名法。具体的可以参考命名规范。
* 因拆分组件复杂多样性，原则上可以根据实际情况做考虑。


## 命名规范
* 组件名和组件对应的js文件采用帕斯卡命名法，组件对应js文件和组件名需要保持一致。
* 文件夹中如果包含多个暴露出来的组件，则认为该文件夹是一个组件包，这时文件夹需要小写。
* 如果是一个组件拆分成多个子组件放在一个文件夹中，然后实际暴露出来的只有父组件，这时候认为该文件夹实际对应的是一个组件，文件夹采用帕斯卡命名法，文件夹名称需要和父组件保持一致。

```
/**
* 1:components中包含多个组件，此时需要小写
* 2:Navigatior 和 Header虽然也是文件夹，但是其对外暴露出来的分别只有Navigator和Header组件，只是为了便于管理将组件拆分,此时文件夹需要采用帕斯卡命名法，并保持文件夹名称和组件名称一致。
* 3:Button.js和Title.js分别对应Title和Button这两个子组件，并且不对外暴露，开发人员不允许在Header文件夹外引用这两个组件。
* 4:index.js暴露Navigator组件给外部使用。
*/
-components
    + Navigator
    - Header
      Button.js
      index.js
      Title.js

```
* 类采用帕斯卡命名法。
* 变量名称采用驼峰命名法。
* 类和属性采用驼峰命名法，如果是类私有变量和属性需要在变量名前加下划线（_）区分。开发人员不允许在外部调用该方法或属性。
* 常量名需要全部大写，单词之间用下划线（_）分隔，并使用const关键字。
* 组件的属性名称采用驼峰命名法，如果是事件前面必须要加on开头，例如:onClick,onBack等。


## 组件结构

Es6 class 定义组件方法名采用如下顺序:
* static 方法
* constructor
* getChildContext
* componentWillMount
* componentDidMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount
* clickHandlers + eventHandlers 如 onClickSubmit() 或 onChangeDescription()
* getter methods for render 如 getSelectReason() 或 getFooterContent()
* render methods 如 renderNavigation() 或 renderProfilePicture()
* render

## jsx书写规范
* 组件如果没有子元素，则采用自闭合的方式。

```jsx
    //good
    <Header />
    //bad
    <Header></Header>
```
* 组件含有多个属性，属性之间需要换行对齐。

```jsx
    //good
    <Header
        title = 'title'
        style = {this.props.style}
        />
    //bad
    <Header title = 'title' style = {this.props.style}/>
```
* render方法如果组件有多行需要用用括号并换行。


```jsx
    //good
   render(){
       return (
         <Header
            title = 'title'
            style = {this.props.style}
            />);
    }
    // good 只有单行

    render(){
       return <Header />
    }
    //bad
    render(){
       return <Header
            title = 'title'
            style = {this.props.style}
            />;
    }

```
