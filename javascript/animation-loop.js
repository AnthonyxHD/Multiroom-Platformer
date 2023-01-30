/*__________Reference Settings__________*/
//object which change every level
let parsedCollissions 
let collisionBlocks
let background
let doors

//levels
let level = 1 //starting level
let levels = {
    //level 1
    1: {
        init: () => {
            //create: collission level 1
            parsedCollissions = collisionslevel1.parsed2D();
            //create: collission-arrays level 1
            collisionBlocks = parsedCollissions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks
            //changes player position
            player.position.x = 125
            player.position.y = 320
            //allows to move
            if (player.currentAnimation) player.currentAnimation.isActive = false
            //create: sprite level 1
            background = new Sprite ({ //object for Sprite
                position: {x: 0, y: 0}, //position
                imageSrc: './img//rooms/princessRoom.png' //img path
            });
            //create: doors level 1
            doors = [
                new Sprite({
                    position: {
                        x:595, 
                        y: 270,},
                    imageSrc: './img/doors/doorPrincessRoomOpening.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false, //loop just once
                    autoplay: false, //activates when wanted
                })
            ];
        }
    },
    //level 2
    2: {
        init: () => {
            //create: collission level 2
            parsedCollissions = collisionslevel2.parsed2D();
            //create: collission-arrays level 2
            collisionBlocks = parsedCollissions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks
            //changes player position
            player.position.x = 96
            player.position.y = 140
            //allows to move again
            if (player.currentAnimation) player.currentAnimation.isActive = false
            //create: sprite level 2
            background = new Sprite ({ //object for Sprite
                position: {x: 0, y: 0}, //position
                imageSrc: './img/backgroundLevel2.png' //img path
            });
            //create: doors level 2
            doors = [
                new Sprite({
                    position: {
                        x:772, 
                        y: 336,},
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false, //loop just once
                    autoplay: false, //activates when wanted
                })
            ];
        }
    },
    3: {
        init: () => {
            //create: collission level 3
            parsedCollissions = collisionslevel3.parsed2D();
            //create: collission-arrays level 3
            collisionBlocks = parsedCollissions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks
            //changes player position
            player.position.x = 750
            player.position.y = 230
            //allows to move again
            if (player.currentAnimation) player.currentAnimation.isActive = false 
            //create: sprite level 3
            background = new Sprite ({ //object for Sprite
                position: {x: 0, y: 0}, //position
                imageSrc: './img/backgroundLevel3.png' //img path
            });
            //create: doors level 3
            doors = [
                new Sprite({
                    position: {
                        x:176, 
                        y: 335,},
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false, //loop just once
                    autoplay: false, //activates when wanted
                })
            ];
        }
    },
};

//create: player
const player = new Player({
    imageSrc: './img/king/idle.png', //img path
    frameRate: 11, 
    animations: { //animation library
        idleRight: {
            frameRate: 11, //quantity of animation images
            frameBuffer: 6, //speed of changing images
            loop: true, //activates automatically
            imageSrc: './img/king/idle.png', //img path,
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 6,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 12,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => { //when animation is compleated change level
                console.log('completed animation')
                gsap.to(overlay, { //go from one value to another
                    opacity: 1, //opacity animation
                    onComplete: () => { //change level
                        level++

                        if (level === 4) level = 1

                        levels[level].init();
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })
                    },
                }) 
            }
        }
    }
}); 

//create: controlls
const keys = { //controll default settings > allows pressing multiple keys
    w: {pressed: false},
    a: {pressed: false},
    d: {pressed: false}
};

//create: overlay
const overlay = {
    opacity: 0,
}

/*__________Main Game__________*/
//animation-loop function
function animate() {
    window.requestAnimationFrame(animate); //frame-request update - keeps runing until told to stop
    
    /*__________Levels__________*/
    background.draw();
    //activate if collisions should be visivle
/*  collisionBlocks.forEach(collisionBlock => { 
        collisionBlock.draw();
    }) */

    //door
    doors.forEach(door => {
        door.draw();
    })

    /*__________Player__________*/
    player.velocity.x = 0 //when nothing is pressed, player doesn't move
    player.handleInput(keys);
    player.draw();
    player.update();

    c.save(); //only does the code within save and restore
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore()
};

levels[level].init();
animate();

