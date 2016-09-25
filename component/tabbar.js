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
        load: function () {
            return this;
        },
        component: {
            tab: tabbar(data.tabs)
        },
        style: '',
        state: {
            source: data,
            sink: {
                tabs:
            },
            active: function (i) {
                if(arguments.length === 0) {
                    // TODO: getter
                    return this.hasOwnProperty('_active') ? this._active : 0;
                }
                this._active = i;
                // TODO: setter
            }
        }
    };
    return r.load();
}
