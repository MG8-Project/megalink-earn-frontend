const PAD_LEFT = 0;
const PAD_RIGHT = 0;

let modAddressSet = false;

function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


// onkeydown="return onlyNumber(event);" onkeyup="removeChar(event);"
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

function strPadding(str, pad, len, pad_style)
{
	str = str + "";

	if(str.length >= len)
		return str;

	var feed = "";

	for(var i = 0; i < len - str.length; i++)
	{
		feed += pad;
	}

	if(pad_style == PAD_LEFT)
	{
		return feed + str;
	}
	else if(pad_style == PAD_RIGHT)
	{
		return str + feed;
	}
	else
	{
		return feed + str;
	}

}

function modal_clear(o)
{
  o.find("input[type=text]").val("");
	o.find("input[type=checkbox]").each(function(){

		if($(this).attr("default-checked") == 't')
		{
			$(this).prop("checked", true);
		}
		else
		{
			$(this).prop("checked", false);
		}

	});

	o.find("select").each(function(){
			$(this).find("option:eq(0)").prop("selected", true);
	})
}

$(document).on("change", ".chkAll", function(){
	var target = $(this).attr("data-target");
	var t = $(this);

	$("."+target).prop("checked", $(this).prop("checked"));
	//$("."+target).attr("prt", $(this));

});

$(document).on("change", "input[type=checkbox]", function(){

	if($(this).hasClass($(".chkAll").attr("data-target")))
		$(".chkAll").prop("checked", false);

});


function alert_cass(msg, callback){
	$(".pop_alert_cass").find(".message").html(msg);
	$(".pop_alert_cass").modal("show");

	// $(".pop_alert_cass").off("hidden");

	if(typeof callback == 'function')
	{
		$(".pop_alert_cass").modal({
			"onHide":callback,
			"closable":false,
			"onHidden":function(){
				$("body").unbind('touchmove');
			},
		});
	} else {
		$(".pop_alert_cass").modal({
			"onHide":function(){},
			"closable":false,
			"onHidden":function(){
				$("body").unbind('touchmove');
			},
		});
	}
}


function alert_normal(msg, callback, warning){
	alert(msg)

	// $(".pop_alert").find(".message").html(msg);
	// $(".pop_alert").find(".warning").html(warning);
	// $(".pop_alert").modal("show");
	
	// // $(".pop_alert").off("hidden");

	// if(typeof callback == 'function')
	// {
	// 	$(".pop_alert").modal({
	// 		"onHide":callback,
	// 		"closable":false,
	// 		"onHidden":function(){
	// 			$("body").unbind('touchmove');
	// 		},
	// 	});
	// } else {
	// 	$(".pop_alert").modal({
	// 		"onHide":function(){},
	// 		"onHidden":function(){
	// 			$("body").unbind('touchmove');
	// 		},
	// 		"closable":false
	// 	});
	// }
}


function alert_normal2(msg, callback, warning){
	$(".pop_alert2").find(".message").html(msg);
	$(".pop_alert2").find(".warning").html(warning);
	$(".pop_alert2").modal("show");

	// $(".pop_alert").off("hidden");

	if(typeof callback == 'function')
	{
		$(".pop_alert2").modal({
			//"onHide":callback,
			"closable":false,
			"onHidden":function(){
				callback();
				$("body").unbind('touchmove');
			},
		});
	} else {
		$(".pop_alert2").modal({
			//"onHide":function(){},
			"onHidden":function(){
				$("body").unbind('touchmove');
			},
			"closable":false
		});
	}
}

/*function alert_product(rank, name, imgPath, needAddress, callback){

	$(".pop_alert_result").find(".cass-content-sub-header").html(rank);

	if(needAddress)
	{

	}
	else
	{

	}


	$(".pop_alert_result img").on("load",function(){


		$(".pop_alert_result").modal("show");

		// $(".pop_alert").off("hidden");

		if(typeof callback == 'function')
		{
			$(".pop_alert_result").modal({
				"onHide":callback
			});
		} else {
			$(".pop_alert_result").modal({
				"onHide":null
			});
		}

	})

	$(".pop_alert_result img").attr("src", imgPath);

}*/

function set_result(rank, name, subtext, imgPath, needAddress){

	$(".rank_txt").html(rank + "등");
	$(".rank_name").html(name);
	$(".rank_subtxt").html(subtext);

	$(".pop_alert_result .result_img").attr("src", imgPath);

	if(needAddress)
	{
		modAddressSet = true;
	}
	else
	{
		modAddressSet = false;
	}

}

function alert_result(callback, btn_txt){

	alert(btn_txt);
	callback();
	return;

	// $(".pop_alert").off("hidden");

	// if(btn_txt)
	// {
	// 	$(".pop_alert_result").find(".button.deny").html(btn_txt);
	// }
	// else
	// {
	// 	$(".pop_alert_result").find(".button.deny").html("확인");
	// }

	if(modAddressSet)
	{
		$(".pop_alert_result").modal({
			"onHidden":function(){alert_result2(callback)},
			"closable":false
		});
	}
	else
	{
		if(typeof callback == 'function')
		{
			$(".pop_alert_result").modal({
				"onHidden":callback,
				"closable":false
			});

		} else {

			$(".pop_alert_result").modal({
				"onHidden":function(){},
				"closable":false
			});
		}
	}

	$(".pop_alert_result").modal("show");



}


function alert_fail(msg, callback, btn_txt){

	$(".pop_alert_failure").find(".message").html(msg);
	$(".pop_alert_failure").modal("show");

	if(btn_txt)
	{
		$(".pop_alert_failure").find(".button").html(btn_txt);
	}
	else
	{
		$(".pop_alert_failure").find(".button").html("확인");
	}

	// $(".pop_alert_cass").off("hidden");

	if(typeof callback == 'function')
	{
		$(".pop_alert_failure").modal({
			"onHidden":callback,
			"closable":false
		});
	} else {
		$(".pop_alert_failure").modal({
			"onHidden":function(){},
			"closable":false
		});
	}
}

var result_callback = null;

function alert_result2(callback){

	$(".pop_alert_result_step2").modal({
		"onHide":function(){},
		"closable":false,
		"dimmerSettings": {
			closable : false,
			useCSS   : true
		}
	});

	result_callback = callback;


	$(".pop_alert_result_step2").modal("show");

}




// $(".pop_alert_result_step2").modal({
// 	"closable":false
// });


// $(".pop_alert_result").modal({
// 	"closable":false
// });


// $(".pop_alert_failure").modal({
// 	"closable":false
// });


// $(".pop_alert_result_step2").modal({
// 	"closable":false
// });

// window.ontouchstart = function(e){
// 	console.log("ontouchstart");
// }

// window.ontouchmove = function(e){
// 	console.log("ontouchmove");
// }

// window.ontouchend = function(e){
// 	console.log("ontouchend");

// }


function loadingOn(){
	gameOptions.loading = true;
	$("#loading").stop().show();//fadeIn(100);
}

function loadingOff(){
	$("#loading").stop().hide();//fadeOut(500);
	gameOptions.loading = false;
}



function setCookie(cookie_name, value, days) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + days);
	// 설정 일수만큼 현재시간에 만료값으로 지정

	var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');

	for (var i = 0; i < val.length; i++) {
	x = val[i].substr(0, val[i].indexOf('='));
	y = val[i].substr(val[i].indexOf('=') + 1);
	x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
	if (x == cookie_name) {
		return unescape(y); // unescape로 디코딩 후 값 리턴
	}
	}
}

function checkExists(callbackExists, callbackNotExists){

	loadingOn();

	let userAccount = getCookie("userAccount");

	if(!userAccount)
	{
		loadingOff();
		callbackNotExists();
		return;
	}

	XmlReq.post("/infiniteSpin/user/exists", {userAccount:userAccount}, function(){

		var result = JSON.parse(this.responseText);

		if(result.resultCode == 1)
		{
			callbackExists();
			loadingOff();
		}
		else
		{
			callbackNotExists();
			loadingOff();
		}


	})

}

function join(userAccount, userName, country, callbackSuccess, callbackFail)
{
	loadingOn();

	//let userAccount = getCookie("userAccount");

	if(!userAccount)
	{
		loadingOff();
		callbackFail();
		return;
	}


	XmlReq.post("/infiniteSpin/user/join", {userAccount:userAccount, userName:userName, userNation:country}, function(){

		var result = JSON.parse(this.responseText);

		if(result.resultCode == 1)
		{
			callbackSuccess(userAccount);
			loadingOff();
		}
		else
		{
			callbackFail(userAccount, result.msg);
			loadingOff();
		}


	})

}



function checkDup(userName, callbackDup, callbackNot){

	loadingOn();

	let userAccount = getCookie("userAccount");
	
	XmlReq.post("/infiniteSpin/user/dup", {userName:userName, userAccount:userAccount}, function(){


		var result = JSON.parse(this.responseText);

		if(result.resultCode == 1)
		{
			callbackNot();
			loadingOff();
		}
		else if(result.resultCode == 2)
		{
			callbackDup();
			loadingOff();
		}
		else
		{
			alert(result.msg);
			loadingOff();
		}




	})



}


function checkLogin(userAccount, callbackLogin, callbackIdle){

	loadingOn();

	//let userAccount = getCookie("userAccount");

	// setCookie("userAccount", null, -1);

	if(!userAccount)
	{
		
		gameOptions.userInfo.accessToken = getCookie("token");
		gameOptions.userInfo.refreshToken = getCookie("refreshToken");

		if(gameOptions.userInfo.accessToken)
		{
			getInfo(userAccount, gameOptions.userInfo.accessToken, function(){
			
				callbackLogin();
				
	
				if(gameState == GAME_STATE_OPEN && getCookie("guide-closed") !== "Y")
				{
					$(".modal-guide").addClass("shown");
				}
			
			}, callbackIdle);
		}	
		else
		{
			loadingOff();
			callbackIdle();
		}
		

	
		return;
	}


	XmlReq.post("/infiniteSpin/user/login", {userAccount:userAccount}, function(){

		var result = JSON.parse(this.responseText);

		console.log(result)

		if(result.resultCode == 1)
		{
			
			gameOptions.userInfo.accessToken = result.accessToken;
			gameOptions.userInfo.refreshToken = result.refreshToken;

					
			setCookie("token", gameOptions.userInfo.accessToken, 365);
			setCookie("refreshToken", gameOptions.userInfo.refreshToken, 365);
			
			//XmlReq.accessToken = result.accessToken;

			getInfo(userAccount, result.accessToken, callbackLogin, callbackIdle);

			if(gameState == GAME_STATE_OPEN && getCookie("guide-closed") !== "Y")
			{
				$(".modal-guide").addClass("shown");
			}

		}
		else
		{
			// alert_normal(result.msg);
			
			callbackIdle();
			loadingOff();
		}




	})

}


function getInfo(userAccount, accessToken, callbackLogin, callbackIdle) {
	
	let clearInfo = 0;
	let cleared = false;

	let checkClearInfo = function(){

		console.log("checkclear", clearInfo)

		if(clearInfo >= 5 && !cleared)
		{
			cleared = true;

			callbackLogin();
			loadingOff();
		}
	}

	
	
	 
	//내 출석정보 확인
	XmlReq.get("/infiniteSpin/attend/checkStatus", {}, function(){


		var result = JSON.parse(this.responseText);

		console.log(result)
		
		/** 
		 * todayCheck: Number(1: 오늘 출석함, 2: 출석 안함), 
		 * weekCheckList: List
		 * 
		*/



		if(result.resultCode == 1)
		{

			let todayIdx = getTodayIdx();

			if(result.todayCheck == 1)
			{
				
			}
			else
			{

			}


			result.weekCheckList.forEach(function(checkState, idx){
				

				let row = $(".daily_bonus_list li:eq("+idx+")");

				row.attr("class", checkState == 1 ? "active" : (idx == todayIdx ? "current" : "inactive"));





			})




			clearInfo++;
			checkClearInfo();
		}
		else
		{
			alert(result.msg);
			callbackIdle();
			loadingOff();
		}




	})


	//내 포인트 확인
	XmlReq.get("/infiniteSpin/point/totalPointsChk", {}, function(){


		var result = JSON.parse(this.responseText);

		console.log(result)



		/** 
		 * totalPoints
		*/

		if(result.resultCode == 1 )
		{

			gameOptions.userInfo.userPoint = result.totalPoints;

			if(gameState == GAME_STATE_OPEN) {
				setUserPoint();
				
				gameOptions.GuideUsePoint.icoP.alpha = 1;
				gameOptions.GuideUsePoint.icoB.alpha = 0;
				gameOptions.GuideUsePoint.txt.text = "";//resultPoint;
				gameOptions.GuideUsePoint.postfixP.alpha = 1;
			}

			clearInfo++;
			checkClearInfo();
		}
		else
		{
			alert(result.msg);
			callbackIdle();
			loadingOff();
		}




	})


	
	//초대정보 조회
	XmlReq.get("/infiniteSpin/game/accptInvtCnt", {}, function(){

		var result = JSON.parse(this.responseText);

		console.log(result)

		if(result.resultCode == 1 )
		{
			// gameOptions.userInfo.userName = result.userName;

			gameOptions.userInfo.userInvCount = result.invitedCnt;  //초대한 인원 수
			$(".txt-shared-state b").html(currencyFormatting(gameOptions.userInfo.userInvCount));

			clearInfo++;
			checkClearInfo();

		}
		else
		{
			alert_normal(result.msg);
			callbackIdle();
			loadingOff();
		}




	})

	
	
	//내 브로치 정보 확인
	XmlReq.get("/infiniteSpin/asset/myBrooch", {}, function(){


		var result = JSON.parse(this.responseText);

		console.log(result)

		if(result.resultCode == 1 )
		{

			gameOptions.userInfo.userBroochStep = result.brchStp;
			gameOptions.userInfo.userBroochLevel = result.brchLvl;
			gameOptions.userInfo.userBroochBonus = result.brchBns;

			setBroochStep();
			$(".brooch").attr("class", "brooch brooch-lv-" + gameOptions.userInfo.userBroochLevel)
			$(".bonus-meter").html("+" + gameOptions.userInfo.userBroochBonus + "%");
			

		if(gameState == GAME_STATE_OPEN) {
			
			gameOptions.broochMeter.txt.text = gameOptions.userInfo.userBroochBonus;
			gameOptions.broochMeter.sprite.setTexture("img-brooch-lv" + gameOptions.userInfo.userBroochLevel);

  
			gameOptions.broochMeter.txt.x = (gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth) * (-0.5 + (gameOptions.broochMeter.txt.displayWidth/(gameOptions.broochMeter.txt.displayWidth + gameOptions.broochMeter.txtTale.displayWidth))) 
			gameOptions.broochMeter.txtTale.x = gameOptions.broochMeter.txt.x + 1;
		

		}
			
			clearInfo++;
			checkClearInfo();
		}
		else
		{
			alert_normal(result.msg);
			callbackIdle();
			loadingOff();
		}




	})


	updateAssets(function(){

		clearInfo++;
		checkClearInfo();
	});

	/*
	//내 자산확인(열쇠, 상자, 티켓 갯수 등)
	XmlReq.get("/infiniteSpin/asset/myAssets", {}, function(){

		var result = JSON.parse(this.responseText);


		if(result.resultCode == 1)
		{
			gameOptions.userInfo.userName = result.userName;
			gameOptions.userInfo.userBoxCount = result.boxCnt;
			gameOptions.userInfo.userKeyCount = result.keyCnt;
			gameOptions.userInfo.userTicketCount = result.ticketCnt;
			gameOptions.userInfo.userTicketTime = result.ticketChargeTime;
			gameOptions.userInfo.teamCode = result.teamCode;
			gameOptions.userInfo.inviterUserName = result.inviterUserName;

			if(gameOptions.userInfo.inviterUserName)
			{
				$(".txt-invitee").html(gameOptions.userInfo.inviterUserName)
				$(".section-add-invitee").hide();
				$(".section-view-invitee").css("display","");
			}



			$("[name=myName]").val(gameOptions.userInfo.userName)
			$(".myUserName").html(gameOptions.userInfo.userName)

			

			if(gameOptions.userInfo.teamCode) {

				$("[name=invTeamCode]").val(gameOptions.userInfo.teamCode)
				$("[name=MyTeamCode]").val(gameOptions.userInfo.teamCode)
				$(".my-team-rank").show();
				
				XmlReq.post("/infiniteSpin/team/info", {teamCode:gameOptions.userInfo.teamCode}, function(){


					var result = JSON.parse(this.responseText);
					console.log(resul)

					if(result.resultCode == 1)
					{
						
						gameOptions.userInfo.teamInfo = result.teamInfo;

						bindTeamInfo();

						clearInfo++;
						checkClearInfo();
			
					}
					else
					{
						alert(result.msg);
						callbackIdle();
						loadingOff();
					}
			
			
			
			
				})	

			}
			else {
				
				clearInfo++;
				checkClearInfo();
			}
			
			if(gameState == GAME_STATE_OPEN) {
				setTicketCount(gameOptions.userInfo.userTicketCount);
				setTicketTimer(gameOptions.userInfo.userTicketTime/1000);


				setBoxCnt();
				setKeyCnt();

			} else {

				clearInfo++;
				checkClearInfo();

			}
			
			
		}
		else
		{
			alert(result.msg);
			callbackIdle();
			loadingOff();
		}




	})*/


}


function updateAssets(callback){

	loadingOn();

	XmlReq.get("/infiniteSpin/asset/myAssets", {}, function(){


		var result = JSON.parse(this.responseText);

		console.log(result)
		
		/** 
		 * userName
		 * keyCnt
		 * boxCnt
		 * ticketCnt
		*/


		if(result.resultCode == 1)
		{
			gameOptions.userInfo.userName = result.userName;
			gameOptions.userInfo.userBoxCount = result.boxCnt;
			gameOptions.userInfo.userKeyCount = result.keyCnt;
			gameOptions.userInfo.userTicketCount = result.ticketCnt;
			gameOptions.userInfo.userTicketTime = result.ticketChargeTime;
			gameOptions.userInfo.teamCode = result.teamCode;
			gameOptions.userInfo.inviterUserName = result.inviterUserName;

			if(gameOptions.userInfo.inviterUserName)
			{
				$(".txt-invitee").html(gameOptions.userInfo.inviterUserName)
				$(".section-add-invitee").hide();
				$(".section-view-invitee").css("display","");
			}



			$("[name=myName]").val(gameOptions.userInfo.userName)
			$(".myUserName").html(gameOptions.userInfo.userName)

			

			if(gameOptions.userInfo.teamCode) {

				$("[name=invTeamCode]").val(gameOptions.userInfo.teamCode)
				$("[name=MyTeamCode]").val(gameOptions.userInfo.teamCode)
				$(".my-team-rank").show();
				
				XmlReq.post("/infiniteSpin/team/info", {teamCode:gameOptions.userInfo.teamCode}, function(){


					var result = JSON.parse(this.responseText);
					console.log(result)

					if(result.resultCode == 1)
					{
						
						gameOptions.userInfo.teamInfo = result.teamInfo;

						bindTeamInfo();

						if(typeof callback == "function")
						{
							callback();
						}
			
					}
					else
					{
						alert(result.msg);
						callbackIdle();
						loadingOff();
					}
			
			
			
			
				})	

			}
			else {
				

				if(typeof callback == "function")
				{
					callback();
				}
			}
			
			if(gameState == GAME_STATE_OPEN) {
				setTicketCount(gameOptions.userInfo.userTicketCount);
				setTicketTimer(gameOptions.userInfo.userTicketTime/1000);


				setBoxCnt();
				setKeyCnt();

			} else {


				if(typeof callback == "function")
				{
					callback();
				}

			}
			
			
		}
		else
		{
			alert(result.msg);
			callbackIdle();
			loadingOff();
		}



	})
}

	function login(){

		
	}

  function logout(){

	setCookie("userAccount", null, -1);
	setCookie("token", null, -1);
	setCookie("refreshToken", null, -1);

	loadingOn();

	

	XmlReq.post("/infiniteSpin/user/logout", {accessToken:gameOptions.userInfo.accessToken, refreshToken:gameOptions.userInfo.refreshToken}, function(){

		var result = JSON.parse(this.responseText);

		console.log(result)

		if(result.resultCode == 1 )
		{		
			gameOptions.userInfo.userAccount = null;
			gameOptions.userInfo.accessToken = null;
			gameOptions.userInfo.userName = null;
			gameOptions.userInfo.userInvCount = null;
			

			if(gameOptions.loginStateChangeCallback)
			{
				gameOptions.loginStateChangeCallback();
			}
			
			loadingOff();
		}
		else
		{
			alert(result.msg);
			loadingOff();
		}




	})



  }



  
  function serialize(obj, prefix) {
	var str = [],
	  p;
	for (p in obj) {
	  if (obj.hasOwnProperty(p)) {
		var k = prefix ? prefix + "[" + p + "]" : p,
		  v = obj[p];
		str.push((v !== null && typeof v === "object") ?
		  serialize(v, k) :
		  encodeURIComponent(k) + "=" + encodeURIComponent(v));
	  }
	}
	return str.join("&");
 }
  

 
 function copyToClipboard(text, onPop=false, msg = 'Link has been copied') {
	const elem = document.createElement('textarea');
	let pElem;
	elem.value = text;
	if(onPop)
	{
		pElem = document.getElementById("game-popup");
	}
	else
	{
		pElem = document.body;
	}

	pElem.appendChild(elem);
	elem.select();
	document.execCommand('copy');
	pElem.removeChild(elem);
	alert(msg);
}






function openMenu(){

	if(gameOptions.menuOpen || $(".modal.shown").length > 0) return;
	
	
    if(gameOptions.sounds['Click'])
		gameOptions.sounds['Click'].play();
  
	if(gameOptions.start_btn)
		gameOptions.start_btn.removeInteractive();
  
	gameOptions.menuIco.alpha = 0;
	
	gameOptions.menuPop.visibility = true;

	gameOptions.menuOpen = true;
  
	if(gameOptions.menuTween)
	{
	  gameOptions.menuTween.stop();
	}
  
	gameOptions.menuTween = scene.tweens.add({
	  targets:[gameOptions.menuPop],
	  alpha:1,
	  ease:'Quad.easeOut',
	  duration:300,
	  onComplete:function(){
  
  
  
	  }
	})
  
  
  }
  
  function closeMenu(noSound){

	if(!gameOptions.menuOpen) return;
	
	if(!noSound && gameOptions.sounds['Close Window'])
		gameOptions.sounds['Close Window'].play();  
  
	gameOptions.menuOpen = false;
  
	if(gameOptions.menuTween)
	{
	  gameOptions.menuTween.stop();
	}
  
	
  
  
	gameOptions.menuTween = scene.tweens.add({
	  targets:[gameOptions.menuPop],
	  alpha:0,
	  ease:'Quad.easeOut',
	  duration:300,
	  onComplete:function(){
  
  
		gameOptions.menuPop.visibility = false;
		
		if(gameOptions.userInfo.userName)
			gameOptions.menuIco.alpha = 1;
  
		if(gameOptions.start_btn) {
			gameOptions.start_btn.setInteractive({cursor:'pointer'});
	  	}
  
	  }
	})
	
  }



function setIco(o, option)
{

  let menu = o.add.container(option.x * scale, option.y * scale);

  menu.sprite = o.add.image(0,0, option.sprite)
  menu.txt = 
  
  o.add.text(0, 24, option.txt, { 
              
    font:'500 '+(54 * scale)+'px Noto Sans KR', 

    fontWeight:500,
    fontSize:(54 * scale), 
    
    align:"center",

    color: "#ffffff"})

    menu.txt.setOrigin(0.5)

    menu.add([menu.sprite, menu.txt])

    
    let [w,h] = [menu.sprite.displayWidth + menu.txt.displayWidth, (menu.sprite.displayHeight + menu.txt.displayHeight) + (option.txtMarginTop ? option.txtMarginTop : 10) * scale]

    
    menu.sprite.y = -h / 2 + menu.sprite.displayHeight/2;
    menu.txt.y = h / 2 - menu.txt.displayHeight/2;


    if(option.callback)
    {

      //test
      // menu.graphics = o.add.graphics();
      // menu.graphics.fillStyle(0x000000, 0.5);
      // menu.graphics.fillRect(-w/3, -h/2, w/1.5, h); 

      // menu.add(menu.graphics)

      menu.setInteractive({hitArea:new Phaser.Geom.Rectangle(-w/3, -h/2, w/1.5, h), hitAreaCallback:Phaser.Geom.Rectangle.Contains, cursor:'pointer'});//{cursor:"pointer"})
      menu.on("pointerdown", function(){
        
		
		gameOptions.sounds['Click'].play();

        if($(".modal.shown").length > 0) return;

        if(!option.passive)
          closeMenu.bind(o)(true);

        option.callback();
  
      })
  
    }
   
    gameOptions.menuPop.contents.add(menu)

    if(option.key)
    {
      gameOptions.menuPop.contents[option.key] = menu;
    }





    

}



function setUserNameBox(userName){

  
	gameOptions.nicknameBox.txt.text = userName;
	
	gameOptions.nicknameBox.graphics.clear();
	gameOptions.nicknameBox.graphics.fillStyle(0x000000, 0.5);
	gameOptions.nicknameBox.graphics.fillRoundedRect(-gameOptions.nicknameBox.txt.displayWidth/2 - 60*scale, -57.5*scale, gameOptions.nicknameBox.txt.displayWidth + 120*scale, 115*scale, 57.5*scale); 
  
  
}

function nl2br(str)
{
    return str.replace(/\n/g, "<br />");
}

window.walert = window.alert;

window.alert = function(msg) {
	msg = msg+"";
	$(".modal-alert").find(".msg").html(nl2br(msg))
	$(".modal-alert").addClass("shown");
}



      
function connect(callback) {

	if(window.opener) {
		alert("opener")
		window.opener.getMessage("LOGIN PROCESS");
	} else if(window.parent && window.parent.getMessage) {
		
		//alert("parent")
		window.parent.getMessage("LOGIN PROCESS P");
	}

	if(gameOptions.connectLink)
	{
		window.open(gameOptions.connectLink)
		.then((res) => {
        
			setCookie("userAccount", res[0], 365);
	
			console.log('request accounts', res[0]); 
			
			loadingOff();
			
			if(gameOptions.sounds['Log_in'])
				gameOptions.sounds['Log_in'].play();
	
			checkExists(function(){
	
			  checkLogin(res[0], function(){
	
				  gameOptions.loginStateChangeCallback();
	
			  }, function(){
	
				$(".modal-country").addClass("shown");
	
			  })
	
			}, function(){
	
			  
	
			  // setCookie("userAccount", null, -1);
	
			  $(".modal-country").addClass("shown");
	
			})
	
	
		  })
		return;
	}

    // loadingOn();
	const ethereum = sdk.getProvider();
    ethereum
      .request({
        method: 'eth_requestAccounts',
        params: [],
      })
      .then((res) => {
        
        setCookie("userAccount", res[0], 365);

        console.log('request accounts', res[0]); 
        
        loadingOff();
		
		if(gameOptions.sounds['Log_in'])
			gameOptions.sounds['Log_in'].play();

        checkExists(function(){

          checkLogin(res[0], function(){

              gameOptions.loginStateChangeCallback();

          }, function(){

			$(".modal-country").addClass("shown");

          })

        }, function(){

          

          // setCookie("userAccount", null, -1);

          $(".modal-country").addClass("shown");

        })


      })
      .catch((e) => {
        
        console.log('request accounts ERR', e); 
      alert('request accounts ERR\r\n' + e.message)

      setCookie("userAccount", null, -1);
      
      loadingOff();   });
  }

  async function connect2(){
	let message = "mesasge"
	const signature = await sdk.connectAndSign({ msg: message });

	console.log(signature)
  }