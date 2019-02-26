<template>

  <div>
    <v-ons-card>
      <v-ons-input float
                   v-model="task.title"
      >
      </v-ons-input>
      <br>
      <v-ons-input float
                   v-model="task.notes"
      >
      </v-ons-input>
      <!--{{task}}-->
    </v-ons-card>
  </div>
</template>



<script>
    export default {
        name: "Task",
        props:{
          // "kind": String,
          // "id": String,
          // "etag": String,
          // "title": String,
          // "updated": data,
          // "selfLink": String,
          // "parent": String,
          // "position": String,
          // "notes": String,
          // "status": String,
          // "due": datetime,
          // "completed": datetime,
          // "deleted": Boolean,
          // "hidden": Boolean,
          // "links": [
          //   {
          //     "type": String,
          //     "description": String,
          //     "link": String
          //   }
          // ]
          "task": Array
        },
      data: function () {
        return {
          name: "joge"
        }
      }
    }
</script>

<style scoped>
.cards{
}
</style>


