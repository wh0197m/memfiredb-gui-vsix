import VuePage from '../../script/vue/page.js'

VuePage(function(page) {
  return {
    initData() {
      return {
        record: MEMFIRE.initData.data.record || {},
        fields: MEMFIRE.initData.data.fields
      }
    },
    methods: {
      save(closeAfterInserted) {
        page.api.insert({
          closeAfterInserted,
          record: this.record
        })
      }
    }
  }
})