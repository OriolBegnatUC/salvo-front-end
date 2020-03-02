<template>
  <div>
    <h1 class="titleList">|l LEADERBOARD l|</h1>
    <div class="listDIV">
      <div class="borderTable">
        <table class="tableDiv">
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Ties</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody class="textTable leaderList">
            <tr v-for="(player, index) in getBoard" :key="index">
              <td>{{ player.player }}</td>
              <td>{{ player.win }}</td>
              <td>{{ player.lose }}</td>
              <td>{{ player.tie }}</td>
              <td>{{ player.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLeaderBoard"]),
    getBoard() {
      let leaderboard = [];
      this.getLeaderBoard.forEach(player => {
        let playerScore = {
          player: player.player.username,
          win: 0,
          lose: 0,
          tie: 0,
          points: 0
        };
        player.score.forEach(scores => {
          switch (scores) {
            case 0.0:
              playerScore.lose += 1;
              break;
            case 0.5:
              playerScore.tie += 1;
              playerScore.points += scores;
              break;
            case 1:
              playerScore.win += 1;
              playerScore.points += scores;
              break;
            default:
              break;
          }
        });
        leaderboard.push(playerScore);
      });
      return leaderboard.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else if (a.points > b.points) {
          return -1;
        } else if (a.points == b.points) {
          return a.win + a.lose + a.tie < b.win + b.lose + b.tie;
        }
      });
    }
  },
  methods: {
    ...mapActions(["actLeaderBoard"])
  },
  created() {
    this.actLeaderBoard();
    setInterval(() => {
      this.actLeaderBoard();
    }, 30000);
  }
};
</script>
<style>

html {
  background: #35394a;
}

</style>