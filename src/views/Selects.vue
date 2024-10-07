<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Select" 
      content="
        O componente select tem como objetivo aprimorar o select padrão do HTML. Neste select, é possível pesquisar os 
        dados e também visualizar, atualizar e excluir itens dos dados. Abaixo, você verá como implementar esse componente.
        <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>title(string)</b>: O título da label do select.
            </li>
            <li>
              <b>data(Generic<any>[])</b>: Os dados principais que o select irá manipular.
            </li>
            <li>
              <b>current-selected-item(Generic<any>[])</b>: .
            </li>
            <li>
              <b>field-label(string)</b>:  Qual a chave do seu objeto que será mostrada e exibida ao usuário 
              no select. Por exemplo: 'firstName'.
            </li>
            <li>
              id-field-label(string): .
            </li>
            <li>
              limit(number): .
            </li>
            <li>
              is-disabled(boolean): Se o select está desabilitado.
            </li>
            <li>
              enable-delete(boolean): Se a opção de delete do select está desabilitado.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              selected(Generic<any> | null): O objeto selecionado.
            </li>
            <li>
              view-mode({ mode: string, item: Generic<any> }): Qual o modo de visualização.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <div class="columns">
        <div class="column">
          <Select
            title="Select"
            :data="state.data"
            :current-selected-item="state.selected"
            field-label="firstName"
            @selected="state.selected = ($event as Faker)"
            @view-mode="openModalViewMode($event)"
          ></Select>
        </div>

        <div class="column is-9">
          <Code 
            filename="Select.vue" 
            component-path="/files/Select.txt"
            language="html"
          ></Code>
        </div>
      </div>
    </section>


    <Teleport to="#app">
      <CRUDModal :open="state.crudModal.open" :view-mode="state.crudModal.mode" @close-modal="state.crudModal.open = false">
        <template #body>
          <FormKit
            v-model.trim="state.selected.firstName"
            input-type="input"
            label="Primeiro nome"
            placeholder="Primeiro nome"
            :is-disabled="state.crudModal.mode === 'view'"
            :max-length="50"
          ></FormKit>
        </template>
      </CRUDModal>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import CRUDModal from '../components/modals/CRUDModal.vue';
import FormKit from '../components/forms/FormKit.vue';
import Message from '../components/Message.vue';
import Select from '../components/forms/Select.vue';

import { reactive } from 'vue';
import { Faker, randomDataFaker } from '../utils/faker';
import { Generic } from '../interfaces/Generic';


interface State {
  data: Faker[];
  selected: Faker;
  crudModal: {
    open: boolean;
    mode: string;
  }
}


const state: State = reactive({
  data: Array.from({ length: 15 }, randomDataFaker),
  selected: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    numbers: [],
  },
  crudModal: {
    open: false,
    mode: 'view',
  }
})


function openModalViewMode(event: { mode: string; item: Generic<any>; }) {
  state.crudModal.mode = event.mode
  state.selected = event.item as Faker
  state.crudModal.open = true
}
</script>