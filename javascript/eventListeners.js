/*__________Controlls__________*/
//responds when key is pressed
window.addEventListener('keydown', (event) => {
    if (player.preventInput) return //prevents the use of eventlisteners
    switch (event.key) {
        case 'w': //when 'w' is pressed > jumg
            for (let i = 0; i < doors.length; i++) { //activates when using door
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width && //player: left - block: right > middle door
                    player.hitbox.position.x >= door.position.x && //player: right - block: left > middle door
                    player.hitbox.position.y + player.hitbox.height >= door.position.y && //player: bottom - block: top > middle door
                    player.hitbox.position.y <= door.position.y + door.height) //player: top - block: bottom > middle door
                    { 
                        player.velocity.x = 0 //player stays put when interacting with door
                        player.velocity.y = 0
                        player.preventInput = true //player can not move while intercting with door
                        player.switchSprite('enterDoor') //entering door animation
                        door.play() //apening door animation
                        return //does not carry out jumping animation
                    } 
                }; 
            if (player.velocity.y === 0) player.velocity.y = -25 //jump x-pixels when we aren't moving (doesn't include perfect moment at 0 movement in the air)
            break
        case 'a': //when 'a' pressed > move left
            keys.a.pressed = true //moves x-pixels to the left
            break
        case 'd': //when 'd' pressed > move right
            keys.d.pressed = true //moves x-pixels to the right
            break
    };
});

//responds when key is no more pressed
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a': //when 'a' not pressed
            keys.a.pressed = false //stops moving left
            break
        case 'd': //when 'd' not pressed
            keys.d.pressed = false //stops moving right
            break
    };
});