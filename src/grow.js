/**
 * 从node数据设置DOM
 */
const domify = [
    /**
     * 设置attribute
     */
    function ({ attr }, dom) {
        if (!attr) return;
        for (let i in attr) {
            dom.setAttribute(i, attr[i]);
        }
    },

    /**
     * 设置class
     */
    function (node, dom) {
        if (node.class) {
            if (node.class instanceof Array) dom.className = node.class.join(' ');
            else dom.className = node.class;
        }
    },

    /**
     * 设置style
     */
    function ({ style }, dom) {
        if (style) {
            if (typeof style === 'string') {
                dom.style.cssText = style;
                return;
            }
            for (let i in style) {
                dom.style[i] = style[i];
            }
        }
    },

    /**
     * 设置children
     */
    function ({ children }, dom) {
        if (!children || !children.length) return;
        for (let i = 0, len = children.length; i < len; i++) {
            dom.appendChild(grow(children[i]));
        }
    },

    /**
     * 设置其他属性
     */
    function (node, dom) {
        // TODO
    }
];

const grow = node => {
    let dom = null;

    switch (node.tag) {
        case '#text':
            dom = document.createTextNode(node.value || ' ');
            break;
        default:
            dom = document.createElement(node.tag);
            for (let i = 0, len = domify.length; i < len; i++) {
                domify[i](node, dom);
            }
    }

    return dom;
};

export default grow;
