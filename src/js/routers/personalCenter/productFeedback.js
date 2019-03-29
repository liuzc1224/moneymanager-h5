const routeConfig = [
    {
        path: '/productFeedback',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/feedback/productFeedback').default)
            }, 'productFeedback')
        }
    }
]

export default routeConfig;