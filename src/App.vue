<script setup lang="ts">
import { ref, type Ref } from 'vue'
import MultiTree from '@/components/MultiTree.vue'
import { multiOptionsMoc } from '@/store/tree'

let multiSelected: Ref<
  {
    name: string
    id: string | number
  }[]
> = ref([])
const onToggleCheckbox = (model: { name: string; id: string | number }) => {
  if (multiSelected.value.map(({ id }) => id).includes(model.id)) {
    multiSelected.value.splice(
      multiSelected.value.findIndex((el) => el.id === model.id),
      1
    )
  } else {
    multiSelected.value.push(model)
  }
}
</script>

<template>
  <main>
    <div>
      Selected:
      <span v-for="item in multiSelected" :key="item.id"> {{ item.name }}; </span>
    </div>
    <div>
      <MultiTree
        v-for="(multiOption, index) in multiOptionsMoc"
        :key="index"
        :model="multiOption"
        :selected="multiSelected"
        :withCheckboxes="true"
        @toggle-checkbox="onToggleCheckbox"
      />
    </div>
  </main>
</template>

<style scoped lang="sass">
main
  padding: 10px
</style>
