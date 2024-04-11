<template>
  <div class="is-flex is-flex-direction-column">
    <Message 
      class="fs-13"
      title="Datatables" 
      content="
        O componente datatable é o mais complexo por exigir de muita logica e uma massiva quantidade de manipulação de dados. 
        Sua implementação é simples, abaixo você verá como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>

        1. Props:
          <ul>
            <li>
              <b>headers(object)</b>: Os cabeçalhos que serão exibidos na tabela.
            </li>
            <li>
              <b>data(Generic<any>[])</b>: Todos os dados que a tabela irá manipular.
            </li>
            <li>
              <b>items-per-page(number)</b>: Valor de quantos itens a tabela vai mostrar por página.
            </li>
            <li>
              enable-update(boolean): Na tabela, há um ícone para atualização, e essa propriedade define se ele aparecerá ou não.
            </li>
            <li>
              enable-delete(boolean): Na tabela, há um ícone para exclusão, e essa propriedade define se ele aparecerá ou não.
            </li>
            <li>
              id-field-name(string): Se houver uma coluna no cabeçalho que você deseja excluir, basta passar o nome da coluna, 
              e a tabela não a exibirá, mantendo os dados normalmente.
            </li>
            <li>
              loading-delay(number): Quando a tabela estiver processando algum dado ou realizando alguma manipulação, o indicador
              de carregamento será ativado. Esta propriedade determina o tempo de atraso até que o indicador seja desativado.
            </li>
            <li>
              is-bordered(boolean): Adiciona bordas na tabela.
            </li>
            <li>
              is-striped(boolean): Adiciona listras na tabela.
            </li>
            <li>
              is-hoverable(boolean): Adiciona efeito de foco e hover na tabela.
            </li>
            <li>
              table-padding(number): Adiciona padding na tabela.
            </li>
            <li>
              search-input-details-label(string): A label da caixa de pesquisa do input debounce.
            </li>
            <li>
              search-input-details-data(string[]): Campos pelos quais é possível realizar pesquisas na tabela.
            </li>
            <li>
              show-change-items-per-page(boolean): Opção que altera a quantidade de itens exibidos por página.
            </li>
          </ul>

        2. Emits:
          <ul>
            <li>
              view(object): Emite um valor de visualização do objeto clicado.
            </li>
            <li>
              update(object): Emite um valor de atualização do objeto clicado.
            </li>
            <li>
              delete(object): Emite um valor de exclusão do objeto clicado.
            </li>
          </ul>
      " 
      :closed-option="false"
    ></Message>

    <section class="mt-4">
      <div class="is-flex is-flex-direction-row">
        <div class="w-25">
          <Message
            class="fs-13"
            title="Datatables" 
            content="
              Abaixo temos uma tabela que faz conexão com o componente Modal.
            "
          ></Message>
        </div>

        <div class="w-75 ml-4">
          <Code 
            filename="Datatable.vue" 
            component-path="/files/Datatable.txt"
            language="html"
            :height="350"
          ></Code>
        </div>
      </div>

      <Datatable
        :headers="headers" 
        :data="state.data" 
        :items-per-page="10"
        @view="selectedItem($event, 'view')"
        @update="selectedItem($event, 'update')"
        @delete="selectedItem($event, 'delete')"
      >
        <div class="is-flex is-justify-content-space-between is-align-items-center mb-2">
          <h4 class="mb-0">Datatables</h4>
          <button @click="selectedItem({}, 'create')" class="button">Cadastrar</button>
        </div>
      </Datatable>

      <Teleport to="#app">
        <CRUDModal 
          :open="state.crudModal.open" 
          :view-mode="state.crudModal.mode" 
          :action-middleware="actionMiddleware"
          @close-modal="state.crudModal.open = false"
        >
          <template #header>
            Usuários
          </template>

          <template #body>
            <FormKit
              v-if="state.crudModal.mode !== 'create'"
              v-model.trim="state.selectedItem.id"
              model="input"
              label="Id"
              placeholder="Id"
              is-disabled
              :max-length="50"
            ></FormKit>

            <div class="is-flex">
              <FormKit
                class="pr-2"
                v-model.trim="state.selectedItem.firstName"
                model="input"
                label="Primeiro nome"
                placeholder="Primeiro nome"
                :is-disabled="state.crudModal.mode === 'view'"
                :max-length="40"
              ></FormKit>

              <FormKit
                v-model.trim="state.selectedItem.lastName"
                model="input"
                label="Último nome"
                placeholder="Último nome"
                :is-disabled="state.crudModal.mode === 'view'"
                :max-length="40"
              ></FormKit>
            </div>

            <FormKit
              v-model.trim="state.selectedItem.email"
              model="input"
              label="E-mail"
              placeholder="E-mail"
              :is-disabled="state.crudModal.mode === 'view'"
              :max-length="40"
            ></FormKit>
          </template>
        </CRUDModal>
      </Teleport>
    </section>
  </div>
</template>

<script setup lang="ts">
import Code from "../components/Code.vue";
import CRUDModal from "../components/modals/CRUDModal.vue";
import Datatable from "../components/tables/Datatable.vue"
import FormKit from "../components/forms/FormKit.vue";
import Message from "../components/Message.vue";

import { reactive } from "vue";
import { Faker, randomDataFaker } from "../utils/faker";
import { Generic } from "../interfaces/Generic";


interface State {
  data: Faker[]
  selectedItem: Faker;
  crudModal: {
    open: boolean;
    mode: string;
  }
}

const state: State = reactive({
  data: Array.from({ length: 100 }, randomDataFaker),
  selectedItem: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  crudModal: {
    open: false,
    mode: "view",
  }
})

const headers = {
  firstName: 'Primeiro nome',
  lastName: 'Último nome',
  email: 'E-mail',
}


const actionMiddleware = async (funcName: string) => {
  const functions: Generic<any> = {
    create: {
      func: createItem,
      params: [{
        id: String(Date.now()),
        firstName: state.selectedItem.firstName,
        lastName: state.selectedItem.lastName,
        email: state.selectedItem.email,
      }],
      trigger: (event: boolean) => {
        if (event) {
          state.crudModal.open = false;
        }
      }
    },
    update: {
      func: updateItem,
      params: [state.selectedItem.id, {
        firstName: state.selectedItem.firstName,
        lastName: state.selectedItem.lastName,
        email: state.selectedItem.email,
      }],
      trigger: (event: boolean) => {
        if (event) {
          state.crudModal.open = false
        }
      }
    },
    delete: {
      func: deleteItem,
      params: [state.selectedItem.id],
      trigger: (event: boolean) => {
        if (event) {
          state.crudModal.open = false
        }
      }
    }
  }

  const currentFunction = functions[funcName]
  currentFunction.func(...currentFunction.params)
  currentFunction.trigger(true)
}


function selectedItem(event: any, modeView: string) {
  state.selectedItem = event
  state.crudModal.mode = modeView
  state.crudModal.open = true
}


function createItem(payload: Faker) {
  state.data.push(payload)
}


function updateItem(id: string, payload: Faker) {
  state.data.forEach(item => {
    if (item.id == id) {
      item = payload
    }
  })
}


function deleteItem(id: string) {
  state.data.forEach(item => {
    if (item.id == id) {
      const index = state.data.indexOf(item)
      state.data.splice(index, 1)
    }
  })
}
</script>