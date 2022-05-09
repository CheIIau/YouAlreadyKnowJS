import axios, { AxiosResponse, AxiosError } from 'axios';
import Vue from 'vue';

interface AuthResponse {
  message: string;
  token?: string;
  userId?: string;
}

export interface AuthCredentials {
  userId: string;
  token: string;
}

export async function fetchRegister(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return await axios.post(
    '/api/auth/register',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );
}

export async function fetchLogin(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return await axios.post(
    '/api/auth/login',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );
}

export async function requestAuthHandler(
  cb: typeof fetchRegister,
  email: string,
  password: string
) {
  let message;
  let resJson;
  try {
    const response = await cb(email, password);
    resJson = await response;
    message = response.data.message;
    console.log(message);
    Vue.toasted.success(message);
    if (response.status === 400) {
      throw new Error(message);
    }
    if (response.status === 201) {
      return { registered: true };
    }
  } catch (e) {
    const error = e as AxiosError;
    console.log(error.response?.data.message);
    Vue.toasted.error(error.response?.data.message);
  }
  if (resJson?.data.userId && resJson.data.token) {
    return {
      userId: resJson.data.userId,
      token: resJson.data.token,
    };
  }
}

export function storeUserData(
  userId: string,
  token: string,
  email: string
): void {
  localStorage.setItem('userId', userId);
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
}
