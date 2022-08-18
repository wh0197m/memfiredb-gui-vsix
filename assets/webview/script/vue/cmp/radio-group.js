import { ref, watch } from '../vue.esm-browser.prod.js'

export const name = "radio-group"

export const options = {
  props: ['list', 'modelValue'],
  template: `
    <div class="memfire-radio-group">
      <label v-for="item in list">
        <input type="radio" v-model="radioValue" :value="item.value" />
        {{item.label}}
      </label>
    </div>
  `,
  setup(props, ctx) {
    const radioValue = ref(props.modelValue)
    watch(radioValue, nv => {
      ctx.emit('update:modelValue', nv)
    })
    return {
      radioValue
    }
  }
}

export const style = `
  .memfire-radio-group {
    display: inline-block;
  }
  .memfire-radio-group label {
    display: inline-flex;
    align-items: center;
  }
  .memfire-radio-group label:not(:last-child) {
    margin-right: 1em;
  }
  .memfire-radio-group input {
    margin: 0;
    margin-right: .38em;
    padding: 0;
  }
`
