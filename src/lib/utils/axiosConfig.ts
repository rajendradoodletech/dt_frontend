import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
