<template>
  <div class="mb-4 w-100">
    <div class="field mb-0">
      <div class="is-flex is-align-items-center">
        <label class="label">{{ props.label }}</label>
        <Popover
          v-if="hasPopover"
          class="ml-1 mb-2 is-clickable"
          :content="props.tooltipContent"
        >
          <Icon class="has-text-info" icon="exclamation-circle" />
        </Popover>
      </div>
      <div
        class="control"
        :class="{ 'has-icons-left': props.icon }"
      >
        <div :class="[ props.inputType === 'select' ? 'select w-100' : '']">
          <Component
            :value="makedValue"
            :is="props.inputType"
            v-bind="inputBindings"
            :placeholder="props.placeholder"
            :disabled="props.isDisabled"
            :class="[props.inputType, { 'is-danger': hasErrors }, {'w-100': props.inputType === 'select'}]"
            @input="handleInput"
            @focus="emit('focused')"
            @blur="handleBlur"
          >
            <slot></slot>
          </Component>
        </div>
        <span v-if="props.icon" class="icon is-small is-left">
          <Icon :icon="props.icon" />
        </span>
      </div>
    </div>
 
    <p class="help has-text-grey">{{ props.helpText }}</p>
 
    <p v-if="hasErrors" class="help is-danger mb-2">
      <div v-for="error in state.errors" class="text-nowrap">
        {{ error }}
      </div>
    </p>
  </div>
</template>
 
<script setup lang="ts">
import Popover from '../elements/Popover.vue';
import { computed, onUpdated, reactive, watch } from 'vue';
 
 
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void,
  (event: 'can-send', value: boolean): void,
  (event: 'focused'): void,
  (event: 'blurred'): void,
}>()
 
 
interface Props {
  modelValue: any;
  inputType: string;
  type?: string;
  label: string;
  placeholder?: string;
  allowEmpty?: boolean;
  maxLength?: number;
  customValidation?: any;
  icon?: string;
  isDisabled?: boolean;
  mask?: Function;
  helpText?: string;
  tooltipContent?: string;
  validateOnUpdate?: boolean;
}
 
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  maxLength: 255,
  allowEmpty: false,
  placeholder: 'Preencha o campo...',
  isDisabled: false,
  validateOnUpdate: false,
  type: 'text',
  mask: (e) => e,
  helpText: '',
  tooltipContent: '',
  customValidation: {
    func: (_e: string) => true,
    msg: ''
  },
})
 
 
interface State {
  errors: Set<string>;
}
 
const state: State = reactive({
  errors: new Set()
})
 
 
watch(() => props.validateOnUpdate, (newValue) => {
  if (newValue) triggerValidation(props.modelValue ?? '');
});

watch(() => props.modelValue, (newValue) => {
  if (newValue) triggerValidation(props.modelValue ?? '');
});
 
onUpdated(() => {
  if (props.isDisabled) state.errors.clear();
})
 
 
const makedValue = computed(() => props.mask(props.modelValue))
const inputBindings = computed(() => props.inputType === 'input' ? {type: props.type} : {})
const hasErrors = computed(() => state.errors.size > 0);
const hasPopover = computed(() => props.tooltipContent.length > 0);
 
 
const handleInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', inputValue)
  triggerValidation(inputValue)
}
 
 
const handleBlur = (event: Event) => {
  emit('blurred');
  triggerValidation((event.target as HTMLInputElement).value);
}
 
 
const triggerValidation = (text: string) => {
  const errorMessages = {
    empty: 'O campo não pode estar vazio.',
    maxLength: `O campo deve conter menos de ${props.maxLength} caracteres.`,
    custom: props.customValidation?.msg,
    nonNegative: 'O valor deve ser um número positivo.'
  };
 
  if (props.type == 'number') {
    const isNumber = !isNaN(Number(text));
    const isNonNegative = isNumber && Number(text) >= 0;
    addOrDeleteError(!isNonNegative, errorMessages.nonNegative);
  }
 
  text = text.toString();
 
  const isEmpty = !props.allowEmpty && text.trim() === '';
  addOrDeleteError(isEmpty, errorMessages.empty)
 
  const isMoreThanMaxLength = text.length > props.maxLength;
  addOrDeleteError(isMoreThanMaxLength, errorMessages.maxLength)
 
  const customValidationResult = props.customValidation?.func(text)
  addOrDeleteError(!customValidationResult, errorMessages.custom)
  emit('can-send', state.errors.size === 0)
}
 
 
function addOrDeleteError(validation: boolean, msg: string) {
  validation ? state.errors.add(msg) : state.errors.delete(msg)
}
</script>