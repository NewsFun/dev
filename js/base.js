(function (win,$,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;
	var endt = '<div id="xxx" class="xxx" xh-for="xxx">';
	var testd = {
		a:'a',
		b:'b',
		c:'c',
		d:'d',
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

	var index = 0;
	var modList = {};
	var xhif = 'xh-if';
	var xhfor = 'xh-for';
	var singletag = 'input,img,link,meta,';

	var attrexp = /\s+([A-Za-z0-9_\-\:]+)\s*=\s*\"([^\"]*)\"/g;
	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	var isArray = _is('Array');

	win.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};

	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function News(param) {
		var el = param.el;
		var data = param.data;
		var inhtml = param.template||$x(el).innerHTML;
		if(!modList[el]){
			index = 0;
			modList[el] = parseStr(inhtml, {});
		}
		$x(el).innerHTML = mod2Dom(modList[el], data);
		return news;
	}

	function VMod(str) {
		this._son = [];
		this._tag = '';
		this._str = '';
		this._par = null;
		this._attr = {};
	}
	VMod.prototype.constructor = VMod;
	
	function dataInject(text, data){
		if(!text) return '';
		var c = regexp.exec(text);
		if(c === null) return text;
		text = text.replace(c[0], data[c[1]]||'');
		return	dataInject(text, data);
	}
	function getAttrExp(str, obj) {
		if(str){
			if(!obj) obj = {};
			var ae = attrexp.exec(str);
			if(ae !== null){
				obj[ae[1]] = ae[2];
				getAttrExp(str, obj);
			}
		}
		return obj;
	}
	function parseStr(str, obj) {
		if(!obj) obj = new VMod();
		var sub = subtagexp.exec(str);
		if(sub!==null){
			var substr = sub[0];
			var subobj = obj._par;
			var et = endtagexp.exec(substr);
			if(et===null) subobj = subStr2Mod(substr, obj);
			parseStr(str, subobj);
		}
		
		return obj;
	}
	function subStr2Mod(str, obj) {
		if(obj.constructor!==VMod) obj = new VMod();
		// var sub = new VMod();
		var tn = tagnamexp.exec(str)[1];
		obj._str = str;
		obj._tag = tn;
		obj._attr = getAttrExp(str);
		if(!obj._par) obj._par = new VMod();
		obj._par._son.push(obj);
		if(isSingleTag(tn)) return obj._par;
		return obj;
	}
	
	function mod2Dom(mod, data) {
		if(!mod||!data||!mod._tag) return;
		var afor = mod._attr[xhfor];
		var dom = [];
		if(afor){
			data = data[afor];
			delete mod._attr[xhfor];
			if(isArray(data)){
				for (var i = 0;i<data.length;i++) {
					submod2Dom(mod, data[i]);
				}
				return dom;
			}
		}
		return submod2Dom(mod, data);
	}
	function submod2Dom(mod, data) {
		var dom = document.createElement(mod._tag);
		dom = setAttrs(dom, mod._attr, data);
		for (var i = 0;i<mod._son.length;i++) {
			dom.appendChild(mod2Dom(mod._son[i], data));
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
	function setAttrs(dom, attrs, data) {
		var keys = Object.keys(attrs);
		for(var i = 0;i<keys.length;i++){
			dom.setAttribute(keys[i], dataInject(attrs[keys[i]], data));
		}
		return dom;
	}
	function testFunc() {
		var obj = parseStr(teststr);
		// var dom = submod2Dom(obj._son[0], testd);
		console.log(obj);
		
	}
	testFunc();

})(window, jQuery);