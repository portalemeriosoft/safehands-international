const originServer = process.env.REACT_APP_ORIGIN;

export const adminPath = originServer + '/api/login';
export const loginPath = originServer + '/api/login';
export const registerPath = originServer + '/api/customer/signup';
export const getUserPath = originServer + '/api/user';
export const getCustomerUserPath = originServer + '/api/customer/user';
export const logoutPath = originServer + '/api/logout';
export const orderPath = originServer + '/api/orders';
export const customersPath = originServer + '/api/customers';
export const customerUpdatePath = originServer + '/api/customer/update';
export const customerLocationUpdatePath = originServer + '/api/customer/location/update';
export const paymentsPath = originServer + '/api/payments';
export const orderStatusPath = originServer + '/api/order/status';
export const orderCancelPath = originServer + '/api/order/cancel';
export const passwordResetPath = originServer + '/api/password/reset';
export const passwordUpdatePath = originServer + '/api/password/update';
export const passwordChangePath = originServer + '/api/password/change';
export const customerPhotoUploadPath = originServer + '/api/customer/uploadphoto';
export const requestQuotePath = originServer + '/api/quote/request';
export const requestAllQuotePath = originServer + '/api/quote/request-all';
export const acceptQuoteRequestPath = originServer + '/api/quote/request/update';
export const getAllUsers = originServer + '/api/users';
