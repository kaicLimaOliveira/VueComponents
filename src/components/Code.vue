<template>
  <div>
    <div @click="copyCode" class="is-flex is-justify-content-end copy-code">
      <span class="tag is-normal has-text-centered is-clickable is-absolute">
        {{ state.textCopy ? 'Copiado!' : 'Copiar código' }}
      </span>
    </div>

    <pre ref="codeBlock" :class="{ 'code-opened': state.preElementIsOpen }">
      <code class="w-100">
        &lt;template&gt;
          &lt;div&gt;
            &lt;div class="p-4 is-flex is-flex-direction-column is-justify-content-center is-align-items-center"&gt;
              &lt;div class="anim-circle anim"&gt;&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;
      </code>
    </pre>

    <span @click="state.preElementIsOpen = !state.preElementIsOpen" class="tag show-me-code is-normal has-text-centerWed is-clickable w-100">
      {{ state.preElementIsOpen ? 'Diminuir código' : 'Mostrar todo código' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';


interface State {
  textCopy: boolean;
  preElementIsOpen: boolean;
}

const state: State = reactive({
  textCopy: false,
  preElementIsOpen: false,
})


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
  height: 150px;
  background-color: #292d3e;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  code {
    color: #ff78c6;
  }
}

.code-opened {
  height: 100%;
}

.show-me-code {
  background-color: #252832;
  color: white;
  opacity: 0.9;
  transform: translateY(-20px);
}
</style>