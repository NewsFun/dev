# toast插件应用方法

main.js

```javascript
import toast from 'toast.js'
import 'toast.scss'

Vue.use(toast)
```

## toast插件有2种功能

### 弹窗提示

```javascript
// tips:传入的信息
// config:插件的配置项，目前有3个参数
// duration:展示后duration毫秒小时
// width:展示宽度
// closeType:关闭方式(参数值为'manual'时需手动关闭,调用close方法)
Vue.prototype.$toast(tips,config)
// 参数值为其他值时无效;
Vue.prototype.$toast.close();
```

### 加载动画

```javascript
// 默认不会自动关闭，需手动触发
// tips:loading图标下方展示的文字
Vue.prototype.$loading(tip)
// 关闭loading
Vue.prototype.$loading.close()
```
