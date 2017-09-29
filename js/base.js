(function (win,$,undefined) {
	
	var teststr = '<div class="info-unfold" id="J-info-unfold" xh-for="e"><em class="layout-icons_down-arrow"><em class="layout-icons_down-arrow"></em></em><em class="icons_down-arrow"></em><em class="layout-icons"></em></div>';
	var endt = '</em></div>';
	var testd = {a:'a',b:'b',c:'c',d:'d',e:[{e1:'e1',e2:'e2'}]};

	var index = 0;
	var modList = {};
	var xhfor = 'xh-for';
	var singletag = 'input,img,link,meta';

	var regexp = /\{\{((?:.|\n)+?)\}\}/g;
	var subtagexp = /<[^<]*/g;
	var tagnamexp = /<\s*(\w+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var forexp = getAttr(xhfor);
	var isArray = _is('array');

	win.staticHtml = function(el, data){
		var mel = $(el), text = '';
		if(mel.length<1) return false;
		text = mel.html();
		mel.html(dataInject(text, data));
	};
	function dataInject(text, data){
		var c = regexp.exec(text);
		if(c === null) return text;
		text = text.replace(c[0], data[c[1]]);
		dataInject(text, data);
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
		var keys = Object.keys(mod);
		// console.log(keys);
		var value = null;
		var endtag = '';
		var html = '';
		for (var i = 0; i < keys.length; i++) {
			if(keys[i].indexOf('_')>-1) continue;
			value = mod[keys[i]];
			html += value._str;
			if(singletag.indexOf(value._tag)<0) endtag='</'+value._tag+'>';
			if(value._for){
				html += mod2Dom(value, data[value._for])+endtag;
			}else{
				html += dataInject(value._str, data)+endtag;
			}
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