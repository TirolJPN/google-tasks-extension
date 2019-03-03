<template>

  <div :style="noBottomLineStyle">
    <v-ons-card modifier="material">
      <div class="main-task">
        <div class="checkbox-padding">
          <v-ons-checkbox float modifier="material">
          </v-ons-checkbox>
        </div>
        <div class="inline-block">
          <v-ons-input v-model="task.title" v-on:keyup.enter="updateTask(task.id)" modifier="material" placeholder="タスク名">
          </v-ons-input>
          <br>
          <v-ons-input v-model="task.notes" v-on:keyup.enter="updateTask(task.id)" modifier="material" placeholder="詳細を追加">
          </v-ons-input>
        </div>
      </div>

      <div v-for="subtask in subTasks" class="subtask-card">
        <div class="sub-task">
          <div class="checkbox-padding">
            <v-ons-checkbox float modifier="material">
            </v-ons-checkbox>
          </div>
          <div class="inline-block">
            <v-ons-input v-model="subtask.title" v-on:keyup.enter="updateTask(subtask.id)" modifier="material" placeholder="タスク名">
            </v-ons-input>
            <br>
            <v-ons-input v-model="subtask.notes" v-on:keyup.enter="updateTask(subtask.id)" modifier="material" placeholder="詳細を追加">
            </v-ons-input>
          </div>
        </div>
      </div>
    </v-ons-card>
  </div>
</template>



<script>
    export default {
        name: "Task",
        props:{
          "taskList":{
            type: String,
            required: true
          },
          "task": {
            type:Array,
            required: true
          },
          "subTasks": Array
        },
      data: function () {
        return {
          noBottomLineStyle: {
            backgroundImage: 'none'
          },
          cardCheckBoxPadding: {
            display: 'inline-block',
            padding: '18px 7px 0 0'
          }
        }
      },
      methods: {
        updateTask: function(taskID){
          // console.log(JSON.stringify(this.task))
          const self = this
          self.$getGapiClient()
            .then(function(gapi) {
              let parameter = JSON.stringify(self.task)
              console.log(parameter)
              gapi.client.tasks.tasks.update(
                {'task': taskID,
                 'tasklist': self.taskList
                },
                parameter
              ).then(function(response) {
                // let task = response.result.items
                console.log(response)
              })
            })
        }

      }
    }
</script>

<style scoped>
  .main-task{
    padding: 5px 0;
  }

  .sub-task{
    padding: 5px 0;

  }

  .checkbox-padding{
    display: inline-block;
    padding: 0 5px 0 10px;
  }

  .subtask-card{
    background-color: gainsboro;
    padding-left: 20px;
  }

  .inline-block{
    display: inline-block;
  }
</style>


