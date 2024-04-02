
let XmlReq = {
    baseUrl:API_BASE,
    onError:function(type, url, data, callback) {
        
        console.log(this)

        if(this.status == 401 && 
            gameOptions.userInfo.accessToken && 
            gameOptions.userInfo.refreshToken
        )
        {

            // console.log("401, error")

            XmlReq.post("/infiniteSpin/user/tokenRefresh", {"accessToken":gameOptions.userInfo.accessToken, "refreshToken":gameOptions.userInfo.refreshToken}, function(){

                var result = JSON.parse(this.responseText);
                // console.log(result)
                
                if(result.accessToken)
                {

                    console.log("refresh success")

                  gameOptions.userInfo.accessToken = result.accessToken;
                  
                  setCookie("token", gameOptions.userInfo.accessToken, 365);
                    
                  XmlReq[type](url, data, callback)
                  
                }
                else
                {
                  alert(result.msg);

                  loadingOff();
                }
        
        
        
        
              })
            
        }
        else 
        {
            alert("Request Failed.");
            loadingOff();
        }

    },
    onUpdate:function(type, url, data, callback) {


        if (this.readyState == 4) {

            

            if(this.status == 200)
            {

                loadingOff();
                (callback.bind(this))();
            }
            else if(this.status == 401 && 
                gameOptions.userInfo.accessToken && 
                gameOptions.userInfo.refreshToken
            )
            {



                XmlReq.post("/infiniteSpin/user/tokenRefresh", {"accessToken":gameOptions.userInfo.accessToken, "refreshToken":gameOptions.userInfo.refreshToken}, function(){

                    var result = JSON.parse(this.responseText);
                    // console.log("tokenRefresh", result)
                    
                    if(result.accessToken)
                    {

                        // console.log("refresh success")
                      gameOptions.userInfo.accessToken = result.accessToken;
                      
                      setCookie("token", gameOptions.userInfo.accessToken, 365);
                        
                      XmlReq[type](url, data, callback)
                      
                    }
                    else
                    {


                       setCookie("token", null, -1);
                       setCookie("refreshToken", null, -1);

                       location.reload();

                      alert(result.msg);
                      loadingOff();
                    }
            
            
            
            
                  })
                
            }
            else if(this.status == 202)
            {
                gameOptions.enable = true;
                enableInteractive();
                
                var result = JSON.parse(this.responseText);
                loadingOff();
                alert(result.msg)


            }
            else 
            {
                
                alert("Request Failed.");
                loadingOff();

                
                if(url == "/infiniteSpin/user/tokenRefresh")
                {
                    // console.log("refresh ERROR, state 4")
                    // console.log({"accessToken":gameOptions.userInfo.accessToken, "refreshToken":gameOptions.userInfo.refreshToken})

                    setCookie("userAccount", null, -1);
                    setCookie("token", null, -1);
                    setCookie("refreshToken", null, -1);

                    location.reload();

                }

            }
            

        } else {
           
            
            // if(url == "/infiniteSpin/user/tokenRefresh")
            // {
            //     console.log("refresh ERROR")
            // }
        }


    },
    post(url, data, callback){

        let _this = this;
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            (_this.onUpdate.bind(this))("post", url, data, callback);
        }
    
        xhttp.onerror = function() {

            (_this.onError.bind(this))("post", url, data, callback);
        }

        // var data = new FormData();
        // data.append('USER_IDX', mb_id);
        // data.append('USER_TOKEN', user_token);
        // data.append('gc_id', gc_id);
        // data.append('mb_point_before', mb_point_before);
    
        //data.append('point_spent', point_spent);
    
        //data = serialize(data);
        data = JSON.stringify(data)
    
        xhttp.open("POST", _this.baseUrl + url, true);
        // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.setRequestHeader('Content-type', 'application/json');
        // xhttp.setRequestHeader('Authorization', _this.accessToken);
        xhttp.setRequestHeader('Authorization', gameOptions.userInfo.accessToken);
        xhttp.send(data);
        
        loadingOn();
    
    
    },
    get(url, data, callback){

        let _this = this;
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            (_this.onUpdate.bind(this))("get", url, data, callback);
        }
    
        xhttp.onerror = function() {

            (_this.onError.bind(this))("get", url, data, callback);
        }
    
        // var data = new FormData();
        // data.append('USER_IDX', mb_id);
        // data.append('USER_TOKEN', user_token);
        // data.append('gc_id', gc_id);
        // data.append('mb_point_before', mb_point_before);
    
        //data.append('point_spent', point_spent);
    
        data = serialize(data);
        

        xhttp.open("GET", _this.baseUrl + url + (data ? ("?" + data) : ""), true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.setRequestHeader('Authorization', gameOptions.userInfo.accessToken);
        xhttp.send(data);
        loadingOn();
        
    
    
    }

}
