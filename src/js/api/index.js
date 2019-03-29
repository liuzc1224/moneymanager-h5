import register from './register';
import promote from './promote';
import orderDetail from './orderDetail';
import bookkeep from './bookkeep';
import cpf from './cpf';
import helpCenter from './helpCenter'
import emailRegister from './emailRegister'
import msgCenter from './msgCenter'

let api =  {
	escrowHost: process.env.NODE_ENV === "development" ?  '/api' : '/api',
	...register,
	...promote,
	...orderDetail,
	...bookkeep,
	...cpf,
	...helpCenter,
	...emailRegister,
	...msgCenter
}

export default api;