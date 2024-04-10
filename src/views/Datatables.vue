<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Datatables" 
      content="
        Os componentes loaders são de fácil utilização. Abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              headers(object): Os cabeçalhos que serão exibidos na tabela.
            </li>
            <li>
              data(Generic<any>[]): Todos os dados que a tabela irá manipular.
            </li>
            <li>
              items-per-page(number): Valor de quantos itens a tabela vai mostrar por página.
            </li>
            <li>
              table-length(number): Total de itens que a tabela terá.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              view(object): Emite um valor de visualização do objeto clicado.
            </li>
            <li>
              update(object): Emite um valor de atualização do objeto clicado.
            </li>
            <li>
              delete(object): Emite um valor de exclusão do objeto clicado.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">

      <Datatable
        :headers="headers" 
        :data="state.data" 
        :items-per-page="10"
        :table-length="state.data.length"
        @view="state.selectedItem = $event"
        @update="state.selectedItem = $event"
        @delete="state.selectedItem = $event"
      ></Datatable>
      
      {{ state.selectedItem }}
    </section>
    
  </div>
</template>

<script setup lang="ts">
import Datatable from "../components/tables/Datatable.vue"
import Message from "../components/Message.vue";

import { reactive } from "vue";
import { Faker, randomDataFaker } from "../utils/faker";


interface State {
  data: Faker[]
  selectedItem: object;
}

const state: State = reactive({
  data: Array.from({ length: 100 }, randomDataFaker),
  selectedItem: {},
})

const headers = {
  firstName: 'Primeiro nome',
  lastName: 'Último nome',
  email: 'E-mail',
}

</script>