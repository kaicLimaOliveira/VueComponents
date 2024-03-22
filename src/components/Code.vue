<template>
  <div>
    <div @click="copyCode" class="is-flex is-justify-content-start ml-4">
      <span class="is-relative fs-13">
        <div class="is-absolute ml-3 mt-3 has-text-black has-text-weight-semibold">{{ props.filename }}</div>
      </span>
    </div>

    <div @click="copyCode" class="is-flex is-justify-content-end copy-code">
      <span class="tag is-normal has-text-centered is-clickable is-absolute">
        {{ state.textCopy ? 'Copiado!' : 'Copiar código' }}
      </span>
    </div>

    <pre 
      ref="codeBlock" :class="{ 'code-opened': state.preElementIsOpen }"
    >
      <code :class="`language-${props.language}`">
{{ props.code === undefined ? state.textElement : '' }}
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
}

const props = withDefaults(defineProps<Props>(), {
  filename: "vue",
  language: "javascript",
})


onMounted(async () => {
  await returnTextAlertStore()
  await prismjs.highlightAll()
})


async function returnTextAlertStore() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${props.componentPath}`)
  let text = await response.text()
  const indexOfText = text.indexOf("//")

  if (indexOfText !== -1) {
    text = text.substring(0, indexOfText)
  }

  state.textElement = text
}


const codeBlock = ref<HTMLPreElement | null>(null);
function copyCode() {
  if (codeBlock.value) {
    const range = document.createRange();
    range.selectNode(codeBlock.value);

    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    
    const copied = document.execCommand('copy');
    state.textCopy = copied

    window.getSelection()?.removeAllRanges();
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
  height: 300px;
  background-color: #efefef;
  /* overflow-y: hidden; */
  transition: all ease-in-out 0.3s;

  &::-webkit-scrollbar {
    display: none;
  }

}

.code-opened {
  height: fit-content;
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