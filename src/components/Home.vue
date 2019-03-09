<template>
  <div class="main-page">
    <div v-if="isLogined">
      <list-add  v-if="showListAddModal" @close="showListAddModal = false"></list-add>
      <list-edit  v-if="showListEditModal" @close="showListEditModal = false" :TaskListName="taskLists[carouselIndex].title"></list-edit>
      <list-delete  v-if="showListDeleteModal" @close="showListDeleteModal = false"></list-delete>

      <v-ons-fab modifier="outline material" class="button logout" v-on:click="logout">
        <v-ons-icon icon="sign-out-alt"  modifier="material"></v-ons-icon>
      </v-ons-fab>

      <transition name="list-core">
        <v-ons-fab modifier="outline material" class="button list" v-on:click="isPushedListButton = !isPushedListButton">
          <v-ons-icon v-bind:icon="listIcon"  modifier="material"></v-ons-icon>
        </v-ons-fab>
      </transition>


      <transition name="list-fade">
        <div v-if="isPushedListButton">
          <v-ons-fab modifier="outline material" class="button list list-add" @click="showListAddModal = true">
            <v-ons-icon icon="plus" modifier="material"></v-ons-icon>
          </v-ons-fab>
        </div>
      </transition>

      <transition name="list-fade">
        <div v-if="isPushedListButton">
          <v-ons-fab modifier="outline material" class="button list list-edit" @click="showListEditModal = true">
            <v-ons-icon icon="edit" modifier="material"></v-ons-icon>
          </v-ons-fab>
        </div>
      </transition>

      <transition name="list-fade">
        <div v-if="isPushedListButton">
          <v-ons-fab modifier="outline material" class="button list list-trash"  @click="showListDeleteModal = true">
            <v-ons-icon icon="trash-alt" modifier="material"></v-ons-icon>
          </v-ons-fab>
        </div>
      </transition>


      <v-ons-page
        :style="bg"
        modifier="material">
        <v-ons-toolbar>
          <div class="left"><ons-toolbar-button @click="carouselIndex > 0 && carouselIndex--"  modifier="material">
            <v-ons-icon icon="angle-left"></v-ons-icon>
          </ons-toolbar-button></div>
          <div class="center">{{taskLists[carouselIndex].title}}</div>
          <div class="right"><ons-toolbar-button @click="carouselIndex < taskLists.length && carouselIndex++"  modifier="material">
            <v-ons-icon icon="angle-right"></v-ons-icon>
          </ons-toolbar-button></div>
        </v-ons-toolbar>

        <!--<v-ons-carousel fullscreen swipeable auto-scroll overscrollable-->
                        <!--:index.sync="carouselIndex" >-->
        <v-ons-carousel swipeable auto-scroll overscrollable fullscreen
                        :index.sync="carouselIndex"  modifier="material">
          <v-ons-carousel-item v-for="taskList in sortedTaskLists" :style="bg"  modifier="material">
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
      <v-ons-button class="button" v-on:click="login"  modifier="material">Login with GAuth</v-ons-button>
    </div>
  </div>
</template>

<script>
  import TaskList from './TaskList'
  import ListAdd from "./ListAdd";
  import ListEdit from "./ListEdit";
  import ListDelete from "./ListDelete";

  export default {
    name: 'Home',
    components: {ListAdd, TaskList, ListEdit, ListDelete},
    data: function() {
      return {
        isLogined: this.$isAuthenticated(),
        taskLists: [],
        isPushedListButton: false,
        // for Modal to add Task List
        showListAddModal: false,
        // for Modal to edit Task List
        showListEditModal: false,
        // for Modal to delete add Task List
        showListDeleteModal: false,

        // for display parameter
        carouselIndex: 0,
        dots: {
          textAlign: 'center',
          fontSize: '30px',
          color: '#ccc',
          position: 'fixed',
          bottom: '40px',
          left: 0,
          right: 0
        },
        bg: {backgroundColor: '#085078'}


      }
    },
    mounted() {
      if (this.$isAuthenticated() === true) {
        this.getTasksLists()
      }
    },
    methods: {
      login () {
        const self = this
        if (this.$isAuthenticated() !== true) {
          // ログイン処理と同時にタスクリストを読み込む.
          this.$login()
            .then(function(){
              if(self.taskLists.length === 0){
                self.getTasksLists()
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
        const self = this
        self.$getGapiClient()
          .then(function(gapi) {
            gapi.client.tasks.tasklists.list({
              'maxResults': 10
            }).then(function(response) {
              let taskLists = response.result.items;
              if (taskLists && taskLists.length > 0) {
                for (let i = 0; i < taskLists.length; i++) {
                  self.taskLists.push(taskLists[i])
                  // this.$set(this.tasks, i, taskLists[i]);
                }
              } else {
                alert('No task lists found.');
              }
            })
          })
      }
    },
    computed: {
      // position propertyで昇順でソートする
      // tmplate中のv-forではこのsortedTaskを指定する
      sortedTaskLists() {
        return this.taskLists.sort((a, b) => {
          return (Number(a.position) < Number(b.position)) ? -1 : (Number(a.position) > Number(b.position)) ? 1 : 0;
        });
      },

      listIcon: function(){
        if (this.isPushedListButton !== true){
          return "list"
        }else{
          return "times"
        }
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
.list{
  position: absolute;
  z-index: 100;
  right: 20px;
  bottom: 90px;
}

.list-add {
  right: 90px;
  bottom: 230px;
}

.list-edit {
  right: 90px;
  bottom: 160px;
}

.list-trash {
  right: 90px;
  bottom: 90px;
}


.list-fade-enter-active, .list-fade-leave-active {
  transition: opacity .01s
}
.list-fade-enter, .list-fade-leave {
  opacity: 0
}


.main-page{
  position: center;
}
</style>


