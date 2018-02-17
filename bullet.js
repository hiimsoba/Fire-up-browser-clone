class bullet {
  constructor(x, y, damage) {
    this.x = x ;
    this.y = y ;
    this.vel = 15 ;
    this.r = 5 ;
    this.dmg = damage ;
  }

  hit_enemy(enemy) {
    return this.x + this.r / 2 > enemy.x - enemy.w / 2 &&
           this.x - this.r / 2 < enemy.x + enemy.w / 2 &&
           this.y + this.r / 2 > enemy.y - enemy.h &&
           this.y - this.r / 2 < enemy.y + enemy.h ;
  }

  offscreen() {
    return this.y < 0 ;
  }

  update() {
    this.y -= this.vel ;
  }

  show() {
    this.update() ;
    fill(255) ;
    noStroke() ;
    ellipse(this.x, this.y, this.r * 2) ;
  }
}
