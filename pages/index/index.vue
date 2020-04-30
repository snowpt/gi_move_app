<template>
	<view class="home">
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.stillUrl"></image>
			</swiper-item>
		</swiper>

		<view class="nav">
			<view class="nav-item">
				<view class="iconfont icon-douban-copy"></view>
				<text>豆瓣TOP</text>
			</view>
			<view class="nav-item">
				<view class="iconfont icon-praise_fill"></view>
				<text>最新</text>
			</view>
			<view class="nav-item">
				<view class="iconfont icon-select_fill"></view>
				<text>动漫</text>
			</view>
			<view class="nav-item">
				<view class="iconfont icon-activity_fill"></view>
				<text>不记得</text>
			</view>
		</view>

		<view class="line">
			<view class="tit">推荐电影</view>
		</view>
		<view class="movie-list">
			<view class="movie-item" v-for="item in hotMovie" :key="item.id">
				<image :src="item.stillUrl"></image>
				<view class="score">{{item.doubanScore}}</view>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				hotMovie: []
			}
		},
		onLoad() {
			this.getSwipers(),
				this.getHotMovie()
		},
		methods: {
			//获取轮播图数据
			getSwipers() {
				var _this = this;
				this.apis.http({
					url: _this.apis.qrySwipers(),
					success(res) {
						res = res.data
						if (res.success) {
							_this.swipers = res.data
						}
					}
				})
			},

			//获取电影
			getHotMovie() {
				var _this = this;
				this.apis.http({
					url: _this.apis.getHotMovie(),
					success(res) {
						res = res.data
						if (res.success) {
							_this.hotMovie = res.data.records
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.nav {
		display: flex;

		.nav-item {
			width: 25%;
			text-align: center;

			view {
				width: 120rpx;
				height: 120rpx;
				background-color: #007AFF;
				border-radius: 60rpx;
				margin: 10px auto;
				line-height: 120rpx;
				font-size: 70rpx;
			}

			text {
				font-size: 30rpx;
			}
		}
	}

	.line {

		background: #eee;
		overflow: hidden;

		.tit {
			height: 50px;
			line-height: 50px;
			color: #2C405A;
			text-align: center;
			letter-spacing: 10px;
			background: #fff;
			margin: 7rpx 0;
		}
	}

	.movie-list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #eee;

		.movie-item {
			background: #fff;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;
            border-radius: 20rpx;
			box-shadow: inset 1px 1px 5px 2px #324860;
			image {
				width: 80%;
				height: 150px;
				display: block;
				margin: 0 auto;
			}

			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 15rpx;
			}
			.score{
				font-size: 28rpx;
				line-height: 50rpx;
			}
		}
	}
</style>
