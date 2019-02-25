<template>
  <div>
    <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">kind:{{kind}}</div>
    <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">id:{{id}}</div>
    <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">title:{{title}}</div>
    <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">updated:{{updated}}</div>
    <div style="text-align: center; font-size: 30px; margin-top: 20px; color: #fff;">selflink:{{selflink}}</div>
  </div>
</template>

<script>
export default {
    name: "TaskList",
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
    }
}
</script>

<style scoped>

</style>
