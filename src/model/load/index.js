//加载依赖模块
import config from './config';

/*
 * @description: load加载类，加载博客模型类
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Load {
    constructor () {
        ::this.loadModels; ::this.addSubscription; ::this.addBubbles;
        this.models = config.models; this.delegation = {};
        this.subscriber = {}; this.subscription = {};
        this.loadModels();
        this.addSubscription();
        this.addBubbles();
    }

    loadModels () {
        for (let i = 0; i < this.models.length; i++) {
            const model = this.models[i];
            this.subscriber[model] = require('../' + model)['default'];
        }
    }

    addSubscription () {
        for (let subscription in config.router) {
            for (let model in config.router[subscription]) {
                const method = config.router[subscription][model];    
                const callback = this.subscriber[model][method];
                if (!this.subscription.hasOwnProperty(subscription)) {
                    this.subscription[subscription] = [];
                }
                this.subscription[subscription].push(callback);
            }
        }
    }

    addBubbles () {
        const bubble = (subscription, input) => {
            if (this.subscription.hasOwnProperty(subscription)) {
                for (let i = 0; i < this.subscription[subscription].length; i++) {
                    this.subscription[subscription][i](input);
                }
            }
        };
        this.delegation = {
            bubble: bubble,
        };
    }
}

const load = new Load();
export default load.delegation;