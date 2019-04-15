### toast插件应用方法
1.在main.js中引入当前toast.js
2.在main.js中引入当前样式toast.scss
3.Vue.use()
###toast插件有2种功能
1.Vue.prototype.$toast(tips,config)
      tips---toast传入的信息
      config---toast插件的配置项，目前有3个参数
          duration---toast展示后duration毫秒小时
          width---toast展示宽度
          closeType---toast关闭方式：参数值为'manual'时需手动关闭，调用
          Vue.prototype.$toast.close();参数值为其他值时无效；
                
2.Vue.prototype.$loading(tip)默认不会自动关闭，需手动触发
      tips---loading图标下方展示的文字
      Vue.prototype.$loading.close() 关闭loading
