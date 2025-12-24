import Axios from "axios";

// export const openapiAxios = Axios.create({
//   baseURL: "https://api.kcisa.kr/openapi",
// });

export const axiosToSAC = Axios.create({
  baseURL: "https://www.sac.or.kr",
});

// const axiosToSACRequestInterceptor = async (config) => {

//   return config;
// };

// axiosToSAC.interceptors.request.use(axiosToSACRequestInterceptor);
