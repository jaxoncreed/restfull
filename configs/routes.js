module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'RESTfull | Create your Back-End in Minutes',
        handler: require('../components/home/Home')
    },
    editor: {
        path: '/editor',
        method: 'get',
        page: 'editor',
        title: 'RESTfull Editor | Create your Back-End in Minutes',
        handler: require('../components/editor/Editor')
    }
};
