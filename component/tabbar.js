/**
 * Tabbar Component
 * @param  {[object]} data [Data]
 * @return {[object]} [Component Instance]
 */
function tabbar (components, data) {
    var store = data;
    var state = {
        active: function (v) {
            if(arguments.length === 0) {
                // TODO: getter
                return this.hasOwnProperty('_active') ? this._active : 1;
            }
            this._active = v;
            // TODO: setter
        }
    };
    Ran.extend(store, state);
    var component = {};
    for(var i = 0, _data = data(), size = _data.length; i < size; i++) {
        component[item + i] = components.tab();
    }
    var r = {
        type: 'ul',
        style: ''
    };
    return r.load();
}
