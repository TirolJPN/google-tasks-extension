<template>
  <div class="hello">
    <button v-on:click="login">login</button>
    <button v-on:click="logout">logout</button>
    <button v-on:click="loginCheck">loginCheck</button>
    <hr>
    <button v-on:click="printAllTasks">printAllTasks</button>
    <ul v-for="task in tasks">
      <li>{{task}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SignUp',
  data: function (){
    return {
      tasks: []
    }
  },
  methods: {
    login () {
      if (this.$isAuthenticated() !== true) {
        this.$login()
      }
    },

    logout () {
      this.$logout()
    },

    loginCheck (){
      if (this.$isAuthenticated() === true) {
        alert("ログイン中")
      }else {
        alert("ログアウト中")
      }
    },

    printAllTasks() {
      let vueInstance = this
      this.$getGapiClient()
        .then(function(gapi) {
          gapi.client.tasks.tasklists.list({
            'maxResults': 10
          }).then(function(response) {
            alert((response.result.items))
            let taskLists = response.result.items;
            if (taskLists && taskLists.length > 0) {
              for (let i = 0; i < taskLists.length; i++) {
                vueInstance.tasks.push(taskLists[i])
                // this.$set(this.tasks, i, taskLists[i]);
              }
            } else {
              alert('No task lists found.');
            }
          });
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
