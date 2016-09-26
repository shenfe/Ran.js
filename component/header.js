Ran.mount('header', function (data) {
    this.className = ''; // 如果没指定，则默认使用本组件的名称；若 data 中有 class
    this.style = {}; // 也可以是 string；会成为本组件的 css class style 加入 head 中；后面对 style 的改动一律应用在行内

    this.comps = {};

    this.extend(data);
});
