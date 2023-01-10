var express = require('express');
var router = express.Router();

const DB = require("./../database/connection");

router.get('/', async function(req, res) {
  
    const playerName = (req.query.player) ? req.query.player : "";
    const page = (req.query.page) ? +req.query.page : 1;
    const pageSize = 6;
    let players = [];
    if (playerName != "") {
      players = await DB.players.findAllByName(playerName);
    } else {
      players = await DB.players.all();
    }
    const pagingPlayers = players.slice((page - 1) * pageSize, page * pageSize);
  
    let playersInfo = [];
    for (player of pagingPlayers) {
      let team = {};
      if (player.team_id) {
        team = await DB.teams.findById(player.team_id)
      }
      const info = {
        player: player,
        team: (!team) ? "" : team.name,
      }
      playersInfo.push(info);
    }

    for (let i = 0; i < players.length; i++) {
      players[i].stt = i + 1;
    }
  
    res.render('players', {
      players: playersInfo,
      playerName: playerName,
      page: page,
      previousPage: (page <= 1) ? 1 : (page - 1),
      nextPage: (playersInfo.length == 0) ? page : (page + 1)
    });
  });

module.exports = router;