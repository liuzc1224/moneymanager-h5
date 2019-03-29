import register from './register';
import seach from './seachCredit';
import bookKeep from './bookKeep';
import helpCenter from "./personalCenter/helpCenter";
import productFeedback from "./personalCenter/productFeedback"
import FeedbackResult from "./personalCenter/FeedbackResult"
import H5registration from "./personalCenter/H5registration";
import registeredResult from "./personalCenter/registeredResult"
import msgDetails from './msgDetails'
import msgList from "./msgList"
import aboutAs from "./personalCenter/aboutAs"
import registrationAgreement from "./personalCenter/registrationAgreement"
import confidentialityAgreement from "./confidentialityAgreement"

const routeConfig = [
	...register,
	...seach,
	...bookKeep,
	...helpCenter,
	...productFeedback,
	...FeedbackResult,
	...H5registration,
	...registeredResult,
	...msgDetails,
	...msgList,
	...aboutAs,
	...registrationAgreement,
	...confidentialityAgreement
]

export default routeConfig;