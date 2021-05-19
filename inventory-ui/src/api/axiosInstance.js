import axios from 'axios';

export default (baseURL) => {
    const axiosInstance = axios.create({
        baseURL: baseURL
    });
    
    axiosInstance.interceptors.request.use(function (config) {
        let token = '';
        if(localStorage.getItem('token') !== '')
          token = 'Bearer '.concat(localStorage.getItem('token'));
        
        config.headers.Authorization = token;
      
        return config;
      });

      return axiosInstance;
}