<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Dropdown" 
      content="
      O componente de dropdown é útil quando queremos armazenar diversos conteúdos, como links, 
      para não poluir a tela.
        
        <br><b> ** Propriedades em negrito são obrigatórias ** </b><br><br>


        1. Props:
          <ul>
            <li>
              <b>links(Link[])</b>: Essa propriedade corresponde a cada link/rota que será exibido no dropdown.
            </li>
            <li>
              <b>label(string)</b>: A label exibida no dropdown.
            </li>
            <li>
              icon(string | string []): O ícone exibido no dropdown.
            </li>
            <li>
              <b>is-closed(boolean)</b>: Se o dropdown está aberto ou fechado.
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
            :is-closed="false"
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