(function (win,$,undefined) {
	
	var teststr = '<div class="{{a}}" id="{{b}}" xh-for="e"><em class="{{e2}}" xh-for="e1"><em class="{{e10}}"></em></em><em class="icons"></em><em class="icons1"></em></div>';
	var endt = '</em></div>';
	var testd = {
		a:'a',
		b:'b',
		c:'c',
		d:'d',
		e:[{
			e1:[{
				'e10':'e101'
			},{
				'e10':'e12'
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':'e102'
			},{
				'e10':'e13'
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':'e103'
			},{
				'e10':'e14'
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
		while(true){
			var c = regexp.exec(text);
			if(c === null) return text;
			if(data[c[1]]) text = text.replace(c[0], data[c[1]]);
		}
	}
	function getForStr(str, obj) {
		var tn = tagnamexp.exec(str)[1];/*get tag name*/
		obj[index] = {
			_par:obj,
			_tag:tn,
			_str:str
		};
		var fe = forexp.exec(str);/*for*/
		var ie = ifexp.exec(str);
		if(fe !== null) obj[index]._for = fe[1];
		if(ie !== null) obj[index]._if = ie[1];
		return obj[index];
	}
	function getAttrExp(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","i");
	}
	function $(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function Bo(el, data) {
		if(!modList[el]){
			var inhtml = $(el).innerHTML;
			index = 0;
			modList[el] = parseStr(inhtml, {});
		}
		$(el).innerHTML = mod2Dom(modList[el], data);
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
		if(isArray(data)){
			for (var i = 0;i<data.length;i++) {
				html += submod2Dom(mod, data[i]);
			}
		}else{
			html += submod2Dom(mod, data);
		}
		return html;
	}
	function submod2Dom(mod, data) {
		var keys = Object.keys(mod);
		var value = null;
		var endtag = '';
		var html = '';
		for (var i = 0;i<keys.length;i++) {
			if(keys[i].indexOf('_')>-1) continue;/*if this attr is undom continue*/
			value = mod[keys[i]];
			if(value._if){
				if(!data[value._if]) continue;
			}
			html += dataInject(value._str, data);/*data inject into start tag*/
			if(singletag.indexOf(value._tag+',')<0) endtag = '</'+value._tag+'>';/*if this tag is not single tag*/
			if(value._for) data = data[value._for];/*if tag has 'for' attr*/
			html += mod2Dom(value, data)+endtag;/*get subtag and endtag*/
		}
		return html;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	modList = parseStr(teststr, {});
	console.log(modList);
	var result = mod2Dom(modList, testd);
	console.log(result);
	
})(window, jQuery);