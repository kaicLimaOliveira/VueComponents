<template>
  <div>
    <Message 
      class="fs-13"
      title="Modals" 
      content="
        O componente modal é simples na implementação e na logica. Abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias ** </b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>open(boolean)</b>: Propriedade que determina se ele estará fechado ou aberto.
            </li>
          </ul>

        - CRUDModal:
          <ul>
            <li>
              <b>view-mode(string)</b>: Qual modo de visualização do CRUD está sendo ativado (visualização, criação, atualização, exclusão).
            </li>
            <li>
              can-execute-action(boolean): 
            </li>
            <li>
              action-moddleware(string): 
            </li>
            <li>
              action-button-disabled(boolean): 
            </li>
          </ul>
        
        <br>
        2. Emits:
          <ul>
            <li>
              close-modal: Emite o fechamento do modal.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>
    
    <section class="is-flex m-2">
      <div class="is-flex is-flex-direction-column w-35">
        <button @click="state.modal = true" class="button mb-2">
          Abrir modal simples
        </button>
        
        <Message 
          class="fs-13" 
          title="Modal simples" 
          content="
            O modal simples possui slots em seu código, permitindo que você o personalize totalmente conforme seu formato.
          "
        ></Message>
      </div>

      <div class="w-65 ml-3">
        <Code 
          filename="BasicModal.vue" 
          component-path="/files/BasicModal.txt"
          language="html"
        ></Code>
      </div>
    </section>

    <section class="is-flex m-2">
      <div class="is-flex is-flex-direction-column w-35">
        <button @click="selectedItem('view')" class="button mb-2">
          Abrir modal de view
        </button>

        <button @click="selectedItem('create')" class="button mb-2">
          Abrir modal de create
        </button>

        <button @click="selectedItem('update')" class="button mb-2">
          Abrir modal de update
        </button>

        <button @click="selectedItem('delete')" class="button mb-2">
          Abrir modal de delete
        </button>
        
        <Message 
          class="fs-13" 
          title="Modal de Crud" 
          content="
            O modal para CRUD tem seu rodapé totalmente personalizável. Ao contrário do modal simples, ele 
            se adapta a situações de CRUD, exibindo botões diferentes, adaptados para cada modo 
            (visualizar, criar, editar, excluir), no seu rodapé. <br><br>
            Ele oferece integração com o componente de alerta, bem como a opção de se integrar com o FormKit e habilitar
            uma validação não apenas no formulário, mas também no alerta.
          "
        ></Message>
      </div>

      <div class="ml-3 w-65">
        <Code 
          filename="CRUDModal.vue" 
          component-path="/files/CRUDModal.txt"
          language="html"
          :height="550"
        ></Code>
      </div>
    </section>

    <Teleport to="#app">
      <BasicModal :open="state.modal" @close-modal="state.modal = false">
        <template #header>Eu sou um modal simples</template>
        <template #body>Modal simples aberto.</template>
      </BasicModal>

      <CRUDModal :open="state.crudModal.open" :view-mode="state.crudModal.mode" @close-modal="state.crudModal.open = false">
        <template #header>{{ state.crudModal.mode }}</template>
        <template #body>Modo de CRUD: <b>{{ state.crudModal.mode }}</b>.</template>
      </CRUDModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import BasicModal from "../components/modals/BasicModal.vue";
import CRUDModal from "../components/modals/CRUDModal.vue";
import Code from "../components/Code.vue";
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


function selectedItem(modeView: string) {
  state.crudModal.mode = modeView
  state.crudModal.open = true
}
</script>

<style scoped lang="scss">
.w-35 {
  width: 35%;
}

.w-65 {
  width: 65%;
}
</style>