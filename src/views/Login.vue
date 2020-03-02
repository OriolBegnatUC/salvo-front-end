<template>
  <div id="main">
    <h1>|l BATTLESHIP GAME l|</h1>
    <div id="app">
      <div class="borderForm">
        <div class="form">
          <form id="login-form" onsubmit="return false">
            <div class="formDivBtn">
              <h2>LOG IN</h2>
            </div>
            <div class="inputTag">Name:</div>
            <label class="formWidth">
              <input type="text" name="username" v-model="name" />
            </label>
            <div class="inputTag">Password:</div>
            <label class="formWidth">
              <input type="password" name="password" v-model="pwd" />
            </label>
            <div class="formDivBtn">
              <button class="formBtn" v-on:click="logIn">Log in</button>
            </div>
            <form class="formDivBtn" id="logout-form" onsubmit="return false">
              <button class="formBtn" v-on:click="logOut">Log out</button>
            </form>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      pwd: ""
    };
  },
  computed: {
    ...mapGetters(["getGames"])
  },
  methods: {
    ...mapActions(["actLogin", "getLogOut"]),
    logIn() {
      this.actLogin({
        userName: this.name,
        password: this.pwd
      });
    },
    logOut() {
      this.getLogOut();
    },
    getGame() {
      let logicStatus = this.getGame.state.logic;
      console.log(logicStatus);

      if (
        logicStatus == "Victory Fanfare" ||
        logicStatus == "You Lose" ||
        logicStatus == "It's a draw!"
      ) {
        clearInterval(this.fetching);
      }

      setTimeout(() => {
        // console.log(this.shipLocations);
        for (let i = 0; i < this.getGame.ships.length; i++) {
          let shipLoc = this.getGame.ships[i].location;
          let shipType = this.getGame.ships[i].type;
          for (let j = 0; j < shipLoc.length; j++) {
            this.shipLocations.push(shipLoc[j]);
            document
              .getElementById(shipLoc[j])
              .classList.add(shipType.replace(/\s/g, ""));
          }
        }
        for (let i = 0; i < this.getGame.mySalvoes.length; i++) {
          let salvoLoc = this.getGame.mySalvoes[i].salvoLocation;
          // let hits = Object.values(this.getGame.hits);

          for (let j = 0; j < salvoLoc.length; j++) {
            document
              .getElementById(salvoLoc[j] + "S")
              .classList.add("mySalvoes2");
          }

          for (let k = 0; k < this.getGame.hits.length; k++) {
            let hitSalvoes = Object.values(this.getGame.hits[k]);

            for (let l = 0; l < hitSalvoes.length; l++) {
              let hits = hitSalvoes[l];
              hits.forEach(hit => {
                document.getElementById(hit + "S").classList.add("hits");
              });
              // console.log(document.getElementById(loc + "S").classList.add("myHitSalvoes"));
            }
            // console.log(this.getGame.hits);
          }

          for (let m = 0; m < this.getGame.opponentSalvoes.length; m++) {
            let oppoSalvoLoc = this.getGame.opponentSalvoes[m].salvoLocation;
            for (let n = 0; n < oppoSalvoLoc.length; n++) {
              this.testOppSalvoes.push(oppoSalvoLoc[n]);
              document
                .getElementById(oppoSalvoLoc[n])
                .classList.add("mySalvoes2");
            }
            for (let o = 0; o < this.shipLocations.length; o++) {
              for (let p = 0; p < this.testOppSalvoes.length; p++) {
                if (this.shipLocations[o] == this.testOppSalvoes[p]) {
                  document
                    .getElementById(this.testOppSalvoes[p])
                    .classList.add("hits");
                }
                // console.log(
                //   document.getElementById(this.testOppSalvoes[p]).classList
                // );
              }
            }
          }
        }
      }, 0);
    }
  }
};
</script>
<style>
html {
  background: #35394a;
}
#main {
  font-family: "Franklin Gothic Medium";
  color: #ff4848;
}
#app {
  display: flex;
  justify-content: center;
  margin-top: 270px;
  align-items: center;
  height: 100px;
}

h1 {
  display: flex;
  justify-content: center;
  margin-top: 75px;
  font-size: 75px;
}

h2 {
  text-decoration: underline;
  text-decoration-style: dashed;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formWidth {
  width: 200px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 15px;
}
.inputTag {
  text-decoration: underline;
}
input {
  margin-top: 5px;
  border-radius: 2px;
  border: 4px #ff4848;
  border-style: dashed solid dashed solid;
  height: 30px;
  font-size: 20px;
  color: #ff4848;
  background-color: #4e536d71;
}

.formBtn {
  width: 100px;
  margin-top: 20px;
  background-color: #4e536d71;
  border: 2px #ff4848;
  border-style: dashed solid dashed solid;
  border-radius: 4px;
  color: #ff4848;
}

.formDivBtn {
  display: flex;
  justify-content: center;
}

.borderForm {
  display: flex;
  justify-content: center;
  padding: 80px 25px;
  width: 350px;
  border: 4px #ff4848;
  border-style: solid dashed solid dashed;
  background-color: #4e536d71;
  border-radius: 6px;
}
</style>

