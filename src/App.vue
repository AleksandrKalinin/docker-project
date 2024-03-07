<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="main">
    <header>
      <nav>
        <RouterLink to="/">Converter</RouterLink>
        <RouterLink to="/fileupload">Fileupload</RouterLink>
      </nav>
    </header>
    <section class="content">
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  padding: 24px;
}

nav {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-size: 12px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.content {
  padding: 24px;
}
</style>
