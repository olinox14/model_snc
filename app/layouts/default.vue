<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn :icon="true" @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const drawer = ref(false)
const isDark = computed(() => theme.global.current.value.dark)

const title = ref('SNC Demo')

const items = [
  {
    title: 'Authors',
    to: '/'
  },
  {
    title: 'Songs',
    to: '/songs'
  },
  {
    title: 'About',
    to: '/about'
  }
]

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}
</script>
