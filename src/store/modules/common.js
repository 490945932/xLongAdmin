// 通用设置
const common = {
	state: {
		// 侧边栏span宽度
		sidebarSpan: 3,
		// 面包屑路径
		breadcrumb: [{
			name: '首页',
			path: '/Home'
		}],
		// 获取单图片显示路径
		getImageUrl: '',
		// 获取单图片上传的ID
		getImageId: '',
		// 获取多图片显示路径
		getImageUrlArr: [],
		// 获取多图片上传的ID
		getImageIdArr: [],
		// 获取可输入下拉框的值
		getInputValue: '',
	},
	mutations: {
		SET_SIDEBAR_SPAN: (state, sidebarSpan) => {
	      state.sidebarSpan = sidebarSpan;
	    },
	    SET_BREADCRUMB: (state, breadcrumb) => {
	      state.breadcrumb = breadcrumb;
		},
		SET_IMAGE_URL: (state, getImageUrl) => {
		  state.getImageUrl = getImageUrl;
		},
		SET_IMAGE_ID: (state, getImageId) => {
		  state.getImageId = getImageId;
		},
		SET_IMAGE_URL_ARR: (state, getImageUrlArr) => {
		  state.getImageUrlArr = getImageUrlArr;
		},
		SET_IMAGE_ID_ARR: (state, getImageIdArr) => {
		  state.getImageIdArr = getImageIdArr;
		},
		SET_INPUT_VALUE:(state, getInputValue) =>{
			state.getInputValue = getInputValue;
		},
	},
}

export default common;
