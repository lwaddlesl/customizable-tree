<script setup lang="ts">
import { ref, computed } from 'vue'

interface MultiOption {
  name: string
  id: number | string
  child?: MultiOption[] | Child[]
}

interface Child {
  name: string
  id: string | number
}

interface Props {
  model: MultiOption
  selected?: Child[] | []
  withCheckboxes?: Boolean
  showChildCount?: Boolean
  rowHoverBackground?: string
}
const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  withCheckboxes: () => false,
  showChildCount: () => true,
  rowHoverBackground: '#6a6666'
})

const emit = defineEmits(['toggleCheckbox'])

const isOpen = ref(false)
const isFolder = computed(() => props.model.child && props.model?.child.length)
const isChecked = computed(
  () => !isFolder.value && props.selected.map(({ id }) => id).includes(props.model.id)
)

const onToggleCheckbox = (currentModel: MultiOption) => {
  emit('toggleCheckbox', currentModel)
}
</script>

<template>
  <div :style="rowHoverBackground ? { '--row-hover-background': rowHoverBackground } : {}">
    <div @click="isOpen = !isOpen" class="tree-row">
      <div v-if="isFolder">
        <span class="folder-name">{{ model.name }}</span>
        <span class="child-count" v-if="showChildCount">{{ model.child?.length }}</span>

        <img
          class="arrow"
          v-if="isOpen"
          src="@/assets/svg/arrow-open.svg"
          alt="arrow"
          width="10"
          height="9"
        />
        <img class="arrow" v-else src="@/assets/svg/arrow.svg" alt="arrow" width="10" height="9" />
      </div>
      <div v-else>
        <span v-if="withCheckboxes">
          <input
            :id="model.id.toString()"
            type="checkbox"
            @click="onToggleCheckbox(model)"
            :checked="isChecked"
          />
          <label :for="model.id.toString()">{{ model?.name }}</label>
        </span>
        <span v-else>
          {{ model?.name }}
        </span>
      </div>
    </div>
    <div v-if="isFolder && isOpen" class="node">
      <multiTreeItem
        v-for="childModel in model.child"
        :key="childModel.id"
        class="item"
        :model="childModel"
        :with-checkboxes="withCheckboxes"
        :selected="selected"
        @toggle-checkbox="onToggleCheckbox"
      />
    </div>
  </div>
</template>
<style lang="sass" scoped>
.node
  margin: 5px 10px 5px 10px
.arrow
  margin-left: 5px
.tree-row
  width: fit-content
  margin: 5px
  padding: 5px
  &:hover
    background-color: var(--row-hover-background)
  .child-count
    margin-left: 5px
    color: #868383
  .folder-name
    font-weight: 800

input[type=checkbox]
  height: 20px
  width: 20px
  padding: 0
  cursor: pointer
  appearance: auto
  -webkit-appearance: auto
  display: none

  &+label
    display: flex
    position: relative
    padding: 0 0 0 30px
    cursor: pointer

    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 20px
      height: 20px
      border: 2px solid #30363d
      border-radius: 3px
      background: #3e4258

    &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 20px
      height: 20px
      border-radius: 2px
      opacity: 0
      transition: 0.3s

  &:checked + label:after
    opacity: 1
    left: 6px
    top: 3px
    width: 8px
    height: 12px
    border: solid white
    border-width: 0 3px 3px 0
    -webkit-transform: rotate(45deg)
    -ms-transform: rotate(45deg)
    transform: rotate(45deg)
  &:checked + label::before
    background: #3e4258
    border: #3e4258
</style>
