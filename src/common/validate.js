/*
 * 功能 : 封装与iView框架相关的表单验证方法
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2017-8-31
 * 版本 : version 1.0
 */
import Common from './common.js'

export default {
    // 验证密码
    ValidPassword: (password, callback, required) => {
        // 密码为空
        if(password == ''){
            // 若必填
            if(required) return callback(new Error('密码不能为空'));
            else return callback();
        }
        else{           
            if(!Common.regPassword.test(password)) return callback(new Error('密码格式为6-12位，字母、数字和下划线的组合'));
            else return callback();
        }
    },
    // 验证确认密码
    ValidPwdCheck: (password, pwdCheck, callback, required) => {
        // 确认密码为空
        if(pwdCheck == ''){
            // 若必填
            if(required) return callback(new Error('确认密码不能为空'));
            else {                
                if(password != '') return callback(new Error('确认密码不能为空'));
                else return callback();
            }
        }
        else{
            if(password != pwdCheck){
                return callback(new Error('两次输入密码不一致'));
            }
            else return callback();
        }
    },
    // 验证出生日期
    ValidBirthDate: (birhtDate, callback, required) => {
        // 出生日期为空
        if(birhtDate == ''){
            // 若必填
            if(required) return callback(new Error('出生日期不能为空'));
            else return callback();
        }
        else{
            let nowDate = new Date();
            const compare = Common.CompareDate(birhtDate, nowDate.toLocaleDateString());
            if (!compare) return callback(new Error('出生日期不能大于当前日期'));
            else return callback();
        }
    },
    // 验证所在省市
    ValidProvince: (province, city, area, cityList, areaList, callback, required) => {
        // 若必填
        if(required){
            // 省份为空
            if(province == ''){
                return callback(new Error('省份不能为空'));
            }
            else{
                if(cityList.length > 0 && city == ''){
                    return callback(new Error('城市不能为空'));
                }
                else{
                    if(areaList.length > 0 && area == ''){
                        return callback(new Error('区域不能为空'));
                    }
                    else return callback();
                }
            }
        }
        else return callback();
    },
    // 验证是否同意协议
    ValidAgreement: (agerrment, errorText, callback, required) => {
        if(required){
            if (!agerrment) {
                return callback(new Error(errorText));
            }
            else return callback();
        }
        else return callback();       
    },
    // 验证验证码
    ValidCode: (code, callback, required) => {
        if(required){
            if(!code){
                return callback(new Error('验证码不能为空'));
            }
            else return callback(); 
        }
        else return callback();       
    },
    // 验证用户名
    ValidUserName: (userName, callback, required) => {
        if(required){
            if(!userName){
                return callback(new Error('用户名不能为空'));
            }
            else if (!Common.regEmail.test(userName) && !Common.regEmail.Mobile.test(userName)) {
                return callback(new Error('用户名格式不正确'));
            }
            else return callback(); 
        }
        else return callback();       
    },
}