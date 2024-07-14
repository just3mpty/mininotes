<!-- src/components/Notes.vue -->
<template>
  <div>
    <h1>Notes</h1>
    <form @submit.prevent="addNote">
      <input v-model="newNote" placeholder="Add a new note" />
      <button type="submit">Add Note</button>
    </form>
    <ul>
      <li v-for="note in notes" :key="note.id">
        <input type="checkbox" v-model="note.completed" @change="updateNote(note)" />
        <span :style="{ textDecoration: note.completed ? 'line-through' : 'none' }">{{
          note.text
        }}</span>
        <button @click="deleteNote(note.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore'
import { DB } from '../firebaseConfig'

interface Note {
  id: string
  text: string
  completed: boolean
  createdAt: any
}

export default defineComponent({
  name: 'NotesPage',
  setup() {
    const newNote = ref('')
    const notes = ref<Note[]>([])

    const addNote = async () => {
      if (newNote.value.trim()) {
        const note = {
          text: newNote.value,
          completed: false,
          createdAt: new Date()
        }
        const docRef = await addDoc(collection(DB, 'notes'), note)
        notes.value.push({ ...note, id: docRef.id })
        newNote.value = ''
      }
    }

    const updateNote = async (note: Note) => {
      await updateDoc(doc(DB, 'notes', note.id), {
        completed: note.completed
      })
    }

    const deleteNote = async (id: string) => {
      await deleteDoc(doc(DB, 'notes', id))
      notes.value = notes.value.filter((note) => note.id !== id)
    }

    onMounted(async () => {
      const q = query(collection(DB, 'notes'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      notes.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Note)
    })

    return {
      newNote,
      notes,
      addNote,
      updateNote,
      deleteNote
    }
  }
})
</script>
