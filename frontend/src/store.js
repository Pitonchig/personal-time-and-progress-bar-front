import Vue from 'vue'
import Vuex from 'vuex'
import api from './components/backend-api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginSuccess: false,
    user: {
      id: null,
      name: null,
      email: null,
      isTodoistLinked: false
    },
    projects: [ ]
  },

  data () {
    return {
      timer: ''
    }
  },

  mutations: {
    LOGIN(state, payload){
      console.log('[STORE:MUTATIONS] login');
      state.loginSuccess = true;

      state.user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        isTodoistLinked: payload.todoistLinked
      };
    },

    LOGOUT(state){
      console.log('[STORE:MUTATIONS] logout');
      state.loginSuccess = false;

      state.user = {
        id: null,
        name: null,
        email: null,
        isTodoistLinked: false
      };
      state.projects = [];
    },

    UPDATE_TODOIST_TOKEN(state, payload){
      console.log('[STORE:MUTATIONS] update token status: flag=' + payload.todoistLinked);
      state.user.isTodoistLinked = payload.todoistLinked;
    },

    ADD_PROJECT(state, payload) {
      console.log('[STORE:MUTATIONS] add project');
      state.projects.push({
        id: payload.id,
        name: payload.name,
        percent: payload.percent,
        items: payload.items
      });
    },

    UPDATE_PROJECT(state, {project, data}) {
      console.log('[STORE:MUTATIONS] update project: ' + data.name);
      project.name = data.name;
    },

    DELETE_PROJECT(state, project) {
      console.log('[STORE:MUTATIONS] delete project: ' + project.id);
      const i = state.projects.map(item => item.id).indexOf(project.id);
      state.projects.splice(i, 1);
    },

    SET_PROJECTS(state, payload) {
      console.log('[STORE:MUTATIONS] set projects');
      console.log('payload = ' + payload);
      state.projects = [];
      payload.forEach( (value) => {
        var tasks = [];
        var completed = 0;
        value.items.forEach((item) => {
//            const MS = 1000 * 60;
//            const timeZoneOffset = new Date().getTimezoneOffset() * MS;
//            var start = new Date(new Date(item.start).getTime() - timeZoneOffset);
//            var finish = new Date(new Date(item.finish).getTime() - timeZoneOffset);
            var start = new Date(item.start);
            var finish = new Date(item.finish);

            var task = {
              id: item.id,
              content: item.content,
              isCompleted: item.isCompleted,
              start: start,
              finish: finish
            }
            tasks.push(task);
            if(task.isCompleted) completed ++;
        });

        var percent = (value.items.length==0) ? 0 : Math.round(completed * 100 /value.items.length);
        var project = {
          id: value.id,
          name: value.name,
          percent: percent,
          items: tasks
        }
        state.projects.push(project);
      });
    },

    ADD_ITEM(state, {project, data}) {
      console.log('[STORE:MUTATIONS] add item');
      project.items.push({
        id: data.id,
        content: data.content,
        start: data.start,
        finish: data.finish,
        isCompleted: data.isCompleted
      });
      const completed = project.items.filter(it => it.isCompleted).length;
      project.percent = (project.items.length==0) ? 0 : Math.round(completed * 100 /project.items.length);;
    },

    UPDATE_ITEM(state, {item, data}) {
      console.log('[STORE:MUTATIONS] update item: content=' + data.content);

      console.log('[STORE:MUTATIONS] start=' + data.start);
      console.log('[STORE:MUTATIONS] start=' + data.finish);
      item.content = data.content;
      item.start = data.start;
      item.finish = data.finish;
      item.isCompleted = data.isCompleted;
    },

    DELETE_ITEM(state, {item, project, index}) {
        console.log('[STORE:MUTATIONS] delete item: index=' + index);
        project.items.splice(index, 1);
    },

    UPDATE_PERCENT(state) {
      console.log('[STORE:MUTATIONS] update all projects percent');
      state.projects.forEach( (p)=>{
        p.percent = (p.items.length==0) ? 0 : Math.round(100 * p.items.filter(it => it.isCompleted).length / p.items.length);
      });
    },
  },

  actions: {

    registerUser({commit}, {user, password, email}) {
      console.log("[STORE:ACTION] register user: " + user + " email: " + email);
      return new Promise((resolve, reject) => {
        api.registerUser(user, password, email)
          .then(response => {
            console.log("Response: '" + response.data + "' with status: " + response.status);
            commit('LOGIN', response.data);
            resolve(response)
          })
        .catch(error => {
          console.log("Error: " + error);
          reject(error.response.data)
        })
      })
    },

    deleteUser({commit}, {user, password}) {
      console.log("[STORE:ACTION] delete user: '" + user);
      return new Promise((resolve, reject) => {
        api.deleteUser(user, password)
          .then(response => {
            console.log("Response: '" + response.data + "' with status: " + response.status);
            commit('LOGOUT');
            resolve(response)
          })
        .catch(error => {
          console.log("Error: " + error);
          reject(error.response.data)
        })
      })
    },

    login({commit, dispatch}, {user, password}) {
      console.log("[STORE:ACTION] login user: '" + user);

//      this.timer = setInterval(function() {
//        dispatch('getProjects');
//      }, 60*1000);


      return new Promise((resolve, reject) => {
        api.login(user, password)
          .then(response => {
            console.log("Response: '" + response.data + "' with status: " + response.status);
            commit('LOGIN', response.data);
            dispatch('getProjects');
            resolve(response);
          })
          .catch(error => {
            console.log("Error: " + error);
            reject(error.response.data);
          })
        })
    },

    logout({commit}) {
      console.log("[STORE:ACTION] logout user");
      clearInterval(this.timer);

      return new Promise((resolve, reject) => {
        api.logout()
          .then(response => {
            console.log("Response status: " + response.status);
            commit('LOGOUT');
            resolve(response)
          })
          .catch(error => {
            console.log("Error: " + error);
            reject(error.response.data)
          })
        })
    },

    getProjects({commit}) {
      console.log('[STORE:ACTION] get projects');
      api.getProjects()
        .then(response => {
            console.log("Response status: " + response.status);
            commit('SET_PROJECTS', response.data);
          })
          .catch(error => {
            console.log("Error: " + error);
          })
    },

    saveProjects({commit}) {
      console.log('[STORE:ACTION] save projects');
      api.saveProjects(this.state.projects)
        .then(response => {
            console.log("Response status: " + response.status);
            commit('SET_PROJECTS', response.data);
          })
          .catch(error => {
            console.log("Error: " + error);
          })
    },


    addProject({commit}) {
      console.log('[STORE:ACTION] add project');
      var project = {
        id: '',
        name: 'New Project',
        percent: 0,
        items: []
      }
      commit('ADD_PROJECT', project);
    },

    updateProject({commit}, { project, data} ) {
      console.log('[STORE:ACTION] update project: id=' + data.id + ' name='+ data.name);
      commit('UPDATE_PROJECT', {project, data});
    },

    deleteProject({commit}, project ) {
      console.log('[STORE:ACTION] delete project: id=' + project.id);
      commit('DELETE_PROJECT', project);
    },

    addItem({commit}, project) {
      console.log('[STORE:ACTION] Add item: project.id=' + project.id);

      var finishDateTime = new Date();
      finishDateTime.setMinutes(59);
      finishDateTime.setHours(23);

      var data = {
        id: '',
        content: 'task content',
        start: new Date(),
        finish: finishDateTime,
        isCompleted: false
      }
      commit('ADD_ITEM', {project, data});
      commit('UPDATE_PERCENT');
    },

    updateItem({commit}, { item, data} ) {
      console.log('[STORE:ACTION] update item: id=' + data.id + ' content='+ data.content);
      commit('UPDATE_ITEM', {item, data});
      commit('UPDATE_PERCENT');
    },

    deleteItem({commit}, {item, project, index} ) {
      console.log('[STORE:ACTION] delete item: id=' + item.id);
      commit('DELETE_ITEM', {item, project, index} );
    },

    updateTodoistToken({commit}, { token} ) {
      console.log('[STORE:ACTION] updateTodoistToken: token=' + token);
      api.updateTodoistToken(token)
        .then(response => {
          console.log("Response: '" + response.data + "' with status: " + response.status);
          commit('UPDATE_TODOIST_TOKEN', response.data);
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },

    syncTasks({commit}, {from, to}) {
      console.log('[STORE:ACTION] syncTasks: from=' + from + ' to=' + to);
      api.syncTasks(from, to)
        .then(response => {
          console.log("Response: '" + response.data + "' with status: " + response.status);
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    }
  },

  getters: {
    isLoggedIn: state => state.loginSuccess,
    getUser: state => state.user,
    getProjects: state => state.projects,
    getUserId: state => state.user.userId,
    getUserName: state => state.user.userName
  }
})
