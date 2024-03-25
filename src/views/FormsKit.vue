<template>
  <div class="is-flex is-flex-direction-column">
    <Message
      class="fs-13"
      title="FormKit"
      content="
        Os componentes do FormKit atuam como inputs com validação embutida. Embora seja comum delegar a validação para o backend em aplicações,
        isso não exclui a possibilidade de realizar validações no lado do cliente antes mesmo de os dados serem enviados para o servidor.
        O FormKit oferece validação para inputs vazios e números negativos, além de permitir a aplicação de validações personalizadas, como
        exemplificado abaixo. <br>
        A seguir, demonstraremos como implementar esse componente. <br><br>
        <b> ** Propriedades em negrito são obrigatórias **</b> <br><br>
 
        1. Props:
          <ul>
            <li>
              <b>v-model(string)</b>: Esse é o campo principal, onde será passado via prop o valor que foi digitado no input.
            </li>
            <li>
              <b>model(string)</b>: Nosso FormKit é dinâmico, logo você pode definir qual o modelo do formulário, dentre as 
              opções como 'select', 'input', 'textarea'. Ele definirá qual será o tipo do formulário.
            </li>
            <li>
              type(string): Este campo define o tipo de entrada, podendo ser 'number', 'text', 'date' ou qualquer outro tipo 
              aceito pela tag input.
            </li>
            <li>
              <b>label(string)</b>: Texto usado para preencher a tag label.
            </li>
            <li>
              placeholder(string): Texto usado para placeholder no input.
            </li>
            <li>
              blank(boolean): Este campo define se o formulário pode aceitar vazio. Portanto, quando o valor estiver vazio, a 
              validação de vazio não será acionada.
            </li>
            <li>
              max-length(number): Campo que define um máximo de caracteres; se ultrapassado, a validação será acionada com uma 
              mensagem personalizada para o erro em questão.
            </li>
            <li>
              custom-validation(object): Permite que você passe um objeto com uma função personalizada e com uma mensagem de erro 
              personzalizada.
            </li>
            <li>
              icon(string): Se você quiser um ícone dentro do input, basta passar o nome do ícone do Font Awesome.
            </li>
            <li>
              is-disabled(boolean): Esse campo serve para desabilitar o input.
            </li>
            <li>
              mask(Function): Caso você deseje uma máscara personalizada, ela alterará o valor digitado no input conforme as 
              especificações que você definir.
            </li>
            <li>
              help-text(string): Caso você deseje um texto para auxiliar o cliente, podemos criar uma mensagem personalizada para 
              orientá-lo.
            </li>
            <li>
              popover(string): Caso você tenha informações adicionais, esse campo adiciona um popover para que você destaque mais 
              informações a respeito do campo.
            </li>
          </ul>
 
        2. Emits:
          <ul>
            <li>
              update:modelValue: Emit que atualiza o valor do input.
            </li>
            <li>
              can-send(boolean): Esse emit permite que você controle se o formulário no qual você está digitando possui informações 
              válidas. Se o campo estiver inválido, o evento retornará um false.
            </li>
            <li>
              focused: Quando o input ativa o evento de focus, esse emit é acionado.
            </li>
            <li>
              blurred: Quando o input ativa o evento de blur, esse emit é acionado.
            </li>
          </ul>
      "
      :closed-option="false"
    ></Message>
 
    <div class="is-flex w-100">
      <section class="w-25">
        <FormKit
          v-model.trim="state.inputText"
          model="input"
          label="FormKit Text"
          placeholder="Digite um texto"
          @can-send="state.formFields.inputText = $event"
        ></FormKit>
   
        <FormKit
          v-model.trim="state.inputNumber"
          model="input"
          type="number"
          label="FormKit Number"
          placeholder="Digite um número"
          @can-send="state.formFields.inputNumber = $event"
        ></FormKit>
  
        <FormKit
          v-model.trim="state.inputSelect"
          model="select"
          label="FormKit Select"
        >
          <option value="1">First option</option>
          <option value="2">Second option</option>
          <option value="3">Third option</option>
          <option value="4">Fourth option</option>
        </FormKit>
  
        <FormKit
          v-model.trim="state.inputTextarea"
          model="textarea"
          label="FormKit Textarea"
          placeholder="Digite um texto longo"
          :max-length="240"
          @can-send="(value: boolean) => state.formFields.inputTextarea = value"
        ></FormKit>
      </section>
      
      <aside class="pl-6 w-75">
        <Code 
          language="html"
          component-path="src/assets/files/FormKit.txt" 
          filename="FormKit.vue"
          :height="480"
        ></Code>
      </aside>
    </div>

    <div class="is-flex my-4">
      <section>
        <div>
          <label class="label">Escolha o tipo do input (type)</label>
          <div class="control">
            <label class="radio" v-for="inputType in state.customInput.typeInput.types">
              <input type="radio" :value="inputType" v-model="state.customInput.typeInput.value" />
              {{ inputType }}
            </label>
          </div>
        </div>

        <div class="my-5">
          <label class="label">Aceita vazio (blank)</label>
          <div class="control">
            <label class="radio">
              <input 
                type="radio" 
                :value="true" 
                v-model="state.customInput.typeInput.blank" 
              />
              Sim
            </label>
  
            <label class="radio">
              <input 
                type="radio" 
                :value="false" 
                v-model="state.customInput.typeInput.blank" 
              />
              Não
            </label>
          </div>
        </div>

        <div class="field my-5">
          <label class="label">Máximo de caracteres (max-length)</label>
          <div class="control">
            <input 
              v-model="state.customInput.maxLength" 
              class="input" 
              type="number" 
              placeholder="255"
            />
          </div>
        </div>

        <div class="my-5">
          <label class="label">Input desabilitado (is-disabled)</label>
          <div class="control">
            <label class="radio">
              <input 
                type="radio" 
                :value="true" 
                v-model="state.customInput.isDisabled" 
              />
              Sim
            </label>
  
            <label class="radio">
              <input 
                type="radio" 
                :value="false" 
                v-model="state.customInput.isDisabled" 
              />
              Não
            </label>
          </div>
        </div>

        <div class="my-5">
          <label class="label">Ícone (icon)</label>
          <div class="control is-flex is-flex-direction-column">
            <label class="">
              <input 
                type="radio" 
                value="circle-exclamation" 
                v-model="state.customInput.icon" 
              />
              Circulo de exclamação
            </label>
  
            <label class="">
              <input 
                type="radio" 
                :value="['fab', 'wpforms']" 
                v-model="state.customInput.icon" 
              />
              Formulário
            </label>

            <label class="">
              <input 
                type="radio" 
                value="file-signature" 
                v-model="state.customInput.icon" 
              />
              Arquivos
            </label>
          </div>
        </div>

        <div class="field my-5">
          <label class="label">Texto auxiliar (help-text)</label>
          <div class="control">
            <input 
              v-model="state.customInput.helpText" 
              class="input" 
              type="text" 
              placeholder="Digite um texto auxiliar"
            />
          </div>
        </div>

        <div class="field my-5">
          <label class="label">Popover (popover)</label>
          <div class="control">
            <input 
              v-model="state.customInput.popover" 
              class="input" 
              type="text" 
              placeholder="Digite o texto do popover"
            />
          </div>
        </div>
      </section>

      <aside class="w-75 ml-6">
        <Message
          class="fs-11"
          title="FormKit"
          content="
            O FormKit é totalmente personalizável. Ao lado, você verá uma implementação de suas propriedades, 
            assim como as mensagens de erro dele.
          "
        ></Message>

        <FormKit
          v-model.trim="state.customInput.vModel"
          model="input"
          :type="state.customInput.typeInput.value"
          :blank="state.customInput.typeInput.blank"
          label="FormKit Personalizado"
          :placeholder="state.customInput.placeholder"
          :max-length="state.customInput.maxLength"
          :is-disabled="state.customInput.isDisabled"
          :help-text="state.customInput.helpText"
          :popover="state.customInput.popover"
          :icon="state.customInput.icon"
          @can-send="(value: boolean) => state.formFields.inputTextarea = value"
        ></FormKit>
      </aside>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import Code from '../components/Code.vue';
import FormKit from '../components/forms/FormKit.vue';
import Message from '../components/Message.vue';
import { reactive } from 'vue';
 
 
interface State {
  inputText: string;
  inputNumber: number;
  inputSelect: string;
  inputTextarea: string;
  customInput: {
    vModel: string;
    typeInput: {
      types: string[];
      value: string;
      blank: boolean;
    };
    placeholder: string;
    maxLength: number;
    isDisabled: boolean;
    popover: string;
    helpText: string;
    icon: string;
  },
  formFields: {
    [key: string]: any;
  };
}
 
const state: State = reactive({
  inputText: "",
  inputNumber: 0,
  inputSelect: "1",
  inputTextarea: "",
  customInput: {
    vModel: "",
    typeInput: {
      types: ['text', 'number', 'date', 'password'],
      value: "",
      blank: false,
    },
    placeholder: "",
    maxLength: 255,
    isDisabled: false,
    popover: "",
    helpText: "",
    icon: "",
  },
  formFields: {
    inputText: false,
    inputNumber: false,
    inputSelect: false,
    inputTextarea: false,
  }
})
</script>