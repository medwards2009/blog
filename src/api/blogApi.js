import axios from "axios";

export default axios.create({
  // baseURL: 'https://michaelandsarahgethitched.com:3001/',
  baseURL: "http://localhost:4000/api/v1/",
});
