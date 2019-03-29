const routeConfig = [
    {
        path: '/msgDetails',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/Message/msgDetails').default)
            }, 'msgDetails')
        }
    }
]

export default routeConfig;