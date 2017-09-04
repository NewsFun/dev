(function (win, $, undefined) {
	var vue = 'getAndRemoveAttr';
	var doc = win.document;
	var tobject = {
		title:'hello world',
		name :'world',
		link :'http://www.news.cn',
		content:['1','2','3','4']
	};
	var teststr = '<div class="test" bo-if=hello><a>阿里</a><a href="www.baidu.com">百度</a></div>';
	var len = 0,
		index = 0,
		tags = [],
		domtree = {};
	function setModelBox() {
		var body = doc.querySelector('body');
		var script = creatEl('div',{
			'type':'text/html',
			'id':'bo-mod',
			'style':'display:none;',
			'innerHTML':teststr
		});
		body.append(script);
		getChildren();
	}
	function creatEl(tag, attr) {
		var el = doc.createElement(tag);
		for(var i in attr){
			el[i] = attr[i];
		}
		return el;
	}
	function getChildren() {
		var script = doc.querySelector('#bo-mod');
		var child = script.childNodes;
		// console.log(child);
		ifModAttr(child);
	}
	function ifModAttr(el) {
		for(var i = 0;i<el.length;i++){
			if(el[i]['bo-if']);
		}
	}
	function getQueryString(str, name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = str.substr(1).match(reg);
	    if(r!==null) return decodeURIComponent(r[2]);
	    return null;
	}
	setModelBox();
})(window, jQuery);