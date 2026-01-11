let backround = sprites.create(assets.image`starBackround`, SpriteKind.Player);
let rocket = sprites.create(assets.image`rocket`, SpriteKind.Player);
let meteor = sprites.create(assets.image`rock`, SpriteKind.Projectile);

info.setLife(3);
let life = 3

info.setScore(100);
let score = 100;

let backroundY = 60;
let backroundX = 80;

let rocketX = 80;
let rocketY = 90;
let rocketTimer = 0;
let rocketAnimation = 100;

let difficulty = 0.01;

let meteorX = 80;
let meteorY = -10;
let meteorSize = 1;

backround.setPosition(backroundX, backroundY);
rocket.setPosition(rocketX, rocketY);
meteor.setPosition(meteorX, meteorY);
meteor.setScale(meteorSize);

function RanMeteorPos() {

    meteorX = randint(5, 155);

}

function RanMeteorSize() {

    meteorSize = randint(5, 25) / 10;
    meteor.setScale(meteorSize);

}

function UpdateAllPos() {

    info.onLifeZero(function() {

        game.setGameOverEffect(false, effects.smiles)
        game.gameOver(false)
    })

    if (rocket.overlapsWith(meteor)) {

        info.changeLifeBy(-1);
        life -= 1;

        meteorY = -10;
        meteor.setPosition(meteorX, meteorY);

    }

    //rocket animation
    if (rocketTimer < 1) {



        rocketTimer = 100;

        if (rocketAnimation == 0) {

            rocketAnimation = 1;

        } else {

            rocketAnimation = 0;

        }


    } else if (rocketAnimation == 0) {


        rocket.setImage(assets.image`rocket0`);
        rocketTimer -= 3;

    } else if (rocketAnimation == 1) {

        rocket.setImage(assets.image`rocket`);
        rocketTimer -= 3;

    }

    //controller system
    if (controller.player1.isPressed(ControllerButton.Left)) {

        if (rocketX > 5) {

            rocketX -= 2;
            rocket.setPosition(rocketX, rocketY);

        }

    }

    if (controller.player1.isPressed(ControllerButton.Right)) {

        if (rocketX < 155) {

            rocketX += 2;
            rocket.setPosition(rocketX, rocketY);

        }

    }

    //meteor "ai"
    if (meteorY <= -10) {

        RanMeteorPos();
        RanMeteorSize();

        meteorY = 0;
        meteor.setPosition(meteorX, meteorY);

    } else if (meteorY >= 125) {

        info.changeScoreBy(1);
        score += 1;
        difficulty += 0.01;

        meteorY = -10;
        meteor.setPosition(meteorX, meteorY);

    } else {

        meteorY += 2 + difficulty;
        meteor.setPosition(meteorX, meteorY);

    }



    //backround scroll
    if (backroundY > 120) {

        backroundY = 0;
        backround.setPosition(backroundX, backroundY);

    } else {

        backroundY += 2 + difficulty;
        backround.setPosition(backroundX, backroundY);

    }

}

let titleScreen = sprites.create(assets.image`titleScreen`);
let startButton = sprites.create(assets.image`startButton`);

let i = true

music.play(music.createSong(assets.song`mainSong`), music.PlaybackMode.LoopingInBackground)

startButton.setPosition(110, 80);
startButton.setScale(1)



controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function() {

    if (i == true) {

        i = false

        sprites.destroy(titleScreen)
        sprites.destroy(startButton)

        forever(function () {

            if (score == 100) {

                music.stopAllSounds();

                if (life == 3) {

                    music.stopAllSounds();

                    sprites.destroy(meteor);

                    let smile = sprites.create(assets.image`smile`);

                    music.play(music.createSoundEffect(WaveShape.Noise, 1181, 1169, 255, 255, 2000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)

                    info.setScore(1000000000000000000000000)
                    game.setGameOverScoringType(game.ScoringType.None)
                    game.setGameOverSound(true, music.buzzer)
                    game.setGameOverMessage(true, "Secret Ending? Ending 2/2")
                    game.setGameOverEffect(true, effects.melt)
                    game.gameOver(true)
                } else {
                    sprites.destroy(meteor);
                    sprites.destroy(backround);

                    rocketX = 80
                    rocketY = -5

                    scene.setBackgroundImage(assets.image`planet`)

                    while (rocketY < 101) {

                        rocketY += 1
                        rocket.setPosition(rocketX, rocketY)

                        pause(10)
                    }

                    rocket.setImage(assets.image`rocketOff`)

                    pause(1000)

                    game.setGameOverSound(true, music.baDing)
                    game.setGameOverMessage(true, "YOU WIN! Ending 1/2")
                    game.gameOver(true);
                }
                

            }
            

            
            if (score < 100) {

                

                UpdateAllPos();

            }
            
        })
    }
})
