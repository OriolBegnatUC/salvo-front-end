<template>
  <div id="main">
    <h1>|l BATTLESHIP GAME l|</h1>
    <div id="app">
      <div class="borderForm">
        <div class="form">
          <form id="register-form" onsubmit="return false">
            <div class="formDivBtn">
              <h2>REGISTER</h2>
            </div>
            <div class="inputTag">Name:</div>
            <label class="formWidth">
              <input type="text" name="username" v-model="userName" />
            </label>
            <div class="inputTag">Password:</div>
            <label class="formWidth">
              <input type="password" name="password" v-model="password" />
            </label>
            <div class="inputTag">Email:</div>
            <label class="formWidth">
              <input type="text" name="email" v-model="email" />
            </label>
            <div class="formDivBtn">
              <button class="formBtn" v-on:click="signIn">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userName: "",
      password: "",
      email: ""
    };
  },
  methods: {
    ...mapActions(["actRegister"]),
    signIn() {
      this.actRegister({
        userName: this.userName,
        password: this.password,
        email: this.email
      });
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
  padding: 15px;
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