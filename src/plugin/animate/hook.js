import Scroll from './lib/Scroll';

const hook = {};
hook.subscription = [
    'comment', 'pageturn'
];
hook.option = {
    elName: '.comment-analysis',
};
hook.callback = (event) => {
    switch (event) {
        case 'comment':
            const animation = new Scroll();
            animation.option({ elName: hook.option.elName, time: 1000 });
            animation.play();
        break;
        default:
        break;
    }
};

export default hook;