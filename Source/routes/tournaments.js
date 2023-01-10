var express = require("express");
var router = express.Router();

const DB = require("../database/connection");



router.get("/register", async function (req, res, next) {

  const teamId= '3';
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
  const role = req.session.role;
  if (role == 1 || role ==3) {
    res.redirect("/tournaments");
    return;
  }
  res.render("tournaments/register" ,{team, players});
});


router.post("/register", async function (req, res, next) {

  res.redirect("/teams");
});



router.get("/match_result", function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }
  res.render("tournaments/match_result");
});


router.post("/match_result", async function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/");
    return;
  }

  const name_of_team1 = req.body.name_of_team1;
  const name_of_team2 = req.body.name_of_team2;
  const score_of_team1 = req.body.score_of_team1;
  const score_of_team2 = req.body.score_of_team2;
  const date = req.body.date;
  const time = req.body.time;
  const stadium = req.body.stadium;

  const team1 = await DB.teams.findByName(name_of_team1);
  const team2 = await DB.teams.findByName(name_of_team2);

  const match = await DB.schedules.findByAddressDateTime(stadium, date, time);

  // update score of team1 and team2
  const result = await DB.result.update(
    match.id,
    team1.id,
    team2.id,
    score_of_team1,
    score_of_team2
  );

  const body = req.body;
  console.log(body);

  const name_of_players = Object.keys(body).filter((key) => {
    return key.startsWith("name_of_player");
  });

  const value_of_players = name_of_players.map((key) => {
    return body[key];
  });

  const name_teams = Object.keys(body).filter((key) => {
    return key.startsWith("name_team");
  });

  const value_of_teams = name_teams.map((key) => {
    return body[key];
  });

  const type_of_goals = Object.keys(body).filter((key) => {
    return key.startsWith("type_of_goal");
  });

  const value_of_goals = type_of_goals.map((key) => {
    return body[key];
  });

  console.log(value_of_goals);

  for (let i = 0; i < value_of_players.length; i++) {
    const player = await DB.players.findByName(value_of_players[i]);
    const team = await DB.teams.findByName(value_of_teams[i]);
    if (
      (player.team_id != team1.id && player.team_id != team2.id) ||
      player.team_id != team.id ||
      value_of_goals[i] == "3"
    ) {
      continue;
    }
    if (!player.goal) {
      player.goal = 0;
    }
    const goal = parseInt(player.goal) + 1;
    await DB.players.updateGoal(player.id, goal);
  }

  res.redirect("/tournaments/match_result");
});

router.get("/report", async function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  const t = await DB.teams.all();
  // console.log(t);

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

  res.render("tournaments/report", { teams });
});

router.get("/player_goal", async function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
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

  res.render("tournaments/player_goal", { players });
});


router.get("/", function (req, res, next) {
  const role = req.session.role;
  if (role ==3) {
    res.redirect("/");
    return;
  }
  res.render("tournaments/index");
});

router.get(['/registration_file'], async function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  let page = (req.query.page) ? +req.query.page : 1;
  const pageSize = 6;
  let teams = [];
  teams = await DB.tounament.all();
  if (page > Math.ceil(teams.length / pageSize)) {
    page = Math.ceil(teams.length / pageSize)
  }
  const teamsInfo = teams.slice((page - 1) * pageSize, page * pageSize);
  for (team of teamsInfo) {
    team.logo = team.logo.slice(1)
  }

  res.render('registration_file', {
    teams: teamsInfo,
    page: page,
    previousPage: (page <= 1) ? 1 : (page - 1),
    nextPage: (teamsInfo.length == 0) ? page : (page + 1)
  });
  // }
  // else
  // {
  //     res.redirect('/tounament')
  // }

  // }
  // else
  // {
  //     res.redirect('/auth/login')
  // }
})

router.get('/registration_file/teaminfo', async function (req, res, next) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  let teamid = (req.query.teamid) ? +req.query.teamid : 1;
  let page = (req.query.page) ? +req.query.page : 1;
  const pageSize = 6;

  const team = await DB.tounament.getteambyID(teamid.toString());
  team.logo = team.logo.slice(1)

  let players = await DB.tounament.getPlayersbyTeam(teamid.toString())

  if (page > Math.ceil(players.length / pageSize)) {
    page = Math.ceil(players.length / pageSize)
  }

  const playersInfo = players.slice((page - 1) * pageSize, page * pageSize);
  let i=(page-1)*pageSize+1;
  for (player of playersInfo) {
    player.id = i
    i += 1
  }

  for (let i = 0; i < players.length; i++) {
    if(players[i].birthday == null) continue;
    players[i].birthday = new Date(players[i].birthday).toLocaleDateString();
  }


  res.render('teaminfo', {
    team: team,
    players: playersInfo,
    page: page,
    previousPage: (page <= 1) ? 1 : (page - 1),
    nextPage: (playersInfo.length == 0) ? page : (page + 1)
  })
})

router.get('/schedule', async function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  let page = (req.query.page) ? +req.query.page : 1;
  const pageSize = 6;

  let schedule=await DB.tounament.getschedule()

  if (page > Math.ceil(schedule.length / pageSize)) {
    page = Math.ceil(schedule.length / pageSize)
  }

  const scheduleInfo = schedule.slice((page - 1) * pageSize, page * pageSize);

  let matches=[]
  let info={}
  let team1={}
  let team2={}
  for (match of scheduleInfo)
  {
    info=await DB.tounament.getmatch(match.result_id)
    team1=await DB.tounament.getteambyID(info.team1)
    team2=await DB.tounament.getteambyID(info.team2)
    match.team1=team1.name
    match.team2=team2.name
    match.datetime = match.time + " " + match.date.toISOString().slice(0,10).replaceAll('-','/')
    matches.push(match)
  }

  res.render('schedule', {
    matches: matches,
    page: page,
    previousPage: (page <= 1) ? 1 : (page - 1),
    nextPage: (scheduleInfo.length == 0) ? page : (page + 1)
  })
})

router.get('/schedule/addmatch', function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  res.render('add_match',{title:'Express'})
})

router.get('/schedule/delmatch', function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  res.render('del_match',{title:'Express'})
})

router.get('/schedule/editmatch', function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }

  res.render('edit_match',{title:'Express'})
})

router.post('/schedule/delmatch', async function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/");
    return;
  }

  let matchid=0
  matchid=req.body.match_id
  let schedule=await DB.tounament.getschedule()
  for (match of schedule)
  {
    if (match.id==matchid)
    {
      const rs=await DB.tounament.delMatchbyID(matchid)
      break
    }
  }
  res.redirect('/tournaments/schedule')
})

router.post('/schedule/addmatch', async function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/");
    return;
  }

  let exTeam1=false
  let exTeam2=false
  let teams=await DB.teams.all()
  for (team of teams)
  {
    if (team.id==req.body.id_of_team1)
    {
      exTeam1=true
    }
    if (team.id==req.body.id_of_team2)
    {
      exTeam2=true
    }
  }
  let match={
    team1: req.body.id_of_team1,
    team2: req.body.id_of_team2,
    address: req.body.name_of_pitch,
    date: req.body.date,
    time: req.body.time
  }
  if (exTeam1 ==true && exTeam2==true)
  {
    let rs=await DB.tounament.addMatch(match)
  }
  res.redirect('/tournaments/schedule')
})

router.post('/schedule/editmatch', async function(req,res,next){
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/");
    return;
  }
  
  let exTeam1=false
  let exTeam2=false
  let teams=await DB.teams.all()
  for (team of teams)
  {
    if (team.id==req.body.id_of_team1)
    {
      exTeam1=true
    }
    if (team.id==req.body.id_of_team2)
    {
      exTeam2=true
    }
  }
  let schedule=await DB.tounament.getschedule()
  let exMatch=false
  for (m of schedule)
  {
    if (m.id==req.body.match_id)
    {
      exMatch=true
      break
    }
  }
  let match={
    id: req.body.match_id,
    team1: req.body.id_of_team1,
    team2: req.body.id_of_team2,
    address: req.body.name_of_pitch,
    date: req.body.date,
    time: req.body.time
  }
  if (exTeam1 ==true && exTeam2==true  && exMatch==true)
  {
    let rs=await DB.tounament.editMatch(match)
  }
  res.redirect('/tournaments/schedule')
})

router.get("/change_tournament_rules", function(req, res) {
  const role = req.session.role;
  if (role == 2 || role ==3) {
    res.redirect("/tournaments");
    return;
  }
  res.render("tournaments/change_tournament_rules");
});



module.exports = router;
