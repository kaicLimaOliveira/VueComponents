<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Select" 
      content="
        Os componentes loaders são de fácil utilização. Abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>is-loading(boolean)</b>: Dentro da sua página, você precisa definir uma variável booleana para indicar se o loader está 
              ativado ou não.
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
      <h5>Select</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex w-25">
         
        </div>

        <aside class="w-75">
          <Code 
            filename="Select.vue" 
            component-path="/files/Select.txt"
            language="html"
          ></Code>
        </aside>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import Message from '../components/Message.vue';
// import { reactive } from 'vue';


// interface State {
//   wheelLoaderIsLoading: boolean;
//   circleLoaderIsLoading: boolean;
// }


// const state: State = reactive({
//   wheelLoaderIsLoading: true,
//   circleLoaderIsLoading: true,
// })
</script>