const routeConfig = [
    {
        path: '/helpCenter',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/helpCenter/helpCenter').default)
            }, 'helpCenter')
        }
    }
]

export default routeConfig;