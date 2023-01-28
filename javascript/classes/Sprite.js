/*__________Sprite Settings__________*/
class Sprite { //genereic object for images
    constructor({ //sets properties associated with Sprite
            position, 
            imageSrc, 
            frameRate = 1, 
            animations, 
            frameBuffer = 2, 
            loop = true,
            autoplay = true,}) 
    { 
        this.position = position //img position
        this.image = new Image() //inserts an Image
        this.image.onload = () => { //when img loads it changes to 'true', determins if img was renderd out
            this.loaded = true
            this.width = this.image.width / this.frameRate //allows use of multiple images of Player
            this.height = this.image.height //Player height
        };
        this.image.src = imageSrc //load img from source-file
        this.loaded = false //determins if img was loaded fully
        this.frameRate = frameRate //makes frames dynamic
        this.currentFrame = 0 //starting frame number
        this.elepsedFrames = 0 //adding frames
        this.frameBuffer = frameBuffer //animation speed
        this.animations = animations //animation library within creating neew objects
        this.loop = loop //defines when animation should be looped
        this.autoplay = autoplay //defines if loops starts automatically
        this.currentAnimation //when opening door is completed change level

        if (this.animations) { //if animation library exists
            for(let key in this.animations) { //rund thorug animation library
                const image = new Image()
                image.src = this.animations[key].imageSrc 
                this.animations[key].image = image //assigns a path
            };
        };
    };
    draw() { //sprite looks - method
        if (!this.loaded) return //when img is fully loaded
        const cropbox = { //crop image Player
            position: {
                x: this.width * this.currentFrame, //changes frame from image Player for animation effect
                y: 0},
            width: this.width,
            height: this.height 
        };

        c.drawImage( //draw img
            this.image, 
            cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, //cropbox size
            this.position.x, this.position.y, this.width, this.height)  //image size
        
        this.updateFrames()
    };

    //methods
    play() { //plays animation when wanted
       this.autoplay = true 
    }

    updateFrames() {
        if (!this.autoplay) return //when autoplay is not true, frames should not be added
        this.elepsedFrames++

        if (this.elepsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++ //only loops throug defined frameRate
            else if (this.loop) this.currentFrame = 0
        };
        if (this.currentAnimation?.onComplete) {//if currentAnimation exists, do function
            if (this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive) { //looks if animation has finished and is active
                this.currentAnimation.onComplete();
                this.currentAnimation.isActive = true //loops just once
            };
        };
    };
};