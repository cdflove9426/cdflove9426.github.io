(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{224:function(n,t,e){"use strict";e.r(t);var o=e(0),r=Object(o.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"content"},[t("p",[this._v("/**")]),t("ul",[t("li",[this._v("存储localStorage\n*/\nexport const setStore = (name, content) => {\nif (!name) return\nif (typeof content !== 'string') {\ncontent = JSON.stringify(content)\n}\nwindow.localStorage.setItem(name, content)\n}")])]),t("p",[this._v("/**")]),t("ul",[t("li",[this._v("获取localStorage\n*/\nexport const getStore = (name) => {\nif (!name) return\nreturn window.localStorage.getItem(name)\n}")])]),t("p",[this._v("/**")]),t("ul",[t("li",[this._v("删除localStorage\n*/\nexport const removeStore = name => {\nif (!name) return\nwindow.localStorage.removeItem(name)\n}")])])])}],!1,null,null,null);t.default=r.exports}}]);