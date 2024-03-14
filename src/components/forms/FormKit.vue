<template>
  <div class="mb-4">
    <div class="field mb-0">
      <div class="is-flex is-align-items-center">
        <label class="label">{{ props.label }}</label>
        <Popover
          v-show="props.popover.length > 0"
          class="ml-1 mb-2 is-clickable"
          :content="props.popover"
        >
          <icon class="has-text-info" icon="exclamation-circle"></icon>
        </Popover>
      </div>
      <div 
        class="control" 
        :class="{ 'has-icons-left': props.inputIcon }"
      >
        <div :class="[ props.type === 'select' ? 'select w-100' : '']">
          <Component 
            :value="props.mask(props.modelValue)"
            :is="props.type"
            v-bind="props.type === 'input' ? {type: props.formType} : {}"
            :class="[props.type, { 'is-danger': state.errors.size > 0 }, {'w-100': props.type === 'select'}]"
            @input="(event: Event) => {
              emit('update:modelValue', (event.target as HTMLInputElement).value),
              triggerValidation((event.target as HTMLInputElement).value)
            }" 
            @focus="emit('focused')"
            @blur="(event: Event) => {
              emit('blurred')
              triggerValidation((event.target as HTMLInputElement).value)
            }"
            :placeholder="props.placeholder"
            :disabled="props.isDisabled"
          >
            <slot></slot>
          </Component>
        </div>
        <span v-if="props.inputIcon" class="icon is-small is-left">
          <Icon :icon="props.inputIcon"></Icon>
        </span>
      </div>
    </div>

    <p class="help has-text-grey">{{ props.helpText }}</p>

    <p v-if="state.errors.size > 0" class="help is-danger mb-2">
      <div v-for="error in state.errors" class="text-nowrap">
        {{ error }}
      </div>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onUpdated, reactive, watch } from 'vue';
import Popover from '../Popover.vue';

const emit = defineEmits(['update:modelValue', 'can-send', 'focused', 'blurred'])

interface Props {
  modelValue: any;
  label?: string;
  type: string;
  placeholder?: string;
  blank?: boolean;
  maxLength?: number;
  customValidation?: any;
  inputIcon?: string;
  isDisabled?: boolean;
  mask?: Function;
  helpText?: string;
  popover?: string; 
  triggerValidation?: boolean;
  formType?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  maxLength: 255,
  blank: false,
  placeholder: 'Preencha o campo...',
  isDisabled: false,
  triggerValidation: false,
  formType: 'text',
  mask: (e) => e,
  helpText: '',
  popover: '',
  customValidation: {
    func: (e: string) => true,
    msg: ''
  },
})

interface State {
  errors: Set<string>;
}

const state: State = reactive({
  errors: new Set()
})


watch(
  () => props.triggerValidation,
  (newValue) => {
    if (newValue) 
      triggerValidation(props.modelValue ?? '')
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) 
      triggerValidation(props.modelValue ?? '')
  }
)

onUpdated(() => {
  if (props.isDisabled) {
    state.errors.clear()
  }
})


const triggerValidation = (text: string) => {
  const errorMessages = {
    empty: 'O campo não pode estar vazio.',
    maxLength: `O campo deve conter menos de ${props.maxLength} caracteres.`,
    custom: props.customValidation?.msg,
    nonNegative: 'O valor deve ser um número positivo.'
  };
  
  if (props.formType == 'number') {
    const isNumber = !isNaN(Number(text)); 
    const isNonNegative = isNumber && Number(text) >= 0;
    addOrDeleteError(!isNonNegative, errorMessages.nonNegative);
  } 

  text = text.toString();
  
  const isEmpty = !props.blank && text.trim() === '';
  addOrDeleteError(isEmpty, errorMessages.empty)

  const isMoreThanMaxLength = text.length > props.maxLength;
  addOrDeleteError(isMoreThanMaxLength, errorMessages.maxLength)
  
  const customValidationResult = props.customValidation?.func(text)
  addOrDeleteError(!customValidationResult, errorMessages.custom)
  emit('can-send', state.errors.size === 0)
}


function addOrDeleteError(validation:boolean, msg:string) {
  validation ? state.errors.add(msg) : state.errors.delete(msg)
}
</script>
