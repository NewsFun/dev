(function (window, $, undefined) {
	var vue = 'getAndRemoveAttr';
	var tobject = {
		title:'hello world',
		name :'world',
		link :'http://www.news.cn',
		content:['1','2','3','4']
	}
	var len = 0,
		index = 0;
	function parseString(str){
		len = str.length;
		index = str.indexOf('<');
		console.log(index);
	}
	function goon(){
		return index<len;
	}

	function stringDetection(string){
		var attr = getQueryString(string,'bo-if');
	}
	function getQueryString(string, name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = string.substr(1).match(reg);
	    if(r!==null) return decodeURIComponent(r[2]);
	    return null;
	}
})(window, jQuery);