/*__________Player Settings__________*/
class Player extends Sprite { //let us use the Sprite drawing method
    constructor({ //sets properties associated with Player
            collisionBlocks = [], 
            imageSrc, 
            frameRate , 
            animations,
            loop,}) { 
        super({imageSrc, frameRate, animations, loop}) //calls Sprite constructor
        this.position = { x: 200, y: 200} //defined start-point
        this.velocity = {x: 0, y: 0} //player velocity down and sideways
        this.sides = {
            bottom: this.position.y + this.height, //underside Player
        };
        this.gravity = 1 //speed of gravity
        this.collisionBlocks = collisionBlocks //collision
    };
    update() { //update variables for player
        //renders out image (blue box)
        //c.fillStyle = 'rgba(0, 0, 255, 0.5'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.position.x += this.velocity.x //moves to the right or left
        //methods
        this.updateHitbox();

        this.checkForHorizontalCollisions();
        this.applyGravity();

        this.updateHitbox();
        //c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height); //renders out hitbox (blue box)

        this.checkForVerticalCollisions();
    };
    
    //methods
    handleInput(keys) { //player animations while giving input through eventlisteners
        if (this.preventInput) return //when Player can not use eventlisteners, code should not be executed
        if (keys.d.pressed) {
            this.switchSprite('runRight'); //changes Player image
            this.velocity.x = 5 //changes Player velocity
            this.lastDirection = 'right' //view direction when stopping motion
        } else if (keys.a.pressed) {
            this.switchSprite('runLeft');
            this.velocity.x = -5
            this.lastDirection ='left'
        } else {
            if (this.lastDirection === 'left')  this.switchSprite('idleLeft'); //standing viewing left
            else this.switchSprite('idleRight'); //standing viewing right
        }
    };
    switchSprite(name) { 
        if (this.image === this.animations[name].image) return //when correct image do nothing
        this.currentFrame = 0
        this.image = this.animations[name].image //switch image
        this.frameRate = this.animations[name].frameRate //switch frames
        this.frameBuffer = this.animations[name].frameBuffer // switch buffer
        this.loop = this.animations[name].loop //if loop is false, then animate just once
        this.currentAnimation = this.animations[name] //when opening door is completed change level
    };
    
    updateHitbox() {
        this.hitbox = { //crops Player image, defines hitbox
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34,
            },
            width:  50,
            height: 54,
        };
    };
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists - checks all sides
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && //player: left - block: right
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x && //player: right - block: left
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && //player: bottom - block: top
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {//player: top - block: bottom 
                //collision going to the left
                if (this.velocity.x < -0) { 
                    const offset = this.hitbox.position.x - this.position.x //reduces from big box to hitbox
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01 
                    break};
                //collision going to the right
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width //reduces from big box to hitbox
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break};
            };
        };
    };
    applyGravity() {
        this.velocity.y += this.gravity //downwards movements getting faster
        this.position.y += this.velocity.y //gravity effekt > gets faster every frame
    };
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            //if collision exists - checks all sides
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && //player: left - block: right
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x && //player: right - block: left
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y && //player: bottom - block: top
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {//player: top - block: bottom 
                //collision jumping top
                if (this.velocity.y < 0) { 
                    this.velocity.y = 0 //resets gravity addition
                    const offset = this.hitbox.position.y - this.position.y //reduces from big box to hitbox
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break};
                //collision jumping bottom
                if (this.velocity.y > 0) {
                    this.velocity.y = 0 //resets gravity addition
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height //reduces from big box to hitbox
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break};
            };
        };
    };
};



