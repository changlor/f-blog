import Scroll from './lib/Scroll';
import Loading from './lib/Loading';

const hook = {};
hook.subscription = [
    'commentsturnpage',
    'loadingstart',
];
hook.callback = (event) => {
    switch (event) {
        case 'commentsturnpage':
            const scroll = new Scroll();
            scroll.option({ elName: '.comment-analysis', time: 1000 });
            scroll.play();
        break;
        case 'loadingstart':
            const loading = new Loading();
            loading.option({ elName: '.loading', time: 10000 });
            loading.play();
        break;
        default:
        break;
    }
};

export default hook;