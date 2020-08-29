import { API } from './'

export const postNewWithdraws = data => {
  return API.post('/account/withdraws', data, 'peatio')
};

export const postNewWithdrawsMXN = data => {
  return API.post('/account/withdraws', data, 'fiatlogic')
};

export const postNewDepositsMXN = data => {
  return API.post('/account/deposits', data, 'fiatlogic')
};

export const addBeneficiariesMXN = data => {
  return API.post('/account/beneficiaries', data, 'fiatlogic')
};

export const getBeneficiariesMXN = () => {
  return API.get('/account/beneficiaries', 'fiatlogic')
};

export const postCompoundWithdraws = data => {
  return API.post('/user/withdrawal', data,'compound')
};

export const getBeneficiaries = currency => {
  return API.get(`/account/beneficiaries?currency=${currency}`, 'peatio')
};

export const addBeneficiaries = data => {
  return API.post('/account/beneficiaries', data, 'peatio')
};

export const activate = (data, id) => {
  return API.patch(`/account/beneficiaries/${id}/activate`, data, 'peatio')
};

export const activateMXN = (data, id) => {
  return API.put(`/account/beneficiaries/${id}/activate`, data, 'fiatlogic')
};

export const deleteBeneficiary = id => {
  return API.delete(`/account/beneficiaries/${id}`, 'peatio')
};

export const deleteBeneficiaryMXN = id => {
  return API.delete(`/account/beneficiaries/${id}`, 'fiatlogic')
};
