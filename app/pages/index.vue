<template>
  <div>
    <h1 class="text-center mb-6">Authors</h1>
    <v-card v-if="pending" class="text-center pa-4">
      <v-progress-circular indeterminate />
      <div class="mt-2">Loading authors...</div>
    </v-card>
    <v-card v-else-if="error" class="text-center pa-4 error--text">
      <v-icon color="error" large>mdi-alert-circle</v-icon>
      <div class="mt-2">Error loading authors: {{ error }}</div>
    </v-card>
    <v-card v-else>
      <v-list>
        <v-list-item v-for="author in authors" :key="author.id">
          <v-list-item-title>{{ author.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="authors.length === 0">
          <v-list-item-title class="text-center">No authors found</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Set page title
useHead({
  title: 'Authors'
})

// Define types
interface Author {
  id: number
  name: string
}

// Fetch authors from API
const authors = ref<Author[]>([])
const error = ref<string | null>(null)
const pending = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('https://local.api.snc-demo.fr/api/authors')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    authors.value = data['hydra:member'] || []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error fetching authors:', err)
  } finally {
    pending.value = false
  }
})
</script>
