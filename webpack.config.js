module.exports = {
    // 入口
    entry: {
        'v-admin': './source/index.js'
    },
    // 输出
    output: {
        path: './',
        /*
            [name] 是 entry 中的 key
            entry: {
                key: value
            }
        */
        filename: "[name].js"
    }
};
