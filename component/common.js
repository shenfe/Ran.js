function common (type) {
    var _extend = function (dest, src) {
        for (var i in src) {
            if (!src.hasOwnProperty(i)) continue;
            dest[i] = src[i];
        }
        return dest;
    };
    return function (data) {
        return {
            common: true,
            render: function () {
                var el = document.createElement(type);
                _extend(el, data);
                return el;
            }
        };
    };
}

var a = common('a');
var span = common('span');
var img = common('img');
