"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sparejs = require("sparejs");

var _sparejs2 = _interopRequireDefault(_sparejs);

var _extend = require("extend");

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListLogic = function ListLogic(options) {
    _classCallCheck(this, ListLogic);

    var self = this;
    self.options = options;
};

var _query = function _query(data) {
    var self = this;
    data = (0, _sparejs2.default)(data, {});
    var queryData = self.options.getQuery();
    var fetchQuery = (0, _extend2.default)(true, {}, queryData, data);
    self.options.willFetch(function next() {
        self.options.fetch(fetchQuery, self.options.render, self.options.didFetch);
    });
};
ListLogic.prototype.query = function (data) {
    var self = this;
    // 增加延迟是因为 react 框架的 setState 是异步的。
    // 有时会出现 setState 已经调用但是 getQuery 获取的值还是老的
    setTimeout(function () {
        _query.bind(self)(data);
    }, 0);
};
exports.default = ListLogic;
