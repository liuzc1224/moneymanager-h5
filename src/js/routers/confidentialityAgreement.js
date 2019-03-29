const routeConfig = [
    {
        path: '/confidentialityAgreement',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('./../containers/agreement/confidentialityAgreement').default)
            }, 'confidentialityAgreement')
        }
    }
]

export default routeConfig;