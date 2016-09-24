import sha1 from './sha1.js';
class localStorageApi {
    static savedAuthor (username) {
        window.localStorage.setItem(username, true);
    }
    
    static savedToken (value) {
        window.localStorage.setItem('token', value)
    }

    static expiredAuthor (username) {
        window.localStorage.setItem(username, false);
    }
    
    static fetchAuthor (username) {
        return window.localStorage.getItem(username);
    }

    static fetchToken () {
        return window.localStorage.getItem('token');
    }

    static savedArticle (articleId, article) {
        window.localStorage.setItem('t-' + articleId, JSON.stringify(article));
    }

    static fetchArticle (articleId) {
        try {
            return JSON.parse(window.localStorage.getItem('t-' + articleId));
        } catch (e) {
            return null;
        }
    }

    static cachedArticleVersion (articleId) {
        let article = window.localStorage.getItem('t-' + articleId);
        article = escape(article).replace(/%u/gi, '\\u');
        article = unescape(article);

        return sha1(article);
    }

    static storedCategoryVersion (categoryName) {
        let category = window.localStorage.getItem(categoryName);
        category = escape(category).replace(/%u/gi, '\\u');
        category = unescape(category);

        //return category;
        return sha1(category);
    }

    static savedDailyArticles (articles) {
        window.localStorage.setItem('daily', JSON.stringify(articles));
    }

    static fetchDailyArticles () {
        return JSON.parse(window.localStorage.getItem('daily'));
    }
}

export default localStorageApi;