(function (win,$,undefined) {
	'use strict';
	var teststr = $x('#test').innerHTML;
	var endt = '</em></div>';
	var testd = {
		a:'a',
		b:'b',
		c:'c',
		d:'d',
		e:[{
			e1:[{
				'e10':1
			},{
				'e10':2
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':3
			},{
				'e10':4
			}],
			e2:'e2'
		},{
			e1:[{
				'e10':5
			},{
				'e10':6
			}],
			e2:'e21'
		}]
	};

	var index = 0;
	var modList = {};
	var xhif = 'xh-if';
	var xhfor = 'xh-for';
	var singletag = 'input,img,link,meta,';

	var regexp = /\{\{((?:.|\n)+?)\}\}/m;
	var tagnamexp = /<\s*([a-zA-Z]+)/;
	var endtagexp = /<\s*\/\s*(\w+)/;
	var subtagexp = /<[^<]*/g;
	var forexp = getAttrExp(xhfor);
	var ifexp = getAttrExp(xhif);
	var isArray = _is('Array');
	win.news = {
		"News":News,
		"mod2Dom":mod2Dom,
		"parseStr":parseStr,
		"dataInject":dataInject
	};
	function dataInject(text, data){
		if(!text) return '';
		while(true){
			var c = regexp.exec(text);
			if(c === null) return text;
			/*if(data[c[1]]) */text = text.replace(c[0], data[c[1]]||'');
		}
	}
	function getForStr(str, obj) {
		var tn = tagnamexp.exec(str)[1];/*get tag name*/
		var fe = forexp.exec(str);/*for*/
		if(fe) str = str.replace(fe[0],'');
		var ie = ifexp.exec(str);
		obj[index] = {
			_par:obj,
			_tag:tn,
			_str:str
		};
		if(fe !== null) obj[index]._for = fe[1];
		if(ie !== null) obj[index]._if = ie[1];
		return obj[index];
	}
	function getAttrExp(attr) {
		// var main = "\\s*=\\s*('([^']*)'|\"([^\"]*)\")";
		return new RegExp(attr+"\\s*=\\s*\"([^\"]*)\"","i");
	}
	function $x(el) {
		var mel = document.querySelectorAll(el);
		if(mel.length<2) return mel[0];
		return mel;
	}
	function News(param) {
		var el = param.el;
		var data = param.data;
		var inhtml = param.template||$x(el).innerHTML;
		if(!modList[el]){
			index = 0;
			modList[el] = parseStr(inhtml, {});
		}
		$x(el).innerHTML = mod2Dom(modList[el], data);
		return news;
	}
	function parseStr(str, obj) {
		var sub = subtagexp.exec(str);
		// console.log(sub);
		if(sub === null) return obj;
		var substr = sub[0];
		var subobj = obj._par;
		var et = endtagexp.exec(substr);
		if(et === null){
			subobj = getForStr(substr, obj);
			index += 1;
		}
		parseStr(str, subobj);
		return obj;
	}
	function mod2Dom(mod, data) {
		if(!data) return;
		var html = '';
		if(mod._for){
			data = data[mod._for];
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
		var html = mod._str;
		var endtag = '';
		if(data){
			var keys = Object.keys(mod);
			var value = null;
			html = dataInject(html, data);
			for (var i = 0;i<keys.length;i++) {
				if(keys[i].indexOf('_')>-1) continue;
				value = mod[keys[i]];
				html += mod2Dom(value, data);
			}
		}else{
			console.log('no data for '+html+' subtag.');
		}
		if(singletag.indexOf(mod._tag+',')<0) endtag = '</'+mod._tag+'>';
		html += endtag;
		return html;
	}
	function _is(str) {
		return function (obj) {
			return Object.prototype.toString.call(obj) === '[object '+str+']';
		};
	}
	// News('#test', testd);
	function testFunc() {
		// var str = dataInject(teststr, testd);
		var userInfo = ['hello','world'];
		Object.defineProperty(userInfo, "nickName", {
		    get: function(){
		        return $x('#nickName').innerHTML;
		    },
		    set: function(nick){
		        $x('#nickName').innerHTML = nick;
		    }
		});
		Object.defineProperty(userInfo, "introduce", {
		    get: function(){
		        return $x('#introduce').innerHTML;
		    },
		    set: function(introduce){
		        $x('#introduce').innerHTML = introduce;
		    }
		});
		return userInfo;
	}
	var ui = testFunc();

})(window, jQuery);