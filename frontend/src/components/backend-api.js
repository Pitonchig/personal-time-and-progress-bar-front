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

  createProject(projectName) {
      console.log("[API] send createProject request: " + projectName)
      return AXIOS.post('projects', {
        name: projectName
      });
  },

  getProjects() {
      console.log("[API] send getProjects request")
      return AXIOS.get('projects', {test: 'test'});
  },

  updateProject(data) {
      console.log("[API] send updateProject request: id=" + data.id + ' name=' + data.name )
      return AXIOS.put('projects/' + data.id, {
        name: data.name
      });
  },

  deleteProject(data) {
    console.log("[API] send deleteProject request: id=" + data.id)
    return AXIOS.delete('projects/' + data.id);
  },

  addItem(project) {
    console.log("[API] send addItem request: project.id=" + project.id);
    return AXIOS.post('projects/' + project.id + '/items', {
      content: 'task'
    });
  },

  updateItem(data) {
    console.log("[API] send updateItem request: id=" + data.id + ' content=' + data.content + ' isCompleted=' + data.isCompleted  + ' start=' + data.start + ' finish=' + data.finish);
    var isoStartDateTime = new Date(data.start.getTime() - (data.start.getTimezoneOffset() * 60000)).toISOString();
    var isoFinishDateTime = new Date(data.finish.getTime() - (data.finish.getTimezoneOffset() * 60000)).toISOString();

      return AXIOS.put('projects/items/' + data.id, {
        content: data.content,
        isCompleted: data.isCompleted,
        start: isoStartDateTime,
        finish: isoFinishDateTime
      });
  },

  deleteItem(id) {
    console.log("[API] send deleteItem request: id=" + id)
    return AXIOS.delete('projects/items/' + id);
  },

}


