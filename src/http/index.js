import configs from './config.js';
import axios from 'axios';
const environment = {
  baseUrl: "http://47.104.252.208:8999",
  userMock: false
}
const http = {};
Object.keys(configs).forEach(item => {
  http[item] = (data) => {
    const {config, response} = configs[item];
    if (environment.userMock) return new Promise((resolve, reject)=>{
      setTimeout(() => resolve(response), 300)
    });
    if (config.type === "post") return axios.post(environment.baseUrl + config.url, data);
    if(config.type === "get") return axios.get(environment.baseUrl + config.url, {params: data});
  }
});
export default http;
