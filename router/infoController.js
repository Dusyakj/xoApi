const activeGames = require('../models/activeGames')

class infoController {
    async checkUserId(req, res) {
        try {
            const { gameId, userId } = req.body 
            const games = await activeGames.find({ _id: `${gameId}`})
            if (games.length == 0) {
                return res.send({message: 'game not found'})
            }
            if ((userId != games[0].id1) && (userId != games[0].id2 )) {
                return res.send({message: 'this user can not play this game'})
            }
            return res.send({message: 'ok'})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new infoController()