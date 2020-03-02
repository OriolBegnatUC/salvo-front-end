import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
const url = "https://boiling-ocean-98853.herokuapp.com";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Games: null,
    OneGame: null,
    LeaderBoard: []
  },
  mutations: {
    set_games: (state, payload) => (state.Games = payload),
    set_oneGame: (state, payload) => (state.OneGame = payload),
    set_leaderboard: (state, payload) => (state.LeaderBoard = payload)
  },
  actions: {
    actLogin({ commit, dispatch }, payload) {
      fetch(url + "/api/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: getBody({ name: payload.userName, pwd: payload.password })
      })
        .then(function(data) {
          if (data.status == 200) {
            router.push("/");
          }
          console.log("Request success: ", data);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        return body.join("&");
      }
    },
    getLogOut() {
      fetch(url + "/api/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .then(function(data) {
          console.log("Request success: ", data);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },
    actRegister({ commit, dispatch }, payload) {
      fetch(url + "/api/register", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(function(data) {
          if (data.error) {
            console.log("Request success: ", data);
          } else console.log("Request success: ", data);
          dispatch("actLogin", payload);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },
    actCreateGame() {
      fetch(url + "/api/games", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(newData => {
          return newData.json();
        })
        .then(function(data) {
          if (data.error) {
            console.log("Request success: ", data);
          } else console.log("Request success: ", data);
          router.push("/game/" + data.id);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },
    actJoinGame({ commit }, gameId) {
      fetch(url + "/api/game/" + gameId + "/players", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(newData => {
          return newData.json();
        })
        .then(function(data) {
          if (data.error) {
            console.log("Request success: ", data);
          } else {
            console.log("Request success: ", data);
            router.push(`/game/${data.gpId}`);
          }
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },
    getAllGames(context) {
      fetch(url + "/api/games", {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Error");
        })
        .then(data => {
          console.log(data);

          context.commit("set_games", data);
        });
    },
    getOneGame(context, gameId) {
      fetch(url + "/api/game_view/" + gameId, {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Error 2");
        })
        .then(game => {
          console.log(game);
          context.commit("set_oneGame", game);
        });
    },
    actPlaceShips({ commit, dispatch }, { gpId, ships }) {
      fetch(url + "/api/games/players/" + gpId + "/ships", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(ships)
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
        })
        .then(data => {
          if (data.error) {
            console.log("Error", data);
          } else {
            console.log("Success", data);
            dispatch("getOneGame", gpId);
          }
        })
        .catch(error => {
          console.log("Error", error);
        });
    },
    actPlaceSalvoes({ commit, dispatch }, { gpId, salvoes }) {
      fetch(url + "/api/games/players/" + gpId + "/salvoes", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(salvoes)
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
        })
        .then(data => {
          if (data.error) {
            console.log("Error", data);
          } else {
            console.log("Success", data);
            dispatch("getOneGame", gpId);
          }
        })
        .catch(error => {
          console.log("Error", error);
        });
    },
    actLeaderBoard(context) {
      fetch(url + "/api/leaderboard", {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(score => {
          console.log(score);
          context.commit("set_leaderboard", score);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  getters: {
    getGames: state => state.Games,
    getGame: state => state.OneGame,
    getLeaderBoard: state => state.LeaderBoard
  },
  modules: {}
});
