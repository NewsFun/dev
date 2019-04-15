# messageBox 组件

#### 引入

```javascript
import messageBox from 'messageBox';
```

#### 例子

```html
<message-box>
    <!-- your dom tag -->
</message-box>
```

#### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
|show|是否显示|Boolean||false|
|show-title|是否有标题|Boolean||false|
|show-cancel-btn|是否有取消按钮|Boolean||true|
|show-confirm-btn|是否有确认按钮|Boolean||true|
|cancel-text|取消按钮文案|String||cancel|
|confirm-text|确认按钮文案|String||confirm|
|handle-cancel|点击取消的回调方法|Function|||
|handle-confirm|点击确认的回调方法|Function|||

#### slot

content

|name|描述|
|---|----|
|-|内容|
