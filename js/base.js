(function (win,$,undefined) {
	var moduleList = [];
	var xhfor = 'class';
	var teststr = '<div class="info-unfold" id="J-info-unfold" xh-for="e"><em class="layout-icons layout-icons_down-arrow"></em></div>';
	var endt = '</em></div>';
	var testd = {
		a:'a',
		b:'b',
		c:'c',
		d:'d',
		e:[{
			e1:'e1',
			e2:'e2'
		}]
	};
	var starttag = /<\s*(\w+)/i;
	var endtag = /<\s*\//;
	var forexp = getRegExp(xhfor);

	win.staticHtml = function(el, data){
		var mel = $(el), text = '';
		if(mel.length<1) return false;
		text = mel.html();
		mel.html(dataInject(text, data));
	};
	function dataInject(text, data){
		var reg = /\{\{((?:.|\n)+?)\}\}/g;
		while(true){
			var c = reg.exec(text);
			if(c === null) return text;
			text = text.replace(c[0], data[c[1]]);
		}
	}
	function getForStr(str) {
		var f = forexp.exec(str);
		console.log(f);
	}
	
	function getRegExp(attr) {
		var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","g");
	}
	function regular(str, exp) {
		var len = str.length;
		// var substr = str.split('<');
		var c = starttag.exec(str);
		// var d = endtag.test(str);
		var f = forexp.exec(str);
		console.log(len, f);
	}
	regular(teststr);
	$(win.document).ready(function($) {
		// testFun();
	});
})(window, jQuery);