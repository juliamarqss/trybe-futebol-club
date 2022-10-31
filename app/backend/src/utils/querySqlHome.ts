const querySqlHome = `
SELECT team.team_name AS name,
((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals = matches.away_team_goals)) AS totalPoints,
COUNT(matches.home_team) AS totalGames,
SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
SUM(matches.home_team_goals) AS goalsFavor,
SUM(matches.away_team_goals) AS goalsOwn,
(SUM(matches.home_team_goals) - SUM(matches.away_team_goals)) AS goalsBalance,
FORMAT((((SUM(matches.home_team_goals > matches.away_team_goals) * 3)
+ SUM(matches.home_team_goals = matches.away_team_goals))
/ (COUNT(matches.home_team) * 3) * 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS team
JOIN TRYBE_FUTEBOL_CLUBE.matches AS matches ON team.id = matches.home_team
WHERE matches.in_progress = 0
GROUP BY team.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC`;

export default querySqlHome;
