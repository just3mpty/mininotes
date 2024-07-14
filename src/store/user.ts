// src/store/user.ts
import { reactive, readonly } from 'vue'
import { AUTH } from '../firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'

interface UserState {
  user: User | null
}

const state = reactive<UserState>({
  user: null
})

onAuthStateChanged(AUTH, (currentUser) => {
  state.user = currentUser
})

export function useUser() {
  const getUser = () => readonly(state)

  return {
    getUser
  }
}
