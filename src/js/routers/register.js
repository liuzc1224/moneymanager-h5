const routeConfig = [
    {
        path: '/register',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/register/RegisterContainer').default)
            }, 'register')
        }
    }
]

export default routeConfig;