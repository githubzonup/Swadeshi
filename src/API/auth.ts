import axios, {AxiosResponse} from 'axios';
import {BASE_API_URL} from '../constants';

export async function loginWithEmail(
  email: string,
  password: string,
): Promise<string> {
  const response: AxiosResponse = await axios.post(
    `${BASE_API_URL}/api/login.php`,
    {
      email,
      password,
    },
  );
  return response?.data;
}
