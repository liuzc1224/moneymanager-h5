const routeConfig = [
    {
        path: '/bookKeep',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/bookkeep/BookkeepContainer').default)
            }, 'bookKeep')
        }
    }
]

export default routeConfig;