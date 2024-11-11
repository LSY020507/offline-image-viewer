if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registered successfully');
    }).catch(err => {
        console.error('Service Worker registration failed:', err);
    });
}

const images = [
    '/offline-image-viewer/images/Fair-Flow-lr-scaled.jpg',
    // 继续添加其他图片路径
];

const gallery = document.getElementById('image-gallery');

images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Image';
    img.addEventListener('click', () => {
        window.open(src, '_blank');
    });
    gallery.appendChild(img);
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    });
}

// 添加到主屏幕的提示逻辑
let deferredPrompt;
const addBtn = document.createElement('button');
addBtn.innerText = '将应用添加到主屏幕';
document.body.appendChild(addBtn);
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('用户接受添加到主屏幕');
            } else {
                console.log('用户取消添加到主屏幕');
            }
            deferredPrompt = null;
        });
    });
});
