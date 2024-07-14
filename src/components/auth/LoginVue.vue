<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth'
import { AUTH } from '../../firebaseConfig'

export default defineComponent({
  name: 'LoginVue',
  setup() {
    const user = ref<User | null>(null)

    // CONNEXION AVEC GOOGLE
    const loginWithGoogle = async () => {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithPopup(AUTH, provider)
        console.log('User signed in:', result.user)
      } catch (error) {
        console.error('Error signing in:', error)
      }
    }

    return {
      user,
      loginWithGoogle
    }
  }
})
</script>

<template>
  <div class="login">
    <h1>Mini Notes</h1>
    <div class="btn">
      <img src="../../assets//googleLogo.svg" alt="Google logo" />
      <button v-if="!user" @click="loginWithGoogle">Login with Google</button>
    </div>
  </div>
</template>

<style scoped>
.login {
  width: 100%;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  h1 {
    font-family: 'Dancing Script';
    color: #f6fff8;
    font-size: 60px;
  }

  .btn {
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    background-color: #cce3de;
    padding: 5px;
    border-radius: 5px;

    img {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }

    button {
      outline: none;
      border: none;
      padding: 10px 25px;
      background: transparent;
      cursor: pointer;
    }
  }
}
</style>
