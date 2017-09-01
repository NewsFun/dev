(function (window, $, undefined) {
	var vue = 'getAndRemoveAttr';
	var tobject = {
		title:'hello world',
		name :'world',
		link :'http://www.news.cn',
		content:['1','2','3','4']
	};
	var teststr = '<div><a href="www.baidu.com"></a></div>';
	var len = 0,
		index = 0,
		tags = [],
		domtree = {};
	function parse(str){
		len = str.length;
		tags = str.split('<');
		console.log(tags);
		parseString(tags[2]);
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
	function parseString(str){
		if(str.length<1) return false;
		/*
		str = str.replace(/"/g,'').replace(/>/g,'"}');
		if(str.charCodeAt(0)===47){
			str = str.replace('/','{"end":"');
		}else{
			str = '{"start":"'+str.replace(/=/g,'":"').replace(/\s/g,'","');
		}
		return JSON.parse(str);
		*/
		var strobj = {};
		var slen = str.length;
		var ios = 0;
		var tag = '';
		var prev = 0;
		while(ios<slen){
			getRules(prev);
			ios+=1;
			prev = str.charCodeAt(ios-1);
		}
	}
	function getRules(charcode) {
		switch(charcode){
			case 0 :

				break;
			case 32:
				break;
			default:
				tag += str[ios];
				break;
		}
	}
	parse(teststr);
})(window, jQuery);