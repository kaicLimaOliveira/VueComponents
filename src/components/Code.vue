<template>
  <div>
    <div @click="copyCode" class="is-flex is-justify-content-start ml-4">
      <span class="is-relative fs-13">
        <div class="is-absolute mt-3 has-text-black has-text-weight-semibold">{{ props.filename }}</div>
      </span>
    </div>

    <div @click="copyCode" class="is-flex is-justify-content-end copy-code">
      <span class="tag is-normal has-text-centered is-clickable is-absolute">
        {{ state.textCopy ? 'Copiado!' : 'Copiar código' }}
      </span>
    </div>

    <pre 
      ref="codeBlock" 
      :class="{ 'code-opened': state.preElementIsOpen }"
      :style="`height: ${props.height}px;`"
    >
      <code :class="`language-${props.language}`">
{{ state.textElement }}
      </code>
    </pre>

    <span @click="state.preElementIsOpen = !state.preElementIsOpen" class="tag show-me-code is-normal has-text-centerWed is-clickable w-100">
      {{ state.preElementIsOpen ? 'Diminuir código' : 'Mostrar todo código' }} 
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import 'prismjs/themes/prism.css'; 
import prismjs from 'prismjs';


interface State {
  textCopy: boolean;
  preElementIsOpen: boolean;
  textElement: string;
}

const state: State = reactive({
  textCopy: false,
  preElementIsOpen: false,
  textElement: "",
})


interface Props {
  code?: string;
  filename?: string;
  componentPath: string;
  language: string;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  filename: "vue",
  language: "javascript",
  height: 260
})


onMounted(async () => {
  await returnTextAlertStore()
  await prismjs.highlightAll()
})


async function returnTextAlertStore() {
  await fetch(`${window.location.origin}/${props.componentPath}`)
    .then(response => response.text())
    .then(text => {
      state.textElement = text;
    });

  return state.textElement
}


const codeBlock = ref<HTMLPreElement | null>(null);
async function copyCode() {
  if (codeBlock.value) {
    
    const textCopy = await returnTextAlertStore()
    const preElement = document.createElement("pre");
    
    preElement.textContent = textCopy;
    document.body.appendChild(preElement);

    // Selecionar o texto dentro da tag <pre>
    const selection = window.getSelection();
    const range = document.createRange();
    
    range.selectNodeContents(preElement);
    selection?.removeAllRanges();
    selection?.addRange(range);

    // Copiar o texto selecionado para a área de transferência
    state.textCopy = document.execCommand("copy");

    // Limpar a seleção
    selection?.removeAllRanges();

    // Remover a tag <pre>, já que não é mais necessária
    document.body.removeChild(preElement);

    setTimeout(() => state.textCopy = false, 5000);
  }
}
</script>

<style scoped lang="scss">
.copy-code {
  transform: translate(-7px, -10px);
  
  .tag {
    background-color:#252832;
    color: #fff;
  }
}

pre {
  margin-bottom: 0 !important;
  background-color: #efefef;
  overflow-y: hidden;
  transition: all ease-in-out 0.3s;

  &::-webkit-scrollbar {
    display: none;
  }

}

.code-opened {
  height: fit-content !important;
}

.show-me-code {
  background-color: hsla(0deg, 0%, 0%, .3);
  color: white;
  transform: translateY(-25px);

  &:hover {
    background-color: hsla(0deg, 0%, 0%, .4);
  }
}
</style>