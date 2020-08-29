import { API } from './';


export const getUser = () => {
  return API.get('/resource/users/me', 'barong')
    .then(response => response.data)
};

export const postUser = (data) => {
  return API.post('/identity/users', data, 'barong')
};

export const changePass = (data) => {
  return API.put('/resource/users/password', data, 'barong')
};

export const forgotPass = (email) => {
  return API.post('/identity/users/password/generate_code', { email }, 'barong')
};

export const confirmEmail = (token) => {
  return API.post('/identity/users/email/confirm_code', { token }, 'barong')
};

export const resendConfirmation = (email) => {
  return API.post('/identity/users/email/generate_code', { email }, 'barong')
};

export const resetPass = (reset_password_token, password, confirm_password) => {
  return API.post('/identity/users/password/confirm_code', { reset_password_token, password, confirm_password }, 'barong')
};

export const getApiKeys = () => {
  return API.get(`/resource/api_keys`, 'barong')
};

export const createApiKey = (data) => {
  return API.post('/resource/api_keys', data, 'barong')
};

export const deleteApiKey = (kid, otpCode) => {
  return API.delete(`/resource/api_keys/${kid}?totp_code=${otpCode}`, 'barong')
};

export const editApiKey = (kid, data) => {
  return API.patch(`/resource/api_keys/${kid}`, data, 'barong')
};

export const verifyDocs = (data) => {
  return API.post('/resource/documents', data, 'barong')
};

export const getLabels = () => {
  return API.get(`/resource/labels`, 'barong')
};

export const getActivities = () => {
  return API.get(`/resource/users/activity/session`, 'barong')
};

export const enable2FA = (otp) => {
  return API.post(`/resource/otp/enable`, otp, 'barong')
};

export const disable2FA = (otp) => {
  return API.post(`/resource/otp/disable`, otp, 'barong')
};

export const generateQRCode = () => {
  return API.post(`/resource/otp/generate_qrcode`, {}, 'barong')
};

export const sendCode = (phone_number) => {
  return API.post(`/resource/phones`, phone_number, 'barong')
};

export const resendCode = (phone_number) => {
  return API.post(`/resource/phones/send_code`, phone_number, 'barong')
};

export const verifyPhone = (verify) => {
  return API.post(`/resource/phones/verify`, verify, 'barong')
};

export const updateProfile = (profile) => {
  return API.post(`/resource/profiles`, profile, 'barong')
};