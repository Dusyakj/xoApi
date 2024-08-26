const activeGames = require('../models/activeGames')
const array = [
    ['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-'],
['-','-','-','-','-','-','-','-','-','-']
]

class infoController {
    async startGame(req, res) {
        try {
            const { id1, id2, name1, name2 } = req.body
            const game = await new activeGames({id1,id2,name1,name2, win: 0, turn: id1, item: 'X', game: array, now: 0})
            await game.save()
            res.send(game)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new infoController()