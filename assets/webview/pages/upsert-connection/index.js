import VuePage from '../../script/vue/page.js'

const F = (label, key, type) => ({ label, key, type })
const A = (name, label, urlSupport, keys) => ({ name, label, keys, urlSupport })

VuePage(function(page) {
  return {
    initData() {
      return {
        record: MEMFIRE.initData.record || {
          name: '未定义连接名称',
          client: 'postgresql',
          useUrl: 0,
          url: '',
        },
        fields: [
          F('地址(host)', 'host'),
          F('端口(port)', 'port'),
          F('用户(user)', 'user'),
          F('密码(password)', 'password'),
          F('数据库名(database)', 'database'),
          F('文件名(filename)', 'filename', 'file')
        ],
        // MEMFIRE_ADAPTER
        adapters: [
          A('postgresql', 'PostgreSQL', true,
            ['host', 'port', 'user', 'password', 'database'])
        ]
      }
    },
    computed: {
      adapter() {
        return this.adapters.find(a => a.name == this.record.client)
      }
    },
    methods: {
      async save(connect) {
        const record = debugClone(this.record)
        if(record.useUrl)
          for(let f of this.fields)
            delete record[f.key]
        else {
          delete record.useUrl
          delete record.url
          for(let f of this.fields)
            if(this.adapter.keys.indexOf(f.key) === -1)
              delete record[f.key]
        }
        await page.api.save({
          connect, record
        })
      }
    }
  }
})
