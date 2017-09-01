(function (win, $, undefined) {
	var vue = 'getAndRemoveAttr';
	var doc = win.document;
	var tobject = {
		title:'hello world',
		name :'world',
		link :'http://www.news.cn',
		content:['1','2','3','4']
	};
	var teststr = '<div><a href="www.baidu.com">百度</a></div>';
	var len = 0,
		index = 0,
		tags = [],
		domtree = {};
	function setModelBox() {
		var body = doc.querySelector('body');
		var script = creatEl('script',{
			'type':'text/html',
			'id':'bo-mod',
			'innerHTML':teststr
		});
		body.appendChild(script);
	}
	function creatEl(tag, attr) {
		var el = doc.createElement(tag);
		for(var i in attr){
			el[i] = attr[i];
		}
		return el;
	}
	function getQueryString(string, name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = string.substr(1).match(reg);
	    if(r!==null) return decodeURIComponent(r[2]);
	    return null;
	}
	setModelBox();
})(window, jQuery);