let p ;
let enemy_width ;
let enemy_height = 40 ;
let enemy_count = 4 ;
let lastTime ;
let setTime = 5 * 1000 ;
let p_damage = 10 ;

let bullets = [] ;
let enemies = [] ;

let gameover = false ;
let dmg_increment = 2 ;

let max_enemies = 6 ;

let rate = 0.375 ;

let score = 0 ;

let SI_PREFIXES = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number){
    let tier = Math.log10(number) / 3 | 0;
    if(tier == 0) return number;
    let prefix = SI_PREFIXES[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    return scaled.toFixed(1) + prefix;
}

function createEnemies() {
  evel *= 1.01 ;
  let health = floor(random() * p_damage * 1000 * rate) ;
  let clr = [random(75, 255), random(100), random(75, 220)] ;
  for(let i = 0 ; i < enemy_count ; i++) {
    enemies.push(new enemy(i * enemy_width + enemy_width / 2 - 1, -enemy_height, health, clr)) ;
  }
}

function setup() {
  createCanvas(500, 700) ;
  p = new player() ;
  enemy_width = width / enemy_count ;
  createEnemies() ;
  lastTime = millis() ;
}

function draw() {
  if(gameover) {
    gameOver() ;
  }
  else {
    background(0) ;

    p.show() ;

    for(let i = bullets.length - 1 ; i >= 0 ; i--) {
      if(bullets[i].offscreen()) {
        bullets.splice(i, 1) ;
      }
      else {
        bullets[i].show() ;
        for(let j = enemies.length - 1 ; j >= 0 ; j--) {
          if(bullets[i] && bullets[i].hit_enemy(enemies[j])) {
            enemies[j].health -= bullets[i].dmg ;
            score += bullets[i].dmg ;
            bullets.splice(i, 1) ;
            if(enemies[j].isDead()) {
              enemies.splice(j, 1) ;
              p_damage += dmg_increment ;
              dmg_increment += 2 ;
            }
          }
        }
      }
    }

    for(let i = enemies.length - 1 ; i >= 0 ; i--) {
      enemies[i].show() ;
      if(enemies[i].y > height + enemies[i].h) {
        enemies.splice(i, 1) ;
      }
      else if(enemies[i].y + enemies[i].h / 2 > p.y - p.h / 2 &&
              enemies[i].y - enemies[i].h / 2 < p.y + p.h / 2 &&
              enemies[i].x + enemies[i].w / 2 > p.x - p.w / 2 &&
              enemies[i].x - enemies[i].w / 2 < p.x + p.w / 2) {
        gameover = true ;
      }
    }

    if(millis() - lastTime >= setTime) {
      createEnemies() ;
      lastTime = millis() ;
      setTime *= 0.995 ;
      if(random() < 0.1 && enemy_count < max_enemies) {
        enemy_count++ ;
        enemy_width = width / enemy_count ;
      }
    }

    fill(100, 200, 75) ;
    textSize(24) ;
    text("Score : " + abbreviateNumber(score), 90, 40) ;
  }
}

function gameOver() {
  background(0) ;
  fill(255, 0, 0) ;
  textSize(64) ;
  textAlign(CENTER) ;
  text("GAME OVER!", width / 2, height * 0.44) ;
  textSize(48) ;
  text("Score : " + abbreviateNumber(score), width / 2, height * 0.55) ;
  fill(255) ;
  textSize(32) ;
  text("Press 'R' to reset the game!", width / 2, height * 0.75) ;
}

function keyPressed() {
  if(gameover && keyCode == 82) {
    resetgame() ;
  }
}

function resetgame() {
  enemy_height = 40 ;
  enemy_count = 4 ;
  enemy_width = width / enemy_count ;
  lastTime = millis() ;
  setTime = 5 * 1000 ;
  p_damage = 10 ;

  bullets = [] ;
  enemies = [] ;

  gameover = false ;
  dmg_increment = 2 ;

  score = 0 ;

  createEnemies() ;
}
