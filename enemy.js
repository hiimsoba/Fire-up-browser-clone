class enemy {
  constructor(x, y, health, clr) {
    this.x = x ;
    this.y = y ;
    this.h = enemy_height ;
    this.w = enemy_width ;
    this.health = health ;
    this.init_health = health ;
    this.vel = evel ;
    this.clr = clr ;
  }

  update() {
    this.y += this.vel ;
    this.c = color(this.clr[0], this.clr[1], this.clr[2], map(this.health, 0, this.init_health, 50, 255)) ;
  }

  isDead() {
    return this.health <= 0 ;
  }

  show() {
    this.update() ;
    rectMode(CENTER) ;
    textAlign(CENTER) ;
    fill(this.c) ;
    rect(this.x, this.y, this.w, this.h) ;
    fill(0) ;
    textSize(16) ;
    text(abbreviateNumber(this.health), this.x, this.y + 6) ;
  }
}

let evel = 1.5 ;
