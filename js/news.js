(function (win,undefined) {
	'use strict';
	var index = 0;
	var modList = {};
	var xhif = 'xh-if';
	var xhfor = 'xh-for';
	var singletag = ',input,img,link,meta,';

	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	var forexp = getAttrExp(xhfor);
	var ifexp = getAttrExp(xhif);
	var isArray = _is('Array');
	win.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseTemp":parseTemp,
		"dataInject":dataInject
	};

	function dataInject(text, data){
		if(!text) return '';
		while(true){
			var c = regexp.exec(text);
			if(c === null) return text;
			text = text.replace(c[0], data[c[1]]||'');
		}
	}
	function parseTemp(str, obj) {
		index = 0;
		return parseStr(str, obj);
	}
	function parseStr(str, obj) {
		var sub = subtagexp.exec(str);
		if(sub === null) return obj;
		var substr = sub[0];
		var subobj = obj._par;
		// console.log(substr);
		var et = endtagexp.exec(substr);
		if(et === null){
			subobj = getForStr(substr, obj);
			index += 1;
		}
		parseStr(str, subobj);
		return obj;
	}
	function getForStr(str, obj) {
		var tn = tagnamexp.exec(str)[1];/*get tag name*/
		var fe = forexp.exec(str);/*for*/
		if(fe) str = str.replace(fe[0],'');
		var ie = ifexp.exec(str);
		obj[index] = { _tag:tn, _par:obj, _str:str };
		if(fe !== null) obj[index]._for = fe[1];
		if(ie !== null) obj[index]._if = ie[1];
		if(isSingleTag(tn)) return obj;
		return obj[index];
	}
	
	function mod2Dom(mod, data) {
		// console.log(mod);
		if(!mod){
			console.log('mod does not exit');
			return;
		}
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
		if(!isSingleTag(mod._tag)) endtag = '</'+mod._tag+'>';
		html += endtag;
		return html;
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
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	function isSingleTag(tagname) {
		return singletag.indexOf(','+tagname+',')>-1;
	}
	function News(param) {
		var el = param.el;
		var data = param.data;
		var inhtml = param.template||$x(el).innerHTML;
		if(param.cache===false||!modList[el]){
			modList[el] = parseTemp(inhtml, {});
		}
		console.log(modList[el]);
		$x(el).innerHTML = mod2Dom(modList[el], data);
		return news;
	}
})(window);