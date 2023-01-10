const config = {};
const pgp = require("pg-promise")(config);

const params = {
  host: 'localhost',
  port: 31019,
  // database: 'football-management',
  database: 'football-championship',
  user: 'postgres',
  // password: 'changeme',
  // password: '123456',
  password: '01092002',
  max: 30
};

const DB = pgp(params);
console.log("Connect to PostgresSQL: " + DB);

module.exports = {
  user: {
    add: async (data) => {
      let res = {};
      try {
        res = await DB.one(
          "INSERT INTO users(id, name, password, phone, email, nationality, avatar, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [
            data.uid,
            data.name,
            data.password,
            data.phone,
            data.email,
            data.nationality,
            data.avatar,
            data.role,
          ]
        );
      } catch (ex) {
        console.log(ex);
      }
      return res;
    },
    findByName: async (username) => {
      let users = [];
      try {
        users = await DB.any("SELECT * FROM users WHERE name=$1", [username]);
      } catch (e) {
        console.log(e);
      }
      return users[0];
    },
    role: async (id) => {
      let role = {};
      try {
        role = await DB.one("SELECT * FROM role_user WHERE id=$1", [id]);
      } catch (e) {
        console.log(e);
      }
      return role;
    }
  },
  teams: {

    all: async () => {
      let teams = [];
      try {
        teams = await DB.any("SELECT * FROM teams");
      } catch (e) {
        console.log(e);
      }
      return teams;
    },
    
    findByName: async (teamName) => {
      let team = {};
      try {
        team = await DB.one("SELECT * FROM teams WHERE name=$1", [teamName]);
      } catch (e) {
        console.log(e);
      }
      return team;
    },

    findById: async (id) => {
      let team = {};
      try {
        team = await DB.one("SELECT * FROM teams WHERE id=$1", [id]);
      } catch (e) {
        console.log(e);
      }
      return team;
    },
  },
  players: {
    all: async () => {
      let players = [];
      try {
        players = await DB.any("SELECT * FROM player");
      } catch (e) {
        console.log(e);
      }
      return players;
    },
    findAllByName: async (playerName) => {
      let players = {};
      try {
        players = await DB.any("SELECT * FROM player WHERE name ilike '%$1#%'", [
          playerName,
        ]);
      } catch (e) {
        console.log(e);
      }
      return players;
    },

    findByName: async (playerName) => {
      let player = {};
      try {
        player = await DB.one("SELECT * FROM player WHERE name=$1", [
          playerName,
        ]);
      } catch (e) {
        console.log(e);
      }
      return player;
    },

    updateGoal: async (id,goal) => {
      let player = {};
      try {
        player = await DB.one(
          "UPDATE player SET goal=$1 WHERE id=$2 RETURNING *",
          [goal, id]
        );
      } catch (e) {
        console.log(e);
      }
      return player;
    },

    findByTeamId: async (id) => {
      let players = [];
      try {
        players = await DB.any("SELECT * FROM player WHERE team_id=$1", [id]);
      } catch (e) {
        console.log(e);
      }
      return players;
    },
    // add player
    addPlayer: async (id, name, birthday,role, type, team_id) => {
      let player = {};
      try {
        player = await DB.one(
          "INSERT INTO player(id, name, birthday, role, type, team_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
          [id, name, birthday, role, type, team_id]
        );
      } catch (e) {
        console.log(e);
      }
      return player;
    },

    removePlayer: async (name,role,type,team_id) => {
      let player = {};
      try {
        player = await DB.one(
          "DELETE FROM player WHERE name=$1 and role=$2 and type=$3 and team_id=$4 RETURNING *",
          [name,role,type,team_id]
        );
      } catch (e) {
        console.log(e);
      }
      return player;
    },

    countPlayerByType: async (type,team_id) => {
      let player = {};
      try {
        player = await DB.one(
          "SELECT COUNT(*) FROM player WHERE type=$1 and team_id=$2",
          [type,team_id]
        );
      } catch (e) {
        console.log(e);
      }
      return player;

    },

  },
  result: {
    update: async (id, team1, team2, score_of_team1, score_of_team2) => {
      let result = {};
      try {
        result = await DB.one(
          "UPDATE result SET score_team1=$1, score_team2=$2 WHERE id=$3 and team1=$4 and team2 = $5 RETURNING *",
          [score_of_team1, score_of_team2, id, team1, team2]
        );
      } catch (e) {
        console.log(e);
      }
      return result;
    },

    findByTeamId : async (id) => {
      let result = [];
      try {
        result = await DB.any("SELECT * FROM result WHERE team1=$1 or team2=$1", [id]);
      } catch (e) {
        console.log(e);
      }
      return result;
    },    

    findById : async (id) => {
      let result = {};
      try {
        result = await DB.one("SELECT * FROM result WHERE id=$1", [id]);
      } catch (e) {
        console.log(e);
      }
      return result;
    },
  },
  schedules:{
    findByAddressDateTime : async (address, date, time) => {
      let schedules = [];
      try {
        schedules = await DB.one("SELECT * FROM schedules WHERE address=$1 AND date=$2 AND time=$3", [address, date, time]);
      } catch (e) {
        console.log(e);
      }
      return schedules;
    },

    findUpComing: async () => {
      let schedules = [];
      try {
        schedules = await DB.any("SELECT * FROM schedules WHERE date > CURRENT_DATE");
      } catch (e) {
        console.log(e);
      }
      return schedules;
    },
  },
  tounament: {
    all: async () => {
      let teams = [];
      try {
        teams = await DB.any('SELECT * FROM teams')
      } catch (e) {
        console.log(e);
      }
      return teams
    },
    getteambyID: async (teamid) => {
      let team = {};
      try {
        team = await DB.one('SELECT * FROM teams WHERE id=$1', [teamid])
      } catch (e) {
        console.log(e)
      }
      return team
    },
    getPlayersbyTeam: async (teamid) => {
      let players = []
      try {
        players = await DB.any('SELECT * FROM player WHERE team_id=$1', [teamid])
      } catch (e) {
        console.log(e)
      }
      return players
    },
    getschedule: async () => {
      let schedule = []
      try {
        schedule = await DB.any('SELECT * FROM schedules')
      } catch (e) {
        console.log(e)
      }
      return schedule
    },
    getmatch: async (rsid) => {
      let info = {}
      try {
        info = await DB.one('SELECT * FROM result WHERE id=$1', [rsid])
      } catch (e) {
        console.log(e)
      }
      return info
    },
    delMatchbyID: async (matchid) => {
      let rs = {}
      try {
        rs = await DB.none('DELETE FROM schedules WHERE id=$1', [matchid])
        rs = await DB.none('DELETE FROM result WHERE id=$1', [matchid])
      } catch (e) {
        console.log(e)
      }
      return rs
    },
    addMatch: async (match) => {
      let rs = {}
      try {
        let schedule = await DB.any('SELECT * FROM schedules')
        let id = 0
        let check = true
        for (m of schedule) {
          if (id < parseInt(m.id)) {
            id = parseInt(m.id)
          }
        }
        id += 1
        rs = await DB.one('INSERT INTO result(id, team1, team2) VALUES($1, $2, $3) RETURNING *', [id.toString(), match.team1, match.team2])
        rs = await DB.one('INSERT INTO schedules(id, tournament_id, result_id, date, address, time) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
          [id.toString(), '1', id.toString(), match.date, match.address, match.time])
      } catch (e) {
        console.log(e)
      }
      return rs
    },
    editMatch: async (match) => {
      let rs = {}
      try {
        rs = await DB.none('DELETE FROM schedules WHERE id=$1', [match.id])
        rs = await DB.none('DELETE FROM result WHERE id=$1', [match.id])
        rs = await DB.one('INSERT INTO result(id, team1, team2) VALUES($1, $2, $3) RETURNING *', [match.id, match.team1, match.team2])
        rs = await DB.one('INSERT INTO schedules(id, tournament_id, result_id, date, address, time) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
          [match.id, '1', match.id, match.date, match.address, match.time])
      } catch (e) {
        console.log(e)
      }
      return rs
    }
  },
};
