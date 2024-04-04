var graphics = null;
var eGraphics = null;
var tGraphics = null;
var popGraphcs = null;
var resultText = null;
var resultImg = null;
var resultTxtImg = null;
var resultNo = null;
var greenGroup = null;
var container = null;
var container_upper = null;
var standardTime = 0;
var modalPopContainer = null;
var modalPopFailedContainer = null;
var modalPopPointAlertContainer = null;
var modalPopWarningContainer = null;
var standard_point = 100;
var pointTxtBtn = null;
var tweenTo = null;
var tweens = null;
var tweens_modal = null;
var tweens_modal_failed = null;
var tweens_modal_alert = null;
var tweens_modal_warning = null;
var tweens_rv = null;
var tweens_rv_modal = null;
var tweens_rv_modal_failed = null;
var tweens_rv_modal_alert = null;
var tweens_rv_modal_warning = null;
var item_count = 0;
var loaded_count = 0;
var modal_alert_point_txt = null;
var standby = false;
var img_alert = null;
var addr = "";
var addr_detail = "";
var zipcode = "";
var ph_phone = "";
var ph_name = "";
var send_type = 0;
var ph_id = 0;
var targetScaleModal = 1;
var remain_txt = null;
var send_enable = true;
var ending = false;

var game = null;
var autoRedo = false;

var scene = null;
var uiScene = null;

var enable2 = true;

var staff_checked = document.getElementById("staff_checked");

var GAME_STATE_COMING_SOON = 0;
var GAME_STATE_OPEN = 1;
var GAME_STATE_UNKNOWN = -1;

var gameState = GAME_STATE_UNKNOWN;


var app;
var ui;




var options = [];

var destinationAngle = 0;//360 + Math.floor((Math.random() * 5)) * 360;

var optionsMount = [

];

var startAngle = -Math.PI/2;
//var arc = 2*Math.PI / options.length; //1���� ����
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

var gc_id = 1;
var mb_point_before = 300;
var point_spent = 100;

//var ico = Phaser.Texture.fromImage('chicken.png');

//document.getElementById("spin").addEventListener("click", spin);






function openModalWarning() {

  if(tweenTo)
  {
    clearTimeout(tweenTo);
    tweenTo = null;
  }

  document.getElementById("modal").style.display = 'block';
  tweens.restart();
  tweens_modal_warning.restart();
}


function setResultImg(key, type, texture)
{
  resultImg.setTexture("result_img_" + resultNo);
  // if(resultImg.width > 150)
  // {
  //   resultImg.setSize(150/resultImg.width);
  // }

}

// function resize(){
//
//     if(window.innerWidth > window.innerHeight)
//     {
//       gameOptions.width = window.innerHeight;
//       gameOptions.height = window.innerHeight;
//     }
//     else
//     {
//       gameOptions.width = window.innerHeight;
//       gameOptions.height = window.innerHeight;
//     }
//
//     app.resize(window.innerWidth, window.innerHeight);
//     modal.resize(window.innerWidth, window.innerHeight);web
//
//     drawRouletteWheel(app);
//     drawUI(modal);
// }

!function (window, document) {

	//initRoulette();
	//drawRouletteWheel();

}(window, document);


loadingOn();

let gotState = false;
let gotLoginState = false;
let remainTime = 99999;
let fontLoaded = false;

function checkDone(){


  return gotState && gotLoginState && fontLoaded;

}

window.onload=function(){
    
    let teamCode = getParameter("un");
    let userAccount = getParameter("userAccount");

    if(teamCode)
    {
      let teamCodeAndNm = atob(teamCode).split("_");
      let ldName = teamCodeAndNm[1];
      teamCode = teamCodeAndNm[0];

        loadingOff();
        // $("#preloading .rate").html("100%");
        // $("#preloading .ico .cv").css("mask-size", "6em 6em");
        $("#preloading").hide();

        // XmlReq.post("/infiniteSpin/team/info", {teamCode:teamCode}, function(){


        //   var result = JSON.parse(this.responseText);
      
        //   if(result.resultCode == 1 || true)
        //   {
        //     $(".team-inv .inv_user_name").html(result.teamInfo.leaderUserName);
        //     $(".team-inv").show();
        //     loadingOff();
        //   }
        //   else
        //   {
        //     alert(result.msg);
        //     loadingOff();
        //   }
      
      
      
      
        // })



        //alert("팀 초대장 페이지 오픈::" + teamCode);
        $("#roulette_wrap").hide();
        $("[name=invTeamCode]").val(teamCode);
        $(".inv_user_name").html(ldName);
        $(".team-inv").show();

        
    }
    else if(userAccount)
    {
        // $("#preloading .rate").html("100%");
        // $("#preloading .ico .cv").css("mask-size", "6em 6em");
        $("#preloading").hide();
        //alert("초대장 페이지 오픈::" + userAccount);
        $("#roulette_wrap").hide();

        loadingOff();

        // XmlReq.post("/infiniteSpin/user/invInfo", {userAccount:userAccount}, function(){


        //   var result = JSON.parse(this.responseText);
      
        //   if(result.resultCode == 1)
        //   {
            
            
        //     loadingOff();
      
        //   }
        //   else
        //   {
        //     alert(result.msg);
        //     loadingOff();
        //   }
      
      
      
      
        // })


        $(".inv_user_name").html(userAccount)
        $(".user-inv").show();
    }
    else
    {

      

        getEventState();


        checkLogin(null, function(){

          gotLoginState = true;

          if(checkDone())
          {
            loadScene();
          }



        }, function(){

          gotLoginState = true;

          if(checkDone())
          {
            loadScene();
          }

        })


        WebFont.load({
          google: {
            families: ['Noto Sans KR:400,500,600,700,800,900']
          },
           custom: {
             families: ['강원교육튼튼']
           },
           active:function(e){


              fontLoaded = true;
              
              if(checkDone())
              {
                loadScene();
              }
   
               
           },
           fontactive :function(e){
              

            
           }
         });
    }

    $(document).on("click", ".modal .btn-close", function(e){
        e.preventDefault();

        if(gameOptions.sounds['Close Window'])
          gameOptions.sounds['Close Window'].play();

        $(this).closest(".modal").removeClass("shown");

    })

    $(document).on("click", ".daily_bonus_list .current .status", function(e){

      
      e.preventDefault();

      gameOptions.sounds['Click'].play();

      loadingOn();

      XmlReq.post("/infiniteSpin/attend/check", {}, function(){


        var result = JSON.parse(this.responseText);

        if(result.resultCode == 1)
        {
          loadingOff();

          $(".daily_bonus_list .current").removeClass("current").addClass("active")

          updateAssets();
        }
        else
        {
          alert(result.msg);
          loadingOff();
        }




      })


    })

    $(".btn-share").on("click", function(e){

      gameOptions.sounds['Click'].play();

      e.preventDefault();
      
      copyToClipboard(location.origin + location.pathname + "?userAccount=" + encodeURIComponent($("[name=myName]").val()), false, "Link has been copied.");


    })

    $(".btn-copy-team-inv").on("click", function(e){
      e.preventDefault();

      if(gameOptions.sounds['Click'])
        gameOptions.sounds['Click'].play();
      
      copyToClipboard($("[name=invTeamCode]").val(), false, "Team Code has been copied");

    })

    $(".btn-play").on("click", function(e){
      e.preventDefault();

      if(gameOptions.sounds['Click'])
        gameOptions.sounds['Click'].play();
      
      location.href = location.origin;// + location.pathname;

    })

    $(".btn-copy-username-inv").on("click", function(e){

      e.preventDefault();

      if(gameOptions.sounds['Click'])
        gameOptions.sounds['Click'].play();
      
      copyToClipboard($(".inv_user_name").html(), false, "User name been copied.");

    })


    $(".btn-copy-team").on("click", function(e){
      e.preventDefault();
      gameOptions.sounds['Click'].play();
      
      copyToClipboard($("[name=MyTeamCode]").val(), false, "Team Code has been copied");

    })

    $(".btn-share-team").on("click", function(e){
      e.preventDefault();
      gameOptions.sounds['Click'].play();
      
      copyToClipboard(location.origin + location.pathname + "?un=" + encodeURIComponent(btoa($("[name=MyTeamCode]").val() + "_" + gameOptions.userInfo.teamInfo.leaderUserName).replace(/[\=]+/, "")), false, "Share link has been copied");


    })

    //팀 가입 호출
    $(".btn-join-in").on("click", function(e){
      e.preventDefault();
      gameOptions.sounds['Click'].play();

      $(".team-member-list").not(":eq(0)").show();

      let teamCode = $("[name=teamCode]").val() 

      if(!teamCode)
      {
        alert("Enter team code");
        return;
      }
      else if(teamCode.length > 8 || (/[^0-9]+/).test(teamCode))
      {
        alert("Invalid team code");
        return;
      }

      loadingOn();

      


      XmlReq.post("/infiniteSpin/team/joinTeam", {teamCode:teamCode}, function(){


        var result = JSON.parse(this.responseText);
    
        if(result.resultCode == 1 || true)
        {
          
          gameOptions.userInfo.teamCode = teamCode;
          
          XmlReq.post("/infiniteSpin/team/info", {teamCode:gameOptions.userInfo.teamCode}, function(){


						var result = JSON.parse(this.responseText);
				
						if(result.resultCode == 1 || true)
						{
							
							gameOptions.userInfo.teamInfo = result.teamInfo;

							bindTeamInfo();
							loadingOff();
          
              $(".my-team-rank").show();
              $(".modal-team").removeClass("shown");
              $(".modal-team-has").addClass("shown");
				
						}
						else
						{
							alert(result.msg);
							callbackIdle();
							loadingOff();
						}
				
				
				
				
					})	


          $("[name=MyTeamCode]").val(teamCode);
          
        }
        else
        {
          alert(result.msg);
          loadingOff();
        }
    
    
    
    
      })


    })

    //팀 생성 호출
    $(".btn-create-team").on("click", function(e){
      e.preventDefault();

      gameOptions.sounds['Click'].play();

      if(gameOptions.userInfo.userPoint < 1000)
      {
          alert("Not enough points.");
          return;
      }

      loadingOn();



      XmlReq.post("/infiniteSpin/team/makeTeam", {}, function(){


        var result = JSON.parse(this.responseText);
    
        console.log(result)

        if(result.resultCode == 1 || true)
        {
          
          
          gameOptions.userInfo.teamCode = result.teamCode;

          $("[name=MyTeamCode]").val(gameOptions.userInfo.teamCode);
          
          XmlReq.post("/infiniteSpin/team/info", {teamCode:gameOptions.userInfo.teamCode}, function(){


						var result = JSON.parse(this.responseText);
            
            console.log(result)
            
						if(result.resultCode == 1)
						{
							
							gameOptions.userInfo.teamInfo = result.teamInfo;

							bindTeamInfo();
							loadingOff();
          
              $(".my-team-rank").show();
              $(".modal-team").removeClass("shown");
              $(".modal-team-has").addClass("shown");
				
						}
						else
						{
							alert(result.msg);
							callbackIdle();
							loadingOff();
						}
				
				
				
				
					})	

          //$(".team-member-list ul li").not(":eq(0)").hide();

        }
        else
        {
          alert(result.msg);
          loadingOff();
        }
    
    
    
    
      })


      // $(".team-member-list ul li").not(":eq(0)").hide();

      // setTimeout(function(){

      //   loadingOff();

      //   $(".my-team-rank").show();
      //   $(".modal-team").removeClass("shown");
      //   $(".modal-team-has").addClass("shown");

      // }, 1000)
    })

    const swiper = new Swiper('.swiper-1', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
      
        // If we need pagination
        pagination: {
          el: '.pagination-1',
          clickable: true,
        },
      
        // Navigation arrows
        navigation: false,
      
        // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      });

      swiper.on('slideChange', function (o) {
        
        if(o.activeIndex == 0) {
            $(".modal-invite .pop-head img").attr("src", "images/common/pop/title-pop-invite-exp.png")
        } else {
            $(".modal-invite .pop-head img").attr("src", "images/common/pop/title-pop-invite-bonus.png")
        }

      });

      
    const swiper2 = new Swiper('.swiper-2', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
    
      // If we need pagination
      pagination: {
        el: '.pagination-2',
        clickable: true,
      },
    
      // Navigation arrows
      navigation: false,
    
      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });

    swiper2.on('slideChange', function (o) {
      
      if(o.activeIndex == 0) {
          $(".modal-invite .pop-head img").attr("src", "images/common/pop/title-pop-invite-exp.png")
      } else {
          $(".modal-invite .pop-head img").attr("src", "images/common/pop/title-pop-invite-bonus.png")
      }

    });


      $(".btn-invitee-in").on("click", function(){
        
        loadingOn();
        gameOptions.sounds['Click'].play();
  
        if(!$("[name=invitee]").val())
        {
            alert("Enter the inviter’s username.");
            loadingOff();
            return;
        }

        console.log(JSON.stringify({userAccount:gameOptions.userInfo.userAccount, inviterUserName:$("[name=invitee]").val()}))

        XmlReq.post("/infiniteSpin/user/inviter", {userAccount:gameOptions.userInfo.userAccount, inviterUserName:$("[name=invitee]").val()}, function(){

          
          var result = JSON.parse(this.responseText);
          
          console.log(result)

          if(result.resultCode == 1)
          {
            
            $(".txt-invitee").html($("[name=invitee]").val())
            $(".section-add-invitee").hide();
            $(".section-view-invitee").css("display","");

            loadingOff();
          }
          else
          {
            alert(result.msg);
            loadingOff();
          }
      
      
      
      
        })


        // loadingOff();


      })


      $('.tab-head li').on("click", function(){

        let tab = $(this).closest(".pop-body");


        if($(this).hasClass("on")) return;

        tab.find(".tab-head li.on").removeClass("on")

        $(this).addClass("on")


        tab.find(".tab-head ul").children().each(function(idx){

          
          if($(this).hasClass("on"))
          {
            tab.find(".tab-contents .tab-content.active").removeClass("active");
            tab.find(".tab-contents .tab-content:eq("+idx+")").addClass("active");
          }

        })



      })


      $(".btn-dsa").on("click", function(){
        
        loadingOn();
        gameOptions.sounds['Click'].play();
        
        setCookie("guide-closed", "Y", 365)
        loadingOff();

        $(".modal-guide").removeClass("shown");

      })
      

      $(".brooch .img").on("animationend", function(event){

          $(this).removeClass("up");

      });

      $(".brooch .bonus-meter").on("animationend", function(event){

          $(this).removeClass("up");

      });


      gameOptions.broochEnabled = true;

      $(".btn-buy-brooch-step").on("click", function(event){
        event.preventDefault();

        buyStep();
        gameOptions.sounds['Click'].play();
      })
      
      $(".modal-country .nation_list li").on("click", function(event){
        gameOptions.sounds['Click'].play();


        $(".modal-country .nation_list li.on").removeClass("on");

        $(this).addClass("on");

        $(".nation-box").html($(".modal-country .nation_list li.on").attr("data-nation"));


      })

      $(".btn-select-nation").on("click", function(event){
        gameOptions.sounds['Click'].play();

        event.preventDefault();
        $(".modal-country").removeClass("shown");
        $(".modal-sign-in").addClass("shown");

      })

      $(".modal-sign-in .btn-close").on("click", function(event){
        gameOptions.sounds['Close Window'].play();

        $(".modal-country").addClass("shown");

      })
      
      $(".btn-sign-in").on("click", function(event) {
        gameOptions.sounds['Click'].play();
        
        let userName = $("[name=joinUserName]").val();
        let nation = $(".nation_list li.on").attr("data-key");

        if(!userName)
        {
          alert("Enter your name.");
          return;

        }

        checkDup(userName, function(){
          
          $(".txt-join-warning").html("Name you entered is already exists.")

        }, function(){

          let userAccount = getCookie("userAccount");
          gameOptions.userInfo.userAccount = "";
          
          console.log(userAccount)
          
          join(userAccount, userName, nation, function(userAccount){

            checkLogin(userAccount, function(){
			  
				setCookie("userAccount", '', -1);

              gameOptions.loginStateChangeCallback();
              
              $(".modal-sign-in").removeClass("shown")

            }, function(msg){

              $(".txt-join-warning").html(msg ? msg : "Failed to login.\r\nPlease try again later.")
              $(".txt-join-warning").show();
              
            });

          }, function(userAccount, msg){

            $(".txt-join-warning").html(msg ? msg : "Failed to join.\r\nPlease try again later.")
            $(".txt-join-warning").show();

          });

        })
        
        event.preventDefault();

        
        
      })
}

function getEventState(){

    XmlReq.get("/infiniteSpin/game/leftTimeToStrt", {coming:getParameter("coming")}, function(){
        console.log(this.responseText)
        var result = JSON.parse(this.responseText);

        remainTime = result.remainTime;

        gotState = true;

        if(checkDone())
        {
            loadScene();
        }

        


    })
}

function loadScene(){


    if(remainTime > 0)
    {
        loadIntro();
    }
    else
    {
        loadGame();
    }
}

function loadIntro(){

    app = new Phaser.Game(configIntro)

}

function loadGame(){

    
    //loadingOff();
    app = new Phaser.Game(config);

}

function bindTeamInfo(){

  if(!gameOptions.userInfo.teamInfo || !gameOptions.userInfo.teamInfo.leaderUserName) return;

  if(gameOptions.teamMeter) {

    gameOptions.teamMeter.txt.text = gameOptions.userInfo.teamInfo.boost
    gameOptions.teamMeter.txt.x = (gameOptions.teamMeter.txt.displayWidth + gameOptions.teamMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.teamMeter.txt.displayWidth/(gameOptions.teamMeter.txt.displayWidth + gameOptions.teamMeter.txtTale.displayWidth))) 
    gameOptions.teamMeter.txtTale.x = gameOptions.teamMeter.txt.x + 1;

  }


    $(".txt-team-state b").html(gameOptions.userInfo.teamInfo.members.length);


    //팀원 리스트 반영
    $(".team-member-list ul").empty();
    gameOptions.userInfo.teamInfo.members.forEach(function(rankInfo, idx){

      let item = '<li><span class="userNation natoin-'+rankInfo.userNation+'"></span><span class="userRank"></span><span class="userName">'+rankInfo.userName+'</span> <span class="score">'+mkUnitNumber(rankInfo.point)+'</span></li>';

      $(".team-member-list ul").append(item)

    })

    $(".my-team-rank .userRank").html(gameOptions.userInfo.teamInfo.rnk);
    $(".myTeamName").html(gameOptions.userInfo.teamInfo.leaderUserName + "'s Team");

}


function resize()
{
  let canvasList = document.querySelectorAll("canvas");
  let w1 = window.innerWidth-13;
  let h1 = window.innerHeight;
  let w = Math.min(w1*0.80, 800);
  let idx = 0;
  console.log(w1);

  canvasList.forEach(function(canvas){
    let _w = (idx < 2) ? w : w1;
    //canvas.width = window.innerWidth * 0.75;
    canvas.style.width= _w + "px";
    //canvas.height =  canvas.width * 848/800;
    if(idx < 2)
    {
      canvas.style.height =  _w  + "px";
    }
    else
    {
      canvas.style.width= w1 + "px";
      canvas.style.height = h1 + "px";
    }

    console.log("canse width : " + canvas.style.width);

    idx++;
  })
}


function disableInteractive() {
  console.log("disableInteractive")
  // gameOptions.spin_btn.removeInteractive();
  gameOptions.start_btn.removeInteractive();
}

function enableInteractive() {
  console.log("enableInteractive")
  // gameOptions.spin_btn.setInteractive({cursor:'pointer'});
  gameOptions.start_btn.setInteractive({cursor:'pointer'});
}



window.onresize = resizeAction

  function resizeAction(){

    let rate = window.innerWidth / window.innerHeight;
    let stdRate = gameOptions.width / gameOptions.height;
    
    if(rate < stdRate) //세로가 더 김
    {
        let w = Math.min(window.innerWidth, 1080);
        $(".ui.modal.pop_alert_result .rank_name").css({"font-size":w * 0.06 + "px", "margin-top":-w * 0.09 + "px"});
        $(".ui.modal.pop_alert_result .rank_subtxt").css("font-size", w * 0.042 + "px");

        $("#ending .content p").css("font-size", w * 0.066 + "px");
        $("#ending .content span").css("font-size", w * 0.042 + "px");

        $(".staff_checked").css({"padding":w * 0.0055 + "px", "border-width":w * 0.0055 + "px"});
    }
    else
    {
      let hRate = 1080/1886;
      let h = Math.min(window.innerHeight, 1886);
      $(".ui.modal.pop_alert_result .rank_name").css({"font-size":h * 0.06 * hRate  + "px", "margin-top":-h * 0.09 * hRate + "px"});
      $(".ui.modal.pop_alert_result .rank_subtxt").css("font-size", h * 0.042 * hRate + "px");

      $("#ending .content p").css("font-size", h * 0.066 * hRate + "px");
      $("#ending .content span").css("font-size", h * 0.042 * hRate + "px");

      $(".staff_checked").css({"padding":h * 0.0055 * hRate + "px", "border-width":h * 0.0055 * hRate + "px"});
    }

  }

  function buyStep(){

    if(!gameOptions.broochEnabled) 
    {
      return;
    }

    if(gameOptions.userInfo.userBroochLevel >= 10)
    {

      return;
    }

    gameOptions.broochEnabled = false;


    let neededPoint = gameOptions.userInfo.broochNeedPoint();

    if(gameOptions.userInfo.userPoint < neededPoint)
    {
      gameOptions.broochEnabled = true;
      
      alert("Not enough points.");//\r\n(More points of "+(neededPoint - gameOptions.userInfo.userPoint)+" points is needed.)");
      return;
    }


    loadingOn();

    XmlReq.post("/infiniteSpin/asset/buyStar", {}, function(){


      var result = JSON.parse(this.responseText);
      
      console.log(result)

      if(result.resultCode == 1 || true)
      {
        


        loadingOff();

            
        
        setTimeout(function(){

          gameOptions.sounds['Get_Star'].play();

        }, 300)
        


        //gameOptions.userInfo.userPoint -= neededPoint;
        gameOptions.userInfo.userPoint = result.point;
        setUserPoint();

        //브로치 별 구매 
        

        gameOptions.userInfo.userBroochStep += 1;

        let prevLv = gameOptions.userInfo.userBroochLevel;

        // gameOptions.userInfo.userBroochStep = result.brchStp;
        gameOptions.userInfo.userBroochBonus = result.broochBonus;

        if(gameState == GAME_STATE_OPEN) {
          
          gameOptions.broochMeter.txt.text = gameOptions.userInfo.userBroochBonus;
          
          gameOptions.broochMeter.txt.x = (gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.broochMeter.txt.displayWidth/(gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth))) 
          gameOptions.broochMeter.txtTale.x = gameOptions.broochMeter.txt.x + 1;
      
          
          $(".bonus-meter").html("+" + gameOptions.userInfo.userBroochBonus + "%");
          

        }
        gameOptions.userInfo.userBroochLevel = result.broochLevel;
      
        if(prevLv != gameOptions.userInfo.userBroochLevel)//gameOptions.userInfo.userBroochStep >= 10)
        {

          if(gameOptions.userInfo.userBroochLevel >= 10)
          {
            $(".btn-buy-brooch-step").addClass("disabled");
          }
          

          //let prevLv = gameOptions.userInfo.userBroochLevel;
          
          setBroochStep();

          setTimeout(function(){

            $(".brooch-box-stars").find(".stars li").addClass("up");

            gameOptions.sounds['Level Up'].play();

            setTimeout(function(){

              $(".brooch-box-stars").find(".stars li").removeClass("up")

              //gameOptions.userInfo.userBroochLevel+= Math.floor(gameOptions.userInfo.userBroochStep/10);
              
              gameOptions.userInfo.userBroochStep -= Math.floor(gameOptions.userInfo.userBroochStep/10)*10;


              $(".brooch .img").addClass("up");

              //$(".brooch").removeClass("brooch-lv-" + prevLv)
              $(".brooch").addClass("brooch-lv-" + gameOptions.userInfo.userBroochLevel)
              $(".brooch").attr("class", "brooch brooch-lv-" + gameOptions.userInfo.userBroochLevel)
              gameOptions.broochMeter.sprite.setTexture("img-brooch-lv" + gameOptions.userInfo.userBroochLevel);
              gameOptions.broochMeter.txt.text = gameOptions.userInfo.userBroochBonus;

              
          
              gameOptions.broochMeter.txt.x = (gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.broochMeter.txt.displayWidth/(gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth))) 
              gameOptions.broochMeter.txtTale.x = gameOptions.broochMeter.txt.x + 1;
          
          


              $(".bonus-meter").html("+" + gameOptions.userInfo.userBroochBonus + "%");
              $(".bonus-meter").addClass("up");

              setBroochStep();

              gameOptions.broochEnabled = true;

            }, 600)

          }, 600)


          

        }
        else
        {
          $(".brooch-box-stars").find(".stars li").addClass("pending");
          gameOptions.broochEnabled = true;
          setBroochStep();
        }
        
      }
      else
      {
        alert(result.msg);
        loadingOff();
      }
  
  
  
  
    })



  }

  function setBroochStep(){

    
    $(".brooch-box-stars").find(".stars li").each(function(idx){
      
      let _this = this;
      setTimeout(function(){
        $(_this).removeClass("pending");

        if(idx < gameOptions.userInfo.userBroochStep)
        {
          $(_this).addClass("on");
        }
        else
        {
          $(_this).removeClass("on");
        }

      }, 0)

        
      

    })

    $(".brooch-box-stars .btn-buy-brooch-step span").html(gameOptions.userInfo.broochNeedPoint() + "P");

  }

  resizeAction();