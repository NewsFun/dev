/*  eslint-disable no-unused-vars */
let Toast = {}
let toastTimer = false
let toastVM = null
let showLoad = false // 存储loading显示状态
let loadNode = null // 存储loading节点元素
let showLoadFrog = false // 存储loading显示状态
let loadNodeFrog = null // 存储loading节点元素
Toast.install = function (Vue, options) {
    let opt = {
        duration: '2000'
    }
    for (let property in options) {
        opt[property] = options[property]
    }
    Vue.prototype.$toast = function (tip, config) {
        let options = JSON.parse(JSON.stringify(opt))
        if (typeof config === 'object') {
            for (let property in config) {
                options[property] = config[property]
            }
        } else if (config === 'close') {
            if (toastVM) {
                toastVM.show = toastTimer = false
            } else {
                return false
            }
        }
        if (toastTimer) {
            // 如果toast还在，则取消上次消失时间
            clearTimeout(toastTimer)
            toastVM.show = false
        }
        if (!toastVM) {
            let ToastTpl = Vue.extend({
                data() {
                    return {
                        show: false,
                        tip: tip
                    }
                },
                render: function (h) {
                    if (!this.show) return
                    return h(
                        'div', {
                            class: ['g-toast'],
                            show: this.show,
                            domProps: {
                                innerHTML: this.tip
                            }
                        }
                    )
                }
            })
            toastVM = new ToastTpl()
            let tpl = toastVM.$mount().$el
            document.body.appendChild(tpl)
        }
        toastVM.tip = tip
        toastVM.show = true
        if (options.closeType !== 'manual') {
            toastTimer = setTimeout(function () {
                toastVM.show = toastTimer = false
            }, options.duration)
        }
    }
    Vue.prototype.$toast['close'] = function () {
        return Vue.prototype.$toast(null, 'close')
    }
    Vue.prototype.$loading = function (tip, type) {
        if (type === 'close') {
            if (loadNode) loadNode.show = showLoad = false
        } else {
            if (showLoad && loadNode) {
                return (loadNode.tip = tip)
            }
            let LoadTpl = Vue.extend({
                data: function () {
                    return {
                        show: false,
                        tip: tip
                    }
                },
                render: function (h) {
                    if (!this.show) return
                    return h(
                        'div', {
                            attrs: {
                                'class': 'g-load-mark'
                            },
                            show: this.show
                        },
                        [
                            h(
                                'div', {
                                    attrs: {
                                        'class': 'g-load-box'
                                    }
                                }, [
                                    h(
                                        'div', {
                                            attrs: {
                                                'class': [this.tip ? 'g-loading' : 'g-loading-nocontent']
                                            }
                                        }, Array.apply(null, {
                                            length: 12
                                        }).map(function (value, index) {
                                            return h('div', {
                                                attrs: {
                                                    'class': 'loading_leaf loading_leaf_' + index
                                                }
                                            })
                                        })
                                    ),
                                    h(
                                        'div', {
                                            attrs: {
                                                'class': 'g-load-content'
                                            },
                                            domProps: {
                                                innerHTML: this.tip
                                            }
                                        }
                                    )
                                ]
                            )
                        ]
                    )
                }
            })
            loadNode = new LoadTpl()
            var tpl = loadNode.$mount().$el
            document.body.appendChild(tpl)
            loadNode.show = showLoad = true
        }
    }
    // 小青蛙loading
    Vue.prototype.$loadingFrog = function (type) {
        if (type === 'close') {
            if (loadNodeFrog) loadNodeFrog.show = showLoadFrog = false
        } else {
            let LoadTpl = Vue.extend({
                data: function () {
                    return {
                        show: false
                    }
                },
                render: function (h) {
                    if (!this.show) return
                    return h(
                        'div', {
                            attrs: {
                                'class': 'g-load-mark'
                            },
                            show: this.show
                        },
                        [
                            h(
                                'div', {
                                    attrs: {
                                        'class': 'g-load-box g-load-box-frog'
                                    }
                                }
                            )
                        ]
                    )
                }
            })
            loadNodeFrog = new LoadTpl()
            var tpl = loadNodeFrog.$mount().$el
            document.body.appendChild(tpl)
            loadNodeFrog.show = showLoadFrog = true
        }
    }
    Vue.prototype.$loadingFrog['close'] = function () {
        return Vue.prototype.$loadingFrog('close')
    }

    Vue.prototype.$loading['close'] = function () {
        return Vue.prototype.$loading(null, 'close')
    }
}
export default Toast
