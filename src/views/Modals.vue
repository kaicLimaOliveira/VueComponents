<template>
  <div>
    <Message 
      class="fs-13"
      title="Modals" 
      content="
        O componente modal é simples na implementação e na logica. Abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>open(boolean)</b>: Propriedade que determina se ele estará fechado ou aberto.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              close-modal: Emite o fechamento do modal.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>
    
    <div class="is-flex m-2">
      <button @click="state.modal = true" class="button mr-3">
        Abrir modal simples
      </button>
  
      <button @click="state.crudModal.open = true" class="button">
        Abrir modal de crud
      </button>
    </div>

    <Teleport to="#app">
      <BasicModal :open="state.modal" @close-modal="state.modal = false">
        <template #header>Eu sou um modal simples</template>
        <template #body>Modal simples aberto.</template>
      </BasicModal>

      <CRUDModal :open="state.crudModal.open" :view-mode="state.crudModal.mode" @close-modal="state.crudModal.open = false">
      </CRUDModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BasicModal from "../components/modals/BasicModal.vue";
import CRUDModal from "../components/modals/CRUDModal.vue";
import Message from "../components/Message.vue";

import { reactive } from "vue";

interface State {
  modal: boolean;
  crudModal: {
    open: boolean;
    mode: string;
  };
}

const state: State = reactive({
  modal: false,
  crudModal: {
    open: false,
    mode: "view"
  },
})

</script>