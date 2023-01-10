var express = require("express");
var router = express.Router();

const DB = require("../database/connection");

const {
  v1: uuid1,
  v4: uuid4,
} = require('uuid');


router.post("/remove", async function (req, res, next) {
  const name = req.body.update__name;
  const teamName = req.body.update__teamName;
  const role = req.body.update__role;
  const type = req.body.update__type;

  const team = await DB.teams.findByName(teamName);

  const player = await DB.players.removePlayer(name,role, type, team.id);

  console.log(player);
  res.redirect("/teams");
});

router.post("/add", async function (req, res, next) {
  // trim name
  const name = req.body.update__name.trim();
  const teamName = req.body.update__teamName;
  const role = req.body.update__role;
  const type = req.body.update__type;
  const birthday = req.body.update__birth;
  const id = uuid1();

  //get team id
  const team = await DB.teams.findByName(teamName);

  const age = new Date().getFullYear() - new Date(birthday).getFullYear();

  const count = await DB.players.countPlayerByType(type, team.id);

  if (
    age < 18 ||
    age > 40 ||
    (parseInt(count.count) >= 3 && type == "ngoài nước")
  ) {
    console.log(count);
    res.redirect("/teams");
  } else {
    const player = await DB.players.addPlayer(
      id,
      name,
      birthday,
      role,
      type,
      team.id
    );

    res.redirect("/teams");
  }
});

router.get("/", async function (req, res, next) {
  const role = req.session.role;
  if (role == 1 || role == 3) {
    res.redirect("/");
    return;
  }

  const teamId = req.session.user.team || '3';
  const team = await DB.teams.findById(teamId);
  const players = await DB.players.findByTeamId(teamId);

  // format date in players

  for (let i = 0; i < players.length; i++) {
    if(players[i].birthday == null) continue;
    players[i].birthday = new Date(players[i].birthday).toLocaleDateString();
  }



  for (let i = 0; i < players.length; i++) {
    players[i].stt = i + 1;
  }

  res.render("teams",{team, players});
});


module.exports = router;
