

  


function closeBoxPop(){

  
    scene.tweens.add({
      targets:[gameOptions.boxPop.content],
      scale:1.1,
      ease:'Quad.easeOut',
      duration:120,
      onComplete:function(){
        
        scene.tweens.add({
          targets:[gameOptions.boxPop.content],
          scale:0,
          ease:'Quad.easeInOut',
          duration:180,
          onComplete:function(){
            
            gameOptions.boxPop.alpha = 0;
      
      
          }
        })
  
  
      }
    })
  
  
  }
  
  function setLoginState(){
  
    if(gameOptions.userInfo.accessToken)
    {
        //gameOptions.btnConnect.alpha = 0;
        $(".btn-connect").hide();
  
        gameOptions.GuideUsePoint.alpha = 1;
        gameOptions.ticketStatus.alpha = 1;
        gameOptions.nicknameBox.alpha = 1;
  
        setUserNameBox(gameOptions.userInfo.userName); 
  
        gameOptions.pointMeter.alpha = 1;
        gameOptions.menuIco.alpha = 1;
        gameOptions.start_btn.alpha = 1;
  
  
        gameOptions.ticketMeter.alpha = 1;
        gameOptions.teamMeter.alpha = 1;
        gameOptions.broochMeter.alpha = 1;
  
            
  
    }
    else
    {
      // gameOptions.btnConnect.alpha = 1;
      $(".btn-connect").show();
  
      gameOptions.GuideUsePoint.alpha = 0;
      gameOptions.ticketStatus.alpha = 0;
      gameOptions.nicknameBox.alpha = 0;
  
  
      gameOptions.pointMeter.alpha = 0;
      gameOptions.menuIco.alpha = 0;
      gameOptions.start_btn.alpha = 0;
  
  
      gameOptions.ticketMeter.alpha = 0;
      gameOptions.teamMeter.alpha = 0;
      gameOptions.broochMeter.alpha = 0;
    }
  
  
  }
  
  function openBoxPop(){
  
    gameOptions.boxPop.content.setScale(0)
    gameOptions.boxPop.alpha = 1;
  
    scene.tweens.add({
      targets:[gameOptions.boxPop.content],
      scale:1.1,
      ease:'Quad.easeOut',
      duration:200,
      onComplete:function(){
        
        scene.tweens.add({
          targets:[gameOptions.boxPop.content],
          scale:0.9,
          ease:'Quad.easeOut',
          duration:40,
          onComplete:function(){
            
            scene.tweens.add({
              targets:[gameOptions.boxPop.content],
              scale:1,
              ease:'Quad.easeInOut',
              duration:60,
              onComplete:function(){
                
                
          
              }
            })
      
      
          }
        })
  
  
  
      }
    })
  
  
  }
  
  function openBox(){
  
    if(gameOptions.userInfo.userBoxCount <= 0)
    {
      alert("Not enough Infinite Chest.");
      return;
    }
  
    if(gameOptions.userInfo.userKeyCount <= 0)
    {
      alert("Not enough key.");
      return;
    }
  
  
    gameOptions.userInfo.userBoxCount--;
    gameOptions.userInfo.userKeyCount--;
  
  
    //var effect = gameOptions.boxPop.content.box.preFX.addShine(0.5, 0.5, 3, false);
  
    gameOptions.boxPop.content.box.effect.setActive(false);
    loadingOn();
    
    
    XmlReq.post("/infiniteSpin/game/boxopen", {}, function(){


      var result = JSON.parse(this.responseText);
  
      if(result.resultCode == 1 )
      {
        
        gameOptions.userInfo.userBoxCount = result.boxCnt;
        gameOptions.userInfo.userKeyCount = result.keyCnt;
        
        setBoxCnt();
        setKeyCnt();


        let xOrigin = gameOptions.boxPop.content.box.x;
        let yOrigin = gameOptions.boxPop.content.box.y;
      
        gameOptions.boxPop.content.box.setFrame(5);
        gameOptions.boxPop.content.starEff.alpha = 0;
      
        let reward = result.reward.amount
        let type = result.reward.type
        
    
        gameOptions.boxPop.content.box.amount = 3 + reward * 100;
      
        
      
        loadingOff();
      

        gameOptions.sounds['Open'].play();
      
        scene.tweens.add({
          targets:[gameOptions.boxPop.content.box],
          x:xOrigin - 30,
          rotation:Math.PI/180 * -5,
          duration:35,
          repeat:0,
          onComplete:function(){
      
                
            scene.tweens.add({
              targets:[gameOptions.boxPop.content.box],
              x:xOrigin + 30,
              rotation:Math.PI/180 * 5,
              duration:70,
              yoyo:true,
              repeat:6,
              onComplete:function(){
      
      
      
                  scene.tweens.add({
                    targets:[gameOptions.boxPop.content.box],
                    x:xOrigin,
                    rotation:0,
                    duration:35,
                    repeat:0,
                    onComplete:function(){
      
                          
                      
      
                          setTimeout(function(){
      
                            scene.tweens.add({
                              targets:[gameOptions.boxPop.content.box],
                              scaleY:0.75*2,
                              scaleX:1.2*2,
                              y:yOrigin + 40,
                              duration:80,
                              ease:'Sine.easeOut',
                              yoyo:true,
                              repeat:0,
                            })
      
                              
                              gameOptions.boxPop.content.box.play("box_open")
      
      
                              scene.tweens.add({
                                targets:[gameOptions.boxPop.content.result.bg, gameOptions.boxPop.content.result.txt],
                                scale:1.3,
                                duration:80,
                                ease:'Sine.easeInOut',
                                yoyo:true,
                                repeat:0,
                              })
      
                              // gameOptions.boxPop.content.box.effect.setActive(true);
      
      
                              gameOptions.boxPop.content.result.txt.text = reward + " " + type;
                                                  
                            
                      
      
                          }, 600)
                    }
            
                  })
      
                
              }
      
            })
      
          }
      
        })

      }
      else
      {
        alert(result.msg);
        loadingOff();
      }
  
  
  
  
    })


  
  
  
  }
  
  function setBoxCnt(){
  
    gameOptions.boxPop.content.boxState.txt.text = gameOptions.userInfo.userBoxCount;
  
  }
  
  function setKeyCnt(){
  
    gameOptions.boxPop.content.keyState.txt.text = gameOptions.userInfo.userKeyCount;
    
  }
  
  
  function setUserPoint(useUpEffect){
  
  
    if(useUpEffect)
    {
      gameOptions.pointMeter.txt.setScale(1.3)
      let prevX = gameOptions.pointMeter.txt.x;
      gameOptions.pointMeter.txt.x += 15*scale;
  
      scene.tweens.add({targets:[gameOptions.pointMeter.txt],
        duration:400,
        delay:100,
        x:prevX,
        scale:1
      })
  
    }
  
    elevateNumber(gameOptions.pointMeter.txt, gameOptions.userInfo.userPoint, function(){
  
    }, 400, false)
  
    
  }
  
  
  function setTicketTimer(secTime){
    
    if(gameOptions.timer)
    {
      clearInterval(gameOptions.timer)
    }
  
    if(!secTime)
      secTime = getNextUTCTime();
    
      gameOptions.userInfo.userTicketTime = secTime;

    if(gameOptions.userInfo.userTicketCount >= gameOptions.ticketCountMax)
    {
      gameOptions.ticketMeter.timer.alpha = 0;
      return;
    }
  
    gameOptions.ticketMeter.timer.alpha = 1;

      gameOptions.timer = setInterval(function(){
  
        gameOptions.cursor = !gameOptions.cursor;
        
        if(gameOptions.cursor)
        {
          gameOptions.ticketMeter.timer.txt.text = getSecMeterToTime(secTime);//"11:59:59"
        }
        else
        {
          gameOptions.ticketMeter.timer.txt.text =  getSecMeterToTime(secTime);//.replace(/([:])/g, " ");
        }
  
        secTime -= 0.5;
        gameOptions.userInfo.userTicketTime -= 500;

        if(secTime <= 0)
        {

          
          setTimeout(function(){

            loadingOn();

            //gameOptions.userInfo.userTicketCount+=Math.min(gameOptions.ticketCountMax - gameOptions.userInfo.userTicketCount, 8);
          
            //setTicketCount(gameOptions.userInfo.userTicketCount);
    
            clearInterval(gameOptions.timer);
    

                              
                    XmlReq.get("/infiniteSpin/asset/myAssets", {}, function(){


                      var result = JSON.parse(this.responseText);
                 

                      if(result.resultCode == 1 )
                      {

                        gameOptions.userInfo.userBoxCount = result.boxCnt;
                        gameOptions.userInfo.userKeyCount = result.keyCnt;
                        gameOptions.userInfo.userTicketCount = result.ticketCnt;
                        gameOptions.userInfo.userTicketTime = result.ticketChargeTime;

                        setTicketCount(gameOptions.userInfo.userTicketCount);
                        setTicketTimer(gameOptions.userInfo.userTicketTime/1000);

                        loadingOff();
                        
                      }
                      else
                      {
                        alert_normal(result.msg);
                        
                        loadingOff();
                      }




                    })


          }, 1000) //UPDATE MARGIN

  
  
        }
  
      },500)
  
  }
  
  function setTicketCount(ticketCount){
    
    gameOptions.userInfo.userTicketCount = ticketCount;
  
    console.log(gameOptions.userInfo);
  
    // gameOptions.ticketMeter.txt.text = "+" + gameOptions.userInfo.userTicketCount
    gameOptions.ticketStatus.txt.text = gameOptions.userInfo.userTicketCount + "/";
    
    gameOptions.ticketStatus.txt.x = -36*scale + (gameOptions.ticketStatus.txt.displayWidth + gameOptions.ticketStatus.txtTale.displayWidth) * (-0.5 + (gameOptions.ticketStatus.txt.displayWidth/(gameOptions.ticketStatus.txt.displayWidth + gameOptions.ticketStatus.txtTale.displayWidth))) 
    gameOptions.ticketStatus.txtTale.x = gameOptions.ticketStatus.txt.x + 1;
  
  
    //setTicketTimer();
  
    if(gameOptions.userInfo.userTicketCount >= gameOptions.ticketCountMax)
    {
      gameOptions.ticketMeter.timer.alpha = 0;
      if(gameOptions.timer)
      {
        clearInterval(gameOptions.timer)
      }
    }
  
  }
  
  
  function soundToggle(){
  
    
    gameOptions.soundOn = !gameOptions.soundOn;
    soundSet();
  
  }
  
  function soundSet(){
  
    if(gameOptions.soundOn)
    {
      gameOptions.menuPop.contents['btnSoundToggle'].sprite.setTexture("ico-soundOn-m");
  
      Object.keys(gameOptions.sounds).forEach(function(key, idx) {
  
        gameOptions.sounds[key].setMute(false)
  
      })
  
    }
    else
    {
      gameOptions.menuPop.contents['btnSoundToggle'].sprite.setTexture("ico-soundOff-m");
  
      Object.keys(gameOptions.sounds).forEach(function(key, idx) {
  
        gameOptions.sounds[key].setMute(true)
  
      })
    }
  
  }
  
  
  
  
  function rotateWheel(spinRate) {
  
  
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
  
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle -= (spinAngle * Math.PI / 180);
  
    document.getElementById("angle").innerHTML = startAngle;
  
    drawRouletteWheel();
    spinTime += spinRate;
    clearTimeout(spinTimeout);
    spinTimeout = setTimeout('rotateWheel('+spinRate+')', spinRate);
  }
  
  function stopRotateWheel(earnedPoints) {
    gameOptions.enable = true;
    gameOptions.spin_btn.setTexture('spin_button');
    pointTxtBtn.setScale(1);
  
    var degrees = - startAngle * 180 / Math.PI;
  
    var standardDegrees = (degrees % 360) * Math.PI / 180;
  
    var index = 0;
    //console.log(degrees);
    //console.log(standardDegrees);
    //console.log(optionsMount);
    //console.log(options);
    for(var i = 0; i < options.length; i++)
    {
        if(standardDegrees < options[i]['mount'])
        {
            index = i;
            break;
        }
    }
    //ctx.font = 'bold 30px Helvetica, Arial';
    if(resultText) {
      resultText.text = options[index]['value'];
    }
  
    //console.log("STOPPED AT " + options[index]['value']);
    //ctx.fillText(text, 200 - ctx.measureText(text).width / 2, 200 + 10);
  
    // if(options[index]['ri_id'] == 0)
    //   openModalFailed();
    // else
    //   openModal();
  
  
    if(options[index]['ri_id'] == '0')
    {
  
      dataLayer.push({'event': 'viewGiftPopup', 'event_label':'꽝'});
  
  
      alert_fail("아쉽군요!<br>다음 기회를 노려보세요.", function(){
  
        dataLayer.push({'event': 'clickApplyBtn', 'event_label':'꽝'});
  
        // if(remain_cnt > 0)
        // {
        //   spin();
        // }
        // else
        // {
        //   //$(".pop_youtube").modal("show");
        // }
  
      }, "확인");
    }
    else
    {
  
      setTimeout(function(){
  
        //gameOptions.sounds['showGift'].play();
  
  
      }, 500)
  
  
      enableInteractive();
      if(options[index]['value'] == "Infinite Chest")
      {
        gameOptions.GuideUsePoint.icoP.alpha = 0;
        gameOptions.GuideUsePoint.icoB.alpha = 1;
        gameOptions.GuideUsePoint.txt.text = " x1";
        gameOptions.GuideUsePoint.postfixP.alpha = 0;
        
        gameOptions.userInfo.userBoxCount++;
  
        setBoxCnt();
  
      gameOptions.sounds['Get_Chest'].play();
  
          
      }
      else
      {
        resultPoint = options[index]['value'].replace("P", "");
  
        gameOptions.GuideUsePoint.icoP.alpha = 1;
        gameOptions.GuideUsePoint.icoB.alpha = 0;
        gameOptions.GuideUsePoint.txt.text = earnedPoints;//resultPoint;
        gameOptions.GuideUsePoint.postfixP.alpha = 1;
  
        if(resultPoint*1 < 0)
        {
            gameOptions.sounds['Get_Bomb'].play();
        }
        else
        {
            gameOptions.sounds['Get_Coin'].play();
        }
  
        gameOptions.userInfo.userPoint += earnedPoints;//resultPoint * 1;
  
        if(gameOptions.userInfo.userPoint < 0)
        {
          gameOptions.userInfo.userPoint = 0;
        }
  
        setUserPoint(true);
      }
  
      // alert_result(function(){
        
      //   enableInteractive();
        
  
      //   setUserPoint();
  
  
      // },  "확인");
  
    }
  
  }
  
  function easeOut(t, b, c, d) {
    //var ts = (t/=d)*t;
    //var tc = ts*t;
    //return b+c*(tc + -3*ts + 3*t);
    //console.log("Delta:" + (b + t/d*c));
    return b + t/d*c;
  }
  
  function getDeltaAngle(dt, t, a){
    //console.log("Delta:" + (Math.sqrt((2*a) / (Math.pow(dt/t, 2) + (dt/t)))));
    //return Math.sqrt((2*a) / (Math.pow(dt/t, 2) + (dt/t)));
    return (a*2)/(1+t/dt);
  }
  
  function drawTextAlongArc(o, str, centerX, centerY, radius, angle_offset, arc_total) {
    var len = str.length, s;
  
    var angle = angle_offset - (len / 2) * Math.PI/180;
    var arc = 1 * Math.PI/180;
  
    for(var n = 0; n < len; n++) {
  
      s = str[n];
  
      // var text = o.add.text(0, 0, s, { fontSize: 21, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);  //�ǳ� �ؽ�Ʈ
          // text.setOrigin(0.5);
          // text.depth = 6;
      //
      // text.setPosition(Math.cos(angle - arc/ 2) * radius + centerX, Math.sin(angle - arc/ 2) * radius + centerY);
      // text.setRotation(angle - arc / 2 + Math.PI / 2);
      //
      // container.add(text);
  
      angle += arc;
    }
  
  }

  function setItems(o, result){


  
    standard_point = 100;//result['point_needed'];
  
    //   if(modal_alert_point_txt)
    //     modal_alert_point_txt.setText(standard_point);
    
      var mount = 0;

      for(var i = 0; i < result['items'].length; i++)
      {
        var item = result['items'][i];
        var ri_icon = i%2 == 1 && item["ri_icon"] != '' ? item["ri_icon"] : item["ri_icon2"];
        var arc = 360 / result['items'].length;
        var img = item["ri_img"] != '' ? IMG_BASE + item["ri_img"] : IMG_BASE + '/images/bi.png';
        var icon = ri_icon != '' ? IMG_BASE + ri_icon : IMG_BASE + '/images/null.png';

        // if(item['ri_id'] == 0)
        // {
        //   img = kc_url + "/uploads/popup_failed.png";

        //   if(i%2 == 0)
        //   {
        //     icon = kc_url + "/uploads/failed2.png";
        //   }
        //   else
        //   {
        //     icon = kc_url + "/uploads/failed1.png";
        //   }
        // }

        if(img != '')
        {
          //o.load.image('item_img_' + i, img);
          //console.log('item_img_' + i, img)
          //item_count++;
        }

        if(icon != '')
        {
          o.load.image('item_icon_' + i, icon);
          
          item_count++;
        }

        mount += arc;
        var row = {
          "ri_id":item["ri_id"],
          "ri_send_type":item["ri_send_type"],
          "ri_realname_required":item["ri_realname_required"],
          "amount":item['value'] == "Infinite Chest" ? "BOX" : item["value"].replace("P", "").replace("+", ""),
          "value":item["value"],
          "value_pop":item["value_pop"],
          "subtext":item["subtext"],
          "rank":item["rank"],
          "ri_img":img,
          "ri_icon":icon,
          "arc":arc,
          "mount":mount,
          "text":null
        }

        options.push(row);
      }


        options.forEach(function(item){

          item.arc = 360 / options.length;

        })
        
                
        o.load.on('filecomplete', addItemIcon, o);
        o.load.start();
    
  }
  
  function loadItems(o) {
  
      let result = {"res":1,"errmsg":"game data","items":[{"ri_id":"1","ri_send_type":"0","ri_realname_required":"1","value":"-200P","value_pop":"-200P","subtext":"","rank":"1","ri_img":"uploads/ico-11.png","ri_icon":"uploads/ico-11.png","ri_icon2":"uploads/ico-11.png","arc":60,"mount":1.2566370614359172,"text":null},{"ri_id":"2","ri_send_type":"0","ri_realname_required":"0","value":"Infinite Chest","value_pop":"Infinite Chest","subtext":"","rank":"4","ri_img":"uploads/ico-22.png","ri_icon":"uploads/ico-22.png","ri_icon2":"uploads/ico-22.png","arc":60,"mount":2.5132741228718345,"text":null},{"ri_id":"3","ri_send_type":"0","ri_realname_required":"1","value":"+100P","value_pop":"+100P","subtext":"","rank":"3","ri_img":"uploads/ico-33.png","ri_icon":"uploads/ico-33.png","ri_icon2":"uploads/ico-33.png","arc":60,"mount":3.7699111843077517,"text":null},{"ri_id":"4","ri_send_type":"0","ri_realname_required":"1","value":"+500P","value_pop":"+500P","subtext":"","rank":"2","ri_img":"uploads/ico-44.png","ri_icon":"uploads/ico-44.png","ri_icon2":"uploads/ico-44.png","arc":60,"mount":5.026548245743669,"text":null},{"ri_id":"5","ri_send_type":"0","ri_realname_required":"0","value":"+300P","value_pop":"+300P","subtext":"","rank":"5","ri_img":"uploads/ico-55.png","ri_icon":"uploads/ico-55.png","ri_icon2":"uploads/ico-55.png","arc":60,"mount":6.283185307179586,"text":null},{"ri_id":"6","ri_send_type":"0","ri_realname_required":"0","value":"+1000P","value_pop":"+1000P","subtext":"","rank":"5","ri_img":"uploads/ico-66.png","ri_icon":"uploads/ico-66.png","ri_icon2":"uploads/ico-66.png","arc":60,"mount":6.283185307179586,"text":null}]}

      setItems(o, result)
      loadingOff();
  }

  function loadItems_bak(o) {
  
      console.log("load items")
  
          

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {


        var result = JSON.parse(this.responseText);
        setItems(o, result)
        
  
          
  
        //initRoulette(o);
  
      } else if (this.readyState == 4 ){
        alert("게임 초기화에 실패했습니다." + this.status);
      }
  
      
      
      loadingOff();
    };
    xhttp.open("GET",  "http://cv2.avivgame.com/api/get/game/data", true);
    xhttp.send();
  }
  
  
  function addItemIcon (key, type, texture)
  {
    loaded_count++;
  
  
    if(loaded_count == item_count)
    {
      initRoulette(this);
    }
  
      // var img = this.add.image(40, 40, key);
      // img.setScale(0.3,0.3);
      // container.add(img);
  
      // var nextFile = files.pop();
      //
      // if (nextFile)
      // {
      //     this.load.image(nextFile);
      // }
  }
  
  
  
  function spin(passive) {
    //closeModalAlert()
  
    if(!gameOptions.enable || !standby || gameOptions.menuOpen)
    {
      return;
    }
  
    gameOptions.enable = false;
    //document.getElementById("spin").classList.add("on");
    gameOptions.spin_btn.setTexture('spin_button_on');
    pointTxtBtn.setScale(0);
    
    loadingOn();
    
    let ri_id;
    let earnedPoints
  
    let callback = function(){
  
  
      
  
  
      loadingOff();
  
      var remain_cnt_dump = 0;
      var result = JSON.parse(this.responseText);
      //console.log(result['items']);
      //console.log(this.responseText);

      console.log(result)

      if(true)//result.resultCode == '1' || result.resultCode == '2')
		  {

        let resultType = 1;//result.res;

        
  
      ri_id = result['ri_id'];

      earnedPoints = result.earnedPoints

      if(!earnedPoints)
      {
        resultType = 2;
      }

      let totalTcktsCnt = result.ticketCount
      //let ticketChargeTime = result.ticketChargeTime
      
        
			gameOptions.userInfo.userTicketCount = totalTcktsCnt;
			//gameOptions.userInfo.userTicketTime = ticketChargeTime;

      
      setTicketCount(gameOptions.userInfo.userTicketCount)
      //setTicketTimer(gameOptions.userInfo.userTicketTime/1000);
  
      //resultText.text = "";
  
      //destinationAngle =
      resultNo = 0;//Math.floor(Math.random() * options.length);
  
      //console.log(ri_id);

      //console.log("ri_id:" + ri_id);
      for(var i = 0; i < options.length; i++)
      {
        if(

          (resultType == '2' && 
          options[i]['amount'] == 'BOX') ||

          (resultType == '1' && 
          options[i]['amount'] == earnedPoints// * (100/(100 + gameOptions.userInfo.userBroochBonus))
          )
          
          )
        {
          resultNo = i;

          console.log(resultNo)

          send_type = options[i]['ri_send_type'];

          set_result(options[i]['rank'], options[i]['value_pop'], options[i]['subtext'], options[i]['ri_img'],  options[i]['ri_send_type'] == '1');


          /*
          gameOptions.modal_canvas_object.load.on('filecomplete', setResultImg, gameOptions.modal_canvas_object);

          gameOptions.modal_canvas_object.load.image('result_img_'+i, options[i]['ri_img']);

          resultImg.setTexture("result_img_"+i);
          resultTxtImg.setTexture("send_type" + options[i]['ri_send_type']);

          //resultImg.setScale(0.6);

          if(resultImg.displayWidth  > 16)
          {
            resultImg.setScale(16/resultImg.displayWidth);
          }
          else
          {
            resultImg.setScale(1);
          }

          console.log("resultImg.displayWidth");
          console.log(resultImg.displayWidth);
          console.log(resultImg.width);

          send_type = options[i]['ri_send_type'];

          gameOptions.modal_canvas_object.load.start();*/

          break;
        }

      }
  
      //resultNo = 0;
  
      //console.log("mentioned result:" + resultNo);
  
  
      var resultArc1 = options[resultNo]['mount']*180/Math.PI - options[resultNo]['arc'];
      //var resultArc2 = options[resultNo]['mount'];
  
      var offset = options[resultNo]['arc'] / 5;
  
      destinationAngle = (6+Math.floor(Math.random()*15)) * 360 + ( offset + Math.random()*(options[resultNo]['arc']-(2*offset))) + resultArc1 + 1440 - (- startAngle*180/Math.PI - 90)%360;
      //destinationAngle = Math.random()*options[resultNo]['arc'] + resultArc1 - (- startAngle*180/Math.PI - 90)%360;
      //console.log("destinationAngle:" + destinationAngle);
  
      spinTime = 0;
      spinTimeTotal = destinationAngle*1 + 1 * 1000;//Math.random() * 3 + 4 * 3000;
      spinRate = 500/60;//Math.floor(Math.random() * 25) + 5;
  
      //spinAngleStart = getDeltaAngle(spinRate, spinTimeTotal, destinationAngle);//10;//Math.random() * 10 + 10;
      //console.log(spinAngleStart);
      //rotateWheel(spinRate);
  
      var actualAngle = (destinationAngle - 90);
  
      startAngle += Math.floor(-startAngle/(2*Math.PI)) * 2*Math.PI;
  
      startAngle -= actualAngle*(Math.PI/180);
  
      //container.rotation = startAngle - 
  
      var inverseAngle = (Math.floor(-(startAngle * (180/Math.PI))/360)*360 +  360 - ((-startAngle * (180/Math.PI)) % 360)) * (Math.PI/180);
      var originAngle =  (Math.floor(-(startAngle * (180/Math.PI))/360)*360 +  ((-startAngle * (180/Math.PI)) % 360)) * (Math.PI/180);
  
      let spinSound = null;
  
      if(spinTimeTotal > 7000)
      {
        gameOptions.sounds['spin_9sec'].play({volume:1,
          
          //rate:1 * ((spinTimeTotal/1000)/9), 
          //seek:9 - (spinTimeTotal/1000)
        
        });
  
        spinSound = gameOptions.sounds['spin_9sec']
      }
      else if(spinTimeTotal > 6000)
      {
        gameOptions.sounds['spin_7sec'].play({volume:1,
          
          //rate:1 * ((spinTimeTotal/1000)/7), 
          //seek:7 - (spinTimeTotal/1000)
        
        });
  
        spinSound = gameOptions.sounds['spin_7sec']
      }
      else if(Math.random() > 0.5)
      {
        gameOptions.sounds['spin_6sec'].play({volume:1,
          //rate:1 * ((spinTimeTotal/1000)/6), 
          //seek:6 - (spinTimeTotal/1000)
        
        });
        spinSound = gameOptions.sounds['spin_6sec']
      }
      else
      {
        gameOptions.sounds['spin_6sec2'].play({volume:1,
          //rate:1 * ((spinTimeTotal/1000)/6), 
          //seek:6 - (spinTimeTotal/1000)
        
        });
        spinSound = gameOptions.sounds['spin_6sec2']
      }
  
       scene.tweens.add({
          targets : [container],//, container_upper],
          rotation:inverseAngle,//originAngle,
          duration:spinTimeTotal,
          loop:false,
          //ease:'Sine.easeOut',
          ease:'Quad.easeOut',
          onUpdate:function(tw){
  
            // spinSound.setVolume(1-(tw.progress*0.5))
            // spinSound.setRate(1-tw.progress)
  
            //console.log(container.rotation)
            let angle = container.rotation * 180 / Math.PI;
  
            let angle_w = angle % 22.5;
            
            if(angle_w > 0)
            {
                angle_w = 22.5 - (angle_w)
            }
  
  
            if(angle_w < 6 || angle_w > 16.5)
            { 
                if(angle_w > 16.5)
                {
                  angle_w = angle_w - 22.5;
                }
              //gameOptions.needle.rotation = (-8-angle_w) * Math.PI / 180 / 2;
  
  
            }
            else
            {
              //gameOptions.needle.rotation = 0;
            }
            
          },
          onComplete: function(){
            spinSound.stop();
            stopRotateWheel(earnedPoints > 0 ? Math.floor(earnedPoints * gameOptions.userInfo.bonusRate()) : earnedPoints);
  
          }
      });
    
  
  
  
      // setTimeout(function(){
      //   stopRotateWheel();
      // }, spinTimeTotal);


      }
      else
      {
        alert(result.msg)

        gameOptions.enable = true;
  
        gameOptions.spin_btn.setTexture('spin_button');
        pointTxtBtn.setScale(1);
      }


  
  
    }
  
  
    var data = {
      
    };
  
    XmlReq.post("/infiniteSpin/game/spin", data, callback)
  
  
  }
  
  function cannotSpin(){
    return (!gameOptions.enable || !standby || gameOptions.loading || gameOptions.menuOpen || $(".modal.shown").length > 0 || gameOptions.boxPop.alpha == 1);
  }
  
  function openModalAlert() {
    
    gameOptions.sounds['Click'].play();
  
    if(cannotSpin())
    {
      return;
    }
  
    disableInteractive();
  
    if(remain_cnt == 1)
    {
      //$(".approve").html("확인");
    }
    else
    {
      //$(".approve").html("다음 룰렛 돌리기");
    }
  
  
    //$(".modal-spin").modal("show");
  
    // alert_normal("참여 가능 횟수 : " + remain_cnt + "<br><br>\
    // 참여 가능 횟수만큼<br>\
    // 룰렛이 자동으로 돌아가고<br>\
    // 당첨 경과가 나옵니다.<br><br><br><span style='color:red;text-align:center;'>주의!<br>\
    // 최종 신청완료 이전에 브라우저 화면을<br>\
    // 종료하거나 이탈 시 당첨이 취소되며,<br>\
    // 사용하지 않은 참여 가능 횟수가 남아있더라도<br>\
    // 해당 응모권으로 다시 참여할 수 없습니다.</span>", spin);
  
    // return;
  
    // if($('[name=phone1]').val() == '')
    // {
    //   alert("경품 수령 정보를 입력해주세요.");
    //   return;
    // }
  
    // if($('[name=phone2]').val() == '')
    // {
    //   alert("경품 수령 정보를 입력해주세요.");
    //   return;
    // }
  
    // if($('[name=phone3]').val() == '')
    // {
    //   alert("경품 수령 정보를 입력해주세요.");
    //   return;
    // }
  
    // if(!$('[name=agree1]').prop("checked"))
    // {
    //   alert("개인정보 수집·이용에 동의해주세요.");
    //   return;
    // }
  
    // if(remain_cnt*1 != 1 || !autoRedo)
    // {
    //   autoRedo = confirm("자동으로 잔여 코인만큼 돌리시겠습니까?");
    // }
  
    if(gameOptions.userInfo.userTicketCount <= 0)
    {
      alert("No tickets.");
      return;
    }
  
    gameOptions.userInfo.userTicketCount--;
  
    setTicketCount(gameOptions.userInfo.userTicketCount)
  
  
    spin(false);
  
  //   if(tweenTo)
  //   {
  //     clearTimeout(tweenTo);
  //     tweenTo = null;
  //   }
  
  
  //   if(!gameOptions.enable)
  //   {
  //     return;
  //   }
  
  //   document.getElementById("modal").style.display = 'block';
  //   tweens.restart();
  //   tweens_modal_alert.restart();
  }
  
  
  
  function drawUI(o) {
  
    //Arrow
    tGraphics.fillStyle(0x391e10, 1);
    tGraphics.beginPath();
    //tGraphics.beginPath();
  
    // tGraphics.moveTo(gameOptions.width/2 - 8, gameOptions.height/2 - (gameOptions.outsideRadius + 5));
    // tGraphics.lineTo(gameOptions.width/2 + 8, gameOptions.height/2 - (gameOptions.outsideRadius + 5));
    // tGraphics.lineTo(gameOptions.width/2 + 4, gameOptions.height/2 - (gameOptions.outsideRadius - 5));
    // tGraphics.lineTo(gameOptions.width/2 + 9, gameOptions.height/2 - (gameOptions.outsideRadius - 5));
    // tGraphics.lineTo(gameOptions.width/2 + 0, gameOptions.height/2 - (gameOptions.outsideRadius - 13));
    // tGraphics.lineTo(gameOptions.width/2 - 9, gameOptions.height/2 - (gameOptions.outsideRadius - 5));
    // tGraphics.lineTo(gameOptions.width/2 - 4, gameOptions.height/2 - (gameOptions.outsideRadius - 5));
    // tGraphics.lineTo(gameOptions.width/2 - 8, gameOptions.height/2 - (gameOptions.outsideRadius + 5));
  
    /* 바늘 직업 그리기
    // tGraphics.arc(400, 40, 40, Math.PI, 0, false);
    // tGraphics.moveTo(360,40);
    // tGraphics.lineTo(397, 117);
    // tGraphics.arc(400, 117, 3, Math.PI, 0, true);
    // tGraphics.lineTo(440, 40);
    //
    // tGraphics.fillPath();
    //
    // tGraphics.fillStyle(0xffffff, 1);
    // tGraphics.fillCircle(400, 40, 20);
    //
    // tGraphics.depth = 5;
    /*  // 바늘 직업 그리기*/
  
    var configTitle = {
      key: 'title',
      x: gameOptions.width/2,
      y: (gameOptions.height * 0.125),
      scale: { x: 1, y: 1 },
      origin: { x:0.5, y:0.322}
    };
  
  
    var configBtn = {
        key: 'spin_button',
        x: gameOptions.width/2,
        y: gameOptions.wheelCenter,
        scale: { x: 1, y: 1 },
        anchor: {x:0.5, y:0.5}
    };
  
    //  An example using randFloat to set independent x and y scale values
    var configNeedle = {
        key: 'needle',
        x: gameOptions.width/2,
        y: (gameOptions.wheelCenter - gameOptions.outsideRadius - 5*scale),
        scale: { x: 1, y: 1 },
        origin: { x:0.5, y:0.322}
    };
  
  
    gameOptions.spin_btn = o.make.sprite(configBtn);
    gameOptions.spin_btn.setOrigin(0.5, 0.5);
  
    gameOptions.title = o.make.sprite(configTitle);
    gameOptions.title.blendMode = "SCREEN";
    gameOptions.needle = o.make.sprite(configNeedle);
    // gameOptions.needle.setAlpha(0);
  
  
    //Make the button change image when pressed
    // gameOptions.spin_btn.setInteractive({
    //   cursor: 'pointer'
    // });
    
    
    // o.input.on('gameobjectdown',openModalAlert);
  
  
    // app.canvas.addEventListener("touchstart", function(e){
    //   //console.log(e.cancelable);
    // }, {passive:true})
  
    // app.canvas.addEventListener("touchmove", function(e){
    //   //console.log(e.cancelable);
    // }, {passive:true})
  
    // app.canvas.addEventListener("touchend", function(e){
    //   //console.log(e.cancelable);
    // }, {passive:true})
  
  
  
  
    gameOptions.start_btn = o.add.sprite(gameOptions.width/2, gameOptions.height * 2285/2560, 'start_button');
    gameOptions.start_btn.alpha = 0;
    gameOptions.start_btn.setInteractive({cursor:'pointer'});
    gameOptions.start_btn.setScale(1);
  
    gameOptions.start_btn.on("pointerdown", openModalAlert);
  
  
    
  
    gameOptions.ticketStatus = o.add.container(gameOptions.width * 465/1440, gameOptions.height * 1950/2560);
    gameOptions.ticketStatus.sprite = o.add.sprite(0, 0, 'ico-ticket');
    gameOptions.ticketStatus.alpha = 0;
    gameOptions.ticketStatus.setScale(1);
    
    gameOptions.ticketStatus.txt = o.add.text(-12, 0, gameOptions.userInfo.userTicketCount + "/", { 
              
      font:'900 '+(54 * scale)+'px Noto Sans KR', 
  
      fontWeight:800,
      fontSize:(54 * scale), 
      
      align:"right",
  
      color: "#000000"})
  
    gameOptions.ticketStatus.txt.setFontFamily("Noto Sans KR")
  
  
      gameOptions.ticketStatus.txt.setOrigin(1, 0.5)  
  
      gameOptions.ticketStatus.txtTale = o.add.text(-11, 0, "16", { 
                
        font:'900 '+(54 * scale)+'px Noto Sans KR', 
        
        fontWeight:800,
        fontSize:(54 * scale), 
        
        align:"left",
    
        color: "#324dff"})
    
        gameOptions.ticketStatus.txtTale.setOrigin(0, 0.5)  
  
  
        gameOptions.ticketStatus.txtTale.setFontFamily("Noto Sans KR")
        
      // gameOptions.ticketStatus.txt.x = -36 + (gameOptions.ticketStatus.txt.displayWidth + gameOptions.ticketStatus.txtTale.displayWidth) * (-0.5 + (gameOptions.ticketStatus.txt.displayWidth/(gameOptions.ticketStatus.txt.displayWidth + gameOptions.ticketStatus.txtTale.displayWidth))) 
      // gameOptions.ticketStatus.txtTale.x = gameOptions.ticketStatus.txt.x + 1;
  
  
  
    gameOptions.ticketStatus.add([gameOptions.ticketStatus.sprite, gameOptions.ticketStatus.txt, gameOptions.ticketStatus.txtTale])
    
  
  
    gameOptions.GuideUsePoint = o.add.container(gameOptions.width * 865/1440, gameOptions.height * 1950/2560);
    gameOptions.GuideUsePoint.alpha = 0;
    gameOptions.GuideUsePoint.content = o.add.container();
  
    gameOptions.GuideUsePoint.bg = o.add.sprite(0,0, 'gd-use-result');
  
    gameOptions.GuideUsePoint.add([gameOptions.GuideUsePoint.bg, gameOptions.GuideUsePoint.content])
  
    gameOptions.GuideUsePoint.icoP = o.add.sprite(-136 * scale, 0, 'ico-point-sm');
    gameOptions.GuideUsePoint.icoB = o.add.sprite(-40 * scale, 0, 'ico-chest-m');
    gameOptions.GuideUsePoint.icoB.setScale(0.4)
    gameOptions.GuideUsePoint.icoP.alpha = 1;
    gameOptions.GuideUsePoint.icoB.alpha = 0;
  
    gameOptions.GuideUsePoint.txt = o.add.text(105 * scale, 0, "", {
              
      font:'700 '+(54 * scale)+'px Noto Sans KR', 
  
      fontSize:(54 * scale), 
      
      align:"right",
  
      color: "#000000"}).setShadow(0, 3*scale, "#999999", 2*scale, false, true);
  
  
      gameOptions.GuideUsePoint.txt.setFontFamily("Noto Sans KR")
  
    gameOptions.GuideUsePoint.txt.setOrigin(1, 0.5)
  
  
    
    gameOptions.GuideUsePoint.postfixP = o.add.sprite(112 * scale, 0, 'point_postfix');
    gameOptions.GuideUsePoint.postfixP.alpha = 0;
    gameOptions.GuideUsePoint.postfixP.setOrigin(0, 0.5)
    
    gameOptions.GuideUsePoint.content.add([  gameOptions.GuideUsePoint.icoP,   gameOptions.GuideUsePoint.icoB,   gameOptions.GuideUsePoint.txt,   gameOptions.GuideUsePoint.postfixP])
    
  
  
    // gameOptions.btnConnect = o.add.image(gameOptions.width/2, gameOptions.height * 2083/2560, 'btn-connect');
    // gameOptions.btnConnect.setAlpha(0)
    // gameOptions.btnConnect.setInteractive({cursor:'pointer'});    
    // gameOptions.btnConnect.on("pointerdown",function(){
  
    //   //$("#connect").trigger("click");
    //    connect();
  
  
    // })
  
    
  
    gameOptions.pointMeter = o.add.container(gameOptions.padding, gameOptions.padding);
    gameOptions.pointMeter.alpha = 0;
    // gameOptions.pointMeter.x = gameOptions.padding
    // gameOptions.pointMeter.y = gameOptions.padding
  
    gameOptions.pointMeter.graphics = o.add.graphics();
    gameOptions.pointMeter.graphics.fillStyle(0x000000, 0.5);
    gameOptions.pointMeter.graphics.fillRoundedRect(0, 0, 500*scale, 115*scale, 25*scale); 
  
    gameOptions.pointMeter.ico = o.add.image(70*scale, 57.5*scale, "ico-point")
    
    gameOptions.pointMeter.txt = o.add.text(470*scale, 57.5*scale, "0", {//"585,219", { 
              
      font:'700 '+(66 * scale)+'px Noto Sans KR', 
  
      fontSize:(66 * scale), 
      
      align:"right",
  
      color: "#ffffff"})
  
      gameOptions.pointMeter.txt.setFontFamily("Noto Sans KR")
  
  
      gameOptions.pointMeter.txt.setOrigin(1, 0.5)  
  
      gameOptions.pointMeter.add([gameOptions.pointMeter.graphics, gameOptions.pointMeter.ico, gameOptions.pointMeter.txt])
  
      setUserPoint();
  
      
  
    gameOptions.nicknameBox = o.add.container(gameOptions.width/2, gameOptions.height * 2104/2560);
    gameOptions.nicknameBox.alpha = 0;
    // gameOptions.pointMeter.x = gameOptions.padding
    // gameOptions.pointMeter.y = gameOptions.padding
  
  
    
    gameOptions.nicknameBox.txt = o.add.text(0,0, "", { 
              
      font:'400 '+(60 * scale)+'px Noto Sans KR', 
  
      fontSize:(60 * scale), 
      
      align:"center",
  
      color: "#ffffff"})
  
      gameOptions.nicknameBox.txt.setFontFamily("Noto Sans KR")
  
  
      gameOptions.nicknameBox.txt.setOrigin(0.5, 0.5)  
  
      gameOptions.nicknameBox.graphics = o.add.graphics();
      
      gameOptions.nicknameBox.add([gameOptions.nicknameBox.graphics, gameOptions.nicknameBox.txt])
  
      setUserNameBox("carrieverse1152")
  
  
    
  
      gameOptions.menuIco = o.add.container(gameOptions.width - gameOptions.padding - 120 * scale, gameOptions.padding);
      gameOptions.menuIco.alpha = 0;
  
      gameOptions.menuIco.graphics = o.add.graphics();
      gameOptions.menuIco.graphics.fillStyle(0x000000, 0.5);
      gameOptions.menuIco.graphics.fillRoundedRect(0, 0, 120 * scale, 120 * scale, 25 * scale); 
      
      gameOptions.menuIco.ico = o.add.image(60 * scale, 60 * scale, "ico-menu")
  
      gameOptions.menuIco.add([gameOptions.menuIco.graphics, gameOptions.menuIco.ico])
  
      gameOptions.menuIco.setInteractive({hitArea:new Phaser.Geom.Rectangle(0, 0, 120 * scale, 120 * scale), hitAreaCallback:Phaser.Geom.Rectangle.Contains, cursor:"pointer"});
      gameOptions.menuIco.on("pointerup", function(e){
		
        openMenu.bind(o)();
        
      })
  
  
  
  
      drawUIIcons(o);
  
  }
  
  function drawUIIcons(o){
  
    gameOptions.ticketMeter = o.add.container(140 * scale, 280 * scale)
    gameOptions.ticketMeter.sprite = o.add.sprite(0, 0, 'ico-ticket');
    gameOptions.ticketMeter.sprite.setScale(167/226);
    gameOptions.ticketMeter.alpha = 0;
    gameOptions.ticketMeter.setScale(1);
    
    gameOptions.ticketMeter.txt = o.add.text(4*scale, 0, "+8", { 
              
      font:'600 '+(45 * scale)+'px Noto Sans KR', 
  
      fontWeight:800,
      fontSize:(45 * scale), 
      
      align:"right",
  
      color: "#000000"})
  
      gameOptions.ticketMeter.txt.setFontFamily("Noto Sans KR")
  
      gameOptions.ticketMeter.txt.setOrigin(1, 0.5)  
  
  
    gameOptions.ticketMeter.add([gameOptions.ticketMeter.sprite, gameOptions.ticketMeter.txt])
  
  
  
    gameOptions.ticketMeter.timer = o.add.container(0, 96*scale);
    gameOptions.ticketMeter.timer.graphics = o.add.graphics();
    gameOptions.ticketMeter.timer.graphics.fillStyle(0x000000, 0.5);
    gameOptions.ticketMeter.timer.graphics.fillRoundedRect(-104 * scale, -33 * scale, 208 * scale, 66 * scale, 33 * scale); 
  
    
    gameOptions.ticketMeter.timer.txt = o.add.text(0,0, "", { 
              
      font:'400 '+(40 * scale)+'px Noto Sans KR', 
  
      fontSize:(40 * scale), 
      
      align:"center",
  
      color: "#ffffff"})
  
      gameOptions.ticketMeter.timer.txt.setFontFamily("Noto Sans KR")
  
      gameOptions.ticketMeter.timer.txt.setOrigin(0.5, 0.5)  
  
      gameOptions.ticketMeter.timer.add([gameOptions.ticketMeter.timer.graphics, gameOptions.ticketMeter.timer.txt])
  
      gameOptions.ticketMeter.add([gameOptions.ticketMeter.sprite, gameOptions.ticketMeter.txt, gameOptions.ticketMeter.timer])
  
    gameOptions.cursor = true;
  
    //setTicketCount(16);

    setTicketCount(gameOptions.userInfo.userTicketCount);
    setTicketTimer(gameOptions.userInfo.userTicketTime/1000);
  
  
  
  
        
      gameOptions.teamMeter = o.add.container(140 * scale, 535 * scale)
      gameOptions.teamMeter.sprite = o.add.sprite(0, 0, 'ico-team');
      gameOptions.teamMeter.sprite.setScale(1);
      gameOptions.teamMeter.alpha = 0;
      gameOptions.teamMeter.setScale(1);
      
      gameOptions.teamMeter.txt = o.add.text(16 * scale, 30 * scale, "0", { 
                
        font:'800 '+(40 * scale)+'px Noto Sans KR', 
  
        fontWeight:800,
        fontSize:(40 * scale), 
        
        align:"right",
  
        color: "#000000"})
  
        gameOptions.teamMeter.txt.setOrigin(1, 0.5)  
  
        gameOptions.teamMeter.txt.setFontFamily("Noto Sans KR")
  
        gameOptions.teamMeter.txtTale = o.add.text(17 * scale, 36 * scale, "%", { 
                
          font:'800 '+(20 * scale)+'px Noto Sans KR', 
    
          fontWeight:800,
          fontSize:(20 * scale), 
          
          align:"left",
    
          color: "#000000"})
    
          gameOptions.teamMeter.txtTale.setFontFamily("Noto Sans KR")
  
          gameOptions.teamMeter.txtTale.setOrigin(0, 0.5) 
  
      gameOptions.teamMeter.add([gameOptions.teamMeter.sprite, gameOptions.teamMeter.txt, gameOptions.teamMeter.txtTale])
  
      gameOptions.teamMeter.txt.x = (gameOptions.teamMeter.txt.displayWidth + gameOptions.teamMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.teamMeter.txt.displayWidth/(gameOptions.teamMeter.txt.displayWidth + gameOptions.teamMeter.txtTale.displayWidth))) 
      gameOptions.teamMeter.txtTale.x = gameOptions.teamMeter.txt.x + 1;
  
  
        
      gameOptions.broochMeter = o.add.container(140 * scale, 734 * scale)
      gameOptions.broochMeter.sprite = o.add.sprite(0, 0, 'img-brooch-lv' + gameOptions.userInfo.userBroochLevel);
      gameOptions.broochMeter.sprite.setScale(1);
      gameOptions.broochMeter.alpha = 0;
      gameOptions.broochMeter.setScale(1);
      
      gameOptions.broochMeter.txt = o.add.text(0, 24 * scale, gameOptions.userInfo.userBroochBonus, { 
                
        font:'800 '+(40 * scale)+'px Noto Sans KR', 
  
        fontWeight:800,
        fontSize:(40 * scale), 
        
        align:"right",
  
        color: "#000000"})
  
      
        gameOptions.broochMeter.txt.setFontFamily("Noto Sans KR")
  
        gameOptions.broochMeter.txt.setOrigin(1, 0.5)  
  
        gameOptions.broochMeter.txtTale = o.add.text(0, 24 * scale, "%", { 
                
          font:'800 '+(20 * scale)+'px Noto Sans KR', 
    
          fontWeight:800,
          fontSize:(20 * scale), 
          
          align:"left",
    
          color: "#000000"})
    
          gameOptions.broochMeter.txtTale.setFontFamily("Noto Sans KR")
  
          gameOptions.broochMeter.txtTale.setOrigin(0, 0.5) 
  
  
      gameOptions.broochMeter.txt.x = (gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.broochMeter.txt.displayWidth/(gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth))) 
      gameOptions.broochMeter.txtTale.x = gameOptions.broochMeter.txt.x + 1;
  
  
      gameOptions.broochMeter.add([gameOptions.broochMeter.sprite, gameOptions.broochMeter.txt, gameOptions.broochMeter.txtTale])
  
  
  
      gameOptions.menuPop = o.add.container(0,0);
      gameOptions.menuPop.graphics = o.add.graphics();
      gameOptions.menuPop.graphics.fillStyle(0x000000, 0.90);
      gameOptions.menuPop.graphics.fillRect(0,0, gameOptions.width, gameOptions.height); 
      gameOptions.menuPop.add([ gameOptions.menuPop.graphics])
      
      gameOptions.menuPop.alpha = 0;
      gameOptions.menuPop.visibility = false;
  
      gameOptions.menuPop.contents = o.add.container(0,0); 
  
      gameOptions.menuPop.add(gameOptions.menuPop.contents)
  
  
      gameOptions.menuPop.closeMenu = o.add.image(gameOptions.menuIco.x + 60 * scale, gameOptions.menuIco.y + 60 * scale, 'btn-close-menu')
  
      gameOptions.menuPop.closeMenu.setInteractive({cursor:'pointer'})
      gameOptions.menuPop.closeMenu.on("pointerdown", function(){
		  
        closeMenu.bind(o)();
  
      })
      gameOptions.menuPop.contents.add(gameOptions.menuPop.closeMenu)
  
      setIco(o, {
        sprite:"ico-dailyBonus-m",
        txt:"Daily\r\nBonus",
        callback:function(){
          
          
          if(!gameOptions.enable)
          {
            alert("Infinite Spin is running.");
            return;
          }
  
          $(".modal-attend").addClass("shown")
  
        },
        x:gameOptions.width*(1/scale)/2 - 363,
        y:gameOptions.height*(1/scale)/2 - 555,
        txtMarginTop:40
      })
  
  
  
      setIco(o, {
        sprite:"ico-leaderBoard-m",
        txt:"Leader\r\nBoard",
        callback:function(){
          
          loadingOn();

          let loadCnt = 0;

          let checkClearInfo = function(){

        
            if(loadCnt >= 2 )
            {
              
              $(".modal-leaderboard").addClass("shown")

              loadingOff();
            }
          }
        
            
          XmlReq.get("/infiniteSpin/game/personalRnk", {}, function(){


            var result = JSON.parse(this.responseText);
            
            console.log(result)

            if(result.resultCode == 1)
            {
              loadCnt++;
              checkClearInfo();

              let list = result.personalRnkLst;
              let pRank = result.personalRnk;
                          

              $(".myUesrRank").html(pRank ? pRank : '-');

                //팀원 리스트 반영
                $(".tab-personal-rank ul").empty();

                list.forEach(function(rankInfo, idx){

                  let item = '<li><span class="userNation natoin-'+(rankInfo.userNation?rankInfo.userNation : '1')+'"></span><span class="userRank">'+rankInfo.rank+'</span><span class="userName">'+rankInfo.userName+'</span> <span class="score">'+mkUnitNumber(rankInfo.point)+'</span></li>';

                  $(".tab-personal-rank ul").append(item)

                })


                if(pRank) {

                  $(".myUesrRank").html(pRank.rank);
                  $(".myUserName").html(pRank.userName);
                  $(".myScore").html(mkUnitNumber(pRank.point));
                } 
                
              
            }
            else
            {
              alert(result.msg);
              loadingOff();
            }
        
        
        
        
          })

          
            
          XmlReq.get("/infiniteSpin/game/teamRnk", {}, function(){


            var result = JSON.parse(this.responseText);
            console.log(result)

            if(result.resultCode == 1)
            {
              loadCnt++;
              checkClearInfo();

              let list = result.teamRnkLst;
              let myTeamRank = result.myTeamRank;
                          
                //팀원 리스트 반영
                $(".tab-team-rank ul").empty();

                list.forEach(function(rankInfo, idx){

                  let item = '<li><span class="userNation natoin-1"></span><span class="userRank">'+rankInfo.rank+'</span><span class="userName">'+rankInfo.userName+'\'s Team</span> <span class="score">'+mkUnitNumber(rankInfo.point)+'</span></li>';

                  $(".tab-team-rank ul").append(item)


                })

                if(myTeamRank) {

                  $(".my-team-rank .userRank").html(myTeamRank.rank);
                  $(".myTeamName").html(myTeamRank.userName + "'s Team");
                  $(".my-team-rank .score").html(mkUnitNumber(myTeamRank.point));
                  $(".my-team-rank").show();
                  
                } else {
                  $(".my-team-rank").hide();

                }
             
                
              
            }
            else
            {
              alert(result.msg);
              loadingOff();
            }
        
        
        
        
          })


          

          


  
        },
        x:gameOptions.width*(1/scale)/2,
        y:gameOptions.height*(1/scale)/2 - 555,
        txtMarginTop:35
      })
  
  
  
      setIco(o, {
        sprite:"ico-brooch-m",
        txt:"Brooch",
        callback:function(){
          
          
          if(!gameOptions.enable)
          {
            alert("Infinite Spin is running.");
            return;
          }
  
          $(".modal-brooch").addClass("shown")
          
        },
        x:gameOptions.width*(1/scale)/2 + 363,
        y:gameOptions.height*(1/scale)/2 - 555,
        txtMarginTop:23
      })
  
  
  
      
  
      setIco(o, {
        sprite:"ico-team-m",
        txt:"Team",
        callback:function(){
          
          if(gameOptions.userInfo.teamCode) {
            $(".modal-team-has").addClass("shown");
          } else {
            $(".modal-team").addClass("shown");
          }
  
        },
        x:gameOptions.width*(1/scale)/2 - 363,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:40
      })
  
  
  
      setIco(o, {
        sprite:"ico-inviteBonus-m",
        txt:"Invite\r\nBonus",
        callback:function(){
          $(".modal-invite").addClass("shown");
        },
        x:gameOptions.width*(1/scale)/2,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:35
      })
  
  
  
      setIco(o, {
        sprite:"ico-chest-m",
        txt:"Infinite\r\nChest",
        callback:function(){
          
          if(gameOptions.userInfo.userBroochLevel < 2)
          {
            alert("Available at Brooch level 2.");
            return;
          }
          
          if(!gameOptions.enable)
          {
            alert("Infinite Spin is running.");
            return;
          }
  
          openBoxPop();
  
        },
        x:gameOptions.width*(1/scale)/2 + 363,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:40
      })
  
  
  
  
      setIco(o, {
        key:'btnSoundToggle',
        sprite:"ico-soundOn-m",
        txt:"Sound Off",
        callback:function(){
          //alert("daily bonus")
          soundToggle();
        },
        x:gameOptions.width*(1/scale)/2 - 235,
        y:gameOptions.height*(1/scale)/2 + 555,
        txtMarginTop:45,
        passive:true
      })
  
  
  
  
      setIco(o, {
        sprite:"ico-logout-m",
        txt:"Logout",
        callback:function(){
          
          if(!gameOptions.enable)
          {
            alert("Infinite Spin is running.");
            return;
          }
            logout();
        },
        x:gameOptions.width*(1/scale)/2 + 235,
        y:gameOptions.height*(1/scale)/2 + 555,
        txtMarginTop:40,
        passive:false
      })
  
  
  
  
  
  
      gameOptions.boxPop = o.add.container();
      gameOptions.boxPop.graphics = o.add.graphics();
      gameOptions.boxPop.graphics.fillStyle(0x000000, 0.6);
      gameOptions.boxPop.graphics.fillRect(0,0, gameOptions.width, gameOptions.height); 
  
      gameOptions.boxPop.alpha = 0;
  
  
  
      gameOptions.boxPop.add([ gameOptions.boxPop.graphics])
  
      gameOptions.boxPop.content = o.add.container(gameOptions.width/2, gameOptions.height/2);
      gameOptions.boxPop.add([ gameOptions.boxPop.graphics, gameOptions.boxPop.content])
  
      gameOptions.boxPop.content.bg = o.add.image(0,0, "pop-back");
      
      gameOptions.boxPop.content.title = o.add.image(0,-820*scale, "title-pop-box");
  
      gameOptions.boxPop.content.add([gameOptions.boxPop.content.bg, gameOptions.boxPop.content.title])
  
      gameOptions.boxPop.content.box = o.add.sprite(0, -400*scale, 'box_sheet', 5);
      gameOptions.boxPop.content.box.setScale(2)
      
      gameOptions.boxPop.content.box.effect = gameOptions.boxPop.content.box.preFX.addBloom();
      gameOptions.boxPop.content.box.effect.setActive(false)
      
      gameOptions.boxPop.content.box.on("animationcomplete", function(anim){
  
          
        let amount = gameOptions.boxPop.content.box.amount;
        const emitter = scene.add.particles(0,0, 'coin_sheet', {
  
  
          frame: [0,1,2,3,4,5],
          x: gameOptions.boxPop.content.x,
          y: gameOptions.boxPop.content.y + gameOptions.boxPop.content.box.y - 12*scale,
          speed: 3*scale,
          gravityY : 6000*scale,
          rotate:{min:0,max:360},
          speed: { min: 2100*scale, max: 2700*scale },
          angle: { min: 220, max: 330 },
          scale: { min: 0.7, max: 1.3 },
          frequency: 300000,
          lifespan: 3000,
          quantity: amount*3,
          emitting:false
  
        });
  
        gameOptions.boxPop.content.starEff.alpha = 1;
  
  
        emitter.emitParticleAt(gameOptions.boxPop.content.x, gameOptions.boxPop.content.y + gameOptions.boxPop.content.box.y,)
          
          setTimeout(function(){
            emitter.destroy();
          }, 3000);
  
      })
  
      // gameOptions.boxPop.content.box.play("box_open")
  
  
      gameOptions.boxPop.content.closeBtn = o.add.image(595*scale, -830*scale, 'btn-pop-close');
      gameOptions.boxPop.content.closeBtn.setInteractive({cursor:"pointer"})
      gameOptions.boxPop.content.closeBtn.on("pointerdown", function(){
        
        gameOptions.sounds['Close Window'].play();
        closeBoxPop();
  
  
  
      })
  
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.closeBtn)
  
      gameOptions.boxPop.content.result = o.add.container(0, 30*scale);
  
      
      gameOptions.boxPop.content.result.bg = o.add.image(0, 0, 'brooch-bonus-box');
      gameOptions.boxPop.content.result.txt = o.add.text(0, 0, "", { 
              
        font:'500 '+(54 * scale)+'px Noto Sans KR', 
    
        fontWeight:500,
        fontSize:(54 * scale), 
        
        align:"center",
    
        color: "#000000"})
  
    
      gameOptions.boxPop.content.result.txt.setFontFamily("Noto Sans KR")
  
  
      gameOptions.boxPop.content.result.txt.setShadow(0, 1*scale, "#000000", true, true)
        
      gameOptions.boxPop.content.result.txt.setOrigin(0.5)
  
  
      gameOptions.boxPop.content.result.add([gameOptions.boxPop.content.result.bg, gameOptions.boxPop.content.result.txt])
  
      gameOptions.boxPop.content.add([gameOptions.boxPop.content.box, gameOptions.boxPop.content.result])
  
      gameOptions.boxPop.content.starEff = o.add.container(0,0);
      gameOptions.boxPop.content.starEff.alpha = 0;
  
      gameOptions.boxPop.content.starEff1 = o.add.image(gameOptions.boxPop.content.box.x, gameOptions.boxPop.content.box.y-60*scale, 'ring-light-twinkle');
      gameOptions.boxPop.content.starEff1.setBlendMode(Phaser.BlendModes.SCREEN)
      gameOptions.boxPop.content.starEff1.alpha = 0;
      gameOptions.boxPop.content.starEff1.setScale(0)
  
      gameOptions.boxPop.content.starEff2 = o.add.image(gameOptions.boxPop.content.box.x-70*scale, gameOptions.boxPop.content.box.y-20*scale, 'ring-light-twinkle');
      gameOptions.boxPop.content.starEff2.setBlendMode(Phaser.BlendModes.SCREEN)
      gameOptions.boxPop.content.starEff2.alpha = 0;
      gameOptions.boxPop.content.starEff2.setScale(0)
  
      gameOptions.boxPop.content.starEff3 = o.add.image(gameOptions.boxPop.content.box.x+160*scale, gameOptions.boxPop.content.box.y-65*scale, 'ring-light-twinkle');
      gameOptions.boxPop.content.starEff3.setBlendMode(Phaser.BlendModes.SCREEN)
      gameOptions.boxPop.content.starEff3.alpha = 0;
      gameOptions.boxPop.content.starEff3.setScale(0)
  
      gameOptions.boxPop.content.starEff4 = o.add.image(gameOptions.boxPop.content.box.x-140*scale, gameOptions.boxPop.content.box.y-80*scale, 'ring-light-twinkle');
      gameOptions.boxPop.content.starEff4.setBlendMode(Phaser.BlendModes.SCREEN)
      gameOptions.boxPop.content.starEff4.alpha = 0;
      gameOptions.boxPop.content.starEff4.setScale(0)
  
      gameOptions.boxPop.content.starEff5 = o.add.image(gameOptions.boxPop.content.box.x-30*scale, gameOptions.boxPop.content.box.y-30*scale, 'ring-light-twinkle');
      gameOptions.boxPop.content.starEff5.setBlendMode(Phaser.BlendModes.SCREEN)
      gameOptions.boxPop.content.starEff5.alpha = 0;
      gameOptions.boxPop.content.starEff5.setScale(0)
      
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.starEff)
  
      o.tweens.add({
        targets:[gameOptions.boxPop.content.starEff1],
        alpha:1,
        scale:1,
        duration:300,
        yoyo:true,
        delay:300,
        repeatDelay:3000,
        repeat:-1
      })
  
      
      o.tweens.add({
        targets:[gameOptions.boxPop.content.starEff2],
        alpha:1,
        scale:1,
        duration:400,
        yoyo:true,
        delay:1500,
        repeatDelay:6200,
        repeat:-1
      })
  
      
      o.tweens.add({
        targets:[gameOptions.boxPop.content.starEff3],
        alpha:1,
        scale:1,
        duration:380,
        yoyo:true,
        delay:330,
        repeatDelay:3900,
        repeat:-1
      })
  
      
      o.tweens.add({
        targets:[gameOptions.boxPop.content.starEff4],
        alpha:1,
        scale:1,
        duration:200,
        yoyo:true,
        delay:500,
        repeatDelay:4700,
        repeat:-1
      })
  
      
      o.tweens.add({
        targets:[gameOptions.boxPop.content.starEff5],
        alpha:1,
        scale:1,
        duration:300,
        yoyo:true,
        delay:1900,
        repeatDelay:2800,
        repeat:-1
      })
  
  
  
      gameOptions.boxPop.content.starEff.add([gameOptions.boxPop.content.starEff1,gameOptions.boxPop.content.starEff2, gameOptions.boxPop.content.starEff3
        , gameOptions.boxPop.content.starEff4, gameOptions.boxPop.content.starEff5])
  
      
  
      gameOptions.boxPop.content.btnOpen = o.add.image(-260*scale, 280*scale, 'btn-open');
      gameOptions.boxPop.content.btnOpen.setInteractive({cursor:"pointer"})
      gameOptions.boxPop.content.btnOpen.on("pointerdown", function(){
        
        gameOptions.sounds['Click'].play();
        openBox();
      })
  
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.btnOpen)
  
      gameOptions.boxPop.content.btnBuy = o.add.container(260*scale, 280*scale);
      gameOptions.boxPop.content.btnBuy.btn = o.add.image(0,0,'btn-buy')
      gameOptions.boxPop.content.btnBuy.gdB = o.add.image(0,-105*scale,'btn-buy-tag')
      gameOptions.boxPop.content.btnBuy.gdC = o.add.image(0,-105*scale,'btn-buy-tag-txt')
      gameOptions.boxPop.content.btnBuy.btn.setInteractive({cursor:"pointer"})
      gameOptions.boxPop.content.btnBuy.btn.on("pointerdown", function(){
        

        gameOptions.sounds['Click'].play();

        if(gameOptions.userInfo.userPoint < 1000)
        {
            alert("Not enough points.");
            return;
        }


        loadingOn();

        XmlReq.post("/infiniteSpin/asset/buyKey", {}, function(){
    
    
          var result = JSON.parse(this.responseText);
          
          console.log(result)
    
          if(result.resultCode == 1)
          {
            
            gameOptions.userInfo.userPoint = result.point;
            gameOptions.userInfo.userKeyCount = result.keyCnt;
            gameOptions.userInfo.userBoxCount = result.boxCnt;

            setKeyCnt();
            setBoxCnt();
            setUserPoint();

            
            gameOptions.sounds['Buy Key'].play();
    
            loadingOff();

          }
          else
          {
            alert(result.msg);
    
            loadingOff();

          }

        })


     
  
      })
  
  
      gameOptions.boxPop.content.btnBuy.add([gameOptions.boxPop.content.btnBuy.gdB, gameOptions.boxPop.content.btnBuy.gdC, gameOptions.boxPop.content.btnBuy.btn, ])
  
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.btnBuy)
  
  
      gameOptions.boxPop.content.boxState = o.add.container(-260*scale, 480*scale);
  
      gameOptions.boxPop.content.boxState.bg = o.add.image(0, 0, 'box-asset-box');
      gameOptions.boxPop.content.boxState.ico = o.add.image(-135*scale, 0, 'ico-box');
      gameOptions.boxPop.content.boxState.txtX = o.add.text(65*scale, -5*scale, "x ", { 
              
        font:'500 '+(80 * scale)+'px "강원교육튼튼"', 
    
        fontWeight:500,
        fontSize:(80 * scale), 
        
        align:"center",
    
        color: "rgba(0,0,0,0.8)",
      
        stroke:"rgba(0,0,0,1)",
        strokeThickness:3
  
        })
  
        gameOptions.boxPop.content.boxState.txtX.setFontFamily("강원교육튼튼")
  
  
        gameOptions.boxPop.content.boxState.txtX.setShadow(0, 4*scale, "rgba(0,0,0,1)", false, false)
  
        gameOptions.boxPop.content.boxState.txtX.setOrigin(0.5)
  
      gameOptions.boxPop.content.boxState.txt = o.add.text(130*scale, 0, "1", { 
              
        font:'500 '+(80 * scale)+'px "강원교육튼튼"', 
    
        fontWeight:500,
        fontSize:(80 * scale), 
        
        align:"center",
        color: "rgba(0,0,0,0.8)",
      
        stroke:"rgba(0,0,0,1)",
        strokeThickness:3
      
      })
  
      gameOptions.boxPop.content.boxState.txt.setFontFamily("강원교육튼튼")
  
      gameOptions.boxPop.content.boxState.txt.setShadow(0, 4*scale, "rgba(0,0,0,1)", false, false)
      
      gameOptions.boxPop.content.boxState.txt.setOrigin(0.5)
  
      gameOptions.boxPop.content.boxState.add([gameOptions.boxPop.content.boxState.bg, gameOptions.boxPop.content.boxState.ico, gameOptions.boxPop.content.boxState.txtX, gameOptions.boxPop.content.boxState.txt])
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.boxState)
      
  
  
  
      
      gameOptions.boxPop.content.keyState = o.add.container(260*scale, 480*scale);
  
      gameOptions.boxPop.content.keyState.bg = o.add.image(0, 0, 'box-asset-box');
      gameOptions.boxPop.content.keyState.ico = o.add.image(-135*scale, 0, 'ico-key');
      gameOptions.boxPop.content.keyState.txtX = o.add.text(65*scale, -5*scale, "x ", { 
              
        font:'500 '+(80 * scale)+'px "강원교육튼튼"', 
    
        fontWeight:500,
        fontSize:(80 * scale), 
        
        align:"center",
    
        color: "rgba(0,0,0,0.8)",
      
        stroke:"rgba(0,0,0,1)",
        strokeThickness:3
  
        })
  
        gameOptions.boxPop.content.keyState.txtX.setFontFamily("강원교육튼튼")
  
        gameOptions.boxPop.content.keyState.txtX.setShadow(0, 4*scale, "rgba(0,0,0,1)", false, false)
  
        gameOptions.boxPop.content.keyState.txtX.setOrigin(0.5)
  
      gameOptions.boxPop.content.keyState.txt = o.add.text(130*scale, 0, "1", { 
              
        font:'500 '+(80 * scale)+'px "강원교육튼튼"', 
    
        fontWeight:500,
        fontSize:(80 * scale), 
        
        align:"center",
        color: "rgba(0,0,0,0.8)",
      
        stroke:"rgba(0,0,0,1)",
        strokeThickness:3
      
      })
  
      gameOptions.boxPop.content.keyState.txt.setFontFamily("강원교육튼튼")
  
      gameOptions.boxPop.content.keyState.txt.setShadow(0, 4*scale, "rgba(0,0,0,1)", false, false)
      
      gameOptions.boxPop.content.keyState.txt.setOrigin(0.5)
  
      gameOptions.boxPop.content.keyState.add([gameOptions.boxPop.content.keyState.bg, gameOptions.boxPop.content.keyState.ico, gameOptions.boxPop.content.keyState.txtX, gameOptions.boxPop.content.keyState.txt])
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.keyState)
  
      
      gameOptions.boxPop.content.botTxt = o.add.text(0, 730*scale, "2 keys will charged daily at\r\n9 a.m. UTC+9 for free.", { 
              
        font:'500 '+(48 * scale)+'px Noto Sans KR', 
    
        fontWeight:500,
        fontSize:(48 * scale), 
        
        align:"center",
        color: "rgba(255,255,255,1)"
      
      })
  
      gameOptions.boxPop.content.botTxt.setFontFamily("Noto Sans KR")
  
      gameOptions.boxPop.content.botTxt.setOrigin(0.5)
  
      gameOptions.boxPop.content.add(gameOptions.boxPop.content.botTxt)
  
  
  
  
  
    // this.load.image('box-asset-box', IMG_BASE + '/images/common/pop/box/box-asset-box.png');
    // this.load.image('btn-buy', IMG_BASE + '/images/common/pop/box/btn-buy.png');
    // this.load.image('btn-buy-tag', IMG_BASE + '/images/common/pop/box/btn-buy-tag.png');
    // this.load.image('btn-buy-tag-txt', IMG_BASE + '/images/common/pop/box/btn-buy-tag-txt.png');
    // this.load.image('btn-open', IMG_BASE + '/images/common/pop/box/btn-open.png');
    // this.load.image('ico-box', IMG_BASE + '/images/common/pop/box/ico-box.png');
    // this.load.image('ico-key', IMG_BASE + '/images/common/pop/box/ico-key.png');
    // this.load.image('pop-back', IMG_BASE + '/images/common/pop/box/pop-back.png');
  
    // this.load.image('brooch-bonus-box', IMG_BASE + '/images/common/pop/box/brooch-bonus-box.png');
  
  
  
      
    setBoxCnt();
    setKeyCnt();
  
  }
  
  
  function toggleMenu(){
  
  
  
  
  }
  
  
  
  
  function drawRouletteWheel(o) {
      if(o) {
  
      var txts = [];
      var pinPoints = [];
  
          graphics.clear();
  
          //graphics.lineColor  = "black";
          //graphics.lineWidth = 2;
  
          // set a fill and line style
  // graphics.beginFill(0xFF3300);
  //graphics.lineStyle(1, 0xffd900, 1);
  
  // draw a shape
  // graphics.moveTo(50,50);
  // graphics.lineTo(200, 50);
  // graphics.lineTo(100, 100);
  // graphics.lineTo(50, 50);
  // graphics.endFill();
  
  
  
  
    var txtSize = 50;//options.length > 6 ? 45 : 50;
  
      var od = 0;
  
      var subContainerGroup = o.add.container(0, 0);
      container.add(subContainerGroup);
  
          for(var i = 0; i < options.length; i++) {
            var angle = startAngle + options[i]['mount'];//startAngle + i * arc;
        var rank = options[i]['rank'];
  
  
            var arc = options[i]['arc'] * (Math.PI/180);
            var subContainer = o.add.container(0, 0);
            //var group = o.add.group();
            //group.depth = 5;
  
            var PartGraphics = o.add.graphics();
            PartGraphics.depth = 4;
            //console.log("angle:" + (angle-arc) + " ~ " + angle);
  
            //ctx.fillStyle = colors[i];
        if(options[i].ri_id == '0')
        {
          od = -1;
        }
  
            PartGraphics.fillStyle(getColor(od, options.length, rank), 1);
  
            PartGraphics.beginPath();
  
            PartGraphics.moveTo(gameOptions.outsideRadius * Math.cos(angle - arc), gameOptions.outsideRadius * Math.sin(angle - arc));
            PartGraphics.arc(0, 0, gameOptions.outsideRadius, angle - arc, angle, false);
  
            PartGraphics.arc(0, 0, gameOptions.insideRadius, angle, angle - arc, true);
  
          pinPoints.push([(gameOptions.outsideRadius-gameOptions.borderThickness/2) * Math.cos(angle - arc/2), (gameOptions.outsideRadius-gameOptions.borderThickness/2) * Math.sin(angle - arc/2)]);
          pinPoints.push([(gameOptions.outsideRadius-gameOptions.borderThickness/2) * Math.cos(angle), (gameOptions.outsideRadius-gameOptions.borderThickness/2) * Math.sin(angle)]);
  
            //PartGraphics.strokePath();
            PartGraphics.fillPath();
  
            subContainer.add(PartGraphics);
            subContainerGroup.add(subContainer);
  
        
  
        //drawTextAlongArc(o, options[i]['value'], 0, 0, textRadius, angle, arc);
  
        //if(options[i]['ri_id'] == 0)
        //  var txt = options[i]['value'].split("\n");
        //else
          var txt = (options[i]['value']).split("  ");
          var textRadius = gameOptions.textRadiusOrigin + txt.length * gameOptions.textLineHeight;
  
          // var labelGraphics = o.add.graphics(Math.cos(angle - arc/ 2) * textRadius, Math.sin(angle - arc/ 2) * textRadius);
          // labelGraphics.fillStyle(0x26282b, 1);
          // labelGraphics.fillRoundedRect(0,0, 100, 60, 30);
          // labelGraphics.setRotation(angle - arc / 2 + Math.PI / 2);
          // container.add(labelGraphics);
  
  
  
          if(rank != '')
          {
            // var rankImg = o.add.sprite(Math.cos(angle - arc/ 2) * textRadius, Math.sin(angle - arc/ 2) * textRadius, "label_rect");
            // var itemTxt = o.add.text(0, 0, rank + "등", { fontSize:( od == -1 ? txtSize * 2 : txtSize) * scale, color: "#ffffff", fontFamily:'cass_semiBold', fontWeight: '700', stroke:getTxtColor(od, options.length) })/*.setShadow(2, 2, "#2f1100", 2, false, true)*/;  //판넬 텍스트
            // itemTxt.setOrigin(0.5);
            // itemTxt.setPosition(Math.cos(angle - arc/ 2) * textRadius, Math.sin(angle - arc/ 2) * textRadius);
            // itemTxt.setRotation(angle - arc / 2 + Math.PI / 2);
            // itemTxt.depth = 6;
            // rankImg.setOrigin(0.5);
            // rankImg.setRotation(angle - arc / 2 + Math.PI / 2);
            // container.add(rankImg);
            // container.add(itemTxt);
            // txts.push(itemTxt);
  
            
          }
  
          textRadius -=  gameOptions.textLineHeight*1;
          
          
        for(var j = 0; j < txt.length; j++)
        {
          txt[j] = txt[j].trim(); 
  
          //원형으로 쓸때
          let stdAngle = Math.PI/40;
          let totalAngle = stdAngle * (txt[j].length - Array.from((txt[j].matchAll(/ /g))).length * 2/3 - Array.from((txt[j].matchAll(/[a-z0-9]/g))).length * 1/4);
          
          
          let txtArr = [];
          let totalWidth = 0;
  
          let mult =  Math.PI/180 / 8;
          for(var xx = 0; xx < txt[j].length; xx++)
          {
            var itemTxt = o.add.text(0, 0, txt[j][xx], { 
              
              font:'700 '+( od == -1 ? txtSize * 2 : txtSize) * scale+'px 강원교육튼튼', 
  
              fontSize:( od == -1 ? txtSize * 2 : txtSize) * scale, 
              
              color: getTxtColor(od, options.length)})/*.setShadow(2, 2, "#2f1100", 2, false, true)*/;  //판넬 텍스트
              //itemTxt.setStroke('#FFFFFF', 6); 
  
              
              itemTxt.setFontFamily("강원교육튼튼")
              itemTxt.setShadow(-1*scale, 0, "#000000", true, true)
  
            itemTxt.setOrigin(0.5);
  
            // itemTxt.setPosition(Math.cos(letterAngle) * textRadius, Math.sin(letterAngle) * textRadius);
            // itemTxt.setRotation(letterAngle + Math.PI / 2);
            txtArr.push(itemTxt);
            totalWidth+=itemTxt.displayWidth *3.5/3  * 1/scale;
              
            itemTxt.depth = 8;
            container.add(itemTxt);
            txts.push(itemTxt);
  
            //letterAngle += txt[j][xx] == ' ' ? stdAngle/3 : ((Array.from((txt[j][xx].matchAll(/[a-z0-9]/g)))).length > 0 ? stdAngle*3/4 : stdAngle);
          }
  
          totalAngle = totalWidth * mult;
          
          let letterAngle = angle - arc/ 2 - (totalAngle/2)  
  
          for(var xx = txtArr.length-1; xx >= 0; xx--)
          {
            // var itemTxt = o.add.text(0, 0, txt[j][xx], { 
              
            //   font:'700 '+( od == -1 ? txtSize * 2 : txtSize) * scale+'px 강원교육튼튼', 
  
            //   fontSize:( od == -1 ? txtSize * 2 : txtSize) * scale, 
              
            //   color: getTxtColor(od, options.length)})/*.setShadow(2, 2, "#2f1100", 2, false, true)*/;  //판넬 텍스트
            //   itemTxt.setStroke('#FFFFFF', 6); 
  
            // itemTxt.setOrigin(0.5);
            
            letterAngle += txtArr[xx].displayWidth/2 * mult * 4/3  * 1/scale;
  
            txtArr[xx].setPosition(Math.cos(letterAngle) * textRadius, Math.sin(letterAngle) * textRadius);
            txtArr[xx].setRotation(letterAngle + Math.PI / 2 + Math.PI);
  
          //   console.log(txtArr[xx].width/2 * mult)
  
            letterAngle += txtArr[xx].displayWidth/2 * mult  * 1/scale;
          }
  
  
  
          //룰렛 판 상품 글자, 일자로 쓸때
          // var itemTxt = o.add.text(0, 0, txt[j], { fontSize:( od == -1 ? txtSize * 2 : txtSize) * scale, color: getTxtColor(od, options.length), fontFamily:'강원교육튼튼', fontWeight: '700', stroke:getTxtColor(od, options.length) })/*.setShadow(2, 2, "#2f1100", 2, false, true)*/;  //판넬 텍스트
          // 	itemTxt.setOrigin(1, 0.5);
          // itemTxt.setPosition(Math.cos(angle - arc/ 2) * textRadius, Math.sin(angle - arc/ 2) * textRadius);
            //   itemTxt.setRotation(angle - arc / 2 + Math.PI / 2 - Math.PI / 2);
  
          // itemTxt.depth = 6;
          // container.add(itemTxt);
          // txts.push(itemTxt);
          textRadius -= gameOptions.textLineHeight;
        }
  
  
        // var subtext = options[i]['subtext'].split("  ");
        // for(var j = 0; j < subtext.length; j++)
        // {
        //    //룰렛 판 상품 글자
        //   var itemTxt2 = o.add.text(0, 0, subtext[j], { fontSize: txtSize * scale, color: getTxtColor(od, options.length), fontFamily:'강원교육튼튼', fontWeight: '700', stroke:getTxtColor(od, options.length) })/*.setShadow(2, 2, "#2f1100", 2, false, true)*/;  //판넬 텍스트
          // 	itemTxt2.setOrigin(0.5);
        //   itemTxt2.setPosition(Math.cos(angle - arc/ 2) * textRadius, Math.sin(angle - arc/ 2) * textRadius);
            //   itemTxt2.setRotation(angle - arc / 2 + Math.PI / 2);
        //   itemTxt2.depth = 6;
        //   container.add(itemTxt2);
        //   txts.push(itemTxt2);
        //   textRadius -= gameOptions.textLineHeight;
        // }
  
            // var img = o.add.sprite(Math.cos(angle - arc/ 2) * gameOptions.picRadius, Math.sin(angle - arc/ 2) * gameOptions.picRadius, 'item');
            // img.rotation = angle - arc / 2 + Math.PI / 2;
            // img.setOrigin(0.5);
            // img.setScale(0.1,0.1);
            // img.depth = 5;
  
            // var mask = PartGraphics.createGeometryMask();
            // img.setMask(mask);
  
            // container.add(img);
  
  
        //이미지 추가
        if(options[i]['ri_icon'])
        {
  
          var img = o.add.image(Math.cos(angle - arc/ 2) * gameOptions.picRadius, Math.sin(angle - arc/ 2) * gameOptions.picRadius, "item_icon_" + i);
  
              img.rotation = angle - arc / 2 + Math.PI / 2 + Math.PI;
              img.setOrigin(0.5);
              img.setScale(0.9 * scale,0.9 * scale);
              img.depth = 5;
  
              container.add(img);
        }
  
        od++;
  
          }
  
      eGraphics.fillStyle(0x231815, 1); //룰렛 테두리 색상
  
      eGraphics.beginPath();
  
      //tGraphics.moveTo(gameOptions.outsideRadius * Math.cos(angle - arc), gameOptions.outsideRadius * Math.sin(angle - arc));
      eGraphics.arc(0, 0, gameOptions.outsideRadius, 0, 2 * Math.PI, false);
  
      eGraphics.arc(0, 0, gameOptions.outsideRadius - gameOptions.borderThickness, 2 * Math.PI, 0, true);
  
      //PartGraphics.strokePath();
      eGraphics.fillPath();
  
      eGraphics.fillStyle(0x5277bf, 0.8);
  
      for(var k = 0; k < pinPoints.length; k++)
      {
        eGraphics.fillCircle(pinPoints[k][0], pinPoints[k][1], 5);
      }
  
      eGraphics.depth = 4;
      eGraphics.alpha = 0;
  
      //container.add(eGraphics);
  
  
      let wheel = o.add.image(0,0,"wheel_upper")
      wheel.setBlendMode(Phaser.BlendModes.SCREEN)
      container_upper.add(wheel)
      // if(options.length%2 == 1)
      // {
        container.rotation = -(360/options.length)/2 * Math.PI/180;
      // }
  
      // let grad = o.add.image(-2,5,"grad", )
      // grad.setScale(2.07);\
      // let grad = o.add.image(-2, -210, 'wheel_eff_layer1');
      // grad.setBlendMode(Phaser.BlendModes.MULTIPLY)
      // subContainerGroup.add(grad)
      let grad = o.add.image(-2*scale, 5*scale, 'gradCenter');
      grad.setBlendMode(Phaser.BlendModes.MULTIPLY)
      grad.setScale(3)
      grad.alpha = 0.1;
      subContainerGroup.add(grad)
  
      let grad2 = o.add.image(-2*scale, 5*scale, 'wheel_eff_layer2');
      grad2.setBlendMode(Phaser.BlendModes.MULTIPLY)
      subContainerGroup.add(grad2)
      // let grad3 = o.add.image(-2, 5, 'wheel_eff_layer3');
      // grad3.setBlendMode(Phaser.BlendModes.SOFT_LIGHT)
      // subContainerGroup.add(grad3)
      subContainerGroup.depth = 1;
  
  
      let angle1 = -17.5 * Math.PI/180;
      let angle2 = -101.5 * Math.PI/180;
      let angle3 = 105.5 * Math.PI/180;
      let angle4 = 153.5 * Math.PI/180;
  
      let angles = [angle1, angle2, angle3, angle4]
  
      let twinkle1 = o.add.image(wheel.width*0.93/2 * Math.cos(angle4),wheel.height*0.93/2 * Math.sin(angle4),'ring-light-twinkle');
      twinkle1.setBlendMode(Phaser.BlendModes.SCREEN)
  
      let twinkle2 = o.add.image(wheel.width*0.93/2 * Math.cos(angle4),wheel.height*0.93/2 * Math.sin(angle4),'ring-light-twinkle');
      twinkle2.setBlendMode(Phaser.BlendModes.SCREEN)
  
      container_upper.add(twinkle1)
      container_upper.add(twinkle2)
  
      let twinkleAction = function(){
  
        let randomAngle = angles[Math.floor(Math.random() * angles.length)];
  
        twinkle1.x = wheel.width*0.93/2 * Math.cos(randomAngle)
        twinkle1.y = wheel.height*0.93/2 * Math.sin(randomAngle)
        twinkle1.setScale(0);
        twinkle1.alpha = 0;
  
        o.tweens.add({
          targets:[twinkle1],
          alpha:1,
          scale:1.4,
          duration:700,
          yoyo:true,
          onComplete:function(){
  
            setTimeout(twinkleAction, 1000 * Math.random() + 150);
  
          }
  
        })
  
       
  
      }
  
      twinkleAction();
  
      let twinkleAction2 = function(){
  
        let randomAngle = angles[Math.floor(Math.random() * angles.length)];
  
        twinkle2.x = wheel.width*0.93/2 * Math.cos(randomAngle)
        twinkle2.y = wheel.height*0.93/2 * Math.sin(randomAngle)
        twinkle2.setScale(0);
        twinkle2.alpha = 0;
  
        o.tweens.add({
          targets:[twinkle2],
          alpha:1,
          scale:1.4,
          duration:700,
          yoyo:true,
          onComplete:function(){
  
            setTimeout(twinkleAction2, 1500 * Math.random() + 200);
  
          }
  
        })
  
      }
  
      twinkleAction2();
  
      }
  
    standby = true;
  
    //document.getElementById("btn").addEventListener("click", openModalAlert);
  
  
    
  
  
    //document.getElementById("btn").addEventListener("click", spin);
  }
  
  
  
  
  function initRoulette(o){
  
  
    //var shadow = o.add.ellipse(gameOptions.width/2, gameOptions.height * 0.7991, gameOptions.width * 0.484, gameOptions.height * 0.0614, 0x007acd);
    //shadow.depth = 1;
  
  
      container = o.add.container(gameOptions.width/2, gameOptions.wheelCenter);
  
    let wheel_frame = o.add.image(gameOptions.width/2,gameOptions.wheelCenter,"wheel")
  
      container_upper = o.add.container(gameOptions.width/2, gameOptions.wheelCenter);
  
  
      graphics = o.add.graphics();
    eGraphics = o.add.graphics();
  
      graphics.x = 200;
      graphics.y = 200;
  
  
  
      //var t = o.add.text(200, 450, '', { fontFamily: 'Finger Paint', fontSize: 12, color: '#5656ee' }).setShadow(2, 2, "#333333", 2, false, true);
      //var t2 = o.add.text(200, 450, '', { fontFamily: 'Finger Paint', fontSize: 12, color: '#5656ee' }).setShadow(2, 2, "#333333", 2, false, true);
  
      //var tStyle = new Phaser.TextStyle({fontFamily: 'Helvetica, Arial', FontSize: '12px', fill : 'black', fontWeight : 'bold', dropShadow : true, dropShadowColor : "rgb(220,220,220)"});
  
      //var tStyle2 = new Phaser.TextStyle({fontFamily: 'Helvetica, Arial', FontSize: '30px', fill : 'black', fontWeight : 'bold', dropShadow : false, dropShadowColor : "rgb(220,220,220)"});
  
      var angleMount = startAngle;
  
      // greenGroup = o.add.group({
          // key: 'bar',
          // repeat: 32,
          // setXY: { x: 200, y: 200 },
          // setRotation: { value: 0, step: 0.06 },
          // setScale: { x: 6 }
      // });
  
      greenGroup = o.add.group({});
  
      // greenGroup.x = 200;
      // greenGroup.y = 200;
      // greenGroup.pivot.x = 0;
      // greenGroup.pivot.y = 0;
  
      for(var i = 0; i < options.length; i++) {
          var arc = options[i]['arc'] * (Math.PI/180);
  
          angleMount += arc;
          options[i]['mount'] = angleMount-startAngle; //�ǳ� ��Ʈ�� ���� ����
          // options[i]['text'] = o.add.text(0, 0, options[i]['value'], { fontSize: 21, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);  //�ǳ� �ؽ�Ʈ
          // options[i]['text'].setOrigin(0.5);
          // options[i]['text'].depth = 6;
  
          //container.depth=5;
  
      }
  
  
      drawRouletteWheel(o);
  
          
      // resize();
      (createUI.bind(o))();
  
      
      gameState = GAME_STATE_OPEN;
  
  }
  
  function initUI(o) {
  
    tGraphics = o.add.graphics();
  
    //pointTxtBtn =  o.add.text(400, 410, standard_point + "P", { fontSize: 60, color: '#ffffff', align:'center'});//, stroke:'#000000'});  //�ǳ� �ؽ�Ʈ
    pointTxtBtn =  o.add.text(400, 410, "", { fontSize: 60, color: '#ffffff', align:'center'});//, stroke:'#000000'});  //�ǳ� �ؽ�Ʈ
    pointTxtBtn.setOrigin(0.5);
    pointTxtBtn.depth = 2;
    // pointTxtBtn.fontWeight = 'bold';
    // pointTxtBtn.stroke = '#000000';
    // pointTxtBtn.strokeThickness = 6;
    //pointTxtBtn.setStroke('#ffffff', 1);
    drawUI(o);
  }
  
  
  function preloadUI(){
    
  
    this.load.image('spin_button', IMG_BASE + '/images/spin/circle.png?v=2');
    this.load.image('spin_button_on', IMG_BASE + '/images/spin/circle.png?v=2');
    this.load.image('needle', IMG_BASE + '/images/spin/pin.png?v=4');
    this.load.image('title', IMG_BASE + '/images/common/title.png?v=3');
  
    this.load.image('start_button', IMG_BASE + '/images/spin/btn-start.png?v=2');
  
  
    
    this.load.image('ring-light-twinkle', IMG_BASE + '/images/spin/roulette-ring-light-twinkle.png');
  
    this.load.image('img-brooch', IMG_BASE + '/images/spin/img-brooch.png');
    this.load.image('gd-use-point', IMG_BASE + '/images/spin/gd-use-point.png');
    this.load.image('gd-use-result', IMG_BASE + '/images/spin/gd-use-result.png');
    this.load.image('ico-menu', IMG_BASE + '/images/spin/ico-menu.png');
    this.load.image('ico-point', IMG_BASE + '/images/spin/ico-point.png');
    this.load.image('ico-point-sm', IMG_BASE + '/images/spin/ico-point-sm.png');
    this.load.image('ico-team', IMG_BASE + '/images/spin/ico-team.png');
    this.load.image('ico-ticket', IMG_BASE + '/images/spin/ico-ticket-lg.png');
  
    this.load.image('point_postfix', IMG_BASE + '/images/spin/point_postfix.png');
  
    this.load.image('btn-close-menu', IMG_BASE + '/images/common/menu/btn-close-menu.png');
  
  
  
    
    this.load.image('ico-brooch-m', IMG_BASE + '/images/common/menu/ico-brooch-m.png?v=2');
    this.load.image('ico-chest-m', IMG_BASE + '/images/common/menu/ico-chest-m.png?v=2');
    this.load.image('ico-dailyBonus-m', IMG_BASE + '/images/common/menu/ico-dailyBonus-m.png?v=2');
    this.load.image('ico-inviteBonus-m', IMG_BASE + '/images/common/menu/ico-inviteBonus-m.png?v=2');
    this.load.image('ico-leaderBoard-m', IMG_BASE + '/images/common/menu/ico-leaderBoard-m.png?v=2');
    this.load.image('ico-logout-m', IMG_BASE + '/images/common/menu/ico-logout-m.png?v=2');
    this.load.image('ico-soundOff-m', IMG_BASE + '/images/common/menu/ico-soundOff-m.png?v=2');
    this.load.image('ico-soundOn-m', IMG_BASE + '/images/common/menu/ico-soundOn-m.png?v=2');
    this.load.image('ico-team-m', IMG_BASE + '/images/common/menu/ico-team-m.png?v=2');
    
  
  
    this.load.image('img-brooch-lv1', IMG_BASE + '/images/common/brooch/img-brooch-lv1.png');
    this.load.image('img-brooch-lv2', IMG_BASE + '/images/common/brooch/img-brooch-lv2.png');
    this.load.image('img-brooch-lv3', IMG_BASE + '/images/common/brooch/img-brooch-lv3.png');
    this.load.image('img-brooch-lv4', IMG_BASE + '/images/common/brooch/img-brooch-lv4.png');
    this.load.image('img-brooch-lv5', IMG_BASE + '/images/common/brooch/img-brooch-lv5.png');
    this.load.image('img-brooch-lv6', IMG_BASE + '/images/common/brooch/img-brooch-lv6.png');
    this.load.image('img-brooch-lv7', IMG_BASE + '/images/common/brooch/img-brooch-lv7.png');
    this.load.image('img-brooch-lv8', IMG_BASE + '/images/common/brooch/img-brooch-lv8.png');
    this.load.image('img-brooch-lv9', IMG_BASE + '/images/common/brooch/img-brooch-lv9.png');
    this.load.image('img-brooch-lv10', IMG_BASE + '/images/common/brooch/img-brooch-lv10.png');
  
  
  
    /** PRELOAD POP TITLE */
    this.load.image('title-pop-invite-exp', IMG_BASE + '/images/common/pop/title-pop-invite-exp.png');
    this.load.image('title-pop-invite-bonus', IMG_BASE + '/images/common/pop/title-pop-invite-bonus.png');
  
  
    this.load.image('title-pop-box', IMG_BASE + '/images/common/pop/title-pop-box.png');
  
    
    this.load.image('box-asset-box', IMG_BASE + '/images/common/pop/box/box-asset-box.png');
    this.load.image('btn-buy', IMG_BASE + '/images/common/pop/box/btn-buy.png');
    this.load.image('btn-buy-tag', IMG_BASE + '/images/common/pop/box/btn-buy-tag.png');
    this.load.image('btn-buy-tag-txt', IMG_BASE + '/images/common/pop/box/btn-buy-tag-txt.png');
    this.load.image('btn-open', IMG_BASE + '/images/common/pop/box/btn-open.png');
    this.load.image('ico-box', IMG_BASE + '/images/common/pop/box/ico-box.png');
    this.load.image('ico-key', IMG_BASE + '/images/common/pop/box/ico-key.png');
    this.load.image('pop-back', IMG_BASE + '/images/common/pop/box/pop-back.png');
  
    this.load.image('brooch-bonus-box', IMG_BASE + '/images/common/pop/brooch-bonus-box.png');
  
    this.load.image('btn-pop-close', IMG_BASE + '/images/common/pop/btn-pop-close.png');
  
  
    
  
    this.load.spritesheet({
      key: 'box_sheet',
      url: IMG_BASE + '/images/common/pop/box/box_sheet_sm.png?v=3',
      frameConfig: { frameWidth: 950/2*scale, frameHeight: 640/2*scale }
  });
  
  
  
  this.load.spritesheet('coin_sheet', IMG_BASE + '/images/common/pop/box/coin_sheet.png', { frameWidth: 99*scale, frameHeight: 87*scale });
  
  
    

  this.load.audio('bgm', [
    IMG_BASE + '/sounds/01_System/BGM.mp3'
  ]);

  this.load.audio('Click', [
    IMG_BASE + '/sounds/01_System/Click.v2.mp3'
  ]);

  this.load.audio('Close Window', [
    IMG_BASE + '/sounds/01_System/Close Window.mp3'
  ]);

  this.load.audio('Log_in', [
    IMG_BASE + '/sounds/01_System/Log_in.mp3'
  ]);



  
  this.load.audio('Get_Bomb', [
    IMG_BASE + '/sounds/02_Main/Get_Bomb.mp3'
  ]);

  this.load.audio('Get_Chest', [
    IMG_BASE + '/sounds/02_Main/Get_Chest.mp3'
  ]);

  this.load.audio('Get_Coin', [
    IMG_BASE + '/sounds/02_Main/Get_Coin.mp3'
  ]);

  this.load.audio('spin_6sec', [
    IMG_BASE + '/sounds/02_Main/spin_6sec.mp3'
  ]);

  this.load.audio('spin_6sec2', [
    IMG_BASE + '/sounds/02_Main/spin_6sec2.mp3'
  ]);

  this.load.audio('spin_7sec', [
    IMG_BASE + '/sounds/02_Main/spin_7sec.mp3'
  ]);

  this.load.audio('spin_9sec', [
    IMG_BASE + '/sounds/02_Main/spin_9sec.mp3'
  ]);


  this.load.audio('Get_Star', [
    IMG_BASE + '/sounds/03_Brooch/Get_Star.mp3'
  ]);


  this.load.audio('Level Up', [
    IMG_BASE + '/sounds/03_Brooch/Level Up.mp3'
  ]);

  

  this.load.audio('Buy Key', [
    IMG_BASE + '/sounds/04_Infinite Chest/Buy Key.mp3'
  ]);

  

  this.load.audio('Open', [
    IMG_BASE + '/sounds/04_Infinite Chest/Open.mp3'
  ]);
  
  
  }
  
  function createUI(){
    uiScene = this;
  initUI(this);
  
  initSounds(this);
  
  setLoginState();
  }

  function initSounds(o) {
  
  
    
  
    gameOptions.sounds['bgm'] = o.sound.add('bgm');
  
    gameOptions.sounds['Click'] = o.sound.add('Click');
  
    gameOptions.sounds['Close Window'] = o.sound.add('Close Window');
  
    gameOptions.sounds['Log_in'] = o.sound.add('Log_in');
  
  
  
    
    gameOptions.sounds['Get_Bomb'] = o.sound.add('Get_Bomb');
  
    gameOptions.sounds['Get_Chest'] = o.sound.add('Get_Chest');
  
    gameOptions.sounds['Get_Coin'] = o.sound.add('Get_Coin');
  
    gameOptions.sounds['spin_6sec'] = o.sound.add('spin_6sec');
  
    gameOptions.sounds['spin_6sec2'] = o.sound.add('spin_6sec2');
  
    gameOptions.sounds['spin_7sec'] = o.sound.add('spin_7sec');
  
    gameOptions.sounds['spin_9sec'] = o.sound.add('spin_9sec');
  
  
    gameOptions.sounds['Get_Star'] = o.sound.add('Get_Star');
  
  
    gameOptions.sounds['Level Up'] = o.sound.add('Level Up');
  
  
    gameOptions.sounds['Buy Key'] = o.sound.add('Buy Key');
  
  
    gameOptions.sounds['Open'] = o.sound.add('Open');
  
  
  
    gameOptions.sounds['bgm'].loop = true;
    
  
  $(".hidden_clicker").on("click", function(){
  
    if($("#staff_checked").prop("checked"))
    {
  
    }
    else
    {
      gameOptions.sounds['staffBtn'].play();
    }
  
  })
  
  $(".button").on("click", function(){
  
    gameOptions.sounds['userBtn'].play();
    gameOptions.sounds['showGift'].stop();
  
  })
  
  startPassiveBgm();
  
  }
  
  function startPassiveBgm(){
  
  
    gameOptions.sounds['bgm'].play({loop:true});
          
    document.addEventListener("click", ()=>{
        
        if(!gameOptions.bgmActivated)
        {
          gameOptions.bgmActivated = true;
  
            setTimeout(()=>{
  
                if(!gameOptions.sounds['bgm'].isPlaying) {
                  gameOptions.sounds['bgm'].play({loop:true});
                }
                
            },100)
  
        }
  
       
    })
  
    document.addEventListener("touchstart", ()=>{
        
        if(!gameOptions.bgmActivated)
        {
          gameOptions.bgmActivated = true;
  
            setTimeout(()=>{
  
                if(!gameOptions.sounds['bgm'].isPlaying) {
                  gameOptions.sounds['bgm'].play({loop:true});
                }
                
            },100)
  
        }
  
       
    })
  
  }
  
  
  
  
  let gameScene = {
  
      preload: function (){
            
          loadingOn();
          this.load.image("label_rect", IMG_BASE + '/images/label-rect.png?v=2');
  
          this.load.image('wheel', IMG_BASE + '/images/spin/roulette-frame.png?v=3');
          this.load.image('wheel_upper', IMG_BASE + '/images/spin/roulette-ring-light.png?v=2');
  
          this.load.image('gradCenter', IMG_BASE + '/images/spin/gradCenter.png');
          this.load.image('wheel_eff_layer2', IMG_BASE + '/images/spin/wheel_eff_layer2.png');
  
  
        
  
          this.load.image('bg', 'images/global-bg.png');
  
          this.load.image('btn-connect', 'images/btn-connect.png?v=4');
  
          (preloadUI.bind(this))();



          this.load.on('progress', (value) => {
            

            let rate = Math.floor(value * 100);
            $("#preloading .rate").html(rate + "%");
            $("#preloading .ico .cv").css("mask-size", "6em " + (6 * value).toFixed(2) + "em");
            
            if(value == 1)
            {
                $("#preloading").hide();
            }
            
        });

            
  
      },
      create: function (){
        
        gameOptions.loginStateChangeCallback = setLoginState;
  
        
        this.anims.create({
          key: 'box_open',
          frames: this.anims.generateFrameNumbers('box_sheet', { start: 5, end: 0, first: 0 }),
          frameRate: 24,
          repeat: 0,
          //repeatDelay:1000
        });
        
  
        gameOptions.bg = this.add.image(0, 0, 'bg');
        gameOptions.bg.setOrigin(0)       
  
          loadItems(this);
  
          scene = this;
  
          
      },
      update: function (){
  
          
      }
  
  }
  
  var config= {
      type: Phaser.AUTO,
      parent: 'roulette_wrap',
      width: gameOptions.width,
      height: gameOptions.height,
      scene: gameScene,
	  input:{
		mouse:{
			preventDefaultWheel:false
		},
		touch:{
			capture:false
		}
	  },
    backgroundColor: 'rgba(51,153,204,1)',
    transparent: true,
  };
  
  