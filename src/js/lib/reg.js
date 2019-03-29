export const RegGroup = {
    passValid: (val) => {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        return reg.test(val);
    },
    cpfValid: (val) => {
        let reg = /\d{11}/g;
        return reg.test(val);
    },
    mailValid: (val) => {
        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
        return reg.test(val);
    },
    idValid: (val) => {
        let reg = /[a-zA-Z0-9]/g;
        return reg.test(val);
    },
    isNumber: (val) => {
        let reg = /^\d+$/g;
        return reg.test(val);
    }
};