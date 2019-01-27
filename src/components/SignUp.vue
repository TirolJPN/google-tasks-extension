<template>
    <div class="singup">
        <button @click="signUp">登録</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default{
  name: 'Signup',
  data () {
    return {
    }
  },
  methods: {
    signUp: function () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(obj => {
          // alert('Create account: ' + obj.user.displayName)
          this.$router.push('/')
        })
        .catch(error => alert(error.message))
    }
  }
}

</script>