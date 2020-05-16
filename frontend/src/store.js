import Vue from 'vue'
import Vuex from 'vuex'
import api from './components/backend-api'

Vue.use(Vuex);

//    projects: [
//      {
//        id:
//        name: "Project-1",
//        percent:
//        items: [
//          {
//            name: "Item1-1",
//            isCompleted: false
//          }
//        ]
//      }
//    ]

export default new Vuex.Store({
  state: {
    loginSuccess: false,
    user: {
      id: null,
      name: null
    },
    projects: [ ]
  },

  data () {
    return {
      timer: ''
    }
  },

  methods: {
    poll: function() {
      console.log('poll!');

    }
  },

  mutations: {
    LOGIN(state, payload){
      console.log('[STORE:MUTATIONS] login');
      state.loginSuccess = true;

      state.user = {
        id: payload.userId,
        name: payload.userName
      };
    },

    LOGOUT(state){
      console.log('[STORE:MUTATIONS] logout');
      state.loginSuccess = false;

      state.user = {
        id: null,
        name: null
      };

      state.projects = [];

    },

    ADD_PROJECT(state, payload) {
      console.log('[STORE:MUTATIONS] add project');
      state.projects.push({
        id: payload.id,
        name: 'New Project',
        percent: 0,
        items: []
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

      state.projects = [];
      payload.forEach( (value) => {
        var tasks = [];
        var completed = 0;
        value.items.forEach((item) => {
            var task = {
              id: item.id,
              content: item.content,
              isCompleted: item.isCompleted,
              start: new Date(item.start),
              finish: new Date(item.finish)
            }
            console.log('[STORE:MUTATIONS] start=' + item.start);
            console.log('[STORE:MUTATIONS] dt=' + task.start);
            console.log('---');
            tasks.push(task);
            if(task.isCompleted) completed ++;
        });

        var project = {
          id: value.id,
          name: value.name,
          percent: Math.round(completed * 100 /value.items.length),
          items: tasks
        }
        state.projects.push(project);
      });
    },

    ADD_ITEM(state, {project, data}) {
      console.log('[STORE:MUTATIONS] add item');
      project.items.push({
        id: data.id,
        content: 'New Item',
        isCompleted: false
      });
      const completed = project.items.filter(it => it.isCompleted).length;
      project.percent = Math.round(completed * 100 /project.items.length);
    },

    UPDATE_ITEM(state, {item, data}) {
      console.log('[STORE:MUTATIONS] update item: content=' + data.content);
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
        p.percent = Math.round(100 * p.items.filter(it => it.isCompleted).length / p.items.length);
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
            commit('LOGIN', {
              userId: response.data.id,
              userName: user,
            });
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
      console.log(this.timer);
      this.timer = setInterval(function() {
        dispatch('getProjects');
      }, 10000);
      console.log(this.timer);

      return new Promise((resolve, reject) => {
        api.login(user, password)
          .then(response => {
            console.log("Response: '" + response.data + "' with status: " + response.status);
            commit('LOGIN', {
              userId: response.data.id,
              userName: user
            });

        console.log("get projects");
        api.getProjects()
          .then(response => {
              console.log("Response status: " + response.status);
              commit('SET_PROJECTS', response.data);
              resolve(response)
            })
            .catch(error => {
              console.log("Error: " + error);
              reject(error.response.data)
            })

            resolve(response)
          })
          .catch(error => {
            console.log("Error: " + error);
            reject(error.response.data)
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
            //resolve(response)
          })
          .catch(error => {
            console.log("Error: " + error);
            //reject(error.response.data)
          })
    },

    addProject({commit}) {
      console.log('[STORE:ACTION] add project');
      api.createProject('newProject')
         .then(response => {
           console.log("Response: '" + response.data + "' with status: " + response.status);
           commit('ADD_PROJECT', response.data);
         })
         .catch(error => {
           console.log("Error: " + error);
         })
    },

    updateProject({commit}, { project, data} ) {
      console.log('[STORE:ACTION] update project: id=' + data.id + ' name='+ data.name);
      api.updateProject(data)
        .then(response => {
          console.log("Response: '" + response.data + "' with status: " + response.status);
          commit('UPDATE_PROJECT', {project, data});
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },

    deleteProject({commit}, project ) {
      console.log('[STORE:ACTION] delete project: id=' + project.id);
      api.deleteProject(project)
        .then(response => {
          console.log("Response: with status: " + response.status);
          commit('DELETE_PROJECT', project);
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },

    addItem({commit}, project) {
      console.log('[STORE:ACTION] Add item: project.id=' + project.id);
      api.addItem(project)
        .then(response => {
          console.log('Response: ' + response.data + ' with status: ' + response.status);
          const data = response.data;
          commit('ADD_ITEM', {project, data});
          commit('UPDATE_PERCENT');
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },

    updateItem({commit}, { item, data} ) {
      console.log('[STORE:ACTION] update item: id=' + data.id + ' content='+ data.content);
      api.updateItem(data)
        .then(response => {
          console.log("Response: '" + response.data + "' with status: " + response.status);
          commit('UPDATE_ITEM', {item, data});
          commit('UPDATE_PERCENT');
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },

    deleteItem({commit}, {item, project, index} ) {
      console.log('[STORE:ACTION] delete item: id=' + item.id);
      api.deleteItem(item.id)
        .then(response => {
          console.log("Response: with status: " + response.status);
          commit('DELETE_ITEM', {item, project, index} );
        })
        .catch(error => {
          console.log("Error: " + error);
        })
    },
  },

  getters: {
    isLoggedIn: state => state.loginSuccess,
    getUser: state => state.user,
    getProjects: state => state.projects,
    getUserId: state => state.user.userId,
    getUserName: state => state.user.userName
  }
})
