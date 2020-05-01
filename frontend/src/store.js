import Vue from 'vue'
import Vuex from 'vuex'
import api from './components/backend-api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginSuccess: false,
        loginError: false,
        userName: null,
        userPass: null,
        projects: [
            {
              name: "Project-1",
              items: [{ name: "Item1-1" }, { name: "Item1-2" }]
            },
            {
              name: "Project-2",
              items: [{ name: "Item2-1" }, { name: "Item2-2" }]
            }
          ]
    },
    mutations: {
        login_success(state, payload){
            state.loginSuccess = true;
            state.userName = payload.userName;
            state.userPass = payload.userPass;
        },
        login_error(state, payload){
            state.loginError = true;
            state.userName = payload.userName;
        },
        ADD_PROJECT(state) {
          console.log('add project mutation');
          state.projects.push({
            name: 'New Project',
            items: []
          });
        },
        ADD_ITEM(state, project) {
          console.log('add item mutation');
          project.items.push({
            name: 'New Item'
          });
        }
    },
    actions: {
        login({commit}, {user, password}) {
            return new Promise((resolve, reject) => {
                console.log("Accessing backend with user: '" + user);
                api.getSecured(user, password)
                    .then(response => {
                        console.log("Response: '" + response.data + "' with Statuscode " + response.status);
                        if(response.status == 200) {
                            console.log("Login successful");
                            // place the loginSuccess state into our vuex store
                            commit('login_success', {
                                userName: user,
                                userPass: password
                            });
                        }
                        resolve(response)
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                        // place the loginError state into our vuex store
                        commit('login_error', {
                            userName: user
                        });
                        reject("Invalid credentials!")
                    })
            })
        },
        addProject({commit}) {
          console.log('add project action')
          commit('ADD_PROJECT')
        },
        addItem({commit}, project) {
          console.log('add item action')
          commit('ADD_ITEM', project)
        }
    },
    getters: {
        isLoggedIn: state => state.loginSuccess,
        hasLoginErrored: state => state.loginError,
        getUserName: state => state.userName,
        getUserPass: state => state.userPass,
        getProjects: state => state.projects
    }
})