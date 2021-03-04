# vue-npm-topBtn
vue 实现一个npm安装的按钮
## 下载

```bash

```

## 使用
```
import TopBtn from 'leihuo-top-btn'
<top-btn 
        :distance="50"
        :with-animation= false
        scroll-container="index">
    <div>我是slot内容</div>
</top-btn>
- distance: 滚动多少px显示top按钮，默认100px
- with-animation: 是否需要缓动动画，默认false
- scroll-container: 自定义滚动元素节点ID，可不传，会自动向parent找，最外层window
```
## 参数说明

参数 | 说明 | 类型 | 是否必选 | 默认值
:--:|:--:|:--:|:--:|:--:
distance | 滚动多少px显示top按钮 |  String | 否 |  100px
with-animation | 是否需要缓动动画 | Boolean | 否 | false
scroll-container | 滚动元素节点的Id | String |  否 | top按钮节点的第一个overflow:scroll父节点 




# 关于样式
top按钮图标各自专题设计，通过样式覆盖，如果需要额外的节点来制作动画效果等，可在slot中自定义

## 测试
安装 parcel -- Blazing fast, zero configuration web application bundler
```bash
# 启动即可
cd test
parcel ./index.html
```
