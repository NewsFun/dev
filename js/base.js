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
	var xhfor = 'xh-for';
	var xhif = 'xh-if';
	var singletag = 'input,img,link,meta,';

	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var subtagexp = /<[^<]*/g;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var forexp = getAttrExp(xhfor);
	var ifexp = getAttrExp(xhif);
	var isArray = _is('Array');
	win.bo = {
		"Bo":Bo,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};
	function dataInject(text, data){
		if(!text) return '';
		while(true){
			var c = regexp.exec(text);
			if(c === null) return text;
			if(data[c[1]]) text = text.replace(c[0], data[c[1]]);
		}
	}
	function getForStr(str, obj) {
		var tn = tagnamexp.exec(str)[1];/*get tag name*/
		var fe = forexp.exec(str);/*for*/
		if(fe) str = str.replace(fe[0],'');
		var ie = ifexp.exec(str);
		obj[index] = {
			_par:obj,
			_tag:tn,
			_str:str
		};
		if(fe !== null) obj[index]._for = fe[1];
		if(ie !== null) obj[index]._if = ie[1];
		return obj[index];
	}
	function getAttrExp(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","i");
	}
	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function Bo(el, data) {
		if(!modList[el]){
			var inhtml = $x(el).innerHTML;
			index = 0;
			modList[el] = parseStr(inhtml, {});
		}
		$x(el).innerHTML = mod2Dom(modList[el], data);
		return bo;
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
		if(!data) return;
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
		var keys = Object.keys(mod);
		var value = null;
		var endtag = '';
		var html = dataInject(mod._str, data);
		for (var i = 0;i<keys.length;i++) {
			if(keys[i].indexOf('_')>-1) continue;
			value = mod[keys[i]];
			html += mod2Dom(value, data);
		}
		if(singletag.indexOf(mod._tag+',')<0) endtag = '</'+mod._tag+'>';
		html += endtag;
		return html;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	Bo('#test', testd);
})(window, jQuery);