document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft') {
        const left = document.getElementById('go-left');

        if (left) left.click();
    } else if (e.key === 'ArrowRight') {
        const right = document.getElementById('go-right');

        if (right) right.click();
    }
});
