


const network = {
    //配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    //消息框消失时间
    messageDuration: 3000,
    //最长请求时间
    requestTimeout: 10000,
    //操作正常code，支持String、Array、int多种类型
    successCode: [200, 0],
    //默认的接口地址 如果是开发环境和生产环境走vab-mock-server，当然你也可以选择自己配置成需要的接口地址
    baseURL: "http://localhost:8099",
}
module.exports = network
// export default network;