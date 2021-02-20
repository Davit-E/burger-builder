import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-da45f.firebaseio.com/'
});

export default instance;