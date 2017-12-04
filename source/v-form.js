module.exports = {
    props: ['action', 'method'],
    template: '<form v-on:submit.prevent="submit" ><slot></slot></form>',
    data: function () {
        return {
            busy: false
        }
    },
    methods: {
        submit: function (e) {
            var self = this
            if (self.busy) {
                return
            }
            var url = self.action
            var type = self.method
            self.busy = true
            var ajaxOptions = {
                type: type,
                url: url,
                data: $(e.target).serializeArray()
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
            callAjax()
        }
    }
}
