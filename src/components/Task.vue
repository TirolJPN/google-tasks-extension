<template>

  <div :style="noBottomLineStyle">
    <v-ons-card modifier="material">
      <div class="main-task">
        <div class="checkbox-padding">
          <v-ons-checkbox float modifier="material">
          </v-ons-checkbox>
        </div>
        <div class="inline-block">
          <v-ons-input v-model="task.title" modifier="material" placeholder="タスク名">
          </v-ons-input>
          <br>
          <v-ons-input v-model="task.notes" modifier="material" placeholder="詳細を追加">
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
            <v-ons-input v-model="subtask.title" modifier="material" placeholder="タスク名">
            </v-ons-input>
            <br>
            <v-ons-input v-model="subtask.notes" modifier="material" placeholder="詳細を追加">
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


