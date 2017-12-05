(window => {
    const W = window.innerWidth, H = window.innerHeight;
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = W;
    canvas.height = H;
    
})(window);