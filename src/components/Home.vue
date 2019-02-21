<template>
  <div class="button-list">
    <div v-if="isLogined">
      <v-ons-button modifier="outline" class="button" v-on:click="logout">Log Out</v-ons-button>
      <v-ons-button modifier="cta" class="button" v-on:click="printAllTasks">Confirm my Tasks</v-ons-button>
      <ul v-for="task in tasks">
        <li>{{task}}</li>
      </ul>
    </div>
    <div v-else>
      <v-ons-button class="button" v-on:click="login">Login with GAuth</v-ons-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function() {
    return {
      isLogined: this.$isAuthenticated(),
      tasks: []
    }
  },
  // watch: {
  //   isLogined: function (newIsLogined, oldIsLogined) {
  //     this.isLogined = this.isAuthenticated()
  //   }
  // },
  methods: {
    login () {
      if (this.$isAuthenticated() !== true) {
        this.$login()
        this.isLogined = !this.isLogined
      }
    },

    logout () {
      this.$logout()
      this.isLogined = !this.isLogined
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
.button-list{
  margin: 16px;
}
.button{
  margin: 6px 0;
}
</style>
