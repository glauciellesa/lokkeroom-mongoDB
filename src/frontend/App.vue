<template>
  <main class="app">
    <RouterView />
  </main>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
