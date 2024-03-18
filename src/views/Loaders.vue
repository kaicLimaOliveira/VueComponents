<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Loader" 
      content="
        Os componentes loaders são de fácil utilização. Abaixo você verá como implementar esse componente. <br><br>

        1. Props:
          <ul>
            <li>
              is-loading: Dentro da sua página, você precisa definir uma variável booleana para indicar se o loader está ativado ou não.
            </li>
            <li>
              timeout: Essa propriedade é opcional. Caso você insira um número em segundos, após esse tempo o loader será automaticamente desativado.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              timeout-ended: Este é o método emit responsável por atualizar a variável que ativou o loader de verdadeiro para falso quando 
              excede o tempo estipulado.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <h5>WheelLoader</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex w-25">
          <WheelLoader 
            class="w-100"
            :is-loading="state.wheelLoaderIsLoading" 
            :timeout="3"
            @timeout-ended="state.wheelLoaderIsLoading = $event"
          ></WheelLoader>
        </div>

        <div class="w-75">
          <Code filename="WheelLoader.vue" component-path="loaders/WheelLoader"></Code>
        </div>
      </div>
      
    </section>

    <section class="mt-6">
      <h5>GoogleLoader</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex is-justify-content-center w-25">
          <GoogleLoader></GoogleLoader>
        </div>

        <div class="w-75">
          <Code component-path="loaders/GoogleLoader"></Code>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import GoogleLoader from '../components/loaders/GoogleLoader.vue';
import Message from '../components/Message.vue';
import WheelLoader from '../components/loaders/WheelLoader.vue';

import { reactive } from 'vue';


interface State {
  wheelLoaderIsLoading: boolean;
}


const state: State = reactive({
  wheelLoaderIsLoading: true
})
</script>