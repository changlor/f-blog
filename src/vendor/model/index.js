//加载依赖模块
import modelConfig from '../../config/model';

/*
 * @description: load加载类，加载博客模型类
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Load {
    constructor () {
        ::this.loadModels; ::this.addSubscription; ::this.addBubbles;
        this.initialize();
        this.loadModels(); this.addSubscription(); this.addBubbles();
    }

    initialize () {
        this.config = modelConfig;
        this.models = this.config.models; this.delegation = {};
        this.subscriber = {}; this.subscription = {};
    }

    loadModels () {
        for (let i = 0; i < this.models.length; i++) {
            const model = this.models[i];
            this.subscriber[model] = require('../../model/' + model)['default'];
        }
    }

    addSubscription () {
        for (let subscription in this.config.subscriptions) {
            for (let model in this.config.subscriptions[subscription]) {
                const method = this.config.subscriptions[subscription][model];    
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