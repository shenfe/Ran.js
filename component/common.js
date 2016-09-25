function common (type) {
    return function (data) {
        return {
            common: true,
            render: function () {
                var el = document.createElement(type);
                Ran.extend(el, data);
                return el;
            }
        };
    };
}

var a = common('a');
var span = common('span');
var img = common('img');
