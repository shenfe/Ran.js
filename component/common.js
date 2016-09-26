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

Ran.component.a = common('a');
Ran.component.span = common('span');
Ran.component.img = common('img');
