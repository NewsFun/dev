(function (win, $, undefined) {
	var vue = 'getAndRemoveAttr';
	var doc = win.document;
	var tobject = {
		title:'hello world',
		name :'world',
		link :'http://www.news.cn',
		content:['1','2','3','4']
	};
	var teststr = '<div class="test" bo-if=hello><a href="www.baidu.com">百度</a></div>';
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
		// console.log(script);
		var child = script.children;
		console.log(child);
		/*for(var i in child){
			console.log(i);
		}*/
	}
	function getQueryString(string, name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = string.substr(1).match(reg);
	    if(r!==null) return decodeURIComponent(r[2]);
	    return null;
	}
	setModelBox();
})(window, jQuery);