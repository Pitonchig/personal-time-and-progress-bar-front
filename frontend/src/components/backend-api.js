import axios from 'axios'

const AXIOS = axios.create({
  baseURL: `http://127.0.0.1:8090/api`,
  timeout: 5000,
  crossDomain: true,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
});


export default {

  convertDateTimeToISO(dt) {
    console.log('convert to UTC: ' + dt);
    var MS = 1000 * 60; //ms in one minute
    var dtUTC = new Date(dt.getTime() + (dt.getTimezoneOffset() * MS)).toISOString();
    console.log('converted: ' + dtUTC);

    return dtUTC;
  },

  registerUser(userName, userPassword, userEmail) {
    console.log("[API] send registerUser request: " + userName)
    return AXIOS.post('users', {
      login: userName,
      password: userPassword,
      email: userEmail
    });
  },

  deleteUser(userName, userPassword) {
    console.log("[API] send deleteUser request: " + userName)
    return AXIOS.delete('users', {
      login: userName,
      password: userPassword
    });
  },

  login(userName, userPassword) {
    console.log("[API] send login request: " + userName)
    return AXIOS.post('sessions', {
      login: userName,
      password: userPassword
    });
  },

  logout() {
    console.log("[API] send logout request: ");
    return AXIOS.delete('sessions', {test: 'test'} );
  },

  getProjects() {
    console.log("[API] send getProjects request")
    return AXIOS.get('projects');
  },

  saveProjects(data) {
    console.log("[API] send saveProjects request")
      return AXIOS.put('projects', data);
  },

  updateTodoistToken(token) {
    console.log("[API] send updateTodoistToken request: token=" + token);
    return AXIOS.put('users/tokens/', {
      token: token
    });
  },

  syncTasks(from, to) {
    console.log("[API] send syncTasks request");
    return AXIOS.put('users/services', {
      from: from,
      to: to
    });
  },

}


