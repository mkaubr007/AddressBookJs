// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const makeServiceCall=(methodType, url, async , data)=>{
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    })
                    console.log("XHR Failed "+xhr.statusText)
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else{
            xhr.send();
        }
    });
}