<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="MultipleSelect" 
      content="
        . <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>data(Generic<any>[])</b>: .
            </li>
            <li>
              <b>selected(Generic<any>[])</b>: .
            </li>
            <li>
              <b>field-label(string)</b>: .
            </li>
            <li>
              title(string): .
            </li>
            <li>
              selected-title(string): .
            </li>
            <li>
              size(number): .
            </li>
            <li>
              is-disabled(boolean): .
            </li>
            <li>
              id-field-name(string): .
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              selected(Generic<any>[]): .
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <h5>MultipleSelect</h5>
      <div class="is-flex w-100">
        <div>
          <MultipleSelect 
            :data="state.data" 
            :selected="state.selected" 
            title="Nomes"
            selected-title="Nomes selecionados"
            field-label="firstName"
            @selected=""
          ></MultipleSelect>
        </div>

        <aside class="w-50 is-flex-grow-1==">
          <Code 
            filename="MultipleSelect.vue" 
            component-path="/files/MultipleSelect.txt"
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
import MultipleSelect from '../components/forms/MultipleSelect.vue';

import { reactive } from 'vue';
import { Faker, randomDataFaker } from '../utils/faker';


interface State {
  data: Faker[];
  selected: Faker[];
}

const state: State = reactive({
  data: Array.from({ length: 10 }, randomDataFaker),
  selected: [],
})

</script>