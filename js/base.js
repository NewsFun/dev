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
				'e10':'e11'
			},{
				'e10':'e12'
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':'e11'
			},{
				'e10':'e13'
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':'e11'
			},{
				'e10':'e14'
			}],
			e2:'e21'
		}]
	};

	var index = 0;
	var modList = {};
	var xhfor = 'xh-for';
	var singletag = 'input,img,link,meta';

	var regexp = /\{\{((?:.|\n)+?)\}\}/g;
	var subtagexp = /<[^<]*/g;
	var tagnamexp = /<\s*(\w+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var forexp = getAttr(xhfor);
	var isArray = _is('Array');

	win.staticHtml = function(el, data){
		var mel = $(el), text = '';
		if(mel.length<1) return false;
		text = mel.html();
		mel.html(dataInject(text, data));
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
		// console.log(index);
		obj[index] = {
			_par:obj,
			_tag:tn,
			_str:str
		};
		var fe = forexp.exec(str);/*for*/
		if(fe === null) return obj[index];
		obj[index]._for = fe[1];
		return obj[index];
	}
	function getEndMod(str, obj) {
		var tr = tagnamexp.exec(str);
		console.log(tr);
		// return obj._par;
	}
	function getAttr(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","i");
	}
	function parseStr(str, obj) {
		var sub = subtagexp.exec(str);
		if(sub === null){
			console.log(modList);
			return obj;
		}
		var substr = sub[0];
		var et = endtagexp.exec(substr);
		// console.log(et);
		if(et === null){
			var subobj = getForStr(substr, obj);
			index += 1;
			parseStr(str, subobj);
		}else{
			parseStr(str, obj._par);
		}
		return obj;
	}
	function mod2Dom(mod, data) {
		if(!data) return;
		var html = '';
		if(isArray(data)){
			for (var i = 0;i<data.length;i++) {
				html+=submod2Dom(mod, data[i]);
			}
		}else{
			html+=submod2Dom(mod, data);
		}
		return html;
	}
	function submod2Dom(mod, data) {
		var keys = Object.keys(mod);
		var value = null;
		var endtag = '';
		var tag = 'tag';
		var html = '';
		for (var i = 0; i<keys.length; i++) {
			if(keys[i].indexOf('_')>-1) continue;
			// console.log(keys[i]);
			value = mod[keys[i]];
			tag = dataInject(value._str, data);
			html += tag;
			if(singletag.indexOf(value._tag)<0) endtag='</'+value._tag+'>';
			if(value._for){
				html += mod2Dom(value, data[value._for]);
			}else{
				html += mod2Dom(value, data);
			}
			html += endtag;
		}
		return html;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	modList = parseStr(teststr, modList);
	var result = mod2Dom(modList, testd);
	console.log(result);
	
})(window, jQuery);