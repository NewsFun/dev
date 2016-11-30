# dev
#### 所用插件及组件：jQuery-3.1.1,layer
#### 自封装组件及插件说明：
#### myHome.js：所有管理中心页面的共用js,用来添加共用方法.
  
  * 全局事件代理方法:PageEvent()，对全动态数据框<div id="ui-layout-center">(全局变量名EAST)进行click监听.
  * 用法:在EAST内部需要添加点击事件的元素上添加data-name属性值,然后将 {属性值(data-name):callback} 作为参数传入该方法,即可实现点击事件.callback默认将点击元素作为参数传入,并给点击元素添加class="JS_target"属性(方便弹窗进行定位和数据交互).
  
#### tree.js:文件树组件
######参数说明:  
  * openClass--点击打开的图标样式名
  * closeClass--点击关闭的图标样式名
  * domTag--节点数据的回调方法
  * pathOperate--路径操作(返回节点路径数组)
  
#### popup.js：弹窗页面栏目控制js
  * 在对应的标题<a>和<div class="pop_tab">上添加相同的data-name属性值,即可实现点击切换列表。
