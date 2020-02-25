<template>
  <div v-if="getGames">
    <h1 class="titleList">|l GAMES l|</h1>

    <div class="listDIV">
      <button class="createBtn" v-on:click="createGame">CREATE</button>
      <div class="borderTable">
        <table class="tableDiv">
          <thead>
            <tr>
              <th>DATE</th>
              <th colspan="2">PLAYERS</th>
              <th>GAME</th>
            </tr>
          </thead>
          <tbody class="textTable">
            <tr v-for="(game, index) in getGames.games" :key="index">
              <td>{{ game.date }}</td>

              <td v-for="(gameplayer, index) in game.gamePlayers" :key="index">
                <h4>{{ gameplayer.player.username }}</h4>
              </td>
              <td v-if="game.gamePlayers.length==1">wait for opponent...</td>
              <td v-if="getGames.player!=null">
                <h4 v-for="(gameplayer, index) in game.gamePlayers" :key="index">
                  <router-link
                    v-if="gameplayer.player.id == getGames.player.id"
                    :to="`/game/${gameplayer.id}`"
                  >
                    <button class="formBtn">ENTER</button>
                  </router-link>
                  <button
                    class="formBtn"
                    v-on:click="joinGame(game.id)"
                    v-if="game.gamePlayers.length == 1 && gameplayer.player.id !== getGames.player.id"
                  >JOIN</button>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["getGames"])
  },
  methods: {
    createGame() {
      this.actCreateGame();
    },
    joinGame(gameId) {
      this.actJoinGame(gameId);
    },
    ...mapActions(["getAllGames", "actCreateGame", "actJoinGame"])
  },
  created() {
    this.getAllGames();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.listDIV {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ff4848;
  max-height: 600px;
}

html {
  background: #35394a;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Franklin Gothic Medium";
}

h1 {
  display: flex;
  color: #ff4848;
  justify-content: center;
  margin-top: 75px;
}

.createBtn {
  width: 100px;
  background-color: #4e536d71;
  border: 2px #ff4848;
  margin-top: 75px;
  margin-bottom: 30px;
  border-style: solid dashed solid dashed;
  border-radius: 4px;
  color: #ff4848;
  padding: 10px;
}
.formBtn {
  width: 100px;
  background-color: #4e536d71;
  border: 2px #ff4848;
  border-style: solid dashed solid dashed;
  border-radius: 4px;
  color: #ff4848;
  padding: 10px;
}

th {
  font-size: 20px;
  text-decoration: underline;
  text-decoration-style: dashed;
}

.formDivBtn {
  display: flex;
  justify-content: center;
}

.borderTable {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  width: 80%;
  border: 4px #ff4848;
  border-style: solid dashed solid dashed;
  background-color: #35394a;
  border-radius: 6px;
}

.playerText {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-aroun;
}

th {
  max-width: 500px;
  min-width: 200px;
  font-size: 25px;
}

.textTable {
  text-align: center;
}

.tableDiv {
  width: 100%;
}
</style>
