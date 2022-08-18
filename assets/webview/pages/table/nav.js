export const name = 'memfire-nav'

export const options = {
  template: `
    <nav>
      <template v-for="(name, index) in names">
        <span>{{name}}</span>
        <memfire-icon v-if="index + 1 < names.length" iid="arrow-right"></memfire-icon>
      </template>
    </nav>
  `,
  data() {
    return {
      names: MEMFIRE.initData.names
    }
  }
}

export const style = `
  header nav{
    padding: .38em var(--padding-h);
  }
  header nav span {
    font-size: .9em;
  }
  header nav svg {
    margin: 0 .3em;
  }
`