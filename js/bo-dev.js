(function (window, $, undefined) {
	var tstr = '<div><a href="www.baidu.com"></a></div>';
	var keep = '';
	var state = null;
	function parseTag(str) {
		var len = str.length;
		var index = 0;
		while(index<len){
			index += 1;
			var name = str.charCodeAt(index);
			if(name===32){
				if(state==='tag') return tag;
			}else{
				if(state===null) state = 'tag';
				keep+=str.charAt(index);
			}
		}
	}
	function parseStr(str) {
		var substr = str.split('<');
		for(var i=0;i<substr.length;i++){
			
		}
	}
})(window, jQuery);