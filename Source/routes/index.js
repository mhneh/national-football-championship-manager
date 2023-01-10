var express = require('express');
var router = express.Router();

const DB = require("./../database/connection");

router.get("/", async function (req, res, next) {
  const schedules = await DB.schedules.findUpComing();
  if (!schedules || schedules.length == 0){
    res.render("index");
    return;
  }
  schedules.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
  });
  const schedule=schedules[0]
  const result_id = schedule.result_id;

  const result = await DB.result.findById(result_id);
  const team1 = await DB.teams.findById(result.team1);
  const team2 = await DB.teams.findById(result.team2);

  schedule.date = new Date(schedule.date).toLocaleDateString();


  const t = await DB.teams.all();
  // console.log(t);
  // calculate number of win, lose, draw, goal different, point of each team from result table

  const teams = await Promise.all(
    t.map(async (team) => {
      const results = await DB.result.findByTeamId(team.id);
      // console.log(results);
      let win = 0;
      let lose = 0;
      let draw = 0;
      let goal_different = 0;
      let point = 0;
      for (let i = 0; i < results.length; i++) {
        if (results[i].score_team1 > results[i].score_team2) {
          if (results[i].team1 == team.id) {
            win++;
            goal_different += results[i].score_team1 - results[i].score_team2;
            point += 3;
          } else {
            lose++;
            goal_different += results[i].score_team2 - results[i].score_team1;
          }
        } else if (results[i].score_team1 < results[i].score_team2) {
          if (results[i].team1 == team.id) {
            lose++;
            goal_different += results[i].score_team1 - results[i].score_team2;
          } else {
            win++;
            goal_different += results[i].score_team2 - results[i].score_team1;
            point += 3;
          }
        } else {
          draw++;
          point++;
        }
      }
      return {
        name: team.name,
        win: win,
        lose: lose,
        draw: draw,
        goal_different: goal_different,
        point: point,
      };
    })
  );

  // sort teams by point, goal different, win

  teams.sort((a, b) => {
    if (a.point < b.point) {
      return 1;
    }
    if (a.point > b.point) {
      return -1;
    }
    if (a.goal_different < b.goal_different) {
      return 1;
    }
    if (a.goal_different > b.goal_different) {
      return -1;
    }
    if (a.win < b.win) {
      return 1;
    }
    if (a.win > b.win) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < teams.length; i++) {
    teams[i].rank = i + 1;
  }

  const players = await DB.players.all();

  for (let i = 0; i < players.length; i++) {
    const team = await DB.teams.findById(players[i].team_id);
    players[i].team = team.name;

    if (!players[i].goal) {
      players[i].goal = 0;
    }
  }

  players.sort((a, b) => {
    if (parseInt(a.goal) < parseInt(b.goal)) {
      return 1;
    }
    if (parseInt(a.goal)  > parseInt(b.goal)) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < players.length; i++) {
    players[i].stt = i + 1;
  }

  res.render("index", {schedule, team1, team2, teams,players});

});

module.exports = router;
