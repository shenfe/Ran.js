const ifEmpty = obj => {
    if (Array.isArray(obj)) return obj.length ? obj : undefined;
    return Object.keys(obj).length ? obj : undefined;
};

const isEmptyTextNode = node => {
    return node.tag === '#text' && node.value === undefined;
};

const reduceTrim = str => {
    return str.replace(/^\s+/, ' ').replace(/\s+$/, ' ');
};

/**
 * 从DOM解析出node数据的方法
 */
const nodify = {
    tag() {
        const n = this.nodeName.toLowerCase();
        return n;
    },
    key(key) {
        return key;
    },
    value() {
        if (this.nodeName !== '#text') return this.value;
        return /^\s+$/.test(this.nodeValue) ? undefined : reduceTrim(this.nodeValue);
    },
    attr() {
        const a = this.attributes;
        const skip = ['class', 'style'];
        if (!a || (!a.length && 0 !== a.length)) return;
        const r = {};
        for (let i = 0, len = a.length; i < len; i++) {
            if (skip.includes(a[i].name)) continue;
            r[a[i].name] = a[i].value;
        }
        return ifEmpty(r);
    },
    class() {
        if (!this.classList) return;
        const r = Array.prototype.slice.call(this.classList, 0);
        return ifEmpty(r);
    },
    style() {
        const s = this.style;
        if (!s || (!s.length && 0 !== s.length)) return;
        const r = {};
        for (let i = 0, len = s.length; i < len; i++) {
            r[s[i]] = s[s[i]];
        }
        return ifEmpty(r);
    },
    children() {
        if (this.nodeName === '#text') return;
        const children = this.childNodes;
        if (!children) return;
        const r = [];
        let child;
        for (let i = 0, len = children.length; i < len; i++) {
            let lastChild = child;
            child = milk(children[i], i);
            if (lastChild && isEmptyTextNode(lastChild) && isEmptyTextNode(child))
                continue;
            r.push(child);
        }
        return ifEmpty(r);
    }
};

/**
 * 从node数据设置DOM
 */
const domify = [
    /**
     * 设置attribute
     */
    function (node, dom) {
        const a = node.attr;
        if (!a) return;
        for (let i in a) {
            dom.setAttribute(i, a[i]);
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
    function (node, dom) {
        if (node.style) {
            if (typeof node.style === 'string') {
                dom.style.cssText = node.style;
                return;
            }
            const s = node.style;
            for (let i in s) {
                dom.style[i] = s[i];
            }
        }
    },

    /**
     * 设置children
     */
    function (node, dom) {
        const c = node.children;
        if (!c || !c.length) return;
        for (let i = 0, len = c.length; i < len; i++) {
            dom.appendChild(grow(c[i]));
        }
    },

    /**
     * 设置其他属性
     */
    function (node, dom) {
        // TODO
    }
];

/**
 * 
 * @param {*} dom 
 * @param {*} key 
 * @returns {node}
 */
const milk = function (dom, key) {
    const node = {};
    for (let i in nodify) {
        const v = nodify[i].call(dom, key);
        if (v == null) continue;
        node[i] = v;
    }
    return node;
};

/**
 * 
 * @param {*} node1 
 * @param {*} node2 
 */
const diff = function (node1, node2) {
    // TODO
};

/**
 * 
 * @param {*} node
 * @returns {Node}
 */
const grow = function (node) {
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

module.exports = {
    milk,
    diff,
    grow
};
