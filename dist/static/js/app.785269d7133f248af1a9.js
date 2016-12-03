webpackJsonp([1,0,2],[
/* 0 */
/***/ function(module, exports) {

	// The Vue build version to load with the `import` command
	// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
	import Vue from 'vue';
	import Element from 'element-ui';
	import VueResource from 'vue-resource';
	
	import App from './app';
	import store from './store';
	
	Vue.use(Element);
	Vue.use(VueResource);
	
	Vue.http.options.root = 'http://localhost:3000/api';
	
	/* eslint-disable no-new */
	new Vue({
	  el: '#app',
	  store,
	  render: h => h(App)
	});

/***/ }
]);
//# sourceMappingURL=app.785269d7133f248af1a9.js.map