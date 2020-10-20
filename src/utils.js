/*
    参数列表：
    url: 接口地址
    data: 请求体
    method：请求方式
    headers：请求头

    content-type请求头类型：
    1-普通表单的请求头：查询字符串，key=value&key=value
    'content-type':'application/x-www-form-urlencoded'
    2-json格式的数据：{key:value,key:value}
    'content-type':'application/form-data'

    调用格式
    query('/api').then(res=>{console.log(res)})
*/ 
export function query(url, data, method = 'GET', headers) {
    // let baseUrl="http://localhost:4000";

    // 开发环境
    if(process.env.NODE_ENV === 'development') {
        var baseUrl = "/api";
    }else {  //生产环境
        var baseUrl="http://localhost:4000";
    }
    // console.log(process.env.NODE_ENV);  //development

    
    return new Promise(function(resolve, reject) {
        const options={
            method,
            headers:Object.assign({
                'content-type':'application/json'
            },headers)
        }
        // GET请求不能传递body请求体，否则会报错
        if(method === 'POST') {
            options.body=JSON.stringify(data)
        }
        fetch(baseUrl+url,options).then(response=>response.json()).then(res => {
            // 成功处理函数，调用者通过then传递过来的成功处理函数
            if(res.code === 200) {
                resolve(res);
            }
        });
    })
}