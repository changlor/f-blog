import Func from '../lib';
import routerConfig from '../../config/router';

class Config {
    constructor () {
        ::this.loadViews; ::this.setRouter; ::this.initialize
        this.initialize(); this.loadViews();
        this.setRouter(); this.setAdmin(); this.setCustom();
    }

    initialize () {
        this.config = routerConfig;
        this.views = {}; this.views['./'] = {};
        this.admin = {}; this.custom = {}; this.router = {};
    }

    loadViews () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const view = require('../../views/' + value);
            const dir = Func.explode('/', value);
            Func.storeClassification(this.views, dir, view);
        }
    }

    setRouter () {
        for (let [key, value] of Object.entries(this.config.router)) {
            const dir = Func.explode('/', value);
            if (/[^]\([a-z_][a-z0-9_]+\)/gi.test(key)) {
                const matches = key.match(/\([a-z_][a-z0-9_]+\)/gi);
                key = key.replace(/([^])\([a-z_][a-z0-9_]+\).*/i, '$1');
                this.router[key] = this.router[key] || {};
                this.router[key]['name'] = Func.trim(matches[0], '()');
            }
            this.router[key] = this.router[key] || {};
            this.router[key]['component'] = Func.readClassification(this.views, dir);
        }
    }

    setAdmin () {
        this.config.admin.map((value, key) => {
            const dir = Func.explode('/', value);
            Func.storeClassification(this.admin, dir, key);
        });
    }

    setCustom () {
        this.config.custom.map((value, key) => {
            const dir = Func.explode('/', value);
            Func.storeClassification(this.custom, dir, key);
        });
    }
}

const config = new Config();

export default config;
