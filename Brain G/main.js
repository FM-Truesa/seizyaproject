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
var slow = false;
var cca = false;
/*
  O 
 /|V
 / \
*/
var ccs = false;
var c13ting = false;
var c13 = false;
var Key = 0;
var Music = false;
var score = 0;
var invincible = false;
//count-------------------------------------------
var bosscounter = 0;
var B_chenge = true;
//operation---------------------------------------
var up = 0;
var down = 0;
var right = 0;
var left = 0;
var key7 = false;
var key1 = false;
var key4 = false;
var key6 = false;
var Game_count = 1;
// - const --------------------------------------------------------------------
//Chara
var CHARA_COLOR = 'rgba(0,0,0,1)';
var CHARA_SHOT_COLOR = 'rgba(255,255,255, 1)';
var CHARA_SHOT_MAX_COUNT = 10000;
var life = 5;
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
//boss
var B_HP = 400;
var B_SABHP = 4;
var BOSS_COLOR = 'rgba(35, 71, 130,0.8)';
var BOSS_MAX_COUNT = 2;
var BOSS_SHOT_COLOR = 'rgba(255,255,0,1)';
var BOSS_SHOT_MAX_COUNT = 10000;
var BOSS_SHOT2_COLOR = 'rgba(217,66,54,0.9)';
var BOSS_SHOT2_MAX_COUNT = 10000;
var B_COUNT = "妖狐";
var B_shotpx
var B_shotpy
var B_shotc = 0;
var B_saba = 0;
var B_sabb = 0;
//Size---------------------
var wi = window.innerWidth;
var hi = window.innerHeight;

var JIKI_OKURETERU = {
  x: undefined,
  y: undefined
};
// - main ---------------------------------------------------------------------
window.onload = function () {
  var img = new Image();
  img.src = "back9.bmp";
  var i, j, m, k, l, n, b, h, u;
  var p = new Point(); {
    screenCanvas = document.getElementById('screen');
    //screenCanvas.width = wi - 2;
    //screenCanvas.height = hi -6;
    screenCanvas.width = 1364;
    screenCanvas.height = 762.5;
    ctx = screenCanvas.getContext('2d');
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    screenCanvas.addEventListener('mouseup', mouseUp, true);
    document.addEventListener('keydown', keyDown, true);
    document.addEventListener('keyup', keyUp, true);
    info = document.getElementById('info');
    info_2 = document.getElementById('info_2');
  }
  //c13 = true;
  // - キャラクター用インスタンス-------------------------------
  var chara = new Character();
  chara.init(10);

  var enemy = new Array(ENEMY_MAX_COUNT);
  for (j = 0; j < ENEMY_MAX_COUNT; j++)
    enemy[j] = new Enemy();

  var boss = new Array(BOSS_MAX_COUNT);
  for (b = 0; b < BOSS_MAX_COUNT; b++)
    boss[b] = new Boss();
  // - ショット用インスタンス-------------------------------  
  var bossCount = 0;
  var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
  for (i = 0; i < charaShot.length; i++)
    charaShot[i] = new CharaShot();

  var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
  for (m = 0; m < enemyShot.length; m++)
    enemyShot[m] = new EnemyShot();

  var bossShot = new Array(BOSS_SHOT_MAX_COUNT);
  for (l = 0; l < bossShot.length; l++)
    bossShot[l] = new BossShot();

  var bossShot2 = new Array(BOSS_SHOT2_MAX_COUNT);
  for (k = 0; k < bossShot2.length; k++)
    bossShot2[k] = new BossShot3();

  var bossShot3 = new Array(BOSS_SHOT2_MAX_COUNT);
  for (h = 0; h < bossShot2.length; h++)
    bossShot3[h] = new BossShot3();

  var bossShot4 = new Array(BOSS_SHOT2_MAX_COUNT);
  for (u = 0; u < bossShot2.length; u++)
    bossShot4[u] = new BossShot4();
  // -音楽(BGM)---------------------------------------------------------
  /* var audio = new Audio();
    audio.src = "./Dear....mp3";
    audio.loop = true;

    // 再生を開始する
    audio.play();*/


  chara.position.x = screenCanvas.width / 2;
  chara.position.y = screenCanvas.height / 5 * 4;
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
    if (c13) {
      c13ting = true;
    } else {
      c13ting = false;
    }
    //main-------------------------------------------------------------------------
    slowCount++;
    // console.log("A");
    if (!slow || slowCount % 5 == 0) {
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = .5;
      ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width);
      ctx.globalAlpha = 1;
      // 自機 + 自機のたま
      {
        // JIKI移動
        if (cca) {
          chara.position.x = mouse.x;
          chara.position.y = mouse.y;
        } else {
          var speed = 5;
          if (slow) speed = 5;
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
        if (score < -Infinity) {
          outcharacter = 10;
          chara.size = outcharacter / 10 * 4;
          Sabchara = outcharacter / 2;
          Saboutchara = Sabchara / 2;
        }
        if (score > -Infinity) {
          if (B_SABHP >= 3) {
            outcharacter = 10;
            chara.size = outcharacter / 10 * 4;
            Sabchara = outcharacter / 2;
            Saboutchara = Sabchara - 0.5;
          } else if (B_SABHP <= 2) {
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
        if (slow) {
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
        if (B_SABHP >= 3) {
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
          if (B_SABHP >= 3) {
            JIKI_OKURETERU.x = (chara.position.x * 0.9 + JIKI_OKURETERU.x * 0.1);
            JIKI_OKURETERU.y = (chara.position.y * 0.9 + JIKI_OKURETERU.y * 0.1);
            /* JIKI_OKURETERU.x=Math.min(1364,Math.max(JIKI_OKURETERU.x));
             JIKI_OKURETERU.y=Math.min(630,Math.max(JIKI_OKURETERU.y));*/
          } else {
            JIKI_OKURETERU.x = (chara.position.x * 0.5 + JIKI_OKURETERU.x * 0.5);
            JIKI_OKURETERU.y = (chara.position.y * 0.5 + JIKI_OKURETERU.y * 0.5);
          }
        }
        if (B_SABHP <= 2) {
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
                    if (B_SABHP >= 3) charaShot[i].set(chara.position, 4, 0, 3 + charaShot_speed);
                    break;
                  case 1:
                    if (Kakusan == false && Syuugou == false && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0, 3 + charaShot_speed);
                    break;
                  case 2:
                    if (Kakusan == false && Syuugou == false && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0, 3 + charaShot_speed);
                    break;
                  case 3:
                    if (ccs) charaShot[i].set(chara.position, 3, 3 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 4:
                    if (ccs) charaShot[i].set(chara.position, 3, -3 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 5:
                    if (ccs) charaShot[i].set(chara.position, 3, 5 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 6:
                    if (ccs) charaShot[i].set(chara.position, 3, -5 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 7:
                    if (ccs) charaShot[i].set(chara.position, 3, 7 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 8:
                    if (ccs) charaShot[i].set(chara.position, 3, -7 - charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 9:
                    if (ccs) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, 2 + charaShot_speed);
                    break;
                  case 10:
                    if (ccs) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, 2 + charaShot_speed);
                    break;
                  case 11:
                    if (ccs) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, 0);
                    break;
                  case 12:
                    if (ccs) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, 0);
                    break;
                  case 13:
                    if (ccs) charaShot[i].set(chara.position, 3, 0, -3 - charaShot_speed);
                    break;
                  case 14:
                    if (ccs) charaShot[i].set(chara.position, 3, 1 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 15:
                    if (ccs) charaShot[i].set(chara.position, 3, -1 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 16:
                    if (ccs) charaShot[i].set(chara.position, 3, 3 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 17:
                    if (ccs) charaShot[i].set(chara.position, 3, -3 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 18:
                    if (ccs) charaShot[i].set(chara.position, 3, 5 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 19:
                    if (ccs) charaShot[i].set(chara.position, 3, -5 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 20:
                    if (ccs) charaShot[i].set(chara.position, 3, 7 + charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 21:
                    if (ccs) charaShot[i].set(chara.position, 3, -7 - charaShot_speed, -3 - charaShot_speed);
                    break;
                  case 22:
                    if (ccs) charaShot[i].set(chara.position, 3, 9 + charaShot_speed, -2 - charaShot_speed);
                    break;
                  case 23:
                    if (ccs) charaShot[i].set(chara.position, 3, -9 - charaShot_speed, -2 - charaShot_speed);
                    break;
                  case 24:
                    if (ccs) charaShot[i].set(chara.position, 3, 1 + charaShot_speed, 3 + charaShot_speed);
                    break;
                  case 25:
                    if (ccs) charaShot[i].set(chara.position, 3, -1 - charaShot_speed, 3 + charaShot_speed);
                    break
                  case 26:
                    if (Kakusan == false && Syuugou == true && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 0.5 + charaShot_speed / 10, 4 + charaShot_speed);
                    break;
                  case 27:
                    if (Kakusan == false && Syuugou == true && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, -0.5 - charaShot_speed / 10, 4 + charaShot_speed);
                    break;
                  case 28:
                    if (Kakusan == true && Syuugou == false && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x + 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, -1 - charaShot_speed / 10, 3 + charaShot_speed);
                    break;
                  case 29:
                    if (Kakusan == true && Syuugou == false && B_SABHP >= 3) charaShot[i].set({
                      x: chara.position.x - 30,
                      y: chara.position.y + 10
                    }, Sabchara / 5 * 3, 1 + charaShot_speed / 10, 3 + charaShot_speed);
                    break;
                  case 30:
                    if (Kakusan == false && Syuugou == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 31:
                    if (Kakusan == false && Syuugou == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 32:
                    if (Kakusan == false && Syuugou == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2 * 3,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 33:
                    if (Kakusan == false && Syuugou == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2 * 3,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 0, 3 + charaShot_speed);
                    break;
                  case 34:
                    if (Kakusan == true && Syuugou == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 35:
                    if (Kakusan == true && Syuugou == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 36:
                    if (Kakusan == true && Syuugou == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2 * 3,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 37:
                    if (Kakusan == true && Syuugou == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2 * 3,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 0, -3 - charaShot_speed);
                    break;
                  case 38:
                    if (rightshot == false && leftshot == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 39:
                    if (rightshot == false && leftshot == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 40:
                    if (rightshot == false && leftshot == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2 * 3
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 41:
                    if (rightshot == false && leftshot == true && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y - SAB2 * 3
                    }, outcharacter / 2 - 1, 3 + charaShot_speed, 0);
                    break;
                  case 42:
                    if (rightshot == true && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 43:
                    if (rightshot == true && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 44:
                    if (rightshot == true && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2 * 3
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 45:
                    if (rightshot == true && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2 * 3
                    }, outcharacter / 2 - 1, -3 - charaShot_speed, 0);
                    break;
                  case 46:
                    if (ccs) charaShot[i].set(chara.position, 4, 0, 3 + charaShot_speed);
                    break
                  case 47:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2 - 1, -charaShot_speed, -charaShot_speed);
                    break;
                  case 48:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x - SAB2,
                      y: chara.position.y + SAB2
                    }, outcharacter / 2, +charaShot_speed, -charaShot_speed, 0);
                    break;
                  case 49:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && B_SABHP <= 2) charaShot[i].set({
                      x: chara.position.x + SAB2,
                      y: chara.position.y - SAB2
                    }, outcharacter / 2 - 1, -charaShot_speed, +charaShot_speed);
                    break;
                  case 50:
                    if (Kakusan == false && Syuugou == false && rightshot == false && leftshot == false && B_SABHP <= 2) charaShot[i].set({
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
      if (Game_count == 0) {
        //以下エネミーとのあたり判定 
        if (!c13ting && !invincible) {
          for (m = 0; m < ENEMY_SHOT_MAX_COUNT; m++) {
            if (!enemyShot[m].alive) continue;
            if (Math.pow(chara.position.x - enemyShot[m].position.x, 2) +
              Math.pow(chara.position.y - enemyShot[m].position.y, 2) <=
              Math.pow(enemyShot[m].size + chara.size, 2)) {
              life -= 1;
              invincible = true;
              /*chara.position.x = 675;
              chara.position.y = 500;*/
            }
            setTimeout(function () {
              invincible = false;
            }, 3000);
            enemyShot[m].alive = false;
            score -= 1000;
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
            score -= 1000;
          }
        } // enemy と　chara の当り判定
        for (j = 0; j < ENEMY_MAX_COUNT; j++) {
          if (!enemy[j].alive) continue;
          for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
            if (!charaShot[j].alive) continue;
            if (Math.pow(enemyShot[m].position.x - charaShot[i].position.x, 2) +
              Math.pow(enemyShot[m].position.y - charaShot[i].position.y, 2) <=
              Math.pow(charaShot[i].size + enemyShot[m].size, 2)) {
              enemyShot[m].alive = false;
              charaShot[i].alive = false;
              score += 50;
            }
          }
        } //enemyShot と charashot
        //以上
        for (j = 0; j < ENEMY_MAX_COUNT; j++) {
          if (!enemy[j].alive) continue;
          for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
            if (!charaShot[j].alive) continue;
            if (Math.pow(enemy[j].position.x - charaShot[i].position.x, 2) +
              Math.pow(enemy[j].position.y - charaShot[i].position.y, 2) <=
              Math.pow(charaShot[i].size + enemy[j].size, 2)) {
              enemy[j].alive = false;
              charaShot[i].alive = false;
              score += 50;
            }
          }
        } //enemyshot と charashot 
        counter++;
        if (counter % 40 === 0) {
          for (j = 0; j < ENEMY_MAX_COUNT; j++) {
            if (!enemy[j].alive) {
              j = (counter % 80) / 40;
              var enemySize = 15;
              p.x = -enemySize + (screenCanvas.width + enemySize * 4) * j
              p.y = screenCanvas.height / 4;
              if (j == 1) p.y = 100;
              enemy[j].set(p, enemySize, j << 0);
              break;
            }
          }
        } // enemy を新しく追加
        ctx.fillStyle = ENEMY_COLOR;
        ctx.beginPath();
        for (j = 0; j < ENEMY_MAX_COUNT; j++) {
          if (enemy[j].alive) {
            enemy[j].move();
            ctx.arc(
              enemy[j].position.x,
              enemy[j].position.y,
              enemy[j].size,
              0, Math.PI * 2, false
            );
            enemy[j].param++;
            if (enemy[j].param % 100 === 0) {
              for (m = 0; m < ENEMY_SHOT_MAX_COUNT; m++) {
                if (!enemyShot[m].alive) {
                  if (enemy[j].type == 0) {
                    p = enemy[m].position.distance(chara.position);
                    p.normalize();
                    enemyShot[m].set(enemy[j].position, p, 5, 3);
                  } else {
                    enemyShot[m].set(enemy[j].position, {
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

        ctx.fillStyle = ENEMY_SHOT_COLOR;
        ctx.beginPath();
        for (m = 0; m < ENEMY_MAX_COUNT; m++) {
          if (!enemyShot[m].alive) continue;
          enemyShot[m].move();
          ctx.arc(
            enemyShot[m].position.x,
            enemyShot[m].position.y,
            enemyShot[m].size,
            0, Math.PI * 2, false
          );
          ctx.closePath();
        }
        ctx.fill();
        // 敵のたまの移動、表示
      } else if (Game_count == 1) {
        for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
          if (!bossShot[l].alive) continue;
          if (Math.pow(chara.position.x - bossShot[l].position.x, 2) +
            Math.pow(chara.position.y - bossShot[l].position.y, 2) <=
            Math.pow(bossShot[l].size + chara.size, 2)) {
            if (!c13ting && !invincible) {
              life -= 1;
              invincible = true;
              setTimeout(function () {
                invincible = false;
              }, 3000);
              score -= 1000;
            }
            bossShot[l].alive = false;
          }
        }
        for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
          if (!bossShot2[k].alive) continue;
          if (Math.pow(chara.position.x - bossShot2[k].position.x, 2) +
            Math.pow(chara.position.y - bossShot2[k].position.y, 2) <=
            Math.pow(bossShot2[k].size + chara.size, 2)) {
            if (!c13ting && !invincible) {
              life -= 1;
              invincible = true;
              setTimeout(function () {
                invincible = false;
              }, 3000);
              score -= 1000;
            }
            bossShot2[k].alive = false;
          }
        }
        for (h = 0; h < BOSS_SHOT2_MAX_COUNT; h++) {
          if (!bossShot2[h].alive) continue;
          if (Math.pow(chara.position.x - bossShot2[h].position.x, 2) +
            Math.pow(chara.position.y - bossShot2[h].position.y, 2) <=
            Math.pow(bossShot2[h].size + chara.size, 2)) {
            if (!c13ting && !invincible) {
              life -= 1;
              invincible = true;
              setTimeout(function () {
                invincible = false;
              }, 3000);
              score -= 1000;
            }
            bossShot2[h].alive = false;
          }
        }
        for (b = 0; b < BOSS_MAX_COUNT; b++) {
          if (!boss[b].alive) continue;
          if (Math.pow(chara.position.x - boss[b].position.x, 2) +
            Math.pow(chara.position.y - boss[b].position.y, 2) <=
            Math.pow(boss[b].size + chara.size, 2)) {
            if (!c13ting && !invincible) {
              life -= 1;
              invincible = true;
              setTimeout(function () {
                invincible = false;
              }, 3000);
              B_HP -= 10;
              score += 1000;
            }
          }
        }
        for (b = 0; b < BOSS_MAX_COUNT; b++) {
          if (!boss[b].alive) continue;
          for (i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
            if (!charaShot[i].alive) continue;
            if (Math.pow(boss[b].position.x - charaShot[i].position.x, 2) +
              Math.pow(boss[b].position.y - charaShot[i].position.y, 2) <=
              Math.pow(charaShot[i].size + boss[b].size, 2)) {
              B_HP -= 1;
              charaShot[i].alive = false;
            }
          }
        }
        /*
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  if (!bossShot[l].alive) continue;
                  for (j = 0; j < CHARA_SHOT_MAX_COUNT; j++) {
                    if (!charaShot[j].alive) continue;
                    if (Math.pow(bossShot[l].position.x - charaShot[j].position.x, 2) +
                      Math.pow(bossShot[l].position.y - charaShot[j].position.y, 2) <=
                      Math.pow(charaShot[j].size + bossShot[l].size, 2)) {
                      charaShot[j].alive = false;
                      bossShot[l].alive = false;
                    }
                  }
                }
                for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
                  if (!bossShot2[k].alive) continue;
                  for (j = 0; j < CHARA_SHOT_MAX_COUNT; j++) {
                    if (!charaShot[j].alive) continue;
                    if (Math.pow(bossShot2[k].position.x - charaShot[j].position.x, 2) +
                      Math.pow(bossShot2[k].position.y - charaShot[j].position.y, 2) <=
                      Math.pow(charaShot[j].size + bossShot2[k].size, 2)) {
                      charaShot[j].alive = false;
                      bossShot2[k].alive = false;
                    }
                  }
                }*/
        counter++;
        if (B_SABHP >= 3) {
          if (counter % 10 === 0) {
            for (b = 0; b < BOSS_MAX_COUNT; b++) {
              if (!boss[b].alive) {
                j = (counter % 30) / 10;
                var bossSize = 20;
                p.x = screenCanvas.width / 2; //Bossの初期位置
                p.y = screenCanvas.height / 4;
                if (j == 0 && boss.some((v) => v.type == 0 && v.alive)) break;
                if ((j == 1 || j == 2) && ((counter % 60 != 0) || Math.random() > 1)) break;
                boss[b].set(p, bossSize, j << 0);
                break;
              }
            }
          }
        }
        if (B_SABHP <= 2) {
          if (counter % 10 === 0) {
            for (b = 0; b < BOSS_MAX_COUNT; b++) {
              if (!boss[b].alive) {
                j = (counter % 30) / 10;
                var bossSize = 20;
                if (j == 0 && boss.some((v) => v.type == 0 && v.alive)) break;
                if ((j == 1 || j == 2) && ((counter % 60 != 0) || Math.random() > 1)) break;
                boss[b].set(p, bossSize, j << 0);
                break;
              }
            }
          }
        }
        // BOSSの挙動----------------------------------------------------------------------------------------------
        B_shotc += 1 * Math.PI / 180;
        // console.log(B_shotc);
        if (B_SABHP == 4) {
          //Bossshot----------------------------------
          bosscounter++;
          if ( /*SHOT_*/ bosscounter % 30 == 0) {
            for (b = 0; b < BOSS_MAX_COUNT; b++) {
              if (boss[b].alive) // continue;
              { /*boss[b].param++;*/
                //座標計算-----------------------------------
                B_shotpx = boss[b].size * 3.5 * Math.cos(B_shotc) + boss[b].position.x;
                B_shotpy = boss[b].size * 3.5 * Math.sin(B_shotc) + boss[b].position.y;
                ///方向-------------------------------------
                a = boss[b].position.distance(chara.position);
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
                  x: 0.8, //下右下
                  y: 1.3
                }, {
                  x: 0, //上
                  y: -1.5
                }, {
                  x: 1.3, //上右下
                  y: 0.8
                }, {
                  x: 1.08, //右上
                  y: -1.08
                }, {
                  x: -1.3, //上左下
                  y: 0.8
                }, {
                  x: -1.08, //左上
                  y: -1.08
                }];
                let vectorCounter = 0;
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  if (!bossShot[l].alive) {
                    if (boss[b].type == 0) {
                      bossShot[l].set({
                        x: B_shotpx,
                        y: B_shotpy
                      }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
                vectorCounter = 0;
                for (h = 0; h < BOSS_SHOT2_MAX_COUNT; h++) {
                  if (!bossShot3[h].alive) {
                    if (boss[b].type == 0) {
                      bossShot3[h].set({
                        x: ((B_shotpx - boss[b].position.x) * -1) + boss[b].position.x,
                        y: ((B_shotpy - boss[b].position.y) * -1) + boss[b].position.y
                      }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
                //console.log(bossShot);
                //console.log("a");
                if (bosscounter % 15 == 0 && bosscounter % 150 != 0) {
                  a = boss[b].position.distance(chara.position);
                  a.normalize();
                  let Vectors = [{
                    x: a.x,
                    y: a.y,
                    size: 7,
                    speed: 2
                  }];
                  let vectorCounter = 0;
                  for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
                    if (!bossShot2[k].alive) {
                      if (boss[b].type == 0) {
                        bossShot2[k].set(boss[b].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                        vectorCounter++;
                        // console.log(vectorCounter,bossShot[k]);
                        if (vectorCounter >= Vectors.length) break;
                      }
                    }
                  }
                  //console.log("a");
                }
              }
            }
          }
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
            if (bossShot[l].alive) {
              bossShot[l].move();
              ctx.arc(
                bossShot[l].position.x,
                bossShot[l].position.y,
                bossShot[l].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.beginPath();
          for (h = 0; h < BOSS_SHOT_MAX_COUNT; h++) {
            if (bossShot3[h].alive) {
              bossShot3[h].move();
              ctx.arc(
                bossShot3[h].position.x,
                bossShot3[h].position.y,
                bossShot3[h].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.fillStyle = BOSS_SHOT2_COLOR;
          ctx.beginPath();
          for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
            if (bossShot2[k].alive) {
              bossShot2[k].move();
              ctx.arc(
                bossShot2[k].position.x,
                bossShot2[k].position.y,
                bossShot2[k].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //Bossmain------------------------------------------- 
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.beginPath();
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              ctx.arc(
                boss[b].position.x,
                boss[b].position.y,
                boss[b].size,
                0, Math.PI * 2, false
              );
              ctx.arc(
                ((B_shotpx - boss[b].position.x) * -1) + boss[b].position.x,
                ((B_shotpy - boss[b].position.y) * -1) + boss[b].position.y,
                boss[b].size / 3,
                0, Math.PI * 2, false
              );
              ctx.moveTo(B_shotpx,
                B_shotpy);
              ctx.arc(
                B_shotpx,
                B_shotpy,
                boss[b].size / 3,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              ctx.arc(
                boss[b].position.x,
                boss[b].position.y,
                boss[b].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
        }; //Boss4
        if (B_SABHP == 3) {
          //System---------------------------------------        
          if (B_saba >= screenCanvas.width / 7) {
            B_saba -= 1.5;
          }
          if (B_sabb <= screenCanvas.width / 7 * 6) {
            B_sabb += 1.5;
          }
          //Bossenemy-------------------------------------------
          bosscounter++;
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              if (bosscounter % 50 == 0) {
                let Vectors = [{
                  x: 0,
                  y: 1,
                  size: boss[b].size / 3 * 2
                }];
                let vectorCounter = 0;
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  if (!bossShot[l].alive) {
                    if (boss[b].type == 0) {
                      bossShot[l].set({
                        x: B_saba,
                        y: boss[b].position.y
                      }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      // console.log(vectorCounter,bossShot[l]);
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
                //console.log("a");
                vectorCounter = 0;
                for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
                  if (!bossShot2[k].alive) {
                    if (boss[b].type == 0) {
                      bossShot2[k].set({
                        x: B_sabb,
                        y: boss[b].position.y
                      }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      // console.log(vectorCounter,bossShot[k]);
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
              }
            }
          }
          ctx.fillStyle = 'rgba(255,183,76,0.9)';
          ctx.beginPath();
          for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
            if (bossShot[l].alive) {
              bossShot[l].move();
              ctx.arc(
                bossShot[l].position.x,
                bossShot[l].position.y,
                bossShot[l].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.beginPath();
          for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
            if (bossShot2[k].alive) {
              bossShot2[k].move();
              ctx.arc(
                bossShot2[k].position.x,
                bossShot2[k].position.y,
                bossShot2[k].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //Bossshot----------------------------------
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              if (bosscounter % 25 == 0) {
                let Vectors = [{
                  x: 1,
                  y: 0
                }, {
                  x: -1,
                  y: 0
                }];
                let vectorCounter = 0;
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  vectorCounter = 0;
                  if (bossShot[l].alive) {
                    for (h = 0; h < BOSS_SHOT2_MAX_COUNT; h++) {
                      if (!bossShot3[h].alive) {
                        if (boss[b].type == 0) {
                          if (vectorCounter >= Vectors.length) break;
                          bossShot3[h].set(bossShot[l].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                          vectorCounter++;
                          // console.log(vectorCounter,bossShot[l]);
                        }
                      }
                    }
                  }
                }
                //console.log("a");
                vectorCounter = 0;
                for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
                  vectorCounter = 0;
                  if (bossShot2[k].alive) {
                    for (u = 0; u < BOSS_SHOT2_MAX_COUNT; u++) {
                      if (!bossShot4[u].alive) {
                        if (boss[b].type == 0) {
                          if (vectorCounter >= Vectors.length) break;
                          bossShot4[u].set(bossShot2[k].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                          vectorCounter++;
                          // console.log(vectorCounter,bossShot[k]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (h = 0; h < BOSS_SHOT_MAX_COUNT; h++) {
            if (bossShot3[h].alive) {
              bossShot3[h].move();
              ctx.arc(
                bossShot3[h].position.x,
                bossShot3[h].position.y,
                bossShot3[h].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.beginPath();
          for (u = 0; u < BOSS_SHOT2_MAX_COUNT; u++) {
            if (bossShot4[u].alive) {
              bossShot4[u].move();
              ctx.arc(
                bossShot4[u].position.x,
                bossShot4[u].position.y,
                bossShot4[u].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //Bossmain-------------------------------------------
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              ctx.arc(
                boss[b].position.x,
                boss[b].position.y,
                boss[b].size,
                0, Math.PI * 2, false
              );
              ctx.arc(
                B_saba,
                boss[b].position.y,
                boss[b].size / 4 * 3,
                0, Math.PI * 2, false
              );
              ctx.arc(
                B_sabb,
                boss[b].position.y,
                boss[b].size / 4 * 3,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
        }; //Boss3
        if (B_SABHP == 2) {
          //Bossshot----------------------------------
          bosscounter++;
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) // continue;
            { /*boss[b].param++;*/
              if ( /*SHOT_*/ bosscounter % 50 == 0) {
                /*a = boss[b].position.distance(chara.position);
                a.normalize();*/
                let Vectors = [{
                  x: 1,
                  y: 0
                }, {
                  x: -1,
                  y: 0
                }, {
                  x: 0,
                  y: 1
                }, {
                  x: 0,
                  y: -1
                }, {
                  x: 1,
                  y: 0.5
                }, {
                  x: 0.5,
                  y: 1
                }, {
                  x: 1,
                  y: -0.5
                }, {
                  x: 0.5,
                  y: -1
                }, {
                  x: -1,
                  y: 0.5
                }, {
                  x: -0.5,
                  y: 1
                }, {
                  x: -1,
                  y: -0.5
                }, {
                  x: -0.5,
                  y: -1
                }];
                let vectorCounter = 0;
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  if (!bossShot[l].alive) {
                    if (boss[b].type == 0) {
                      bossShot[l].set(boss[b].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      // console.log(vectorCounter,bossShot[l]);
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
                //console.log("a");
              }
              if ( /*SHOT_*/ bosscounter % 100 == 0) {
                a = boss[b].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: 1,
                  y: 1,
                  size: 8,
                  speed: 4
                }, {
                  x: 1,
                  y: -1,
                  size: 8,
                  speed: 4
                }, {
                  x: -1,
                  y: 1,
                  size: 8,
                  speed: 4
                }, {
                  x: -1,
                  y: -1,
                  size: 8,
                  speed: 4
                }, {
                  x: a.x,
                  y: a.y,
                  size: 8,
                  speed: 4
                }];
                let vectorCounter = 0;
                for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
                  if (!bossShot2[k].alive) {
                    if (boss[b].type == 0) {
                      bossShot2[k].set(boss[b].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
                      vectorCounter++;
                      // console.log(vectorCounter,bossShot[k]);
                      if (vectorCounter >= Vectors.length) break;
                    }
                  }
                }
                //console.log("a");
              }
            }
          }
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
            if (bossShot[l].alive) {
              bossShot[l].move();
              ctx.arc(
                bossShot[l].position.x,
                bossShot[l].position.y,
                bossShot[l].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          ctx.fillStyle = BOSS_SHOT2_COLOR;
          ctx.beginPath();
          for (k = 0; k < BOSS_SHOT2_MAX_COUNT; k++) {
            if (bossShot2[k].alive) {
              bossShot2[k].move();
              ctx.arc(
                bossShot2[k].position.x,
                bossShot2[k].position.y,
                bossShot2[k].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //Bossmain-------------------------------------------
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              boss[b].move();
              ctx.arc(
                boss[b].position.x,
                boss[b].position.y,
                boss[b].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
        }; //Boss2
        if (B_SABHP == 1) {
          //bossshot--------------------------
          ctx.fillStyle = BOSS_SHOT_COLOR;
          ctx.beginPath();
          for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
            if (bossShot[l].alive) {
              bossShot[l].move();
              ctx.arc(
                bossShot[l].position.x,
                bossShot[l].position.y,
                bossShot[l].size,
                0, Math.PI * 2, false
              );
              ctx.closePath();
            }
          }
          ctx.fill();
          //bossmain------------------------------
          ctx.fillStyle = BOSS_COLOR;
          ctx.beginPath();
          for (b = 0; b < BOSS_MAX_COUNT; b++) {
            if (boss[b].alive) {
              boss[b].move();
              ctx.arc(
                boss[b].position.x,
                boss[b].position.y,
                boss[b].size,
                0, Math.PI * 2, false
              );
              /*boss[b].param++;*/
              if ( /*SHOT_*/ bosscounter % 30 == 0) {
                a = boss[b].position.distance(chara.position);
                a.normalize();
                let Vectors = [{
                  x: a.x,
                  y: a.y,
                  size: 5,
                  speed: 1.25
                }];
                let vectorCounter = 0;
                for (l = 0; l < BOSS_SHOT_MAX_COUNT; l++) {
                  if (!bossShot[l].alive) {
                    if (boss[b].type == 0) {
                      bossShot[l].set(boss[b].position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3);
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
        }; //Boss1
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.font = "40px 'Rounded Mplus 1c', 'Open Sans', 'Noto Sans Japanese', 'Yu Gothic', 'Meiryo UI', sans-serif";
    ctx.fillText("Life / " + life, 0, screenCanvas.height - 35 - 40);
    ctx.fillText("Score / " + score, 0, screenCanvas.height - 35);
    ctx.closePath();
    // info.innerText = "score : " + score + " || " + "Life : " + life + "\\" + B_SABHP;
    //info_2.innerText = "boss : " + B_COUNT + " || " + "B_HP : " + B_HP;
    //COLOR--------------------
    var B_par = B_HP / 400;
    var B_parc = B_par * 255;
    var C_par = life / 5;
    var C_parc = C_par * 255;
    //HPBer--------------------------------------------------------------------------------------- 
    //ctx.strokeStyle = BOSS_COLOR;    
    if (B_SABHP >= 3) {
      ctx.fillStyle = 'rgba(0,0,' + (B_parc) + ',0.5)';
    } //'rgba(' + (B_parc) + ',' + (B_parc) + ',' + (B_parc) + ',1)';
    else {
      ctx.fillStyle = 'rgba(' + (B_parc) + ',' + (B_parc) + ',0,0.5)';
    }
    ctx.beginPath();
    ctx.fillRect(0, 0, B_par * screenCanvas.width, 30);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = CHARA_COLOR;
    ctx.beginPath();
    ctx.fillRect(0, screenCanvas.height - 20, C_par * screenCanvas.width, 20);
    ctx.stroke();
    ctx.closePath();
    if (B_SABHP == 4) {
      if (B_HP <= 200) {
        B_SABHP = 3;
        score += 100
      }
    }
    if (B_SABHP == 3) {
      if (B_chenge && B_HP >= 0) {
        B_sab();
      }
      if (B_HP <= 0) {
        B_SABHP = 2;
        score += 150;
        BOSS_MAX_COUNT = 1;
        B_HP = 400;
        boss[0].alive = false;
        ChangeColor();
        B_chenge = true;
      }
    }
    if (B_SABHP == 2) {
      JIKIshotpar = 15;
      B_COUNT = "式神";
      if (B_chenge) {
        B_HP = 400;
      }
      setTimeout(function () {
        B_chenge = false
      }, 100);
      if (B_HP <= 200) {
        B_SABHP = 1;
        score += 200
      }
    }
    if (B_SABHP == 1) {
      if (B_HP <= 0) {
        B_SABHP = 0;
        score += 250;
        BOSS_MAX_COUNT = 0;
        B_HP = 0;
      }
    }

    if (Game_count == 0 && score >= 1000) {
      Game_count == 1;
    }

    if (life < 0) ShowGameover("score || " + score);
    else requestAnimationFrame(arguments.callee);
    if (BOSS_MAX_COUNT <= 0) ShowClear("GAME CLEAR\nscore||" + score);


  })();
};
//ope-2 -----------------------------------------------------------------
function B0() {
  B_SABHP = 1;
  B_HP = 0;
}

function B1() {
  B_SABHP = 1;
}

function B2() {
  B_SABHP = 2;
}

function B3() {
  B_SABHP = 3;
}

function B4() {
  B_SABHP = 4;
}

function B_sab() {
  B_saba = screenCanvas.width / 2;
  B_sabb = screenCanvas.width / 2;
  setTimeout(function () {
    B_chenge = false
  }, 1)
}
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
    cca = true;
  }
  if (ck === 96)
    slow = true;

  if (event.shiftKey && event.ctrlKey) {
    ccs = true;
  }
  if (ck === 97) {
    key1 = true;
  }
  if (ck === 99) {
    if (key1) {
      if (c13 == true) {
        c13 = false;
      } else if (c13 == false) {
        c13 = true;
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
  if (ck === 100) {
    key4 = true;
  }
  if (ck === 102) {
    key6 = true;
  }
  if (key4) {
    if (key6) {
      if (ck === 48) {
        B0()
      }
      if (ck === 49) {
        B1()
      }
      if (ck === 50) {
        B2()
      }
      if (ck === 51) {
        B3()
      }
      if (ck === 52) {
        B4()
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
    slow = false;
    return;
  }
  // チート
  if ((ck === 17) && (18)) {
    cca = false;
  }
  if (ck === 16 && 17) {
    ccs = false;
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
  if (ck === 100) {
    key4 = false;
  }
  if (ck === 102) {
    key6 = false;
  }
  Key = 0;
}

function ChangeColor() {
  if (invincible) {
    CHARA_COLOR = 'rgba(50, 255, 50, 0.5)';
  } else if (c13ting) {
    CHARA_COLOR = 'rgba(35, 71, 130,1)'; //'rgba(50, 50, 255, 1)';
  } else CHARA_COLOR = 'rgba(0,0,0,1)';
  if (B_SABHP <= 2) {
    BOSS_COLOR = 'rgba(255,255,0,1)', BOSS_SHOT_COLOR = 'rgba(50,50,255,0.88)';
  }
  if (slow) {
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