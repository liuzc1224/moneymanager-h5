const routeConfig = [
    {
        path: '/aboutAs',//关于我们
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/aboutAs/aboutAs').default)
            }, 'aboutAs')
        }
    }
];

export default routeConfig;