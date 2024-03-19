<template>
  <div class="is-flex is-flex-direction-column">
    <h3>Vue Components</h3>

    <div>
      <Message 
        class="fs-13"
        title="Dependências do projeto"
        :content="`
          Dentro dos componentes, utilizamos diversas bibliotecas para obter resultados melhores ou facilitar o processo. Para garantir 
          que você aproveite ao máximo no projeto, instale as bibliotecas abaixo: <br><br>
          
          <pre>dependencies: ${jsonFormatter.dependencies}, <br>devDependencies: ${jsonFormatter.devDependencies}</pre>
        `"
        :closed-option="false"
      ></Message>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import Message from '../components/Message.vue';

import { dependencies, devDependencies } from "../../package.json"
import { computed } from 'vue';


const jsonFormatter = computed(() => {
  return {
    dependencies: JSON.stringify(dependencies, null, 4),
    devDependencies: JSON.stringify(devDependencies, null, 4),
  }
})

</script>