/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
 let baseUrl = ''; 
 let routerMode = 'hash';
 let baseImgPath;
 
 if (process.env.NODE_ENV !== 'development') {
     baseUrl = '';
     baseImgPath = '/img/';
 }else{
     baseUrl = 'https://c25ccc7f1f9e-service.simplelab.cn';
     baseImgPath = 'https://c25ccc7f1f9e-service.simplelab.cn';
 }
 
 export {
     baseUrl,
     routerMode,
     baseImgPath
 }