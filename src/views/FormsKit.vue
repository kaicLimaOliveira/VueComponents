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
        A seguir, demonstraremos como implementar esse componente. <br>
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
              custom-validation(any): .
            </li>
            <li>
              input-icon(string): .
            </li>
            <li>
              is-disabled(boolean): .
            </li>
            <li>
              mask(Function): .
            </li>
            <li>
              help-text(string): .
            </li>
            <li>
              popover(string): .
            </li>
            <li>
              trigger-validation(boolean): .
            </li>
          </ul>
 
        2. Emits:
          <ul>
            <li>
              update:modelValue: .
            </li>
            <li>
              can-send: .
            </li>
            <li>
              focused: .
            </li>
            <li>
              blurred: .
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
          <option value="csv">CSV</option>
          <option value="xls">XLS</option>
          <option value="xlsx">XLSX</option>
          <option value="txt">TXT</option>
          <option value="dat">DAT</option>
          <option value="xml">XML</option>
        </FormKit>
  
        <FormKit
          v-model.trim="state.inputTextarea"
          model="textarea"
          label="FormKit Textarea"
          placeholder="Digite algo"
          :blank="true"
          :max-length="240"
          @can-send="(value: boolean) => state.formFields.inputTextarea = value"
        ></FormKit>
      </section>
      
      <div class="pl-6 w-75">
        <Code 
          language="html"
          component-path="src/components/forms/FormKit.vue" 
          filename="FormKit.vue"
        ></Code>
      </div>
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
  formFields: {
    [key: string]: any;
  };
}
 
const state: State = reactive({
  inputText: "",
  inputNumber: 0,
  inputSelect: "",
  inputTextarea: "",
  formFields: {
    inputText: false,
    inputNumber: false,
    inputSelect: false,
    inputTextarea: false,
  }
})
</script>