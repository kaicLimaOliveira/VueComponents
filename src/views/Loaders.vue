<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Loader" 
      content="
        Os componentes loaders são de fácil utilização. Abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>is-loading(boolean)</b>: Dentro da sua página, você precisa definir uma variável booleana para indicar se o loader está 
              ativado ou não.
            </li>
            <li>
              timeout(number): Essa propriedade é opcional. Caso você insira um número em segundos, após esse tempo o loader será 
              automaticamente desativado.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              timeout-ended(boolean): Este é o método emit responsável por atualizar a variável que ativou o loader de verdadeiro para 
              falso quando excede o tempo estipulado.
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
            @timeout-ended="state.wheelLoaderIsLoading = $event"
          ></WheelLoader>
        </div>

        <aside class="w-75">
          <Code 
            filename="WheelLoader" 
            component-path="/files/WheelLoader.txt"
            language="html"
          ></Code>
        </aside>
      </div>
      
    </section>

    <section class="mt-6">
      <h5>CircleLoader</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex is-justify-content-center w-25">
          <CircleLoader
            :is-loading="state.circleLoaderIsLoading" 
            @timeout-ended="state.circleLoaderIsLoading = $event"
          ></CircleLoader>
        </div>

        <aside class="w-75">
          <Code 
            filename="CircleLoader" 
            component-path="/files/CircleLoader.txt"
            language="html"
          ></Code>
        </aside>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import CircleLoader from '../components/loaders/CircleLoader.vue';
import Message from '../components/Message.vue';
import WheelLoader from '../components/loaders/WheelLoader.vue';

import { reactive } from 'vue';


interface State {
  wheelLoaderIsLoading: boolean;
  circleLoaderIsLoading: boolean;
}


const state: State = reactive({
  wheelLoaderIsLoading: true,
  circleLoaderIsLoading: true,
})
</script>