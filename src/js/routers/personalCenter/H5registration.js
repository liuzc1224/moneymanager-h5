const routeConfig = [
    {
        path: '/H5registration',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/personalCenter/H5registration/H5registration').default)
            }, 'H5registration')
        }
    }
]

export default routeConfig;