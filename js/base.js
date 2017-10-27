(function (window,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;
	var endt = '<div id="xxx" class="xxx" xh-for="xxx">';
	var testd = {
		a:'as',
		b:'bs',
		c:'cs',
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
	var definedAttr = {
		'xh-for':nothing,
		"xh-if":nothing,
		"xh-on":addEvent
	};
	var events = {
		testevent: testevent
	}
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
		this.son = [];
		this.tag = 'template';
		this.str = '';
		this.txt = '';
		this.attr = {};
	}
	VMod.prototype.constructor = VMod;
	
	function nothing(){}
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
	function getAttrExp(str, obj) {
		if(str){
			obj = obj||{};
			var ae = attrexp.exec(str);
			if(ae !== null){
				obj[ae[1]] = ae[2];
				getAttrExp(str, obj);
			}
		}
		return obj;
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
		if(obj.constructor!==VMod) obj = new VMod();
		var sub = new VMod();
		var tn = tagnamexp.exec(str)[1];
		var txt = str.split('>')[1];
		sub.tag = tn;
		sub.txt = txt;
		sub.par = obj;
		sub.str = str;
		sub.attr = getAttrExp(str);
		obj.son.push(sub);
		if(isSingleTag(tn)) return obj;
		return sub;
	}
	
	function mod2Dom(mod, data) {
		if(!mod||!data) return;
		var afor = mod.attr[xhfor];
		var dom = [];
		if(afor){
			data = data[afor];
			if(isArray(data)){
				for (var i = 0;i<data.length;i++) {
					dom.push(submod2Dom(mod, data[i]));
				}
			}
		}else{
			dom.push(submod2Dom(mod, data));
		}
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
	function setTxtNode(dom, txt, data){
		if(txt){
			txt = dataInject(txt, data);
			var txtnode = document.createTextNode(txt);
			dom.appendChild(txtnode);
		}
		return dom;
	}
	function setAttrs(dom, attrs, data) {
		if(!attrs) return dom;
		var keys = Object.keys(attrs);
		for(var i = 0;i<keys.length;i++){
			var aname = keys[i];
			if(definedAttr[aname]){
				definedAttr[aname](dom, 'click', attrs[aname]);
			}else{
				dom.setAttribute(aname, dataInject(attrs[aname], data));
			}
		}
		return dom;
	}
	function appendNode(node, nodelist) {
		for(var i = 0;i<nodelist.length;i++){
			node.appendChild(nodelist[i]);
		}
		return node;
	}
	function testFunc() {
		var obj = parseStr(teststr);
		var dom = mod2Dom(obj, testd);
		var template = dom[0].childNodes;
		// console.log(obj);
		var tar = $x('#test');
		tar.innerHTML = '';
		appendNode(tar, template);
	}
	function testevent(event){
		this.style = 'background-color:#00ffff;';
	}
	testFunc();

	window.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};
})(window);