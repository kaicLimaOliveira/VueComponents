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
              placeholder(string): .
            </li>
            <li>
              delay(number): .
            </li>
            <li>
              has-details-icon(boolean): .
            </li>
            <li>
              details-label(string): .
            </li>
            <li>
              details-data(string[]): .
            </li>
            <li>
              details-position(string): .
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
          <DebounceInput
            :has-details-icon="true"
            :details-data="['Título', 'Nome']"
          ></DebounceInput>
        </div>
  
        <aside class="w-75 pl-6">
          <Code 
            filename="DebounceInput" 
            component-path="/files/DebounceInput.txt"
            language="html"
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
</script>