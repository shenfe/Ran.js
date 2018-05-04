import milk from './milk';

export default class vdom {
    constructor(dom) {
        this._node = milk(dom);
    }

    get classList() {}

    get className() {}

    set className(v) {}

    get children() {}

    get attributes() {}

    get id() {}
    
    set id(v) {}

    get style() {}

    hasAttribute(name) {}

    getAttribute(name) {}

    setAttribute(name, value) {}

    appendChild() {}

    removeChild() {}
};
