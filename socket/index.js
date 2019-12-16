// IMPORTING THE NECESSARY PACKAGES
const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer : true });
const Token = require('../app/services/generatetoken');
const User = require('../app/model/User');
const Types = require('mongoose').Types;

module.exports = function(server, app)
{

    wss.on('connection', function (ws, req) { 
        console.log(ws);
        console.log(req);
    })

    server.on('upgrade', (req, socket, head) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token)
        {
            socket.destroy();
            return ;
        }
        try {
            req.decoded = await Token.verifyToken(app, token)
        } catch(e) {
            socket.destroy();
            return ;
        }
        User.findOne({_id : new Types.ObjectId(req.decoded._id)})
        .then(user => {
            if (!user)
                return (socket.destroy());
            req.decoded = user;
            wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, request));
        })
        .catch(err => socket.destroy());
    });
}