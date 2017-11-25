(function (win,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;

	var modList = {};
	var singletag = ',input,img,link,meta,';
	
	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	var isArray = _is('Array');
	win.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"isArray":isArray,
		"parseStr":parseStr,
		"dataInject":dataInject
	};
	
	function dataInject(text, data){
		if(!text) return '';
		var c = regexp.exec(text);
		if(c === null) return text;
		text = text.replace(c[0], data[c[1]]||'');
		return dataInject(text, data);
	}
	function VMod(str){
		this.str = str;
		this.tag = null;
		this.son = [];
		this.par = null;
		this.end = false;
		if(str) this.init();
	}
	extend(VMod.prototype,{
		init:function(str){
			if(str) this.str = str;
			this.getTagName();
		},
		getTagName:function(){
			this.tag = tagnamexp.exec(this.str)[1];
			return this.tag;
		}
	});
	function parseStr(str, obj) {
		if(!str) return;
		var sub = subtagexp.exec(str);
		obj = obj||new VMod();
		if(sub!==null){
			var substr = sub[0];
			var subobj = obj.par;
			var et = endtagexp.exec(substr);
			if(et===null) subobj = subStr2Mod(substr, obj);
			parseStr(str, subobj);
		}
		
		return obj;
	}
	function subStr2Mod(str, obj) {
		if(!str) return;
		var sub = new VMod(str);
		sub.par = obj;
		obj.son.push(sub);
		if(isSingleTag(sub.tag)) return obj;
		return sub;
	}
	
	function mod2Dom(mod, data) {
		// console.log(mod);
		if(!mod||!data) return;
		var html = '';
		if(mod.if&&!data[mod.if]) return html;
		if(mod.for){
			data = data[mod.for];
			if(isArray(data)){
				for (var i = 0;i<data.length;i++) {
					html += submod2Dom(mod, data[i]);
				}
				return html;
			}
		}
		html += submod2Dom(mod, data);
		return html;
	}
	function submod2Dom(mod, data) {
		var html = mod.str;
		var endtag = '';
		if(data){
			var value = null;
			var keys = Object.keys(mod);
			html = dataInject(html, data);
			for (var i = 0;i<keys.length;i++) {
				if(keys[i].indexOf('_')>-1) continue;
				value = mod[keys[i]];
				html += mod2Dom(value, data);
			}
		}else{
			console.log('no data for '+html+' subtag.');
		}
		if(!isSingleTag(mod.tag)) endtag = '</'+mod._tag+'>';
		html += endtag;
		return html;
	}
	
	function getAttrExp(attr, str, obj) {
		var attrexp =  new RegExp("\\s+xh-"+attr+"\\s*=\\s*\"([^\"]*)\"","i");
		var ae = attrexp.exec(str);
		if(ae!==null){
			obj['_'+attr] = ae[1];
			str = str.replace(ae[0], '');
		}
		// console.log(obj);
		return str;
	}
	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	function isSingleTag(tagname) {
		return singletag.indexOf(','+tagname+',')>-1;
	}
	function News(param) {
		var el = param.el;
		var data = param.data;
		var inhtml = param.template||$x(el).innerHTML;
		if(param.cache===false||!modList[el]){
			modList[el] = parseTemp(inhtml, {});
		}
		// console.log(modList[el]);
		$x(el).innerHTML = mod2Dom(modList[el], data);
		return news;
	}
	function extend(tarobj, dadobj){
		var keys = Object.keys(dadobj);
		for(var i = 0;i<keys.length;i++){
			var k = keys[i];
			tarobj[k] = dadobj[k];
		}
		return tarobj;
	}
	function testfunction() {
		var ts = parseStr(teststr);
		console.log(ts);
	}
	testfunction();
})(window);