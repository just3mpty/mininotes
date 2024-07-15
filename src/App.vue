<script setup lang="ts">
import '@/assets/globals.scss'
import { useUser } from './store/user'
import { onMounted, ref } from 'vue'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { AUTH } from './firebaseConfig'

const { getUser } = useUser()
const user = getUser()
const connectedUser = ref<User | null>(null)
const router = useRouter()

onMounted(() => {
  onAuthStateChanged(AUTH, (currentUser) => {
    connectedUser.value = currentUser
    if (currentUser) {
      router.push('/notes')
    } else {
      router.push('/')
    }
  })
})

const logout = async () => {
  try {
    await signOut(AUTH)
  } catch (error) {
    console.error('Error signin out: ', error)
  }
  return logout
}
</script>

<template>
  <header v-if="user.user">
    <div class="title">
      <h2>Mini Notes</h2>
    </div>
    <div class="user">
      <img :src="user.user.photoURL" alt="User profil picture" v-if="user.user.photoURL" />
      <span>{{ user.user.displayName }}</span>
      <button v-if="user.user" @click="logout">Logout</button>
    </div>
  </header>
  <RouterView />
</template>

<style>
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cce3de;
  padding: 15px;

  .title {
    font-family: 'Dancing Script';
    color: #f6fff8;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 5px;

    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      object-fit: cover;
    }

    span {
      font-family: Ubuntu;
      color: #f6fff8;
      font-size: 16px;
    }

    button {
      margin-left: 15px;
      outline: none;
      border: none;
      padding: 10px 15px;
      background-color: #cce3de;
      cursor: pointer;
      border-radius: 5px;
      font-family: Ubuntu;
      color: #6b9080;
    }
  }
}
</style>
