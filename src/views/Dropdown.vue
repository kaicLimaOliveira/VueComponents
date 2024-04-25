<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Dropdown" 
      content="
        
        <br><br>

        1. Props:
          <ul>
            <li>
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-6">
      <h5>Dropdown</h5>
      <div class="columns w-100 mt-2">
        <div class="column is-2">
          <Dropdown 
            :links="state.links"
            label="Dropdown"
            :icon="['fab', 'dropbox']"
          ></Dropdown>
        </div>

        <div class="column is-10">
          <Code 
            filename="Dropdown.vue"
            component-path="/files/Dropdown.txt" 
            language="html"
          ></Code>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import Dropdown from '../components/elements/Dropdown.vue';
import Message from '../components/Message.vue';

import { reactive } from 'vue'
import { Link } from '../interfaces/Menu';


interface State {
  links: Link[];
}

const state: State = reactive({
  links: [
    {
      type: 'link',
      routeName: 'Fake',
      label: 'Monitoramento',
      icon: 'eye',
    },
    {
      type: 'link',
      routeName: 'Fake',
      label: 'Opções',
      icon: 'ellipsis-v',
    },
    {
      type: 'link',
      routeName: 'Fake',
      label: 'Edição',
      icon: 'edit',
    },
  ],
})

</script>