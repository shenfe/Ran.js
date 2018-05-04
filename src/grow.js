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
            if (!attr.hasOwnProperty(i)) continue;
            dom.setAttribute(i, attr[i]);
        }
    },

    /**
     * 设置class
     */
    function (node, dom) {
        if (node.class) {
            dom.className = (node.class instanceof Array) ? node.class.join(' ') : node.class;
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
                if (!style.hasOwnProperty(i)) continue;
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
    let dom;

    switch (node.tag) {
        case '#text':
            dom = document.createTextNode(node.value || ' ');
            break;
        default:
            dom = document.createElement(node.tag);
            for (let d of domify) {
                d(node, dom);
            }
    }

    return dom;
};

export default grow;
