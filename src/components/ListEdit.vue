<template>
  <!-- app -->
  <div id="app">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <v-ons-input v-bind:placeholder="TaskListFormPlaceHolder" float v-model="TaskListName" modifier="material">
            </v-ons-input>

            <div class="modal-footer">
              <slot name="footer">
                <!--default footer-->
                <!--<button class="modal-default-button" @click="$emit('close')">-->
                  <!--OK-->
                <!--</button>-->
                <v-ons-button id="show-modal" class="button" @click="$emit('close')" modifier="material--flat">cancel</v-ons-button>
                <v-ons-button class="button" @click="EditTaskList"  modifier="material">Edit Task List Name</v-ons-button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <!-- use the modal component, pass in the prop -->
    <modal v-if="showModal" @close="showModal = false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <h3 slot="header">custom header</h3>
    </modal>
  </div>
</template>

<script>
    export default {
      name: "ListEdit",
      props:{
        TaskListIdentifier: {
          type: String,
          required: true
        },
        TaskListName: {
          type: String,
          required: true
        }
      },
      data: {
        function(){
          return {
            showModal: true,
            TaskListFormPlaceHolder: "Edit Task List"
          }
        }
      },
      methods: {
        // ADD TASK LISTが入力されたらリスト名が空でない限り，タスクリストを新規追加
        editTaskList: function(){
          const self = this
          // TaskListNameが空かどうかのバリデーション
          if(!this.TaskListName){
            this.TaskListFormPlaceHolder = "Name cannot be empty"
            // そうでなければAPI呼び出し
          }else{
            self.$getGapiClient()
              .then(function(gapi) {
                gapi.client.tasks.tasklists.insert({
                  'tasklist': self.TaskListIdentifier,
                  'title': self.TaskListName
                }).then(function(response) {

                  // tasklistにappendするイベントを起こす
                  self.$emit('modalEvent', self.TaskListIdentifier, response)

                  // モーダルを閉じるイベントを起こす
                  self.$emit('close')

                })
              })
          }
        }
      }
    }
</script>

<style scoped>

  .button{
    margin: 6px 0;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
