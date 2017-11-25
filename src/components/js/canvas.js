(function (win) {
	const W = win.innerWidth, H = win.innerHeight;
	const Abs = Math.abs;
	const canvas = document.querySelector('canvas');

	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext('2d');
	
	function showNumber(num) {
		ctx.save();
		ctx.font = '2rem Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(num,W/2,H/2);
		ctx.restore();
	}
	function animate(){
        ctx.clearRect(0, 0, W, H);
        showNumber(number);
        requestAnimationFrame(animate);
    }
    win.onmousewheel = function (event) {
    	let e = event||win.event;
    	let detail = e.wheelDelta;
    	let step = detail/Abs(detail);
    	number += step;
    };
    animate();
})(window);