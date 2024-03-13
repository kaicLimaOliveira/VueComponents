<template>
  <div class="is-flex is-justify-content-center is-align-items-center min-height-vh-100 is-flex-direction-column">
    <div>
      <img src="../assets/imgs/notfound.svg" alt="Not found image" width="400" />
    </div>
    <span class="is-size-2">Página não encontrada</span>
    <span class="is-size-3">404</span>

    <RouterLink :to="{ name: 'Home' }" class="has-text-dark">
      Voltar a página Home
    </RouterLink>
  </div>
</template>
