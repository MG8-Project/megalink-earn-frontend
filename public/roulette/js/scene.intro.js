
function setLoginStateIntro() {

    if(gameOptions.userInfo.accessToken)
    {
        // gameOptions.btnConnect.alpha = 0;
        $(".btn-connect").hide();

      
        gameOptions.nicknameBox.alpha = 1;
  
        setUserNameBox(gameOptions.userInfo.userName); 

        gameOptions.menuIco.alpha = 1;

        

            

    }
    else
    {
        //gameOptions.btnConnect.alpha = 1;
        $(".btn-connect").show();

        gameOptions.nicknameBox.alpha = 0;

        gameOptions.menuIco.alpha = 0;
    }

}

var configTitle = {
    key: 'title',
    x: gameOptions.width/2,
    y: (gameOptions.height * 0.125),
    scale: { x: 1, y: 1 },
    origin: { x:0.5, y:0.322}
  };

let introScene = {

    preload: function (){

            this.load.setBaseURL(IMG_BASE);

            this.load.image('bg', 'images/global-bg.png');

            this.load.image('title', 'images/common/title.png?v=4');

            this.load.image('comingsoon', 'images/intro/img-cs.png?v=4');

            // this.load.image('btn-connect', 'images/btn-connect.png?v=4');

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

                  
                    
            this.load.audio('Click', [
                IMG_BASE + '/sounds/01_System/Click.v2.mp3'
            ]);

            this.load.audio('Close Window', [
                IMG_BASE + '/sounds/01_System/Close Window.mp3'
            ]);

            this.load.audio('Log_in', [
                IMG_BASE + '/sounds/01_System/Log_in.mp3'
            ]);


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

        
      
        gameOptions.loginStateChangeCallback = setLoginStateIntro;


        scene = this;
        
        
        gameOptions.bg = this.add.image(0, 0, 'bg');
        gameOptions.bg.setOrigin(0)

        gameOptions.title = this.make.sprite(configTitle);
        gameOptions.title.blendMode = 'SCREEN';

        gameOptions.cs = this.add.image(gameOptions.width/2, gameOptions.height * 1148/2560, 'comingsoon');


        let graphics = this.add.graphics();
        
        let startTimeTxt = this.add.text(gameOptions.width/2, gameOptions.height * 1546/2560, "2024-00-00 00:00 ~ \r\n2024-00-00 00:00 UTC+9", { 
            
            font:'600 '+(60 * scale)+'px "Noto Sans KR"', 

            fontSize:(60 * scale), 

            fontFamily:"Noto Sans KR",
            
            align:"center",

            color: "#ffffff"})

        startTimeTxt.setOrigin(0.5)
        startTimeTxt.setFontFamily("Noto Sans KR")


        
        graphics.fillStyle(0x000000, 1);

        graphics.fillRoundedRect(startTimeTxt.x - startTimeTxt.displayWidth/2 - 60 * scale, startTimeTxt.y - startTimeTxt.displayHeight/2 - 60 * scale, startTimeTxt.displayWidth + 120 * scale, startTimeTxt.displayHeight + 120 * scale, 32 * scale); 

            

        // gameOptions.btnConnect = this.add.image(gameOptions.width/2, gameOptions.height * 2083/2560, 'btn-connect');
        // gameOptions.btnConnect.setInteractive({cursor:'pointer'});    
        // gameOptions.btnConnect.on("pointerdown",function(){

        //       connect();

        // })

        // gameOptions.btnConnect.on("pointerup",function(){

        //     // alert("커넥트up");
        // })

        








                

        gameOptions.nicknameBox = this.add.container(gameOptions.width/2, gameOptions.height * 2104/2560);
        gameOptions.nicknameBox.alpha = 0;
        // gameOptions.pointMeter.x = gameOptions.padding
        // gameOptions.pointMeter.y = gameOptions.padding


        
        gameOptions.nicknameBox.txt = this.add.text(0,0, "", { 
                    
            font:'400 '+(60 * scale)+'px Noto Sans KR', 

            fontSize:(60 * scale), 
            
            align:"center",

            color: "#ffffff"})

            gameOptions.nicknameBox.txt.setFontFamily("Noto Sans KR")

            gameOptions.nicknameBox.txt.setOrigin(0.5, 0.5)  

            gameOptions.nicknameBox.graphics = this.add.graphics();
            
            gameOptions.nicknameBox.add([gameOptions.nicknameBox.graphics, gameOptions.nicknameBox.txt])

            setUserNameBox("carrieverse1152")


            gameOptions.menuIco = this.add.container(gameOptions.width - gameOptions.padding - (120 * scale), gameOptions.padding);
            gameOptions.menuIco.alpha = 0;

            gameOptions.menuIco.graphics = this.add.graphics();
            gameOptions.menuIco.graphics.fillStyle(0x000000, 0.5);
            gameOptions.menuIco.graphics.fillRoundedRect(0, 0, 120 * scale, 120 * scale, 25 * scale); 
            
            gameOptions.menuIco.ico = this.add.image(60*scale, 60*scale, "ico-menu")

            gameOptions.menuIco.add([gameOptions.menuIco.graphics, gameOptions.menuIco.ico])

            gameOptions.menuIco.setInteractive({hitArea:new Phaser.Geom.Rectangle(0, 0, 120 * scale, 120 * scale), hitAreaCallback:Phaser.Geom.Rectangle.Contains, cursor:"pointer"});
            gameOptions.menuIco.on("pointerup", function(){


            openMenu.bind(this)();
            
            })


            drawUIIconsIntro(this);

            
            setLoginStateIntro();

            initSoundsIntro(this)

            
            gameState = GAME_STATE_COMING_SOON;
            
    },
    update: function (){

        
    }

}


function initSoundsIntro(o) {

  
    gameOptions.sounds['Click'] = o.sound.add('Click');

    gameOptions.sounds['Close Window'] = o.sound.add('Close Window');
  
    gameOptions.sounds['Log_in'] = o.sound.add('Log_in');
  
  
  
}

function drawUIIconsIntro(o){

  
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
        sprite:"ico-inviteBonus-m",
        txt:"Invite\r\nBonus",
        callback:function(){
          $(".modal-invite").addClass("shown");
        },
        x:gameOptions.width*(1/scale)/2 - 363,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:35
      })
  
  
  
      setIco(o, {
        key:'btnSoundToggle',
        sprite:"ico-soundOn-m",
        txt:"Sound Off",
        callback:function(){
          //alert("daily bonus")
          soundToggle();
        },
        x:gameOptions.width*(1/scale)/2,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:45,
        passive:true
      })
  
  
  
  
      setIco(o, {
        sprite:"ico-logout-m",
        txt:"Logout",
        callback:function(){
          
            logout();
        },
        x:gameOptions.width*(1/scale)/2 + 363,
        y:gameOptions.height*(1/scale)/2,
        txtMarginTop:40,
        passive:false
      })
  
  
      
  
  
  }



var configIntro = {
    type: Phaser.AUTO,
    parent: 'roulette_wrap',
    width: gameOptions.width,
    height: gameOptions.height,
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 200 }
    //     }
    // },
    scene: introScene,
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