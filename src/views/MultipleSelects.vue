<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="MultipleSelect" 
      content="
        O multiple select é uma lista suspensa que permite múltiplas seleções. Isso significa 
        que várias opções podem ser selecionadas ao mesmo tempo. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>data(Generic<any>[])</b>: Os dados principais que o multiple select irá manipular.
            </li>
            <li>
              <b>selected(Generic<any>[])</b>: Caso haja dados já selecionados dos dados principais, ele 
              os manipulará, removendo-os dos dados principais e adicionando-os ao lado dos selecionados.
            </li>
            <li>
              <b>field-label(string)</b>: Qual a chave do seu objeto que será mostrada e exibida ao usuário 
              no multiple select. Por exemplo: 'firstName'.
            </li>
            <li>
              title(string): O título dos dados principais.
            </li>
            <li>
              selected-title(string): O título dos dados selecionados.
            </li>
            <li>
              size(number): É o número de itens que serão mostrados no multiple select sem a necessidade de 
              fazer scroll. Obs: Limitado a 12 itens.
            </li>
            <li>
              is-disabled(boolean): Se o multiple select está desabilitado.
            </li>
            <li>
              id-field-name(string): Cada opção possui um valor que não é exibido para o usuário. Por padrão, 
              o campo 'Id' é atribuído a esse valor.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              selected(Generic<any>[]): Os dados selecionados.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <h5>MultipleSelect</h5>
      <div class="columns">
        <div class="column is-6">
          <MultipleSelect 
            :data="state.data" 
            :selected="state.selected" 
            title="Nomes"
            selected-title="Nomes selecionados"
            field-label="firstName"
            @selected="state.selected = ($event as Faker[])"
          ></MultipleSelect>
        </div>

        <div class="column is-6 ml-2">
          <Code 
            filename="MultipleSelect.vue" 
            component-path="/files/MultipleSelect.txt"
            language="html"
          ></Code>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import Message from '../components/Message.vue';
import MultipleSelect from '../components/forms/MultipleSelect.vue';

import { reactive } from 'vue';
import { Faker, randomDataFaker } from '../utils/faker';


interface State {
  data: Faker[];
  selected: Faker[];
}

const state: State = reactive({
  data: Array.from({ length: 15 }, randomDataFaker),
  selected: [],
})

</script>