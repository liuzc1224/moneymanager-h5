const routeConfig = [
    {
        path: '/seachCredit',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/seachCredit/SeachCredit').default)
            }, 'seachCredit')
        }
    },
    {
        path: '/defaultRecord/:type',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/seachCredit/DefaultRecord').default)
            }, 'defaultRecord')
        }
    },
    {
        path: '/orderDetail/:uccId',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/orderDetail/OrderDetailContainer').default)
            }, 'orderDetail')
        }
    }
]

export default routeConfig;