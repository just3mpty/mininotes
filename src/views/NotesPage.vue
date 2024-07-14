<!-- src/components/Notes.vue -->
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { collection, addDoc, doc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore'
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
        notes.value.unshift({ ...note, id: docRef.id })
        newNote.value = ''
      }
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
      deleteNote
    }
  }
})
</script>

<template>
  <div id="notes">
    <h1>My notes</h1>
    <form @submit.prevent="addNote">
      <textarea v-model="newNote" placeholder="Add a new note" />
      <button type="submit">Add Note</button>
    </form>
    <ul>
      <li v-for="note in notes" :key="note.id">
        <span>{{ note.text }}</span>
        <button @click="deleteNote(note.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#notes {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;

  h1 {
    font-family: Ubuntu;
    color: #f6fff8;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;

    textarea {
      padding: 10px 5px;
      border: 1px solid #cce3de;
      background: #a4c3b2;
      border-radius: 5px;
    }
    button {
      outline: none;
      border: none;
      padding: 10px 15px;
      background-color: #eaf4f4;
      cursor: pointer;
      border-radius: 5px;
      font-family: Ubuntu;
      color: #6b9080;
      width: 50%;
    }
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;

    li {
      position: relative;
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      gap: 15px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #cce3de;
      background-color: #a4c3b2;
      max-width: 350px;

      span {
        font-family: Ubuntu;
        color: #f6fff8;
        flex: 1;
        text-overflow: ellipsis;
      }

      button {
        height: 35px;
        outline: none;
        border: none;
        padding: 10px 15px;
        background-color: #eaf4f4;
        cursor: pointer;
        border-radius: 5px;
        font-family: Ubuntu;
        color: #6b9080;
      }
    }
  }
}
</style>
