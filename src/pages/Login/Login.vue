<template>
  	<div class="m-login">
       <Form ref="loginForm" :model="loginForm" :rules="validate" class="login-form">
       		<h3 class="form-title"><img :src="logo"/></h3>
	        <Form-item prop="username">
	            <Input v-model="loginForm.username" placeholder="请输入手机号码或者邮箱地址">
	            	<Icon type="ios-person-outline" slot="prepend"></Icon>
	            </Input>
	        </Form-item>
	        <Form-item prop="password">
	            <Input type="password" v-model="loginForm.password" placeholder="请输入密码">
	            	<Icon type="ios-locked-outline" slot="prepend"></Icon>
	            </Input>
	        </Form-item>
	        <Form-item>
	            <Checkbox v-model="remeberPwd">记住密码</Checkbox>
	            <!-- <router-link to="/SendVerifyCode" class="fr">忘记密码</router-link> -->
	        </Form-item>
	        <Form-item>
	            <Button type="primary" long @click="submit('loginForm')" :loading="loading">登录</Button>
	        </Form-item>
	        <!-- <Form-item>
	            <Button type="primary" long @click="">注册</Button>
	        </Form-item> -->
	        <div style="text-align:center">测试使用登录账号:18888888888 密码:666666</div>
	    </Form>
	</div>
</template>

<script>
	import { SetCookie } from 'common/important.js'
	import { SetLocalS } from 'common/important.js'
	import { GetLocalS } from 'common/important.js'
	import { Encrypt } from 'common/important.js'
	import { Decrypt } from 'common/important.js'
	// Api方法
	import Api from 'api/api.js'

	export default {
		data(){
			return {
				// 加载状态
				loading: false,
				// logo
				logo: require('assets/images/logo-green.png'),
				// 表单信息
				loginForm:{
					// 用户名
					username: '',
					// 密码
					password: '',
				},
				// 记住密码
				remeberPwd: false,
				// 验证规则
				validate: {
                    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
                }
			}
		},
		created() {
			// 判断本地存储用户名是否存在
			if (GetLocalS('username')) {
				// 获取本地存储的用户名和密码
				this.loginForm.username = GetLocalS('username');
				this.loginForm.password = Decrypt(GetLocalS('password'));
				this.remeberPwd = true;
			}
		},
		methods:{
			// 提交表单
			submit (form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
						Api.Login(this.loginForm)
						.then(res => {
							if(res.code == 200){
								const result = res.data;
								// token存cookie
								SetCookie('token', result.attributes.token);
								this.$store.commit('SET_USER_TOKEN', result.attributes.token);
								// 判断是否记住密码
								if (this.remeberPwd) {
									// 本地存储用户名和密码
									SetLocalS('username', this.loginForm.username);
									SetLocalS('password', Encrypt(this.loginForm.password));
								}
								this.$Message.success('登录成功!');
								// 跳转到后台主页
								this.$router.push({ name: 'Main' });
							}
							else this.$Message.error('用户名或密码不正确！');
						})
						.catch(err => this.$Message.error('登录失败!'));
                    }
                    else this.$Message.error('登录失败!填写有误！');
                })
            },
		}
	}
</script>
<style lang="less" scoped>
	.m-login {
	    position: relative;
	    width: 100%;
	    height: 100%;
	    height: 100vh;
	    background-color: #4d5256;
	}

	.login-form{
	    position: absolute;
	    left: 0;
	    right: 0;
	    width: 400px;
	    padding: 35px 35px 15px;
	    margin: 200px auto;
	    background: #fff;
	    border: 1px solid #eaeaea;
	    border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		box-shadow: 0 0 25px #555;
	}

	.form-title{
		font-size: 24px;
		font-weight: 400;
		color: #555;
		margin: 0 auto 20px;
		text-align: center;
		font-weight: 700;

		img{
			display: inline-block;
		}
	}
</style>
