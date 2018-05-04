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

const domFromHTML = html => {
    let div = document.createElement('div');
    div.innerHTML = html;
    dom = div.children[0];
    div.removeChild(dom);
    div = null;
    return dom;
};

const milk = function (dom, key) {
    if (typeof dom === 'string') {
        dom = domFromHTML(dom);
    }
    const node = {};
    for (let i in nodify) {
        if (!nodify.hasOwnProperty(i)) continue;
        const v = nodify[i].call(dom, key);
        if (v == null) continue;
        node[i] = v;
    }
    return node;
};

export default milk;
