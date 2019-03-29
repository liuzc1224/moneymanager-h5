const routeConfig = [
    {
        path: '/FeedbackResult',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/feedback/FeedbackResult').default)
            }, 'FeedbackResult')
        }
    }
]

export default routeConfig;