import { API } from './'

export const logoutUser = () => {
  return API.delete('/identity/sessions','barong')
};

export const loginUser = (email, password, otp_code, recaptcha_response = '') => {
  return API.post(
    '/identity/sessions',
    { email, password, otp_code, recaptcha_response },
    'barong'
  )
};
