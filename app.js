var data = {};

var Ran = {
    extend: function (dest, src, cast) {
        switch (arguments.length) {
            case 1:
                var cast = true;
                var src = dest;
                dest = this;
                break;
            case 2:
                var cast = true;
                if (typeof src === 'boolean') {
                    cast = src;
                    src = dest;
                    dest = this;
                }
                break;
            default:
        }
        for (var i in src) {
            if (!src.hasOwnProperty(i)) continue;
            if (cast === false && dest.hasOwnProperty(i)) continue;
            dest[i] = src[i];
        }
        return dest;
    },
    compile: function () {
        // TODO: compile
        // Web: 将页面上所有组件渲染原生 html，head 插入 style，执行原生 js
        // Nodejs: 将文件中所有组件生成原生 html 文件，生成 css 文件，生成原生 js
    }
};
