<template>
  <div>
    <div @click="copyCode" class="is-flex is-justify-content-start ml-4">
      <span class="is-relative fs-13">
        <div class="is-absolute ml-3 mt-2 has-text-grey-lighter">{{ props.filename }}.vue</div>
      </span>
    </div>

    <div @click="copyCode" class="is-flex is-justify-content-end copy-code">
      <span class="tag is-normal has-text-centered is-clickable is-absolute">
        {{ state.textCopy ? 'Copiado!' : 'Copiar código' }}
      </span>
    </div>

    <pre ref="codeBlock" :class="{ 'code-opened': state.preElementIsOpen }">{{ asyncComponent }}
    </pre>

    <span @click="state.preElementIsOpen = !state.preElementIsOpen" class="tag show-me-code is-normal has-text-centerWed is-clickable w-100">
      {{ state.preElementIsOpen ? 'Diminuir código' : 'Mostrar todo código' }} 
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';


interface State {
  textCopy: boolean;
  preElementIsOpen: boolean;
}

const state: State = reactive({
  textCopy: false,
  preElementIsOpen: false,
})


interface Props {
  filename?: string;
  componentPath: string;
  component?: any;
}

const props = withDefaults(defineProps<Props>(), {
  filename: "vue",
})


const asyncComponent = defineAsyncComponent(() => {
  return import (`../components/${props.componentPath}.vue`);
})


onMounted(() => {
  try {
    // console.log(asyncComponent);
    
    // console.dir(component);
    
  } catch (error) {
    
  }
  
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
  height: 200px;
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
  background-color: hsla(206deg, 15%, 15%, .9);
  color: white;
  opacity: 0.9;
  transform: translateY(-25px);
}
</style>