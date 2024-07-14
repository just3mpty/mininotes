<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { AUTH } from '../../firebaseConfig'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginVue',
  setup() {
    const user = ref<User | null>(null)
    const router = useRouter()

    onMounted(() => {
      onAuthStateChanged(AUTH, (currentUser) => {
        user.value = currentUser
        if (currentUser) {
          router.push('/notes')
        } else {
          router.push('/')
        }
      })
    })

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

    // DECONNEXION
    const logout = async () => {
      try {
        await signOut(AUTH)
      } catch (error) {
        console.error('Error signin-out: ', error)
      }
    }

    return {
      user,
      loginWithGoogle,
      logout
    }
  }
})
</script>

<template>
  <button v-if="!user" @click="loginWithGoogle">Login with Google</button>
  <div v-else>
    <img :src="user.photoURL" alt="User profile picture" v-if="user.photoURL" />
    <span>{{ user.displayName }}</span>
    <button @click="logout">Logout</button>
  </div>
</template>
