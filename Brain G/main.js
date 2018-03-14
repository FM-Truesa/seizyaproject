// - global -------------------------------------------------------------------
var screenCanvas, info;
var screenCanvas, info_2;
var run = true;
var fps = 100 / 100;
var mouse = new Point();
/**@type{CanvasRenderingContext2D} */
var ctx;
var fire = false;
var counter = 0;
var SHOT_counter = 0;
var /*SHOT_*/ bosscounter = 0;
//var chara;
var IsSlow = false;
var IsCheating = false;
var Arecheating = false;
var Wascheating = false;
var waschea = false;
var Key = 0;
var Music = false;
var point = 0;
var invincible = false;
//count-------------------------------------------
var bossSABcounter = 0;
var bossSABa = false;
var bossSABb = false;
var bossSABc = false;
//operation---------------------------------------
var up = 0;
var down = 0;
var right = 0;
var left = 0;
var key7 = false;
var key1 = false;
// - const --------------------------------------------------------------------
//Chara
var CHARA_COLOR = 'rgba(0,0,0,1)';
var CHARA_SHOT_COLOR = 'rgba(255,255,255, 1)';
var life = 5;
var CHARA_SHOT_MAX_COUNT = 10000;
var Kakusan = false;
var Syuugou = false;
var rightshot = 0;
var leftshot = 0;
var Nfrontshot = 0;
var Nbehindshot = 0;
var Nrightshot = 0;
var Nleftshot = 0;
var JIKIshotpar = 15;
var charaShot_speed = 5;
var SAB2 = undefined;
var ope_turn = false;
//Enemy
var ENEMY_COLOR = 'rgba(10, 100, 230, 0.6)';
var ENEMY_SHOT_COLOR = 'rgba(0, 50, 255, 1)';
var ENEMY_SHOT_MAX_COUNT = 1000;
var ENEMY_MAX_COUNT = 100;
//Boss
var BOSS_COLOR = 'rgba(35, 71, 130,0.8)';
var BOSS_SHOT_COLOR = 'rgba(255,255,0,1)';
var BOSS_HP = 400;
var BOSS_SABHP = 4;
var BOSS_MAX_COUNT = 2;
var BOSS_SHOT_MAX_COUNT = 10000;
var BOSS_COUNTER = "妖狐";
//BossSAB
var BOSSSAB_MAX_COUNT = 2;
var BOSSSAB_COLOR = 'rgba(35, 71, 160,0.8)';

var JIKI_OKURETERU = {
  x: undefined,
  y: undefined
};
// - main ---------------------------------------------------------------------
window.onload = function () {
  var img = new Image();
  img.src = "back9.bmp";
  var i, j;
  var p = new Point(); {
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 1364;
    screenCanvas.height = 630;
    ctx = screenCanvas.getContext('2d');
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    screenCanvas.addEventListener('mouseup', mouseUp, true);
    document.addEventListener('keydown', keyDown, true);
    document.addEventListener('keyup', keyUp, true);
    info = document.getElementById('info');
    info_2 = document.getElementById('info_2');
  }
  // - ショット用インスタンス-------------------------------
  var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
  for (i = 0; i < charaShot.length; i++)
    charaShot[i] = new CharaShot();
  var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
  for (i = 0; i < enemyShot.length; i++)
    enemyShot[i] = new EnemyShot();
  var bossShot = new Array(BOSS_SHOT_MAX_COUNT);
  for (i = 0; i < bossShot.length; i++)
    bossShot[i] = new BossShot();
  var bossCount = 0;

  // - キャラクター用インスタンス-------------------------------
  var chara = new Character();
  chara.init(10);
  var enemy = new Array(ENEMY_MAX_COUNT);
  for (i = 0; i < ENEMY_MAX_COUNT; i++)
    enemy[i] = new Enemy();
  var boss = new Array(BOSS_MAX_COUNT);
  for (i = 0; i < BOSS_MAX_COUNT; i++)
    boss[i] = new Boss();
  var bossSAB = new Array(10000);
  for (i = 0; i < 10000; i++)
    bossSAB[i] = new BossSAB();
  // -音楽(BGM)---------------------------------------------------------
  /* var audio = new Audio();
    audio.src = "./Dear....mp3";
    audio.loop = true;

    // 再生を開始する
    audio.play();*/


  chara.position.x = 675;
  chara.position.y = 500;
  var slowCount = 0;
  (function () {
    //operation----------------------------------------------------
    if (ope_turn) {
      up = 87;
      down = 83;
      right = 68;
      left = 65;
      Nfrontshot = 38;
      Nbehindshot = 40;
      Nrightshot = 39;
      Nleftshot = 37;
    } else {
      up = 38;
      down = 40;
      right = 39;
      left = 37;
      Nfrontshot = 87;
      Nbehindshot = 83;
      Nrightshot = 68;
      Nleftshot = 65;
    };
    if (waschea) {
      Wascheating = true;
    } else {
      Wascheating = false;
    }
    //main-------------------------------------------------------------------------
    slowCount++;
    // console.log("A");
    if (!IsSlow || slowCount % 5 == 0) {
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = .5;
      ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width);
      ctx.globalAlpha = 1;
      // 自機 + 自機のたま
      {
        // JIKI移動
        if (IsCheating) {
          chara.position.x = mouse.x;
          chara.position.y = mouse.y;
        } else {
          var speed = 5;
          if (IsSlow) speed = 5;
          if (Key === right) {
            chara.position.x += speed;
          }
          if (Key === left) {
            chara.position.x -= speed;
          }
          if (Key === up) {
            chara.position.y -= speed;
          }
          if (Key === down) {
            chara.position.y += speed;
          }
        }
        // JIKI描画
        if (point < -Infinity) {
          outcharacter = 10;
          chara.size = outcharacter / 10 * 4;
          Sabchara = outcharacter / 2;
          Saboutchara = Sabchara / 2;
        }

        if (point > -Infinity) {
          if (BOSS_SABHP >= 3) {
            outcharacter = 10;
            chara.size = outcharacter / 10 * 4;
            Sabchara = outcharacter / 2;
            Saboutchara = Sabchara - 0.5;
          } else if (BOSS_SABHP <= 2) {
            outcharacter = 10;
            chara.size = outcharacter / 10 * 4;
            //Sabchara = outcharacter / 3;
            Saboutchara = Sabchara - 0.5;
            if (fire == true) {
              SAB2 = 20;
              Sabchara = outcharacter / 2;
            } else if (fire == false) {
              SAB2 = 15;
              Sabchara = outcharacter / 3;
            }
          }
        };
        //描写中心自機
        ChangeColor();
        ctx.beginPath();
        ctx.arc(chara.position.x, chara.position.y, outcharacter, 0, Math.PI * 2, false);
        ctx.fillStyle = CHARA_COLOR;
        ctx.fill();
        if (IsSlow) {
          ctx.beginPath();
          ctx.arc(chara.position.x, chara.position.y, outcharacter + 1, 0, Math.PI * 2, false);
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          ctx.stroke();
        }

        //中心自機
        ChangeColor();
        ctx.beginPath();
        ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.fill();
        if (BOSS_SABHP >= 3) {
          ctx.beginPath();
          ctx.arc(JIKI_OKURETERU.x + 30, JIKI_OKURETERU.y + 10, Sabchara, 0, Math.PI * 2, false);
          ctx.moveTo(JIKI_OKURETERU.x - 30 + Sabchara, JIKI_OKURETERU.y + 10);
          ctx.arc(JIKI_OKURETERU.x - 30, JIKI_OKURETERU.y + 10, Sabchara, 0, Math.PI * 2, false);
          ctx.strokeStyle = 'rgba(0,0,0,1)'; //外周左右自機 
          ctx.stroke();
          ctx.fillStyle = 'rgba(220,20,60,1)';
          ctx.fill(); //左右自機
        }
        if (JIKI_OKURETERU.x == undefined) {
          JIKI_OKURETERU.x = chara.position.x;
          JIKI_OKURETERU.y = chara.position.y;
        } else {
          if (BOSS_SABHP >= 3) {
            JIKI_OKURETERU.x = (chara.position.x * 0.9 + JIKI_OKURETERU.x * 0.1);
            JIKI_OKURETERU.y = (chara.position.y * 0.9 + JIKI_OKURETERU.y * 0.1);
            /* JIKI_OKURETERU.x=Math.min(1364,Math.max(JIKI_OKURETERU.x));
             JIKI_OKURETERU.y=Math.min(630,Math.max(JIKI_OKURETERU.y));*/
          } else {
            JIKI_OKURETERU.x = (chara.position.x * 0.5 + JIKI_OKURETERU.x * 0.5);
            JIKI_OKURETERU.y = (chara.position.y * 0.5 + JIKI_OKURETERU.y * 0.5);
          }
        }
        if (BOSS_SABHP <= 2) {
          if (Syuugou == false && Kakusan == false && rightshot == false && leftshot == false) {
            ctx.beginPath();
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke(); //外周上下左右自機  
            ctx.fillStyle = 'rgba(220,20,60,1)';
            ctx.fill(); //上下左右自機
          } else if (Syuugou == false && Kakusan == true) { //SyuugouとKakusanが反転中
            ctx.beginPath();
            ctx.arc(JIKI_OKURETERU.x - SAB2 * 3, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2 * 3, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2 * 3, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke(); //外周上下左右自機    
            ctx.fillStyle = 'rgba(220,20,60,1)';
            ctx.fill(); //上下左右自機
          } else if (Syuugou == true && Kakusan == false) { //SyuugouとKakusanが反転中
            ctx.beginPath();
            ctx.arc(JIKI_OKURETERU.x - SAB2 * 3, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2 * 3, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2 * 3, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke(); //外周上下左右自機    
            ctx.fillStyle = 'rgba(220,20,60,1)';
            ctx.fill(); //上下左右自機
          }
          if (rightshot == true && leftshot == false) {
            ctx.beginPath();
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2 * 3, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2 * 3);
            ctx.arc(JIKI_OKURETERU.x + SAB2, JIKI_OKURETERU.y + SAB2 * 3, Sabchara, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke(); //外周上下左右自機    
            ctx.fillStyle = 'rgba(220,20,60,1)';
            ctx.fill(); //上下左右自機
          } else if (rightshot == false && leftshot == true) {
            ctx.beginPath();
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2 * 3, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y - SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2, Sabchara, 0, Math.PI * 2, false);
            ctx.moveTo(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2 * 3);
            ctx.arc(JIKI_OKURETERU.x - SAB2, JIKI_OKURETERU.y + SAB2 * 3, Sabchara, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.stroke(); //外周上下左右自機    
            ctx.fillStyle = 'rgba(220,20,60,1)';
            ctx.fill(); //上下左右自機
          }
        }

        // JIKIのチート玉
        if (fire) {
          if (SHOT_counter % JIKIshotpar === 0) {
            var Count = 0;
            for (i = 0; i < charaShot.length; i++) {
              if (!charaShot[i].alive) {
                switch (Count) {
                  case 0:
                    if (BOSS_SABHP >= 3) charaShot[i].set(chara.position, 4, 0, 3 + charaShot_speed);
                    break;
                  case 1:
                    if (Kakusan == false && Syuugou == false && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0, 3 + charaShot_speed);
                    break;
                  case 2:
                    if (Kakusan == false && Syuugou == false && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0, 3 + charaShot_speed);
                    break;
                  case 3:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 3 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 4:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -3 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 5:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 5 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 6:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -5 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 7:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 7 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 8:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -7 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 9:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, 2 + charaShot_speed);
                    break;
                  case 10:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, 2 + charaShot_speed);
                    break;
                  case 11:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, 0);
                    break;
                  case 12:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, 0);
                    break;
                  case 13:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 0, -3 - charaShot_speed);
                    break;
                  case 14:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 1 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 15:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -1 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 16:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 3 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 17:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -3 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 18:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 5 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 19:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -5 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 20:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 7 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 21:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -7 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 22:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, -2 - charaShot_speed);
                    break;
                  case 23:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, -2 - charaShot_speed);
                    break;
                  case 24:
                    if (Arecheating) charaShot[i].set(chara.position, 3, 1 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 25:
                    if (Arecheating) charaShot[i].set(chara.position, 3, -1 - charaShot_speed, 3 + charaShot_speed);
                    break
                  case 26:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0.5 + charaShot_speed / 10, 4 + charaShot_speed);
                    break;
                  case 27:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, -0.5 - charaShot_speed / 10, 4 + charaShot_speed);
                    break;
                  case 28:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, -1 - charaShot_speed / 10, 3 + charaShot_speed);
                    break;
                  case 29:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 1 + charaShot_speed / 10, 3 + charaShot_speed);
                    break;
                  case 30:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 31:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 32:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2 * 3,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 33:
                    if (Kakusan == false && Syuugou == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2 * 3,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 34:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 35:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 36:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2 * 3,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 37:
                    if (Kakusan == true && Syuugou == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2 * 3,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 38:
                    if (rightshot == false && leftshot == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 39:
                    if (rightshot == false && leftshot == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 40:
                    if (rightshot == false && leftshot == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2 * 3
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 41:
                    if (rightshot == false && leftshot == true && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2 * 3
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 42:
                    if (rightshot == true && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 43:
                    if (rightshot == true && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 44:
                    if (rightshot == true && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2 * 3
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 45:
                    if (rightshot == true && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2 * 3
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 46:
                    if (Arecheating) charaShot[i].set(chara.position, 4, 0, 3 + charaShot_speed);
                    break
                  case 47:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, -charaShot_speed, -charaShot_speed);
                    break;
                  case 48:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2, +charaShot_speed, -charaShot_speed, 0);
                    break;
                  case 49:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, -charaShot_speed, +charaShot_speed);
                    break;
                  case 50:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && BOSS_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, +charaShot_speed, +charaShot_speed);
                    break;
                  default:
                    break;
                }
                Count++;
                if (Count > 50) break;
              }
            }

          }
          SHOT_counter++;
          // fire = false;
        }
        // JIKI Shot
        ctx.fillStyle = CHARA_SHOT_COLOR;
        ctx.beginPath();
        for (i = 0; i < charaShot.length; i++) {
          if (charaShot[i].alive) {
            charaShot[i].move();
            ctx.arc(
              charaShot[i].position.x,
              charaShot[i].position.y,
              charaShot[i].size,
              0, Math.PI * 2, false
            );
            ctx.closePath();
          }
        }
        ctx.fill();
      }
      //雑魚敵
      if (point < -Infinity) {
        //以下エネミーとのあたり判定 
        if (!Wascheating && !invincible) {
          for (j = 0; j < ENEMY_SHOT_MAX_COUNT; j++) {
            if (!enemyShot[j].alive) continue;
            if (Math.pow(chara.position.x - enemyShot[j].position.x, 2) +
              Math.pow(chara.position.y - enemyShot[j].position.y, 2) <=
              Math.pow(enemyShot[j].size + chara.size, 2)) {
              life -= 1;
              invincible = true;
              /*chara.position.x = 675;
              chara.position.y = 500;*/
            }
            setTimeout(function () {
              invincible = false;
            }, 3000);
            enemyShot[j].alive = false;
            point -= 1000;
          }
        } // enemyShot と　chara の当り判定
        for (j = 0; j < ENEMY_MAX_COUNT; j++) {
          if (!enemy[j].alive) continue;
          if (Math.pow(chara.position.x - enemy[j].position.x, 2) +
            Math.pow(chara.position.y - enemy[j].position.y, 2) <=
            Math.pow(enemy[j].size + chara.size, 2)) {
            life -= 1;
            invincible = true;
            /*chara.position.x = 675;
            chara.position.y = 500;*/
            setTimeout(function () {
              invincible = false;
            }, 3000);
            enemy[j].alive = false;
            point -= 1000;
          }
        } // enemy と　chara の当り判定

        for (i = 0; i < ENEMY_MAX_COUNT; i++) {
          if (!enemy[i].alive) continue;
          for (j = 0; j < CHARA_SHOT_MAX_COUNT; j++) {
            if (!charaShot[j].alive) continue;
            if (Math.pow(enemy[i].position.x - charaShot[j].position.x, 2) +
              Math.pow(enemy[i].position.y - charaShot[j].position.y, 2) <=
              Math.pow(charaShot[j].size + enemy[i].size, 2)) {
              enemy[i].alive = false;
              charaShot[j].alive = false;
              point += 50;
            }
          }
        } //以上 

        counter++;
        if (counter % 40 === 0) {
          for (i = 0; i < ENEMY_MAX_COUNT; i++) {
            if (!enemy[i].alive) {
              j = (counter % 80) / 40;
              var enemySize = 15;
              p.x = -enemySize + (screenCanvas.width + enemySize * 4) * j
              p.y = screenCanvas.height / 4;
              if (j == 1) p.y = 100;
              enemy[i].set(p, enemySize, j << 0);
              break;
            }
          }
        } // enemy を新しく追加

        {
          ctx.fillStyle = ENEMY_COLOR;
          ctx.beginPath();
          for (i = 0; i < ENEMY_MAX_COUNT; i++) {
            if (enemy[i].alive) {
              enemy[i].move();
              ctx.arc(
                enemy[i].position.x,
                enemy[i].position.y,
                enemy[i].size,
                0, Math.PI * 2, false
              );
              enemy[i].param++;
              if (enemy[i].param % 100 === 0) {
                for (j = 0; j < ENEMY_SHOT_MAX_COUNT; j++) {
                  if (!enemyShot[j].alive) {
                    if (enemy[i].type == 0) {
                      p = enemy[i].position.distance(chara.position);
                      p.normalize();
                      enemyShot[j].set(enemy[i].position, p, 5, 3);
                    } else {
                      enemyShot[j].set(enemy[i].position, {
                        x: 0,
                        y: 1.5
                      }, 5, 3);
                    }
                    break;　
                  }
                }
              }
              ctx.closePath();
            }
          }
          ctx.fill();
        }

        {
          ctx.fillStyle = ENEMY_SHOT_COLOR;
          ctx.beginPath();
          for (i = 0; i < ENEMY_MAX_COUNT; i++) {
            if (!enemyShot[i].alive) continue;
            enemyShot[i].move();
            ctx.arc(
              enemyShot[i].position.x,
              enemyShot[i].position.y,
              enemyShot[i].size,
              0, Math.PI * 2, false
            );
            ctx.closePath();
          }
          ctx.fill();
        } // 敵のたまの移動、表示

      } else if (point > -Infinity) {
        if (!Wascheating && !invincible) {
          for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
            if (!bossShot[j].alive) continue;
            if (Math.pow(chara.position.x - bossShot[j].position.x, 2) +
              Math.pow(chara.position.y - bossShot[j].position.y, 2) <=
              Math.pow(bossShot[j].size + chara.size, 2)) {
              life -= 1;
              invincible = true;
              /*chara.position.x = 675;
              chara.position.y = 500;*/
              setTimeout(function () {
                invincible = false;
              }, 3000);
              bossShot[j].alive = false;
              point -= 1000;
            }
          }
          for (j = 0; j < BOSS_MAX_COUNT; j++) {
            if (!boss[j].alive) continue;
            if (Math.pow(chara.position.x - boss[j].position.x, 2) +
              Math.pow(chara.position.y - boss[j].position.y, 2) <=
              Math.pow(boss[j].size + chara.size, 2)) {
              life -= 1;
              invincible = true;
              /* chara.position.x = 675;
               chara.position.y = 500;*/
              setTimeout(function () {
                invincible = false;
              }, 3000);
              BOSS_HP -= 10;
              point += 1000;
            }
          }
        }
        for (i = 0; i < BOSS_MAX_COUNT; i++) {
          if (!boss[i].alive) continue;
          for (j = 0; j < CHARA_SHOT_MAX_COUNT; j++) {
            if (!charaShot[j].alive) continue;
            if (Math.pow(boss[i].position.x - charaShot[j].position.x, 2) +
              Math.pow(boss[i].position.y - charaShot[j].position.y, 2) <=
              Math.pow(charaShot[j].size + boss[i].size, 2)) {
              BOSS_HP -= 1;
              charaShot[j].alive = false;
            }
          }
        }
        counter++;
        if (BOSS_SABHP >= 3) {
          if (counter % 10 === 0) {
            for (i = 0; i < BOSS_MAX_COUNT; i++) {
              if (!boss[i].alive) {
                j = (counter % 30) / 10;
                var bossSize = 20;
                p.x = (screenCanvas.width - bossSize) / 2;
                p.y = screenCanvas.height / 4;
                if (j == 0 && boss.some((v) => v.type == 0 && v.alive)) break;
                if ((j == 1 || j == 2) && ((counter % 60 != 0) || Math.random() > 1)) break;
                boss[i].set(p, bossSize, j << 0);
                break;
              }
            }
          }
        }
        if (BOSS_SABHP <= 2) {
          if (counter % 10 === 0) {
            for (i = 0; i < BOSS_MAX_COUNT; i++) {
              if (!boss[i].alive) {
                j = (counter % 30) / 10;
                var bossSize = 20;
                if (j == 0 && boss.some((v) => v.type == 0 && v.alive)) break;
                if ((j == 1 || j == 2) && ((counter % 60 != 0) || Math.random() > 1)) break;
                boss[i].set(p, bossSize, j << 0);
                break;
              }
            }
          }
        }
        // BOSSの挙動----------------------------------------------
        if (BOSS_SABHP == 4) {
          //Bossshot-----------------------------
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_SHOT_MAX_COUNT; i++) {
            if (bossShot[i].alive) // continue;
            {
              bossShot[i].move();
              //console.log("bossShot 描画");
              ctx.arc(
                bossShot[i].position.x,
                bossShot[i].position.y,
                bossShot[i].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          //Boss本体-------------------------------------------F
          ctx.fill();
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_MAX_COUNT; i++) {
            if (boss[i].alive) {
              ctx.arc(
                boss[i].position.x,
                boss[i].position.y,
                boss[i].size,
                0, Math.PI * 2, false
              );
              /*boss[i].param++;*/
              if ( /*SHOT_*/ bosscounter % 30 == 0) {
                a = boss[i].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: 1.5, //右
                  y: 0,
                  size: 5,
                  speed: 2.5
                }, {
                  x: -1.5, //左
                  y: 0
                }, {
                  x: -0.8, //下左下
                  y: 1.3
                }, {
                  x: 0.8,
                  　　 //下右下
                  y: 1.3
                }, {
                  x: 0,
                  　　　 //上
                  y: -1.5
                }, {
                  x: 1.3,
                  　 //上右下
                  y: 0.8
                }, {
                  x: 1.08,
                  　 //右上
                  y: -1.08
                }, {
                  x: -1.3,
                  　 //上左下
                  y: 0.8
                }, {
                  x: -1.08,
                  　 //左上
                  y: -1.08
                }, {
                  x: a.x,
                  y: a.y,
                  size: 5,
                  speed: 1.25
                }];
                let vectorCounter = 0;
                for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
                  if (!bossShot[j].alive) {
                    if (boss[i].type == 0) {
                      bossShot[j].set(boss[i].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }　
                }
              }
              /*SHOT_*/
              bosscounter++;
              ctx.closePath();
            }
            ctx.fill();
          }
        }; //Boss4

        if (BOSS_SABHP == 3) {
          //bossshot-------------------------------------------
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_SHOT_MAX_COUNT; i++) {
            if (bossShot[i].alive) {
              bossShot[i].move();
              ctx.arc(
                bossShot[i].position.x,
                bossShot[i].position.y,
                bossShot[i].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //bossmain----------------------------------
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_MAX_COUNT; i++) {
            if (boss[i].alive) {
              /*boss[i].move();*/
              ctx.arc(
                boss[i].position.x,
                boss[i].position.y,
                boss[i].size,
                0, Math.PI * 2, false
              );
              /*boss[i].param++;*/
              if (bosscounter % 30 == 0) {
                a = boss[i].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: a.x,
                  y: a.y,
                  size: 5,
                  speed: 1.25
                }];

                let vectorCounter = 0;
                for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
                  if (!bossShot[j].alive) {
                    if (boss[i].type == 0) {
                      bossShot[j].set(boss[i].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }　
                }
              }
              if (bosscounter % 60 == 0) {
                /*a = boss[i].position.distance(chara.position);
                a.normalize();*/
                let Vectors = [{}, {}];

                let vectorCounter = 0;
                for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
                  if (!bossShot[j].alive) {
                    if (boss[i].type == 0) {
                      if (bosscounter % 120 == 0) {
                        bossShot[j].set({
                          x: screenCanvas.width / 6,
                          y: boss[i].position.y
                        }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      }
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }　
                }
              }
              bosscounter++;
              ctx.closePath();
            }
            ctx.fill();
          } {
            //bossSAB-------------------------------------------------------------
            if (bossSAB[0].position.x <= screenCanvas.width / 2) {
              bossSABa = true;
              bossSABb = true;
            };
            /*if (bossSAB[1].position.x >= screenCanvas.width / 2) {
              bossSABb = true;
            };*/
            if (bossSABa == true && bossSABb == true) {
              setTimeout(function () {
                bossSABc = true;
              }, 5000);
            };
            if (!bossSABc) {
              bossSABcounter++;
              if (bossSABcounter % 50 === 0) {
                for (i = 0; i < BOSSSAB_MAX_COUNT; i++) {
                  if (!bossSAB[i].alive) {
                    j = (bossSABcounter % 80) / 40;
                    var bossSABSize = 15;
                    p.x = screenCanvas.width / 2,
                      p.y = screenCanvas.height / 4,
                      bossSAB[i].set(p, bossSABSize, j << 0);
                    break;
                  }
                }
              }
            };
            ctx.fillStyle = BOSSSAB_COLOR;
            ctx.beginPath();
            for (i = 0; i < BOSSSAB_MAX_COUNT; i++) {
              if (bossSAB[i].alive) {
                bossSAB[i].move();
                ctx.arc(
                  bossSAB[i].position.x,
                  bossSAB[i].position.y,
                  bossSAB[i].size,
                  0, Math.PI * 2, false
                );
                ctx.closePath();
              }
            }
            ctx.fill();
          }
        }; //Boss3


        if (BOSS_SABHP == 2) {
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_MAX_COUNT; i++) {
            if (boss[i].alive) {
              boss[i].move();
              ctx.arc(
                boss[i].position.x,
                boss[i].position.y,
                boss[i].size,
                0, Math.PI * 2, false
              );
              /*boss[i].param++;*/
              if ( /*SHOT_*/ bosscounter % 30 == 0) {
                a = boss[i].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: a.x,
                  y: a.y,
                  size: 5,
                  speed: 1.25
                }];

                let vectorCounter = 0;
                for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
                  if (!bossShot[j].alive) {
                    if (boss[i].type == 0) {
                      bossShot[j].set(boss[i].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }　
                }
              }
              bosscounter++;
              ctx.closePath();
            }
            ctx.fill();
          }

          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_SHOT_MAX_COUNT; i++) {
            if (bossShot[i].alive) // continue;
            {
              bossShot[i].move();
              ctx.arc(
                bossShot[i].position.x,
                bossShot[i].position.y,
                bossShot[i].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
        }; //Boss2

        if (BOSS_SABHP == 1) {
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_MAX_COUNT; i++) {
            if (boss[i].alive) {
              /* boss[i].move();*/
              ctx.arc(
                boss[i].position.x,
                boss[i].position.y,
                boss[i].size,
                0, Math.PI * 2, false
              );
              /*boss[i].param++;*/
              if ( /*SHOT_*/ bosscounter % 30 == 0) {
                a = boss[i].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: a.x,
                  y: a.y,
                  size: 5,
                  speed: 1.25
                }];

                let vectorCounter = 0;
                for (j = 0; j < BOSS_SHOT_MAX_COUNT; j++) {
                  if (!bossShot[j].alive) {
                    if (boss[i].type == 0) {
                      bossShot[j].set(boss[i].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }　
                }
              }
              bosscounter++;
              ctx.closePath();
            }
            ctx.fill();
          }

          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (i = 0; i < BOSS_SHOT_MAX_COUNT; i++) {
            if (bossShot[i].alive) // continue;
            {
              bossShot[i].move();
              ctx.arc(
                bossShot[i].position.x,
                bossShot[i].position.y,
                bossShot[i].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
        }; //Boss1

      }
    }
    info.innerText = "Score : " + point + " || " + "Life : " + life + "\\" + BOSS_SABHP;
    info_2.innerText = "Boss : " + BOSS_COUNTER + " || " + "BOSS_HP : " + BOSS_HP;
    if (BOSS_SABHP == 4) {
      if (BOSS_HP <= 200) {
        BOSS_SABHP = 3;
        point += 100
      }
    }
    if (BOSS_SABHP == 3) {
      if (BOSS_HP <= 0) {
        BOSS_SABHP = 2;
        point += 150;
        BOSS_MAX_COUNT = 1;
        BOSS_HP = 400;
        boss[0].alive = false;
        ChangeColor();
      }
    }
    if (BOSS_SABHP == 2) {
      JIKIshotpar = 15;
      BOSS_COUNTER = "式神";
      if (BOSS_HP <= 200) {
        BOSS_SABHP = 1;
        point += 200
      }
    }
    if (BOSS_SABHP == 1) {
      if (BOSS_HP <= 0) {
        BOSS_SABHP = 0;
        point += 250;
        BOSS_MAX_COUNT = 0;
        BOSS_HP = 0;
      }
    }
    if (life < 0) ShowGameover("Score || " + point);
    else requestAnimationFrame(arguments.callee);
    if (BOSS_MAX_COUNT <= 0) ShowClear("GAME CLEAR\nScore||" + point);


  })();
};
// - event --------------------------------------------------------------------
function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event) {
  fire = true;
  SHOT_counter = 0;
}

function mouseUp(event) {
  fire = false;
}

function keyDown(event) {
  var ck = event.keyCode;
  console.log(ck);
  // 通常
  if (ck === 27) {
    run = false;
    return;
  }
  if (ck === 32) {
    if (!fire)
      mouseDown();
    return;

  }
  if (ck === 101) {
    if (!fire)
      mouseDown();
    return;
  }
  Key = ck;
  // チート
  if (event.altKey && event.ctrlKey) {
    IsCheating = true;
  }
  if (ck === 96)
    IsSlow = true;

  if (event.shiftKey && event.ctrlKey) {
    Arecheating = true;
  }
  if (ck === 97) {
    key1 = true;
  }
  if (ck === 99) {
    if (key1) {
      if (waschea == true) {
        waschea = false;
      } else if (waschea == false) {
        waschea = true;
      }
    }
  }
  if (ck === Nfrontshot) {
    Syuugou = true;
  }
  if (ck === Nbehindshot) {
    Kakusan = true;
  }
  if (ck === Nrightshot) {
    rightshot = true
  }
  if (ck === Nleftshot) {
    leftshot = true;
  }
  if (ck === 103) {
    key7 = true;
  }
  if (ck === 105) {
    if (key7) {
      if (ope_turn == true) {
        ope_turn = false;
      } else if (ope_turn == false) {
        ope_turn = true;
      }
    }
  }
}

function keyUp(event) {
  var ck = event.keyCode;
  if (ck === 32) {
    mouseUp();
    return;
  }
  if (ck === 101) {
    mouseUp();
    return;
  }
  if (ck === 96) {
    IsSlow = false;
    return;
  }
  // チート
  if ((ck === 17) && (18)) {
    IsCheating = false;
  }
  if (ck === 16 && 17) {
    Arecheating = false;
  }
  if (ck === 97) {
    key1 = false;
  }
  if (ck === Nfrontshot) {
    Syuugou = false;
    return;
  }
  if (ck === Nbehindshot) {
    Kakusan = false;
    return;
  }
  if (ck === Nrightshot) {
    rightshot = false
  }
  if (ck === Nleftshot) {
    leftshot = false;
  }
  if (ck === 103) {
    key7 = false;
  }
  Key = 0;
}

function ChangeColor() {
  if (invincible) {
    CHARA_COLOR = 'rgba(50, 255, 50, 0.5)';
  } else if (Wascheating) {
    CHARA_COLOR = 'rgba(50, 255, 50, 0.5)';
  } else CHARA_COLOR = 'rgba(0,0,0,1)';
  if (BOSS_SABHP <= 2) {
    BOSS_COLOR = 'rgba(255,255,0,1)', BOSS_SHOT_COLOR = 'rgba(35, 71, 130,0.8)';
  }
  if (IsSlow) {
    CHARA_COLOR = 'rgba(50,50,50, 0.5)';
  }
}

function ShowGameover(text) {
  document.getElementById("gameover-wrap").classList.remove("hide");
  document.getElementById("gameover-wrap").classList.add("shown");
  document.getElementById("gameover-text").innerText = text;
}

function ShowClear(text) {
  document.getElementById("Clear-wrap").classList.remove("hide");
  document.getElementById("Clear-wrap").classList.add("shown2");
  document.getElementById("Clear-text").innerText = text;
};