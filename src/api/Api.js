//import axios
import axios from "axios";
const Api = await axios.create({
  //set default endpoint API
  baseURL: 'https://login.yogafitidonline.com/api/api/',
  // baseURL: "http://192.168.5.65:5050/api/",
  // baseURL: 'http://127.0.0.1:8000/api/',
  // headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  // }
});

// Menambahkan interceptor request
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_yogafit");
    const expiry = localStorage.getItem("expired_in_yogafit");

    if (token && expiry) {
      const now = new Date();
      const expiryDate = new Date(parseInt(expiry) * 1000);
      // console.log(expiryDate);
      // console.log(now);
      if (now >= expiryDate) {
        // Token sudah kedaluwarsa, panggil API refresh token
        return axios.post('https://login.yogafitidonline.com/api/api/auth/token/refresh', {}, {
        // return axios.post("http://192.168.5.65:5050/api/auth/token/refresh", {}, {
              // return axios.post('http://127.0.0.1:8000/api/auth/token/refresh', {}, {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((response) => {
            // Simpan token dan expiry baru ke local storage
            localStorage.setItem("token_yogafit", response.data.token);
            localStorage.setItem("expired_in_yogafit", response.data.expired_in);

            // Atur ulang header Authorization
            config.headers.Authorization = `Bearer ${response.data.token}`;

            return config;
          })
          .catch((error) => {
            // Jika gagal memperoleh token baru, lakukan sesuatu di sini
            localStorage.removeItem('token_yogafit')
            localStorage.removeItem('user')
            localStorage.removeItem('cartItems')
            localStorage.removeItem('expired_in_yogafit')
            //delete header axios
            delete Api.defaults.headers.common['Authorization']
            router.push({name: 'login' })
            return Promise.resolve(config);
          });
      }
    }

    // Token masih berlaku, atur header Authorization
    config.headers.Authorization = "Bearer " + token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
