var Ran = {
    bus: {},
    component: {},
    extend: function (dest, src) {
        if(arguments.length === 1) {
            var src = dest;
            dest = this;
        }
        for (var i in src) {
            if (!src.hasOwnProperty(i)) continue;
            dest[i] = src[i];
        }
        return dest;
    },
    compile: function () {
        // TODO: compile
        // Web: 将页面上所有组件渲染原生 html，插入 style，执行原生 js
        // Nodejs: 将文件中所有组件生成原生 html 文件，生成 css 文件，生成原生 js
        var r = {
            html: '',
            css: '',
            js: ''
        };
        return r;
    },
    componentPrototypeBase: {
        render: function () {
            var type = this.type || 'div';
            var dom = document.createElement(type);
            for (var c in this.components) {
                dom.appendChild(this.components[c].render());
            }
            return dom;
        },
        extend: this.extend
    },
    mount: function (componentName, componentFunc) {
        this.extend(componentFunc.prototype, this.componentPrototypeBase);
        this.component[componentName] = function () {componentFunc};
    }
};

window.Ran = Ran;
