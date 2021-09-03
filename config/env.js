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
     baseUrl = 'https://136efa8fdb81-service.simplelab.cn';
     baseImgPath = 'https://136efa8fdb81-service.simplelab.cn';
 }
 
 export {
     baseUrl,
     routerMode,
     baseImgPath
 }