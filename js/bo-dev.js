(function (window, $, undefined) {
	var tstr = '<div><a href="www.baidu.com"></a></div>';
	var keep = '';
	var state = null;
	var mod = {};
	var cmap = {
		0:false,
		32:codeSpace,
		47:codeSlash,
		60:codeLess,
		61:codeEqual,
		62:codeGreater
	};
	function parse(str) {
		var len = str.length;
		var index = 0;
		while(index<len){
			parseStr(str,index);
			index += 1;
		}
		console.log(keep);
	}
	function parseStr(str,index) {
		var code = str.charCodeAt(index);
		if(cmap[code]){
			cmap[code]();
		}else{
			keep+=str.charAt(index);
		}
	}
	function codeSpace() {
		keep = '';
	}
	function codeEqual() {
		// body...
	}
	function codeSlash() {
		// body...
	}
	function codeGreater() {
		// body...
	}
	function codeLess() {
		state = 'tag';
	}
	function parseIf(str) {
		var iif = str.indexOf('bo-if');
		var code = str.charCodeAt(iif);
		while(code!==60){
			
		}
	}
	parse(tstr);
})(window, jQuery);