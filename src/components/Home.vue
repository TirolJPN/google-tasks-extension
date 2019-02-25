<template>
  <div class="button-list">
    <div v-if="isLogined">
      <v-ons-fab modifier="outline" class="button logout" v-on:click="logout">
        <v-ons-icon icon="sign-out-alt"></v-ons-icon>
      </v-ons-fab>

      <v-ons-page>
        <v-ons-toolbar>
          <div class="left"><ons-toolbar-button @click="carouselIndex > 0 && carouselIndex--">
            <v-ons-icon icon="angle-left"></v-ons-icon>
          </ons-toolbar-button></div>
          <div class="center">{{taskLists[carouselIndex].title}}</div>
          <div class="right"><ons-toolbar-button @click="carouselIndex < taskLists.length && carouselIndex++">
            <v-ons-icon icon="angle-right"></v-ons-icon>
          </ons-toolbar-button></div>
        </v-ons-toolbar>

        <v-ons-carousel fullscreen swipeable auto-scroll overscrollable
                        :index.sync="carouselIndex" >
          <v-ons-carousel-item v-for="taskList in taskLists" :style="{backgroundColor: '#085078'}">
            <task-list :kind="taskList.kind" :id="taskList.id" :title="taskList.title" :updated="taskList.updated" :selflink="taskList.selflink"></task-list>
          </v-ons-carousel-item>
        </v-ons-carousel>

        <div :style="dots">
      <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(taskLists).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
      </span>
        </div>
      </v-ons-page>
    </div>
    <div v-else>
      <v-ons-button class="button" v-on:click="login">Login with GAuth</v-ons-button>
    </div>
  </div>
</template>

<script>
import TaskList from './TaskList'

export default {
  name: 'Home',
  components: {TaskList},
  data: function() {
    return {
      isLogined: this.$isAuthenticated(),
      taskLists: [],
      carouselIndex: 0,
      dots: {
        textAlign: 'center',
        fontSize: '30px',
        color: '#fff',
        position: 'absolute',
        bottom: '40px',
        left: 0,
        right: 0
      }
    }
  },
  mounted() {
    if (this.$isAuthenticated() === true) {
      this.getTasksLists()
    }
  },
  methods: {
    login () {
      let vueInstance = this
      if (this.$isAuthenticated() !== true) {
        // ログイン処理と同時にタスクリストを読み込む.
        this.$login()
          .then(function(){
            if(vueInstance.taskLists.length === 0){
              vueInstance.getTasksLists()
            }
        })
        this.isLogined = !this.isLogined
      }
    },
    logout () {
      this.$logout()
      this.isLogined = !this.isLogined
    },

    getTasksLists(){
      let vueInstance = this
      vueInstance.$getGapiClient()
        .then(function(gapi) {
          gapi.client.tasks.tasklists.list({
            'maxResults': 10
          }).then(function(response) {
            let taskLists = response.result.items;
            if (taskLists && taskLists.length > 0) {
              for (let i = 0; i < taskLists.length; i++) {
                vueInstance.taskLists.push(taskLists[i])
                // this.$set(this.tasks, i, taskLists[i]);
              }
            } else {
              alert('No task lists found.');
            }
          })
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
.logout {
  position: absolute;
  z-index: 100;
  right: 20px;
  bottom: 20px;

}
</style>


