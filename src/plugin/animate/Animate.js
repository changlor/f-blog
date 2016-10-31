//加载依赖模块
import parent from './lib';
const Parent = new parent();
/*
 * @description: Animate简单基本引擎，提供对Animate动画的基础api支持
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Animate {
    static scroll (input) {
        const [progress, position, time] = [
            input.progress,
            input.position,
            input.time,
        ];
        const func = (input) => {
            scroll(0, input.position);
        };
        Parent.option({ progress: progress, position: position, func: func });
        Parent.action();
    }
}

export default Animate;