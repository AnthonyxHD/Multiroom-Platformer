/*__________Utilities__________*/
//transforms data from 'Tiled' into an 2d-array
Array.prototype.parsed2D = function() { 
    const rows = []
    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16))
    };
    return rows
};

//visualisation from arrays
Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292 || symbol === 250) { //when 292 - collision is detected
                objects.push(new CollisionBlock({ //push a new collision into collisionblock array
                    position: {x: x * 64, y: y * 64} //block size > fills whole block with collision-detection
                }))
            };
        });
    });
    return objects
};

