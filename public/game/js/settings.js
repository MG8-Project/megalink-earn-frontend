

let scale = 0.5;//1080/1080;


let API_BASE = "https://spin-api.mega8.io";
let IMG_BASE = "";

var GameOptions = function (options){

    this.loading = false;

    this.soundOn = true;

  this.width = Math.floor(1440 * scale);
  this.height = Math.floor(2560 * scale);
  this.wheelCenter = 1220* scale;
  this.enable = true;
  this.outsideRadius = 543 * scale; //�ٱ��� ������
  this.textRadiusOrigin = 438 * scale;
  this.textLineHeight = 40 * scale;
  this.picRadius = 300 * scale;
  this.insideRadius = 0; //���ʿ� ������
  this.borderThickness = 25;
  this.spin_btn = null;
  this.needle = null;
  this.padding = 55 * scale;  
  this.roulette_canvas_object = null;
  this.ui_canvas_object = null;
  this.modal_canvas_object = null;


  this.sounds = {};

  this.loginStateChangeCallback = null;

  this.menuOpen = false;

  this.ticketCountMax = 16;

  this.userInfo = {

    userAccount:"",
    accessToken:"",
    userName:"",
    userInvCount:0,
    userPoint:0,
    userBoxCount:0,
    userKeyCount:0,
    userTicketCount:0,
    userTicketTime:0,
    userBroochStep:0,
    userBroochLevel:1,
    userBroochBonus:10,
    broochNeedPoint(){
      return (this.userBroochLevel-1) * 100 + this.userBroochStep*10 + 10;
    },
    teamCode:"",
    teamBonus(){
      return (this.teamInfo && this.teamInfo.boost) ? this.teamInfo.boost : 0;
    },
    teamInfo:{

    },
    bonusRate(){
      return ((100+this.teamBonus()+this.userBroochBonus)/100)
    }

  }

}

gameOptions = new GameOptions();