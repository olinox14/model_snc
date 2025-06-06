<template>
  <div>
    <v-expansion-panels v-model="modelValue" @update:modelValue="onModelValueChange">
      <v-expansion-panel
        v-for="author in authors"
        :key="author.id"
      >
        <v-expansion-panel-title>
          {{ author.name }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card v-if="loadingSongs[author.id]" class="text-center pa-4">
            <v-progress-circular :indeterminate="true" />
            <div class="mt-2">Loading songs...</div>
          </v-card>
          <v-card v-else-if="songErrors[author.id]" class="text-center pa-4 error--text">
            <v-icon color="error" large>mdi-alert-circle</v-icon>
            <div class="mt-2">Error loading songs: {{ songErrors[author.id] }}</div>
          </v-card>
          <v-list v-else>
            <v-list-item v-for="song in authorSongs[author.id]" :key="song.id">
              <v-list-item-title>{{ song.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authorSongs[author.id] && authorSongs[author.id].length === 0">
              <v-list-item-title class="text-center">No songs found for this author</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Define props
const props = defineProps<{
  authors: Array<{
    id: number;
    name: string;
  }>;
  modelValue?: number | number[];
}>();

// Define emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: number | number[]): void;
}>();

// Local model value
const modelValue = ref<number | number[]>(props.modelValue ?? -1);

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
const authorSongs = ref<Record<number, Song[]>>({});
const loadingSongs = ref<Record<number, boolean>>({});
const songErrors = ref<Record<number, string>>({});

// Watch for expansion panel changes
const fetchSongsForAuthor = async (authorId: number) => {
  // Skip if already loaded
  if (authorSongs.value[authorId]) {
    return;
  }

  loadingSongs.value[authorId] = true;

  try {
    const response = await fetch(`https://local.api.snc-demo.fr/api/songs?author=${authorId}`);
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const data = await response.json();
    authorSongs.value[authorId] = data['hydra:member'] || [];
  } catch (err) {
    songErrors.value[authorId] = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error fetching songs for author ${authorId}:`, err);
  } finally {
    loadingSongs.value[authorId] = false;
  }
};

// Method to be called when an expansion panel is opened
const onPanelChange = (panel: number | number[]) => {
  if (Array.isArray(panel)) {
    // Multiple panels can be open in some configurations
    panel.forEach(index => {
      if (index >= 0 && index < props.authors.length) {
        fetchSongsForAuthor(props.authors[index].id);
      }
    });
  } else if (panel >= 0 && panel < props.authors.length) {
    fetchSongsForAuthor(props.authors[panel].id);
  }
};

// Handle model value change
const onModelValueChange = (panel: number | number[]) => {
  // Update local model value
  modelValue.value = panel;

  // Emit the update event
  emit('update:modelValue', panel);

  // Fetch songs for the opened panel(s)
  onPanelChange(panel);
};

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    modelValue.value = newValue;
  }
});

// Expose method to parent component
defineExpose({
  onPanelChange
});
</script>
