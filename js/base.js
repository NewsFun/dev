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
	var dep = [];

	var index = 0;
	var modList = {};
	var xhif = 'xh-if';
	var xhfor = 'xh-for';
	var singletag = ',input,img,link,meta,';

	var attrexp = /\s+([A-Za-z0-9_\-\:]+)\s*=\s*\"([^\"]*)\"/g;
	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	var isArray = _is('Array');
	var isObject = _is('Object');

	var events = {
		testevent: testevent
	};
	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
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
		this.attr = {};
	}
	extend(VMod.prototype,{
		constructor:VMod,
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
		getTxtNode:function(){
			var txt = trim(this.str.split('>')[1]);
			if(txt) this.txt = txt;
			return this.txt;
		},
		getTagName:function(){
			this.tag = tagnamexp.exec(this.str)[1];
			return this.tag;
		}
	});
	function DMap(){
		this.map = [];
	}
	function addEvent(node, event, callback){
		node.addEventListener(event, events[callback]);
	}
	function dataInject(text, data){
		if(!text) return '';
		var c = regexp.exec(text);
		if(c === null) return text;
		text = text.replace(c[0], data[c[1]]||'');
		return dataInject(text, data);
	}
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
		var dom = document.createElement(mod.tag);
		setAttrs(dom, mod.attr, data);
		setTxtNode(dom, mod.txt, data);
		for (var i = 0;i<mod.son.length;i++) {
			appendNode(dom, mod2Dom(mod.son[i], data));
		}
		return dom;
	}
	function isSingleTag(tagname) {
		return singletag.indexOf(','+tagname+',')>-1;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	function configOfAttrs(dom, aname, attrs, data){
		switch(aname){
			case 'xh-for':break;
			case 'xh-if' :break;
			case 'xh-on':
				addEvent(dom, 'click', attrs[aname]);
				break;
			default:
				dom.setAttribute(aname, dataInject(attrs[aname], data));
				break;
		}
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
		return x.replace(/^\s+|\s+$/gm,'');
	}
	function Observer(val){
		this.val = val;
		this.walk(val);
	}
	extend(Observer.prototype,{
		walk:function(val){
			var keys = Object.keys(val);
			for(var i = 0;i<keys.length;i++){
				var k = keys[i];
				this.convert(k,val[k]);
			}
		},
		convert:function(key, val){
			defineReactive(this.val, key, val);
		}
	});
	function defineReactive (obj, key, val) {
		var childOb = observe(val);
		Object.defineProperty(obj, key, {
			enumerable: true,
			configurable: true,
			get: function(){
				return val;
			},
			set:function(newval) {
				console.log(newval);
				childOb = observe(newval);
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
	
	function testFunc() {
		var obj = parseStr(teststr);
		// var dom = mod2Dom(obj, testd);
		// var template = dom[0].childNodes;
		// var tar = $x('#test');
		// appendNode(tar, template);
		// var son = obj.son[0];
		var t1 = {a:[1,2,3]};
		var ob = observe(t1).val;
		var a = ob.a[0];
		console.log(a);
	}
	function testevent(event){
		this.style = 'background-color:#00ffff;';
	}
	testFunc();

})(window);