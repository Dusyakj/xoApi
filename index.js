const express = require('express')
const ws = require('express-ws')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');


const authRouter = require('./router/authRouter')
const infoRouter = require('./router/infoRouter')
const gameRputer = require('./router/gameRouter')
const SearchGames = require('./models/SearchGeme')
const activeGames = require('./models/activeGames')

const PORT = process.env.PORT || 3000

const app = express(ws)
const wsServer = ws(app)
const aWs = wsServer.getWss()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/auth', authRouter)
app.use('/info', infoRouter)
app.use('/game', gameRputer)



const start = () => {
    try {
        mongoose.connect('mongodb+srv://dusyakj:0nyOc5fVlEwjerqa@xo-app.9e6tw.mongodb.net/?retryWrites=true&w=majority&appName=xo-app');
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}

start()


// search-game
app.ws('/search-game', (ws, req) => {
    ws.on('message', async (msg) =>{
        try {
            msg = JSON.parse(msg)
            switch (msg.method) {
                case 'connection':
                    const games = await SearchGames.find();
                    ws.send(JSON.stringify({id: 1,
                        games: games
                    }));
                    break
                case 'add':
                    const game = await new SearchGames(msg.info)
                    await game.save()
                    broadcastConnection(ws, msg)
                    break
                case 'delete':
                    
                    const game1 = await SearchGames.deleteOne({ _id: `${msg.gameId}`})
                    broadcastConnection(ws, msg)
                    break
                case 'start':
                    broadcastConnection2(ws,msg,msg.gameId)
                    break
            }
        } catch (e) {
            console.log(e)
        }
    })
})
const broadcastConnection =  async (ws, msg) => {
    try {
        const games = await SearchGames.find();
        aWs.clients.forEach(element => {
            element.send(JSON.stringify({id: 1, games:games}))
        });
    } catch (error) {
        console.log(error)
    }
}

const broadcastConnection2 =  async (ws, msg,id) => {
    try {
        aWs.clients.forEach(element => {
            element.send(JSON.stringify({id: id, userId : msg.user}))
        });
    } catch (error) {
        console.log(error)
    }
}

// game

app.ws('/game', (ws, req) => {
    ws.on('message', async (msg) =>{
        try {
            msg = JSON.parse(msg)
            switch (msg.method) {
                case 'connection':
                    ws.id = 1
                    const games = await activeGames.find({ _id : msg.gameId});
                    
                    ws.send(JSON.stringify(games[0]));
                    break
                case 'turn':
                    const gamess = await activeGames.find({ _id : msg.gameId});
                    const game = gamess[0]
                    array = game.game
                    item = game.item
                    if (array[msg.field-1][msg.pole] != '-'){
                        console.log('off')
                        break
                    }
                    array[msg.field-1][msg.pole] = item
                    toWinField(msg.field - 1, array, item)
                    let win = toWin(array,item)
                    console.log(win)
                    // console.log(array)
                    
                    if (item == 'X'){
                        item = 'O'
                    }else {
                        item = 'X'
                    }
                    let now
                    if (array[msg.pole-1][0] != '-'){
                        now  = 0
                    }else {
                        now = msg.pole
                    }
                    turn = game.turn
                    if (turn == game.id1){
                        turn = game.id2
                    } else {
                        turn = game.id1
                    }
                    await activeGames.updateOne({_id:  msg.gameId}, {game: array, item: item, now: now, turn: turn})
                    const q = await activeGames.find({ _id : msg.gameId});
                    const qq = q[0]
                    broadcastConnection1(ws,msg,qq)
                    break
            }
        } catch (e) {
            console.log(e)
        }
    })
})

const broadcastConnection1 =  async (ws, msg,game) => {
    try {
        aWs.clients.forEach(element => {
            if (element.id == 1) {
                element.send(JSON.stringify(game))
            }
            
        });
    } catch (error) {
        console.log(error)
    }
}

const combinations = ['123', '159', '147', '258', '369', '357', '456', '789']
const toWinField = (field,l,now) => {
    fieldList = l[field]
    combinations.forEach((comb, i, arr)=>{
        if (fieldList[comb[0]] == now && fieldList[comb[1]] == now && fieldList[comb[2]] == now){
            fieldList[0] = now
        }
    
    })
    return fieldList

}

const toWin = (l,now) => {
    let flag = 0
    combinations.forEach((comb, i, arr)=>{
        if (l[comb[0] - 1][0] == now && l[comb[1] - 1][0] == now && l[comb[2] - 1][0] == now){
            flag = 1
        }

    })
    if (flag) {
        return 1
    } else{ 
        return 0
    }
    
    
}