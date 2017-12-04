module.exports = function ajax (ajaxOptions, listeners, lifeCycle, $el, remove) {
    lifeCycle.willFetch()
    vAdmin.LoadingBar.start()
    ajaxOptions.dataType = 'json'
    $.ajax(ajaxOptions).done(function (res) {
        if (res.status === 'success') {
            var defaultAction = function () {
                if (typeof remove !== 'undefined') {
                    var removeTarget = moduleFilter($el, remove)
                    removeTarget.remove()
                }
                vAdmin.Message.success(res.msg || '操作成功')
                if (res.data) {
                    var jumpHref = res.data.jump
                    var isRefresh = false
                    if (jumpHref === 'refresh') {
                        isRefresh = true
                        jumpHref = location.href
                    }
                    if (res.data.jump) {
                        if (res.data.jumpDelay) {
                            var time = String(parseInt(res.data.jumpDelay)/100)
                            time = time.replace(/(\d)$/, '.$1')
                            var pageTip = '跳转至 <a href="res.data.jump">' + res.data.jump + '</a>'
                            if (isRefresh) {
                                pageTip = '刷新当前页面'
                            }
                            vAdmin.Message.info(
                                {
                                    content: time + '秒后' + pageTip,
                                    duration: 999
                                }
                            )
                        }
                        setTimeout(function () {
                            location.href = jumpHref
                        }, res.data.jumpDelay)
                    }
                }
            }
            if(typeof listeners['success'] !== 'undefined') {
                lifeCycle.success(defaultAction)
            }
            else {
                defaultAction()
            }
        }
        else {
            if (typeof res.msg === 'undefined' || res.msg.length === 0) {
                vAdmin.Message.error('开发人员：状态为 error 时必须包含 msg')
                vAdmin.Message.info('示例：{"status":"error","msg":"用户不存在"}')
                return
            }
            vAdmin.Message.error(res.msg)
        }
    }).fail(function () {
        vAdmin.Message.error('网络错误或服务器错误，请刷新重试')
        vAdmin.LoadingBar.error()
    }).always(function () {
        vAdmin.LoadingBar.finish()
        lifeCycle.didFetch()
    })
}
