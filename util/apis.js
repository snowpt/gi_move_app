var apis = {
	base_url: "http://localhost:8090", //正式
	post: [
		"/my-film/",
		"/api/v1/",
	],
	qrySwipers() {
		return this.base_url + this.post[0] + "api/film/qrySwipers"
	},
	getHotMovie() {
		return this.base_url + this.post[0] + "api/film/pageQryMovie"
	},

	http(object) {


		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		var showModal = function(obj = {
			title: null,
			content: null
		}, is = true) {
			uni.showModal({
				title: obj.title || '提示',
				content: obj.content || "连接失败,是否重试?",
				success: function(res) {

					if (res.confirm) {
						is && object.fail && object.fail(res);
					} else if (res.cancel) {}
				}
			});

		}


		let pase = {
			url: object.url || "",
			header: object.header,
			method: object.method || "POST",
			data: object.data || {},
			success(res) {
				object.success && object.success(res)
			},
			fail(res) {
				console.log(res)
				return showModal()
			},
			complete(res) {
				uni.hideLoading();
				object.complete && object.complete(res);

				if (!res.data) {
					return apis.msg("网络连接超时")
				} else if (res.statusCode >= 400 && res.statusCode < 500) {
					showModal({
						title: "请求错误" + res.statusCode
					})
				} else if (res.statusCode >= 500) {
					showModal({
						title: "服务器错误" + res.statusCode,
						content: "message：" + res.data.message
					})
				} else if (res.statusCode == 200 && !res.data.success) {
					return showModal({
						title: "返回失败提示",
						content: "message：" + res.data.message
					}, false)
				}


			}
		};
		uni.request(pase);
	},
}
export default apis
