<template>
  <div class="is-flex is-flex-direction-column">
    <h3>Vue Components</h3>
    Projeto em andamento...
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

      <div class="is-flex">
        <Message 
          class="fs-14 w-50 mr-4"
          title="Stores"
          content="
            Para variáveis globais, utilizamos os stores do Pinia, que mantêm as variáveis disponíveis em todo o projeto. 
            Ao lado, temos o exemplo da nossa store de alerta, onde em qualquer lugar que você instancie a store, poderá 
            criar novos alertas e acessar as variáveis instanciadas.  

            <br><br>
            
            Com isso, podemos armazenar informações que serão compartilhadas em todo o projeto
          "
          :closed-option="false"
        ></Message>

        <aside class="w-50">
          <Code 
            filename="alertStore.ts" 
            language="javascript"
            component-path="src/assets/files/alertStore.txt"
          ></Code>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Code from '../components/Code.vue';
import Message from '../components/Message.vue';

import { dependencies, devDependencies } from "../../package.json"
import { computed, onMounted } from 'vue';


const jsonFormatter = computed(() => {
  return {
    dependencies: JSON.stringify(dependencies, null, 4),
    devDependencies: JSON.stringify(devDependencies, null, 4),
  }
})

onMounted(() => {
  
})
</script>