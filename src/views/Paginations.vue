
<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-14"
      title="Paginação"
      content="
        O componente de paginação é comumente utilizado em tabelas, 
        mas você tem total liberdade para implementá-lo da forma 
        que melhor atenda à sua aplicação. Abaixo, mostramos como 
        implementar o componente. <br><br>

        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>model-value(number)</b>: O valor atual da paginação.
            </li>
            <li>
              <b>pages(number)</b>: Quantidade de páginas que o componente exibirá.
            </li>
            <li>
              range-size(number): O número do range entre os limites.
            </li>
            <li>
              show-buttons-on-bounderies(boolean): Indica se os botões de limite serão exibidos.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              update:model-value(number): Emite o valor atualizado da paginação.
            </li>
          </ul>
      "
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <h5>Pagination</h5>
      <div class="is-flex w-100">
        <section class="is-flex-grow-1">
          <Pagination v-model="state.page" :pages="state.tablePages" :showButtonsOnBounderies="true" />
        </section>
        
        <aside class="w-50">
          <Code 
            filename="Pagination.vue" 
            component-path="/files/Pagination.txt"
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
import Pagination from '../components/tables/Pagination.vue';
import { reactive } from 'vue';


interface State {
  page: number;
  tablePages: number;
}

const state: State = reactive({
  page: 1,
  tablePages: 10,
});
</script>