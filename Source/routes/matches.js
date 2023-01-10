var express = require('express');
var router = express.Router();

const DB = require("./../database/connection");

router.get("/", async function (req, res) {

    const schedules = await DB.schedules.findUpComing();
    if (!schedules || schedules.length == 0) {
        res.render("matches");
        return;
    }
    schedules.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    
    const schedule1 = await getScheduleDetail(schedules[0]);
    const schedule2 = await getScheduleDetail(schedules[1]);
    const schedule3 = await getScheduleDetail(schedules[2]);
    const schedule4 = await getScheduleDetail(schedules[3]);
    const schedule5 = await getScheduleDetail(schedules[4]);

    res.render("matches", { 
        schedule1,
        schedule2,
        schedule3,
        schedule4,
        schedule5
    });
});

async function getScheduleDetail(schedule) {
    const result_id = schedule.result_id;
    const result = await DB.result.findById(result_id);
    const team1 = await DB.teams.findById(result.team1);
    const team2 = await DB.teams.findById(result.team2);
    schedule.date = new Date(schedule.date).toUTCString();
    return {
        schedule: schedule,
        team1: team1,
        team2: team2
    }
}

module.exports = router;