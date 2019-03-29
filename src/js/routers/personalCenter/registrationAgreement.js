const routeConfig = [
    {
        path: '/registrationAgreement',
        getComponents(location, callback) {
            require.ensure([], function (require) {
                callback(null, require('../../containers/agreement/registrationAgreement').default)
            }, 'registrationAgreement')
        }
    }
];

export default routeConfig;