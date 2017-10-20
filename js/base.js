(function (win,$,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;
	var endt = '</em></div>';
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

	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var attrexp = /\s+(\w+)\s*=\s*\"([^\"]*)\"/ig;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	// var forexp = getAttrExp(xhfor);
	// var ifexp = getAttrExp(xhif);
	var isArray = _is('Array');
	win.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};
	function VMod(str) {
		this._son = [];
		this._tag = 'div';
		this._attr = {};
		this._str = '';
		this._par = {};
	}
	VMod.prototype.constructor = VMod;

	function dataInject(text, data){
		if(!text) return '';
		if(c !== null){
			var c = regexp.exec(text);
			text = text.replace(c[0], data[c[1]]||'');
			dataInject(text, data);
		}
		return text;
	}
	function getAttrExp(str, obj) {
		if(str){
			if(!obj) obj = {};
			var ae = attrexp.exec(str);
			if(ae !== null){
				obj[ae[1]] = ae[2];
				getAttrExp(obj);
			}
		}
		return obj;
	}
	function str2Mod(str, obj) {
		if(!obj) obj = new VMod();
		var sub = subtagexp.exec(str);
		// console.log(sub);
		if(sub!==null){
			var substr = sub[0];
			var subobj = obj._par;
			var et = endtagexp.exec(substr);
			if(et===null){
				subobj = subStr2Mod(substr, obj);
			}
			str2Mod(str, subobj);
		}
		
		return obj;
	}
	function subStr2Mod(str, obj) {
		if(obj.constructor!==VMod) obj = new VMod();
		var tn = tagnamexp.exec(str)[1];
			obj._tag = tn;
			obj._attr = getAttrExp(str);
		if(isSingleTag(tn)) return obj;
		return obj._son;
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
	function parseStr(str, obj) {
		var sub = subtagexp.exec(str);
		// console.log(sub);
		if(sub === null) return obj;
		var substr = sub[0];
		var subobj = obj._par;
		var et = endtagexp.exec(substr);
		if(et === null){
			subobj = getForStr(substr, obj);
			index += 1;
		}
		parseStr(str, subobj);
		return obj;
	}

	function mod2Dom(mod, data) {
		if(!mod||!data) return;
		var html = '';
		if(mod._for){
			data = data[mod._for];
			if(isArray(data)){
				for (var i = 0;i<data.length;i++) {
					html += submod2Dom(mod, data[i]);
				}
				return html;
			}
		}
		html += submod2Dom(mod, data);
		return html;
	}
	function submod2Dom(mod, data) {
		var html = mod._str;
		var endtag = '';
		if(data){
			var keys = Object.keys(mod);
			var value = null;
			html = dataInject(html, data);
			for (var i = 0;i<keys.length;i++) {
				if(keys[i].indexOf('_')>-1) continue;
				value = mod[keys[i]];
				html += mod2Dom(value, data);
			}
		}else{
			console.log('no data for '+html+' subtag.');
		}
		if(singletag.indexOf(mod._tag+',')<0) endtag = '</'+mod._tag+'>';
		html += endtag;
		return html;
	}
	function isSingleTag(tagname) {
		return singletag.indexOf(','+tagname+',')>-1;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	function testFunc() {
		var obj = str2Mod(teststr);
		console.log(obj);
	}
	testFunc();

})(window, jQuery);