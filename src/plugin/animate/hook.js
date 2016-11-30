import Scroll from './lib/Scroll';
import Loading from './lib/Loading';

const hook = {};
hook.subscription = [
    'commentsturnpage',
    'loadingstart',
    'loadingstop',
];
hook.callback = (event) => {
    switch (event) {
        case 'commentsturnpage':
            const scroll = new Scroll();
            scroll.option({ elName: '.comment-analysis', time: 1000 });
            scroll.play();
        break;
        case 'loadingstart':
            const buffer = document.querySelector('.buffer');
            buffer.style.display = 'block';
            const loading = new Loading();
            loading.option({ elName: '.loading', time: 10000 });
            loading.play();
        break;
        case 'loadingstop':
            const buffer1 = document.querySelector('.buffer');
            buffer1.style.display = 'none';
        break;
        default:
        break;
    }
};

export default hook;