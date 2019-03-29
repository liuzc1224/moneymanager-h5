const routeConfig = [
    {
        path: '/registeredResult',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/H5registration/registeredResult').default)
            }, 'registeredResult')
        }
    }
]

export default routeConfig;