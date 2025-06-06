<template>
  <div>
    <v-expansion-panel
      class="my-1"
      @update:model-value="fetchSongs"
    >
      <v-expansion-panel-title>
        {{ author.name }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card v-if="loadingSongs" class="text-center pa-4">
          <v-progress-circular :indeterminate="true" />
          <div class="mt-2">Loading songs...</div>
        </v-card>
        <v-card v-else-if="songError" class="text-center pa-4 error--text">
          <v-icon color="error" large>mdi-alert-circle</v-icon>
          <div class="mt-2">Error loading songs: {{ songError }}</div>
        </v-card>
        <v-list v-else>
          <v-list-item v-for="song in songs" :key="song.id">
            <v-list-item-title>{{ song.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="songs.length === 0">
            <v-list-item-title class="text-center">No songs found for this author</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Define props
const props = defineProps<{
  author: {
    id: number;
    name: string;
  };
}>();

// Define types
interface Song {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  } | string; // Can be either an object or an IRI string
}

// State for songs
const songs = ref<Song[]>([]);
const loadingSongs = ref(false);
const songError = ref<string | null>(null);

// Fetch songs for the author
const fetchSongs = async () => {
  console.log('fetchSongs', props.author.id);

  // Skip if already loaded
  if (songs.value.length > 0) {
    return;
  }

  loadingSongs.value = true;

  try {
    const response = await fetch(`https://local.api.snc-demo.fr/api/songs?author=${props.author.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const data = await response.json();
    songs.value = data['member'] || [];
  } catch (err) {
    songError.value = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error fetching songs for author ${props.author.id}:`, err);
  } finally {
    loadingSongs.value = false;
  }
};

// Expose methods to parent component
defineExpose({
  fetchSongs
});
</script>
