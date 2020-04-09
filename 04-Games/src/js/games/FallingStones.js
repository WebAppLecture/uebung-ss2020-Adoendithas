import { GameTemplate } from "./GameTemplate.js"
import { GameObject, MovableGameObject, Ball } from "../GameObject.js";

export class FallingStones extends GameTemplate {

    start() {
        this.player = new MovableGameObject(175, 430, 50, 50, "#6bd26b", 0, 0);
        this.gameOver = false;
        this.points = 0;
        this.life = 5;
        this.bullets = [];
        this.stones = [];
        this.stonecount = 0;
        this.shotcd = 30;
        this.colors = {death:"#180b1d", health:"#c470b3", bonus:"#ba9714", strong:"#db0303"};
    }

    
    bindControls() {
        this.inputBinding = {  
            "left": () => this.player.x += -(18+this.bonusPlayerSpeed),
            "right": () => this.player.x += (18+this.bonusPlayerSpeed),
            "up": () => this.create_balls(),
        };
    }

    create_balls() {
        if (this.shotcd >= 20) {
            var bcolor;
            if (Math.random() > 0.91) {
                bcolor=this.colors["strong"]
            }
            else {
               bcolor="#6bd26b";
            }
        this.create_entity(Ball, "bullet", this.player.x+25-this.projecSize/2, this.player.y-10, bcolor, 7);
        this.shotcd;
        }
    }

    create_entity(category, type, xpos, ypos, color, speed) {
        var create = 1;
        switch (type) {
            case "stone":
            case "bonus":
            case "death":
                this.stonecount +=1; 
            case "health":
                var object = this.stones;
                var w = 50;
                var h = 100;
            break;
            case "bullet":
                    var object = this.bullets;
                    var w = this.projecSize;
                    var h = this.projecSize;
                    var speed = -7;
                    this.shotcd = 0;
            break;
        }
        object.push( new category(xpos, ypos, w, h, color, 0, speed));
    }
    
    update(ctx) {
        this.shotcd++;
        this.player.update(ctx);
        this.update_stones(ctx);
        this.update_projectiles(ctx);
        this.checklife();
        this.increasingDiff();
    }


    update_stones(ctx) {
        for (var i in this.stones) {
            this.stones[i].update(ctx);

            // vorbeigefallen
            if((this.stones[i].y + this.stones[i].height > ctx.canvas.height)) {
                // Todesstein:
                if (this.stones[i].color == this.colors["death"]) {
                    this.life -=1;  // Insgesamt -2
                    this.points -=3;
                }
                delete this.stones[i];
                this.stonecount -=1;
                this.life -=1;
                this.points -=1;
            } 
        }
        //create Stones:
        if ((Math.random() > 0.98) && this.stonecount < (5+ this.bonusStones)) {
            var spawn = Math.random()*(ctx.canvas.width-45);
            var speed = this.StoneSpeedMin+Math.random()*this.StoneSpeedMax;
            if (Math.random() > 0.96) {
                //healstone:
                this.create_entity(MovableGameObject, "health", spawn, 0, this.colors["health"], speed*0.8);
            }
            else if (Math.random() > 0.93) {
                //BonusPointStone:
                this.create_entity(MovableGameObject, "bonus", spawn, 0, this.colors["bonus"], speed*1.3); 
            }
            else if (Math.random() > 0.96) {
                //DeathStone:
                this.create_entity(MovableGameObject, "death", spawn, 0, this.colors["death"], speed*1.15); 
            }
            else {
                this.create_entity(MovableGameObject, "stone", spawn, 0, "#215221", speed);      
            }
        }
    }
    
    update_projectiles(ctx) {
        for (var i in this.bullets) {
            this.bullets[i].update(ctx);

            //Löschen
            if(this.bullets[i].y < 0) { // rausgeschossen
                delete this.bullets[i];
            }
            
            //Steinkollision
            for (var j in this.stones) {
                if (GameObject.rectangleCollision(this.bullets[i], this.stones[j])) {
                    // Bonus-Stein?
                    if (this.stones[j].color == this.colors["bonus"]) {
                        this.points +=5*this.PointsMultiplier;
                    } //health
                    if (this.stones[j].color == this.colors["health"]) {
                        this.life +=1;
                    }
                    if (this.bullets[i].color == this.colors["strong"] ) {

                    }
                    else {
                        delete this.bullets[i];
                    }
                    delete this.stones[j];   
                    this.stonecount -= 1;
                    this.points += 2*this.PointsMultiplier;             
                }
            }

        }
    }

    increasingDiff() {
        this.bonusPlayerSpeed += 0.0001;
        this.bonusStones += 1/5000;
    }

    checklife() {
        if (this.life <= 0) {
            this.gameOver=true;
            var ms = 5+1*this.bonusStones;
            var bps = 18+1*this.bonusPlayerSpeed;
            console.log("Maxstones:"+ms+" Speed:"+bps);
            this.gameOverText=["Game Over!","Points:"+this.points, "Again: (´A´ Key)"];
        }

    }


    draw(ctx) {
        this.player.draw(ctx);
        this.draw_stones(ctx);
        this.draw_projectiles(ctx);
        this.drawPoints(ctx);
        this.drawLife(ctx);
    }

    drawPoints(ctx) {
        ctx.fillStyle = "#6bd26b";
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.fillText("Points: "+this.points, 32, this.player.y+51);
    }

    drawLife(ctx) {
        ctx.fillStyle = "#6bd26b";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Life: "+this.life, this.player.x+20, this.player.y-7);
    }


    draw_projectiles(ctx) {
        for (var ball in this.bullets) {
            this.bullets[ball].draw(ctx);
        }
    }

    draw_stones(ctx) {
        for (var stone in this.stones) {
            this.stones[stone].draw(ctx);
        }
    }

    static get NAME() {
        return "Falling Stones";
    }

    static get MODES() {
        return [
            {
                NAME:"easy", 
                parameters: {
                    "bonusPlayerSpeed": 0,
                    "bonusStones": 0,
                    "projecSize": 20,
                    "StoneSpeedMin": 0.8,
                    "StoneSpeedMax": 2.2,
                    "PointsMultiplier": 1,
                },
            },{
                NAME: "medium", 
                parameters: {
                    "bonusPlayerSpeed": 1.5,
                    "bonusStones": 1,
                    "projecSize": 15,
                    "StoneSpeedMin": 1,
                    "StoneSpeedMax": 2.5,
                    "PointsMultiplier": 1.5,
                },
            },{
                NAME: "hard", 
                parameters: {
                    "bonusPlayerSpeed": 3,
                    "bonusStones": 2,
                    "projecSize": 10,
                    "StoneSpeedMin": 1.3,
                    "StoneSpeedMax": 2.7,
                    "PointsMultiplier": 2,
                },
            },
        ];
    }

}
