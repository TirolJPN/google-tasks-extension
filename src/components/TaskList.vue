<template>
  <div class="card-list">
    <div v-for="task in sortedTasks">
      <task :task="task" :subTasks="specificSubTasks(task.id)"  :taskList="id"></task>
    </div>
  </div>
</template>

<script>
  import Task from './Task'

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
          tasks: [],

          // parentがundefinedではない所謂サブタスク
          subTasks: []
        }
      },

      mounted() {
        if (this.$isAuthenticated() === true) {
          const self = this
          this.getTasksLists()
        }
      },
      methods: {
        getTasksLists(){
          const self = this
          self.$getGapiClient()
            .then(function(gapi) {
              gapi.client.tasks.tasks.list({
                'tasklist': self.id
              }).then(function(response) {
                let tasks = response.result.items;
                if (tasks && tasks.length > 0) {
                  for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].parent === undefined){
                      self.tasks.push(tasks[i])
                    }else{
                      self.subTasks.push(tasks[i])
                    }
                  }
                } else {
                  console.log('No task lists found.');
                }
              })
            })
        },
        specificSubTasks(parentKey){
          return this.subTasks.filter(function (element) {
            return element.parent === parentKey;
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
