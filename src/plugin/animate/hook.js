import Scroll from './lib/Scroll';

const hook = {};
hook.subscription = [
    'comment', 'skippage'
];
hook.option = {
    elName: '.comment-analysis',
};
hook.callback = (event) => {
    switch (event) {
        case 'skippage':
            const animation = new Scroll();
            animation.option({ elName: hook.option.elName, time: 1000 });
            animation.play();
        break;
        default:
        break;
    }
};

export default hook;