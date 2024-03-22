<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Alertas" 
      content="
        Os componentes de alerta são de fácil utilização. Eles estão integrados com a store da biblioteca do pinia, como veremos abaixo. 
        <br><br>

        1. Funções da Store:
          <ul>
            <li>
              add: Essa é uma função que gera automaticamente um novo alerta. <br> <br>
              1. Argumento: <br>
                - type: string; <br>
                - icon?: string; <br>
                - title: string; <br>
                - content: string; <br><br>
              
              2. Argumento: <br>
                - timeout (segundos): number; <br><br>
              
            </li>
            <li>
              remove: Essa propriedade é opcional. Caso você insira um número em segundos, após esse tempo o alerta será 
              automaticamente desativado.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-6">
      <h5>AlertSimple</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex is-justify-content-center w-25">
          <AlertSimple></AlertSimple>
        </div>

        <div class="w-75 pl-6">
          <Code 
            language="html"
            code="
            <template>
              <div class='w-100'>
                <TransitionGroup name='alert'>
                  <div v-for='alert, key in alertStore.alerts' :key='key' class='alert' @click='alertStore.remove(alert)'>
                    <div :class='alert.type' class='alert-bar'></div>
                    <div class='alert-content'>
                      <span class='has-text-weight-bold has-text-grey-dark is-block'>{{ alert.title }}</span>
                      <span class='has-text-grey fs-14 has-text-weight-medium' v-html='alert.content'></span>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </template>
            "
            component-path="src/components/alerts/AlertSimple.vue" 
            filename="AlertSimple.vue"
          ></Code>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <h5>Alert com Progress bar</h5>
      <div class="is-flex w-100 mt-2">
        <div class="is-flex is-justify-content-center w-25">
          <ProgressAlert></ProgressAlert>
        </div>

        <div class="w-75 pl-6">
          <Code 
            language="html"
            component-path="src/components/alerts/ProgressAlert.vue" 
            filename="ProgressAlert.vue"
          ></Code>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import AlertSimple from "../components/alerts/AlertSimple.vue";
import Code from '../components/Code.vue';
import Message from '../components/Message.vue';
import ProgressAlert from "../components/alerts/ProgressAlert.vue";

import { useAlertStore } from "../stores/alertStore";
import { onMounted } from "vue";


const alertStore = useAlertStore()

onMounted(async () => {
  // const component = ProgressAlert?.render()
  // console.log(component);
  
  alertStore.alerts = [{
    title: "Título do alerta",
    content: "Esse é um exemplo de alerta",
    type: "success",
    icon: "circle-check",
  }]
})
</script>