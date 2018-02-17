class player {
  constructor() {
    this.x = width / 2 ;
    mouseX = this.x ;
    this.y = height * 0.925 ;
    this.w = width / 7 ;
    this.h = 30 ;
  }

  collided_with_enemy() {
    return false ;
  }

  update() {
    this.x = constrain(mouseX, this.w / 2, width - this.w / 2) ;
    bullets.push(new bullet(this.x, this.y, p_damage)) ;
  }

  show() {
    this.update() ;
    rectMode(CENTER) ;
    fill(255) ;
    rect(this.x, this.y, this.w, this.h) ;
  }
}
