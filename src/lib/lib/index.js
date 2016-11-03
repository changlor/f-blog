//加载依赖模块
import communication from './communication';
import encrypt from './encrypt';
import render from './render';
import system from './system';

/*
 * @description: Func通用函数类，提供各种通用方法函数
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Lib {
    constructor () {
        ::this.assignment;
        ::this.traversal;
        this.func = {};
        this.assignment();
    }

    assignment () {
        this.traversal(communication);
        this.traversal(encrypt);
        this.traversal(render);
        this.traversal(system);
    }

    traversal (object) {
        for (let [key, value] of Object.entries(object)) {
            this.func[key] = value;
        }
    }
}

const lib = new Lib();
export default lib.func;
