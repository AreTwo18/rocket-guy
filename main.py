backround = sprites.create(assets.image("""
        starBackround
        """),
    SpriteKind.player)
rocket = sprites.create(assets.image("""
    rocket
    """), SpriteKind.player)
meteor = sprites.create(assets.image("""
    rock
    """), SpriteKind.projectile)
info.set_life(3)
info.set_score(0)
backroundY = 60
backroundX = 80
rocketX = 80
meteorX = 80
meteorY = -10
meteorSize = 1
varScore = info.score
varHighScore = info.high_score
backround.set_position(backroundX, backroundY)
rocket.set_position(rocketX, 90)
meteor.set_position(meteorX, meteorY)
meteor.set_scale(meteorSize)
def RanMeteorPos():
    global meteorX
    meteorX = randint(5, 155)
def RanMeteorSize():
    global meteorSize
    meteorSize = randint(0.5, 2.5)
    meteor.set_scale(meteorSize)
def UpdateAllPos():
    global meteorY, rocketX, backroundY
    
    def on_life_zero():
        info.high_score()
        if info.score > info.high_score:
            game.game_over(True)
        else:
            game.game_over(False)
    info.on_life_zero(on_life_zero)
    
    if rocket.overlaps_with(meteor):
        info.change_life_by(-1)
        meteorY = -10
        meteor.set_position(meteorX, meteorY)
    # controller system
    if controller.player1.is_pressed(ControllerButton.LEFT):
        if rocketX < 0:
            pass
        else:
            rocketX -= 2
            rocket.set_position(rocketX, 90)
    if meteorY <= -10:
        RanMeteorPos()
        RanMeteorSize()
        info.change_score_by(1)
        meteorY = 0
        meteor.set_position(meteorX, meteorY)
    elif meteorY >= 125:
        meteorY = -10
        meteor.set_position(meteorX, meteorY)
    else:
        meteorY += 2
        meteor.set_position(meteorX, meteorY)
    if controller.player1.is_pressed(ControllerButton.RIGHT):
        if rocketX > 160:
            pass
        else:
            rocketX += 2
            rocket.set_position(rocketX, 90)
    # backround scroll
    if backroundY > 120:
        backroundY = 0
        backround.set_position(backroundX, backroundY)
    else:
        backroundY += 2
        backround.set_position(backroundX, backroundY)

def on_forever():
    UpdateAllPos()
forever(on_forever)
