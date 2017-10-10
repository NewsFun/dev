(function (win) {
	var w = win.innerWidth, h = win.innerHeight;
	var abs = Math.abs;
	var canvas = document.querySelector('canvas');
	var body = document.querySelector('body');
	var number = 0;

	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext('2d');
	function showNumber(num) {
		ctx.save();
		ctx.font = '2rem Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(num,w/2,h/2);
		ctx.restore();
	}
	function animate(){
        ctx.clearRect(0, 0, w, h);
        showNumber(number);
        requestAnimationFrame(animate);
    }
    win.onmousewheel = function (event) {
    	var e = event||win.event;
    	var detail = e.wheelDelta;
    	var step = detail/abs(detail);
    	number += step;
    };
    animate();
})(window);