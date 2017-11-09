(function (window,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;
	var endt = '<div id="xxx" class="xxx" xh-for="xxx">';
	var testd = {
		a:'as',
		b:'bs',
		d:'ds',
		e:[{
			e1:[{
				'e10':1
			},{
				'e10':2
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':3
			},{
				'e10':4
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':5
			},{
				'e10':6
			}],
			e2:'e21'
		}]
	};
	var targetdom = null;
	var updatedat = {};

	var xhif = 'xh-if';
	var xhfor = 'xh-for';
	var singletag = ',input,img,link,meta,';

	var attrexp = /\s+([A-Za-z0-9_\-\:]+)\s*=\s*\"([^\"]*)\"/g;
	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var trimexp = /^\s+|\s+$/gm;
	var subtagexp = /<[^<]*/g;
	var isArray = _is('Array');
	var isObject = _is('Object');

	var events = {
		testevent: testevent
	};
	
	/* class function */

	function News(param) {
		this.$dom = null;
		this.$data = null;
	}
	extend(News.prototype,{
		constructor:News
	});
	function VMod(str) {
		this.son = [];
		this.tag = 'template';
		this.str = str;
		this.txt = null;
		this.par = null;
		this.attr = {};
		if(str) this.init();
	}
	extend(VMod.prototype,{
		constructor:VMod,
		init:function(){
			this.getModAttr();
			this.getTxtCont();
			this.getTagName();
		},
		getModAttr:function(){
			var self = this;
			if(self.str){
				var ae = attrexp.exec(self.str);
				if(ae !== null){
					self.attr[ae[1]] = ae[2];
					self.getModAttr();
				}
			}
			return self.attr;
		},
		getTxtCont:function(){
			var txt = trim(this.str.split('>')[1]);
			if(txt) this.txt = txt;
			return this.txt;
		},
		getTagName:function(){
			this.tag = tagnamexp.exec(this.str)[1];
			return this.tag;
		}
	});
	function XDom(vmod, data){
		this.mod = vmod;
		this.dom = null;
		this.data = data;
		this.getDom();
	}
	extend(XDom.prototype,{
		constructor:XDom,
		render:function(key, val){
			console.log('1');
			this.setDomAttr(key, val);
		},
		getDom:function(){
			targetdom = this;
			this.createDom().setAttrs();
		},
		createDom:function(){
			var mod = this.mod;
			this.dom = document.createElement(mod.tag);
			this.getTxtNode();
			return this;
		},
		getDataAttr:function(){
			var attr = this.mod.attr;
			return traversal(attr, function(k, v, sub){
				var dattr = regexp.exec(v);
				if(dattr!==null) sub[k] = dattr[1];
			});
		},
		addEvent:function(event, callback){
			this.dom.addEventListener(event, events[callback]);
			return this;
		},
		getTxtNode:function(){
			var mtxt = this.mod.txt;
			if(mtxt){
				mtxt = dataInject(mtxt, this.data);
				this.dom.textContent = mtxt;
			}
			return mtxt;
		},
		setDomAttr:function(key, val){
			this.dom.setAttribute(key, val);
		},
		setAttrs:function(){
			var self = this;
			var attrs = self.mod.attr;
			traversal(attrs, function(k, v, sub){
				self.configOfAttrs(k, v, self.data);
			});
			return self;
		},
		configOfAttrs:function(k, v, data){
			var self = this;
			switch(k){
				case 'xh-for':break;
				case 'xh-if' :break;
				case 'xh-on':
					self.addEvent('click', v);
					break;
				default:
					self.setDomAttr(k, dataInject(v, data));
					break;
			}
		}
	});
	function Observer(val){
		this.val = val;
		this.walk(val);
	}
	extend(Observer.prototype,{
		walk:function(val){
			traversal(val, this.convert.bind(this));
		},
		convert:function(key, val){
			defineReactive(this.val, key, val);
		}
	});
	function DMap(){
		this.map = [];
	}
	extend(DMap.prototype,{
		constructor:DMap,
		notify:function(){
			traversal(this.map, function(v, k){
				if(k) k.render();
			});
			updatedat = {};
		}
	});
	/* assistant function */

	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function traversal(obj, cb){
		var keys = Object.keys(obj);
		var sub = {};
		for(var i = 0;i<keys.length;i++){
			var k = keys[i];
			if(cb) cb(k, obj[k], sub);
		}
		return sub;
	}
	function dataInject(text, data){
		if(!text) return '';
		var c = regexp.exec(text);
		if(c === null) return text;
		text = text.replace(c[0], data[c[1]]||'');
		return dataInject(text, data);
	}
	function isSingleTag(tagname) {
		return singletag.indexOf(','+tagname+',')>-1;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	function appendNode(node, nodelist) {
		for(var i = 0;i<nodelist.length;i++){
			node.appendChild(nodelist[i]);
		}
		return node;
	}
	function extend(tarobj, dadobj){
		var keys = Object.keys(dadobj);
		for(var i = 0;i<keys.length;i++){
			var k = keys[i];
			tarobj[k] = dadobj[k];
		}
		return tarobj;
	}
	function clone(tarobj, dadobj){
		var keys = Object.keys(dadobj);
		for(var i = 0;i<keys.length;i++){
			var k = keys[i];
			if(isObject(dadobj[k])){
				tarobj[k] = clone({}, dadobj[k]);
			}else if(isArray(dadobj[k])){
				tarobj[k] = clone([], dadobj[k]);
			}else{
				tarobj[k] = dadobj[k];
			}
		}
		return tarobj;
	}
	function trim(x) {
		return x.replace(trimexp,'');
	}

	/* entrance function */

	function parseStr(str, obj) {
		obj = obj||new VMod();
		var sub = subtagexp.exec(str);
		if(sub!==null){
			var substr = sub[0];
			var subobj = obj.par;
			var et = endtagexp.exec(substr);
			if(et===null) subobj = subStr2Mod(substr, obj);
			parseStr(str, subobj);
		}
		
		return obj;
	}
	function subStr2Mod(str, obj) {
		if(!str) return;
		var sub = new VMod(str);
		sub.par = obj;
		obj.son.push(sub);
		var tn = sub.getTagName();
		if(isSingleTag(tn)) return obj;
		return sub;
	}
	function mod2Dom(mod, data) {
		if(!mod||!data) return;
		var dom = [];
		var aif = mod.attr[xhif];
		if(aif&&!data[aif]) return dom;
		var afor = mod.attr[xhfor];
		if(afor){
			data = data[afor];
			if(isArray(data)){
				for (var i = 0;i<data.length;i++) {
					dom.push(submod2Dom(mod, data[i]));
				}
				return dom;
			}
		}
		dom.push(submod2Dom(mod, data));
		return dom;
	}
	function submod2Dom(mod, data) {
		var dom = new XDom(mod, data).dom;
		for (var i = 0;i<mod.son.length;i++) {
			appendNode(dom, mod2Dom(mod.son[i], data));
		}
		return dom;
	}
	function defineReactive (obj, key, val) {
		var childOb = observe(val);
		var dmp = new DMap();
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function(){
				dmp.map.push(targetdom);
				return val;
			},
			set:function(newval) {
				console.log(newval);
				childOb = observe(newval);
				updatedat[key] = newval;
				dmp.notify();
			}
		});
	}
	function observe (value, vm) {
		if (!value || typeof value !== 'object') return;
		return new Observer(value);
	}
	window.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};

	function vdomfun(data){
		var obj = parseStr(teststr);
		var dom = mod2Dom(obj, data);
		var template = dom[0].childNodes;
		var tar = $x('#test');
		tar.innerHTML = '';
		appendNode(tar, template);
	}
	function testFunc() {
		var ob = observe(testd).val;
		vdomfun(ob);
		ob.a = '789';
		// console.log(ob);
	}
	
	function testevent(event){
		this.style = 'background-color:#00ffff;';
	}
	testFunc();

})(window);