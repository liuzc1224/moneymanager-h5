const routeConfig = [
    {
        path: '/msgList',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/Message/msgList').default)
            }, 'msgList')
        }
    }
]

export default routeConfig;