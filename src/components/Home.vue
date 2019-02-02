<template>
    <div class="home">
      <h1>hoge</h1>
      <h2>{{firebaseuser}}</h2>
      <button v-on:click="logOut">Log Out</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default{
  name: 'Signup',
  data () {
    return {
      firebaseuser: firebase.auth().currentUser.email
    }
  },
  methods: {
    logOut: function(){
      firebase.auth().signOut()
      alert("ログアウトした")
      this.$router.push('/')
    }
  }
}

</script>