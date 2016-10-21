import Store from './Store';
import Common from '../common/Common';
import constants from '../lib/config/constants';

class Data {
    constructor (init) {
        [this.postId, this.categoryName, this.storeKey] = [
            init.postId,
            init.categoryName,
            init.storeKey,
        ];
        this.initConstants();
        this.initVariables();
    }

    initConstants () {
        this.constants = {
            host: constants.testHost,
            categories: constants.categories,
        }
    }

    initVariables () {
        this.variables = {
            token: Store.read('Token'),
            postId: this.postId,
            categoryName: this.categoryName,
            storeKey: this.storeKey,
            isStored: Store.isExist(this.storeKey),
            postVersion: Common.createVersion(Store.read('id-' + this.postId)),
            categoryVersion: Common.createVersion(Store.read(this.category)),
        };
    }
}

export default Data;