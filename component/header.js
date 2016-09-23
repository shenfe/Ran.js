/**
 * Header Component
 * @param  {[function]} tabbar [Tabbar Component]
 * @param  {[object]} data [Data]
 * @return {[object]} [Component Instance]
 */
function header (tabbar, data) {
    var r = {
        // type: 'div', // default: 'div'
        load: function () {
            return this;
        },
        component: {
            tab: tabbar(data.tabs)
        },
        style: {}, // 初始化，成为本组件的 css class style
        state: {
            source: data,
            sink: {
                tabs:
            },
            display: function (v) {
                if(arguments.length === 0) {
                    // TODO: getter
                    return this.hasOwnProperty('_display') ? this._display : 1;
                }
                this._display = v;
                // TODO: setter
            }
        }, // 改变状态数据，会改变 style，也会改变 source 数据；style 改变会成为行内样式；source 数据改变则引发子组件的状态数据改变
        // action: {
        //     show: function () {
        //         r.state.display(1);
        //     }
        // }, // 其他组件实例对本组件的操作
        event: {},
        helper: {}
    };
    return r.load();
}
