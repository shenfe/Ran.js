/**
 * Tabbar Component
 * @param  {[object]} source [Data]
 * @return {[object]} [Component Instance]
 */
function tabbar (source) {
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
