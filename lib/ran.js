var Ran = {
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
    extend: function (dest, src) {
        for (var i in src) {
            if (!src.hasOwnProperty(i)) continue;
            dest[i] = src[i];
        }
        return dest;
    }
};
