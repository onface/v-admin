module.exports = {
    props: ['url', 'type', 'data', 'confirm', 'remove'],
    template: '<span @click="beforeSend"><slot></slot></span>',
    data: function () {
        return {
            busy: false
        }
    },
    methods: {
        beforeSend: function () {
            var self = this
            if (self.busy) {
                return
            }
            var data = self.data
            var dataIsJSON = typeof data === 'string' && /{/.test(data[0])
            if (dataIsJSON) {
                try {
                    data = JSON5.parse(data)
                }
                catch(err) {
                    vAdmin.Message.error({
                        content: data,
                        duration: 60
                    })
                    vAdmin.Message.error({
                        content: err.message,
                        duration: 60
                    })
                    throw new Error(err)
                    return
                }
            }
            var ajaxOptions = {
                url: self.url,
                type: self.type,
                data: data
            }
            var lifeCycle = {
                willFetch: function () {
                    self.busy = true
                },
                didFetch: function () {
                    self.busy = false
                },
                success: function (defaultAction) {
                    self.$emit('success', defaultAction)
                }
            }
            var callAjax = function () {
                vAdmin.ajax(ajaxOptions, self.$listeners, lifeCycle, self.$el, self.remove)
            }
            if (self.confirm) {
                vAdmin.Modal.confirm({
                   title: '确认操作',
                   content: self.confirm,
                   onOk: function () {
                       callAjax()
                   }
                })
            }
            else {
                callAjax()
            }
        }
    }
}
