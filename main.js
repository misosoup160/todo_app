const app = new Vue({
  el: '#app',
  data: {
    newItem: '',
    items: []
  },
  mounted: function () {
    if (localStorage.getItem('items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('items'))
      } catch(e) {
        localStorage.removeItem('items')
      }
    }
  },
  watch: {
    items: {
      handler: function () {
        const parsed = JSON.stringify(this.items)
        localStorage.setItem('items', parsed)
      },
      deep: true
    }
  },
  methods: {
    addItem: function () {
      if (!this.newItem.match(/\S/g)) {
        return
      }
      const item = {
        todo: this.newItem,
        isDone: false,
        edit: false
      }
      this.items.push(item)
      this.newItem = ''
    },
    deleteItem: function (index) {
      if (confirm('削除しますか？')) {
        this.items.splice(index, 1)
      }
    },
    selectDelete: function () {
      if (confirm('削除しますか？')) {
        this.items = this.items.filter(item => !item.isDone)
      }
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
})
