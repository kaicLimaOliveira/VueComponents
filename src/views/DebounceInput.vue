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
              placeholder(string): Essa é a propriedade padrão dos inputs do HTML..
            </li>
            <li>
              delay(number): Esta propriedade define o tempo de atraso até que a pesquisa seja realizada.
            </li>
            <li>
              has-details-icon(boolean): Propriedade que determina se o ícone de detalhes estará presente.
            </li>
            <li>
              details-label(string): O que você deseja exibir nos detalhes.
            </li>
            <li>
              details-data(string[]): Uma lista de todos os campos pelos quais você pode filtrar no campo de pesquisa.
            </li>
            <li>
              details-position(string): Posição em que você deseja que o popover de detalhes apareça.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              update:model-value(string): .
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <div class="is-flex w-100 mt-2">
        <div class="w-25">
          <div class="fs-13 pb-2">
            Ao pesquisar, o debounce tem um atraso para retornar a lista. Incluímos um dos 
            componentes de loader para fazer a ligação entre dois componentes.
          </div>
          <DebounceInput
            :has-details-icon="true"
            :details-data="['Id', 'Primeiro nome', 'Último nome', 'E-mail']"
            @update:model-value="delayModelValue($event)"
          ></DebounceInput>

          <ul v-if="!state.isLoading">
            <li v-for="searched in filterData" class="is-flex is-flex-direction-column my-3">
              <span>Id: {{ searched.id }}</span>
              <span>Primeiro nome: {{ searched.firstName }}</span>
              <span>Último nome: {{ searched.lastName }}</span>
              <span>E-mail: {{ searched.email }}</span>
            </li>
          </ul>

          <WheelLoader :is-loading="state.isLoading" />
        </div>
  
        <aside class="w-75 pl-6">
          <Code 
            filename="DebounceInput" 
            component-path="/files/DebounceInput.txt"
            language="html"
            :height="500"
          ></Code>
        </aside>
      </div>
    </section>
    
  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import DebounceInput from '../components/forms/DebounceInput.vue';
import Message from '../components/Message.vue';
import WheelLoader from '../components/loaders/WheelLoader.vue';

import { computed, reactive } from 'vue';
import { Faker, randomDataFaker } from '../utils/faker'

interface State {
  search: string;
  listSearch: Faker[];
  isLoading: boolean;
}

const state: State = reactive({
  search: "",
  listSearch: Array.from({ length: 5 }, randomDataFaker),
  isLoading: false
})


const filterData = computed(() => {
  return state.listSearch.filter((res) => {
    return Object.values(res)
      .toString()
      .toUpperCase()
      .includes(state.search.toUpperCase());
  })
})

function delayModelValue(event: string) {
  state.search = event
  state.isLoading = true

  setTimeout(() => state.isLoading = false, 500);
}
</script>