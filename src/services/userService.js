import axios from "axios";

export default class UserService {
  addUser(user) {
    return axios.post(`http://localhost:8080/api/users/add`, user);
  }
  userAuth(user) {
    return axios.post("http://localhost:8080/api/users/login", user);
  }
}
