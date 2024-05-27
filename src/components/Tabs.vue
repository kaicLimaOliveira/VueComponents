
<template>
  <div>
    <Datatable
      :headers="props.table[props.name].headers"
      :data="props.table[props.name].data"
      :enable-change-items-per-page="false"
      :enable-input-search="false"
      :enable-update="false"
      :enable-delete="false"
      :items-per-page="10"
    >
      <div class="tabs is-boxed">
        <ul>
          <li :class="{'is-active': false }" v-for="link in Object.keys(props.table)">
            <a>
              <!-- <span class="icon is-small">
                <Icon icon aria-hidden="true" />
              ></span> -->
              <span>{{ link }}</span>
            </a>
          </li>
        </ul>
      </div>
    </Datatable>
  </div>
</template>

<script setup lang="ts">
import { Generic } from '../interfaces/Generic';
import Datatable from './tables/Datatable.vue';


type KeyOf = 'props' | 'slots' | 'emits'
interface Props {
  name: KeyOf;
  table: {
    [key in KeyOf]: {
      headers: Generic<string>;
      data: any[];
    }
  }
}

const props = withDefaults(defineProps<Props>(), {

})
</script>