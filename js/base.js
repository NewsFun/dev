(function (win,$,undefined) {
	var modList = {};
	// var current = {};
	var index = 0;
	var xhfor = 'xh-for';
	var teststr = '<div class="info-unfold" id="J-info-unfold" xh-for="e"><em class="layout-icons_down-arrow"><em class="layout-icons_down-arrow"></em></em><em class="icons_down-arrow"></em><em class="layout-icons"></em></div>';
	var endt = '</em></div>';
	var testd = {a:'a',b:'b',c:'c',d:'d',e:[{e1:'e1',e2:'e2'}]};

	var reg = /\{\{((?:.|\n)+?)\}\}/g;
	var tagname = /<\s*(\w+)/;
	var endtag = /<\s*\/\s*(\w+)/;
	var forexp = getAttr(xhfor);
	var subtag = /<[^<]*/g;

	win.staticHtml = function(el, data){
		var mel = $(el), text = '';
		if(mel.length<1) return false;
		text = mel.html();
		mel.html(dataInject(text, data));
	};
	function dataInject(text, data){
		while(true){
			var c = reg.exec(text);
			if(c === null) return text;
			text = text.replace(c[0], data[c[1]]);
		}
	}
	function getForStr(str, obj) {
		// current = obj;
		var tn = tagname.exec(str)[1];/*get tag name*/
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
		var tr = tagname.exec(str);
		console.log(tr);
		// return obj._par;
	}
	function getAttr(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","i");
	}
	function parseStr(str, obj) {
		var sub = subtag.exec(str);
		if(sub === null){
			console.log(modList);
			return;
		}
		var substr = sub[0];
		var et = endtag.exec(substr);
		// console.log(et);
		if(et === null){
			var subobj = getForStr(substr, obj);
			index += 1;
			parseStr(str, subobj);
		}else{
			// index+=1;
			parseStr(str, obj._par);
		}
	}
	parseStr(teststr, modList);
	

})(window, jQuery);