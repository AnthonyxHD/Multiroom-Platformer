/*__________Collision-Block__________*/
class CollisionBlock {
    constructor({position}) { //sets properties associated with CollisionBlock
        this.position = position //defined position
        this.width = 64 //defined CollisionBlock width
        this.height = 64 //defined CollisionBlock height
    };
    draw() { //collisionblocks looks - method
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    };
};