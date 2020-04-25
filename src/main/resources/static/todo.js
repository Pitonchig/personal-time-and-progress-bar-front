var treeData = {
  name: "ToDo:",
  projects: [
    {
      name: "Project-1",
      items: [{ name: "Item" }, { name: "Item" }]
    },
    {
      name: "Project-2",
      items: [{ name: "Item" }, { name: "Item" }]
    }
  ]
};

const axiosConfig = {
        crossDomain: true,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {},
      };

var todoStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  sync: function (todos) {
    axios
      .post('/api/v1/todos', todos)
      .then(response => (todoStorage.save(response.data)))
      .catch(error => console.log(error))
  },
  save: function(todos){
    console.log(todos)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


Vue.component("item", {
  template:
    `<li class="element">
        <label> {{ model.name }} </label>
    </li>`,
  props: {
    model: Object
  },
  data: function() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
});

Vue.component("project", {
  template:
    `<li class="folder">
      <label :class="{'open': open}" @click="toggle">
        {{ model.name }}
      </label>
      <ul v-show="open" :class="{'open': open}">
        <item
          v-for="(model, index) in model.items"
          :key="index"
          :model="model">
        </item>
        <li class="add" @click="addItem"><label>Add New Item</label></li>
      </ul>
    </li>`,
  props: {
    model: Object
  },
  data: function() {
    return {
      open: true
    };
  },
  computed: {
    isFolder: function() {
      return this.model.items && this.model.items.length;
    }
  },
  methods: {
    toggle: function() {
        this.open = !this.open;
    },
    addItem: function() {
      this.model.items.push({
        name: "New Item"
      });
    }
  }
});

Vue.component("root", {
  template:
    `<li>
      <label>
        {{ model.name }}
        <span>{{model.projects.length}}</span>
        <progress class="progress is-success" value="60" max="100">60%</progress>
      </label>
      <ul>
        <project
          v-for="(model, index) in model.projects"
          :key="index"
          :model="model">
        </project>
        <li class="add" @click="addProject"><label>Add New Project</label></li>
      </ul>
    </li>`,
  props: {
    model: Object
  },
  data: function() {
    return {
    };
  },
  methods: {
    addProject: function() {
      this.model.projects.push({
        name: "New Project",
        items: []
      });
    }
  }
});

new Vue({
  el: "#app",

  data: {
    treeData: treeData
  }
//  ,
//  mounted() {
//    axios
//      .get('http://127.0.0.1:8080/api/projects', axiosConfig)
//      .then(response => (console.log(response)));
//  }

});
