define(function () {
    var vnode = {
        tag: 'DIV',
        key: 0,
        value: null,
        attr: {},
        class: '',
        style: {},
        children: []
    };

    var vnode_example = {
        tag: 'DIV',
        key: 0,
        value: null,
        attr: {},
        class: '',
        style: {
            'background-color': '#ccc'
        },
        children: [
            {
                tag: '#text',
                key: 0,
                value: 'This is a TextNode in a Div.',
                style: {
                    'color': 'red'
                }
            }, {
                tag: 'IMG',
                key: 1,
                value: null,
                attr: {
                    src: 'http://img4.duitang.com/uploads/blog/201309/14/20130914171430_CanSx.jpeg'
                }
            }
        ]
    };

    var render = function (canvas, vn, layoutPlans) {
        if(!layoutPlans) {
            var layoutPlans = [{
                type: 'block',
                x: 0,
                y: 0,
                w: canvas.width,
                h: canvas.height
            }];
        }

        if(vn.tag === 'DIV') {
            var children = vn.children;
            for(var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                render(canvas, child, layoutPlans);
            }
        } else if(vn.tag === '#text') {
            ctx.font = 'Bold 20px Arial';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#008600';
            ctx.fillText(vn.value, layoutPlans[0].x, layoutPlans[0].y);
        } else if(vn.tag === 'IMG') {
            var image = new Image();
            image.onload = function() {
                this.ctx.drawImage(image, this.layoutPlans[0].x, this.layoutPlans[0].y);
            }.bind({
                ctx: ctx,
                layoutPlans: layoutPlans
            });
            image.src = vn.attr.src;
        }
    };

    return {
        render: render
    };
});
