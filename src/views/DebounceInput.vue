<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="DebounceInput" 
      content="
        Os componentes debounce input são de fácil implementação. Ao pesquisar, o debounce tem um atraso para retornar os dados. 
        Incluímos um dos componentes de loader para fazer a ligação entre dois componentes. Abaixo você verá como implementar 
        esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              placeholder(string): Essa é a propriedade padrão dos inputs do HTML.
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
              update:model-value(string): Emite um valor filtrado do que o usuário digitou, após o tempo de espera do debounce.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <div class="is-flex w-100 mt-2">
        <div class="w-25">
          <DebounceInput
            :has-details-icon="true"
            :details-data="['Id', 'Primeiro nome', 'Último nome', 'E-mail']"
            @update:model-value="delayModelValue($event)"
          ></DebounceInput>

          <ul v-if="!state.isLoading" class="ml-0">
            <li v-for="searched, index in filterData" class="is-flex my-3">
              <div>
                <span class="mr-2">{{ index + 1 }}:</span>
              </div>
              <div class="is-flex is-flex-direction-column">
                <span><b>Id:</b> {{ searched.id }}</span>
                <span><b>Primeiro nome:</b> {{ searched.firstName }}</span>
                <span><b>Último nome:</b> {{ searched.lastName }}</span>
                <span><b>E-mail:</b> {{ searched.email }}</span>
              </div>
              
            </li>
          </ul>

          <WheelLoader :is-loading="state.isLoading" />
        </div>
  
        <aside class="w-75 pl-6">
          <Code 
            filename="DebounceInput.vue" 
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