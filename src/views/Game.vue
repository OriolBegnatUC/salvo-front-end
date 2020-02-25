<template>
  <div v-if="getGame" id="mainGame">
    <div>
      <h1 class="titleGame">|l BATTLESHIP GAME l|</h1>
    </div>
    <div>
      <div>
        <div class="flex-grid space-around usernamePlusHarbor">
          <div class="username width-100 align-items">
            <div>{{getGame.games.gamePlayers[0].player.username}}</div>
          </div>
          <div v-if="shipLocations.length == 0" class="harbor">
            <div
              :class="shipOrientations['PatrolBoat'] ? 'PatrolBoatHarbor' : 'PatrolBoatHarborV'"
              id="PatrolBoat"
              :draggable="true"
              data-ship-length="2"
              data-ship-type="PatrolBoat"
              class="visibility"
              @dragstart="dragStart"
              @dragover.stop
              @click="shipTurns($event, 'PatrolBoat')"
            ></div>
            <div
              :class="shipOrientations['Destroyer'] ? 'DestroyerHarbor' : 'DestroyerHarborV'"
              id="Destroyer"
              :draggable="true"
              data-ship-length="3"
              data-ship-type="Destroyer"
              class="visibility"
              @dragstart="dragStart"
              @dragover.stop
              @click="shipTurns($event, 'Destroyer')"
            ></div>
            <div
              :class="shipOrientations['Submarine'] ? 'SubmarineHarbor' : 'SubmarineHarborV'"
              id="Submarine"
              :draggable="true"
              data-ship-length="3"
              data-ship-type="Submarine"
              class="visibility"
              @dragstart="dragStart"
              @dragover.stop
              @click="shipTurns($event, 'Submarine')"
            ></div>
            <div
              :class="shipOrientations['Battleship'] ? 'BattleshipHarbor' : 'BattleshipHarborV'"
              id="Battleship"
              :draggable="true"
              data-ship-length="4"
              data-ship-type="Battleship"
              class="visibility"
              @dragstart="dragStart"
              @dragover.stop
              @click="shipTurns($event, 'Battleship')"
            ></div>
            <div
              :class="shipOrientations['Carrier'] ? 'CarrierHarbor' : 'CarrierHarborV'"
              id="Carrier"
              :draggable="true"
              data-ship-length="5"
              data-ship-type="Carrier"
              class="visibility"
              @dragstart="dragStart"
              @dragover.stop
              @click="shipTurns($event, 'Carrier')"
            ></div>
          </div>
          <div class="username width-100 align-items">
            <div
              v-if="getGame.games.gamePlayers.length > 1"
            >{{getGame.games.gamePlayers[1].player.username}}</div>
            <div v-else>Waiting for an opponent...</div>
          </div>
        </div>
        <div class="border-gridDIV">
          <div class="flex-grid space-around">
            <div>
              <div class="grid">
                <div class="grid-container" v-for="num in rows" :key="num">{{num}}</div>
              </div>
              <div class="grid" v-for="char in cols" :key="char">
                <div
                  class="grid-item"
                  v-for="(num, index) in rows"
                  :key="char + num"
                  :id="char + num"
                  @dragover.prevent
                  @drop.prevent="drop"
                >
                  <span v-if="index == 0">{{char}}</span>
                </div>
              </div>
            </div>
            <!-- <div>{{getGame.ships.type}}</div> -->
            <div class="gameHud-column">
              <div class="logic">{{ getGame.state.logic }}</div>
              <div>
                <button class="shipButton formBtn" @click="sendShips">Send ships!</button>
              </div>
              <div>
                <button class="salvoButton formBtn" @click="sendSalvoes">Send salvoes!</button>
              </div>
            </div>
            <div>
              <div class="grid">
                <div class="grid-container" v-for="num in rows" :key="num">{{num}}</div>
              </div>
              <div class="grid" v-for="char in cols" :key="char">
                <div
                  class="grid-item"
                  v-for="(num, index) in rows"
                  :key="char + num"
                  :id="char + num + 'S'"
                  @click="printSalvoes(char + num)"
                >
                  <span v-if="index == 0">{{char}}</span>
                </div>
              </div>
            </div>
          </div>
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
      counter: 0,
      shipLocations: [],
      testOppSalvoes: [],
      rows: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cols: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      shipOrientations: {
        PatrolBoat: true,
        Destroyer: true,
        Battleship: true,
        Carrier: true,
        Submarine: true
      },
      shipsToSend: [
        {
          type: "Destroyer",
          location: []
        },
        {
          type: "PatrolBoat",
          location: []
        },
        {
          type: "Battleship",
          location: []
        },
        {
          type: "Carrier",
          location: []
        },
        {
          type: "Submarine",
          location: []
        }
      ],
      salvoesToSend: [],
      fetching: null
    };
  },
  name: "game",
  props: ["gameId"],

  computed: {
    ...mapGetters(["getGame"])
  },
  methods: {
    ...mapActions(["getOneGame", "actPlaceShips", "actPlaceSalvoes"]),
    sendShips() {
      return this.$store.dispatch("actPlaceShips", {
        gpId: this.gameId,
        ships: this.shipsToSend
      });
    },
    sendSalvoes() {
      this.$store.dispatch("actPlaceSalvoes", {
        gpId: this.gameId,
        salvoes: this.salvoesToSend
      });
      this.salvoesToSend.forEach(salvo => {
        document.getElementById(salvo + "S").classList.remove("mySalvoes");
        this.salvoesToSend = [];
      });
    },
    printSalvoes(cell) {
      let logicStatus = this.getGame.state.logic;
      if (
        document.getElementById(cell + "S").classList.contains("mySalvoes2")
      ) {
        console.log("this position is already used");
      } else {
        if (this.salvoesToSend.includes(cell)) {
          this.salvoesToSend.splice(this.salvoesToSend.indexOf(cell), 1);
          document.getElementById(cell + "S").classList.remove("mySalvoes");
        } else {
          if (this.salvoesToSend.length < 5) {
            document.getElementById(cell + "S").classList.add("mySalvoes");
            this.salvoesToSend.push(cell);
            0;
          }
          console.log(logicStatus);

          if (
            logicStatus == "Victory Fanfare" ||
            logicStatus == "You Lose" ||
            logicStatus == "It's a draw!"
          ) {
            document.getElementById(cell + "S").classList.remove("mySalvoes");
          } else {
            console.log("Error", "No more prints");

            // this.salvoesToSend = [];
          }
        }
      }

      console.log(this.salvoesToSend);
    },
    shipLocs(shipId, grid) {
      console.log(this.shipOrientations);

      let ship = document.getElementById(shipId);
      let newShipLocs = [];
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      console.log(char);
      console.log(num);

      if (this.shipOrientations[ship.dataset.shipType]) {
        console.log(this.shipOrientations[ship.dataset.shipType]);
        for (let i = 0; i < ship.dataset.shipLength; i++) {
          newShipLocs.push(char + (num + i));
        }
        console.log(newShipLocs);
      } else {
        for (let i = 0; i < ship.dataset.shipLength; i++) {
          newShipLocs.push(String.fromCharCode(char.charCodeAt(0) + i) + num);
        }
        console.log(newShipLocs);
      }

      this.shipsToSend.forEach(shipToSend => {
        if (ship.dataset.shipType == shipToSend.type) {
          shipToSend.location = newShipLocs;
        }
      });
      console.log(newShipLocs);
    },

    shipConditions(shipId, grid) {
      let ship = document.getElementById(shipId);
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));

      if (
        (num != 0 &&
          this.shipOrientations[ship.dataset.shipType] &&
          Number(ship.dataset.shipLength) + num < 12) ||
        (num != 0 &&
          !this.shipOrientations[ship.dataset.shipType] &&
          Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76)
      ) {
        console.log("béeeee");
        ship.style.position = "absolute";
        ship.style.display = "block";
        grid.appendChild(ship);
        this.shipLocs(shipId, grid);
      } else {
        console.log("mal");
      }
    },
    shipTurns(event, name) {
      this.counter = 1;
      let shipId = event.target.id;
      let ship = document.getElementById(shipId);
      let grid = event.target.parentNode;
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      console.log(event);
      console.log(grid);

      if (
        (Number(ship.dataset.shipLength) + num < 12 &&
          !this.shipOrientations[name]) ||
        (this.shipOrientations[name] &&
          Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76)
      ) {
        this.shipOrientations[name] = !this.shipOrientations[name];
        console.log(ship.dataset.shipLength);
        if (this.checkFree(shipId, grid)) {
          this.shipConditions(shipId, grid);
        } else {
          this.shipOrientations[name] = !this.shipOrientations[name];
        }
      } else {
        console.log("error", "you can't turn here");
      }
      // console.log(Number(ship.dataset.shipLength) + char.charCodeAt(0));
    },

    checkFree(shipId, grid) {
      let ship = document.getElementById(shipId);
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let equalizer = true;

      for (let i = this.counter; i < ship.dataset.shipLength; i++) {
        if (this.shipOrientations[ship.dataset.shipType]) {
          this.shipsToSend.forEach(shipToSend => {
            if (shipToSend.location.includes(char + (num + i))) {
              console.log("You can't turn the ship");
              equalizer = false;
            }
          });
        } else {
          this.shipsToSend.forEach(shipToSend => {
            if (
              shipToSend.location.includes(
                String.fromCharCode(char.charCodeAt(0) + i) + num
              )
            ) {
              console.log("You can't turn the ship");
              equalizer = false;
            }
          });
        }
      }
      return equalizer;
    },
    // orientationShip(event) {
    //   let newShipLoc = [];
    //   let ship_id = this.dataShipId;
    //   let ship = this.dataShip;
    //   this.removeShips();
    //   console.log(ship);
    //   console.log(newShipLoc);
    //   console.log(Number(ship.dataset.shipLength), this.dataNum);

    //   if (this.shipOrientations[ship.dataset.shipType]) {
    //     if (Number(ship.dataset.shipLength) + this.dataNum < 12) {
    //       for (let i = 0; i < ship.dataset.shipLength; i++) {
    //         newShipLoc.push(this.dataChar + (this.dataNum + i));
    //         document
    //           .getElementById(this.dataChar + (this.dataNum + i))
    //           .classList.add(ship.dataset.shipType);
    //         // console.log(this.dataChar + (this.dataNum + i));
    //       }
    //     } else {
    //       console.log("error");
    //     }
    //   } else {
    //     if (
    //       Number(ship.dataset.shipLength) + this.dataChar.charCodeAt(0) <
    //       76
    //     ) {
    //       for (let i = 0; i < ship.dataset.shipLength; i++) {
    //         newShipLoc.push(this.dataChar.charCodeAt(0) + i);
    //         document
    //           .getElementById(
    //             String.fromCharCode(this.dataChar.charCodeAt(0) + i) +
    //               this.dataNum
    //           )
    //           .classList.add(ship.dataset.shipType);
    //       }
    //     } else {
    //       console.log("error");
    //     }
    //   }

    //   this.shipsToSend.forEach(shipToSend => {
    //     if (shipToSend.type == ship.dataset.shipType) {
    //       shipToSend.location = newShipLoc;
    //     }
    //   });
    // },
    // drawShip(e, ship) {
    //   console.log(e.target.parentNode);
    //   if (
    //     (this.dataTargID.length != 1 &&
    //       Number(this.dataShip.dataset.shipLength) + this.dataNum < 12 &&
    //       !this.shipOrientations[this.dataShip.dataset.shipType]) ||
    //     (this.dataTargID.length != 1 &&
    //       Number(this.dataShip.dataset.shipLength) +
    //         this.dataChar.charCodeAt(0) <
    //         76 &&
    //       this.shipOrientations[this.dataShip.dataset.shipType])
    //   ) {
    //     this.dataNum = Number(e.target.parentNode.id.split("")[1]);
    //     this.dataChar = e.target.parentNode.id.split("")[0];
    //     // console.log(e.target.id);
    //     this.dataSpliceNum = e.target.parentNode.id.split("");
    //     this.dataShip = document.getElementById(e.target.id);
    // this.shipOrientations[ship] = !this.shipOrientations[ship];
    //     this.orientationShip(ship);
    //   } else {
    //     console.log("error");
    //   }
    // },
    // removeShips() {
    //   let ship = this.dataShip;
    //   let shipColorCells = Array.from(
    //     document.getElementsByClassName(ship.dataset.shipType)
    //   );
    //   for (let i = 0; i < shipColorCells.length; i++) {
    //     shipColorCells[i].classList.remove(ship.dataset.shipType);
    //   }
    // },

    drop(e) {
      let shipId = e.dataTransfer.getData("ship_id");
      let ship = document.getElementById(shipId);
      let grid = e.target;
      let prevLocs = [];

      document.getElementById(shipId).classList.add("visibility");
      this.shipsToSend.forEach(shipToSend => {
        if (shipToSend.type == shipId) {
          prevLocs = shipToSend.location;
          shipToSend.location = [];
        }
      });

      if (this.checkFree(shipId, grid)) {
        this.shipConditions(shipId, grid);
      } else {
        this.shipsToSend.find(
          shipToSend => shipToSend.type == shipId
        ).location = prevLocs;
        console.log("You can't drop a ship here");
      }
      console.log(document.getElementById(shipId).classList);

      // ship.style.position = "absolute";
      // ship.style.display = "block";

      // e.target.appendChild(ship);
      // let spliceNum = e.target.id.match(/[a-z]+|[^a-z]+/gi);
      // console.log(spliceNum);

      // let num = Number(spliceNum[1]);
      // let char = spliceNum[0];
      // let targID = e.target.id;

      // if (
      //   (targID.length != 1 &&
      //     Number(ship.dataset.shipLength) + num < 12 &&
      //     this.shipOrientations[ship.dataset.shipType]) ||
      //   (targID.length != 1 &&
      //     Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76 &&
      //     !this.shipOrientations[ship.dataset.shipType])
      // ) {

      // this.dataShipId = ship_id;
      // this.dataShip = ship;
      // this.dataSpliceNum = spliceNum;
      // this.dataNum = num;
      // this.dataChar = char;
      // this.placeShip;

      //   this.orientationShip();
      // } else {
      //   console.log("error whatever");
      // }
    },
    dragStart(e) {
      let target = e.target;
      e.dataTransfer.setData("ship_id", target.id);
      console.log(document.getElementById(target.id).classList);

      document.getElementById(target.id).classList.remove("visibility");
      console.log(document.getElementById(target.id).classList);

      // setTimeout(() => {
      //   target.style.display = "none";
      // }, 0);
    }
  },

  created() {
    this.getOneGame(this.gameId);
    this.fetching = setInterval(() => {
      this.getOneGame(this.gameId);
    }, 10000);
  },
  // beforeDestroy() {
  //   clearInterval(this.getOneGame(this.gameId));
  // },

  watch: {
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
                    .classList.add("hits2");
                } else {
                  document
                    .getElementById(this.testOppSalvoes[p])
                    .classList.remove("mySalvoes2");
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
#mainGame {
  color: #ff4848;
  font-family: "Franklin Gothic Medium";
}

.titleGame {
  min-width: 1570px;
  font-size: 45px;
}

.flex-grid {
  display: flex;
}

.gameHud-column {
  display: flex;
  flex-direction: column;
}

.space-around {
  justify-content: space-around;
}

.align-items {
  align-items: center;
}

.width-100 {
  width: 100%;
}

.bottom-marg {
  margin-bottom: 150px;
}

.harbor {
  width: 20%;
  margin-bottom: 20px;
  border: 4px #ff4848;
  border-style: solid dashed solid dashed;
  border-radius: 6px;
  background: #4e536d71;
  padding: 30px 20px 2px 20px;
  min-height: 250px;
  justify-content: center;
}

.harborUserDIV {
  margin-top: 65px;
  margin-bottom: 25px;
}

.usernamePlusHarbor {
  min-width: 1570px;
}

.border-gridDIV {
  margin-bottom: 100px;
  padding: 20px;
  border: 4px #ff4848;
  border-radius: 6px;
  border-style: solid dashed solid dashed;
}

.formBtn {
  width: 100px;
  margin-top: 20px;
  background-color: #4e536d71;
  border: 2px #ff4848;
  border-style: solid dashed solid dashed;
  border-radius: 4px;
  height: 30px;
  color: #ff4848;
}

.logic {
  display: flex;
  justify-content: center;
  text-decoration: underline;
  text-decoration-style: dashed;
  margin-bottom: 150px;
  margin-top: 20px;
  font-size: 35px;
}

.shipButtonDiv {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.shipButton {
  width: 100%;
  height: 50px;
}

.salvoButtonDiv {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.salvoButton {
  width: 100%;
  height: 50px;
}

.PatrolBoatHarbor {
  width: 92px;
  height: 45px;
  background: saddlebrown;
}
.PatrolBoatHarborV {
  width: 45px;
  height: 92px;
  background: saddlebrown;
}
.DestroyerHarbor {
  width: 139px;
  height: 45px;
  background: grey;
}
.DestroyerHarborV {
  width: 45px;
  height: 139px;
  background: grey;
}
.BattleshipHarbor {
  width: 186px;
  height: 45px;
  background: purple;
}
.BattleshipHarborV {
  width: 45px;
  height: 186px;
  background: purple;
}
.CarrierHarbor {
  width: 233px;
  height: 45px;
  background: orangered;
}
.CarrierHarborV {
  width: 45px;
  height: 233px;
  background: orangered;
}
.SubmarineHarbor {
  width: 139px;
  height: 45px;
  background: yellow;
}
.SubmarineHarborV {
  width: 45px;
  height: 139px;
  background: yellow;
}

.grid {
  display: flex;
}

.title {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  margin-top: 20px;
}

.grid-container {
  display: inline-grid;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4e536d71;
  border: 1px solid #ff4848;
  width: 45px;
  height: 45px;
  text-align: center;
}
.grid-item {
  display: inline-grid;
  align-items: center;
  justify-content: center;
  background-color: #4e536d71;
  border: 1px solid #ff4848;
  width: 45px;
  height: 45px;
  text-align: center;
}

.username {
  display: flex;
  justify-content: space-around;
  font-size: 25px;
}

.PatrolBoat {
  background: saddlebrown;
}
.Destroyer {
  background: grey;
}
.Submarine {
  background: yellow;
}
.Carrier {
  background: orangered;
}
.Battleship {
  background: purple;
}

.mySalvoes {
  background: red;
}

.mySalvoes2 {
  background: firebrick;
}

.hits {
  background: lime !important;
}

.hits2 {
  width: 43px;
  height: 43px;
  border: 2px solid lime !important;
}
.visibility {
  z-index: 1;
}
/* .null {
  background: blue;
} */
</style>