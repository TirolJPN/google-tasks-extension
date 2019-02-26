<template>
  <div class="card-list">
    <!--<task></task>-->
    <div v-for="task in sortedTasks">
      <task :task="task"></task>
      <!--{{task.position}}-->
      <br>
    </div>
  </div>
</template>

<script>
  import Task from './Task'
  import _ from 'lodash'

  export default {
      name: "TaskList",
      components: {Task},
      props:{
          kind: {
            type: String,
            required: true
          },
          id: {
            type: String,
            required: true
          },
          title: {
            type: String,
            required: true
          },
          updated: {
            type: String,
            required: true
          },
          selflink: {
            type: String,
            required: true
          }
        },
      data: function() {
        return {
          tasks: []
        }
      },

      mounted() {
        if (this.$isAuthenticated() === true) {
          let vueInstance = this
          this.getTasksLists()
        }
          // _.orderBy(this.tasks, ['position'], ['asc']);
      },
      methods: {
        getTasksLists(){
          let vueInstance = this
          vueInstance.$getGapiClient()
            .then(function(gapi) {
              gapi.client.tasks.tasks.list({
                'tasklist': vueInstance.id
              }).then(function(response) {
                let tasks = response.result.items;
                if (tasks && tasks.length > 0) {
                  for (let i = 0; i < tasks.length; i++) {
                    vueInstance.tasks.push(tasks[i])
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
        sortedTasks(){
          return this.tasks.sort((a, b) => {
            return (Number(a.position) < Number(b.position)) ? -1 : (Number(a.position) > Number(b.position)) ? 1 : 0;
          });
        }
    }
  }
</script>

<style scoped>
  .card-list{
    display: flex;
    flex-wrap: wrap;
  }
</style>
