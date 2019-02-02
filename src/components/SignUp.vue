<template>
  <div class="hello">
    <button v-on:click="signUp">LogIn with google</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  methods: {
    signUp: function () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(obj => {
          alert('Create account: ' + obj.user.displayName)
          this.$router.push('/home')
        })
        .catch(error => alert(error.message))
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
</style>
