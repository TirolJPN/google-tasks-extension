<template>

  <div>
    <v-ons-card modifier="material">
      <v-ons-input float v-model="task.title" modifier="material">
      </v-ons-input>
      <br>
      <v-ons-input float v-model="task.notes" modifier="material">
      </v-ons-input>
      <br>
      <br>
      <div v-for="subtask in subTasks" style="background-color: aliceblue; padding-left: 20px;">
        <v-ons-input float v-model="subtask.title" modifier="material">
        </v-ons-input>
        <br>
        <v-ons-input float v-model="subtask.notes" modifier="material">
        </v-ons-input>
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
        }
      }
    }
</script>

<style scoped>
.cards{
}
</style>


