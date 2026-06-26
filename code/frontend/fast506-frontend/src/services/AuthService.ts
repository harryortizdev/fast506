import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const res = await axios.post(`${API}/forgot-password`, { email });
  return res.data;
};

export const verifyCode = async (code: string): Promise<{ verified: boolean }> => {
  const res = await axios.post(`${API}/verify-code`, { code });
  return res.data;
};

export const resetPassword = async (newPassword: string): Promise<{ message: string }> => {
  const res = await axios.post(`${API}/reset-password`, { newPassword });
  return res.data;
};
