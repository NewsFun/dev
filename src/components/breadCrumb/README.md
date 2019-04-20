# 面包屑

#### 引入

```javascript
import breadCrumb from 'breadCrumb';
```

#### 例子

```html
<bread-crumb :links=""></bread-crumb>
```

```javascript
export default {
    data() {
        return {
            links: [{
                text: '',
                link: ''
            }]
        }
    }
}
```

#### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|-----|-------|-------|
|links|链接|Array||[]|
