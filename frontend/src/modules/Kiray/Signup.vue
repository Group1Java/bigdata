  
<template>
  <div>
    <div class="logindiv"></div>
    <center>
      <div id="login-card">
        <v-card class="transparent" elevation="10" width="500" height="680">
          <div class="pad-top">
            <img src="@/assets/pnlogo.png" id="logo">
            <p>Passerelles Numeriques</p>
          </div>
          <form>
            <div class="custom">
              <v-text-field
                append-icon="mdi-account"
                outlined
                label="Firstname"
                v-model="firstname"
                color="black"
                autocomplete="false"
                required
              />
              <v-text-field
                append-icon="mdi-account-box"
                outlined
                label="Lastname"
                v-model="lastname"
                color="black"
                autocomplete="false"
                required
              />
              <v-select
                append-icon="mdi-account-multiple"
                autocomplete="false"
                required
                v-model="batch"
                :items="batch"
               
                label="Batch"
                color="black"
                outlined
              ></v-select>

              <v-text-field
                append-icon="mdi-email"
                outlined
                label="Email"
                v-model="email"
                color="black"
                :rules="emailRules"
                type="email"
                autocomplete="false"
                required
              />
              <v-text-field
                append-icon="mdi-account-box"
                outlined
                label="Username"
                v-model="username"
                color="black"
                autocomplete="false"
                required
              />
              <v-text-field
                @click:append="showpass = !showpass"
                :type="showpass ? 'text' : 'password'"
                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                label="Password"
                v-model="password"
                color="black"
                :rules="passwordRules"
                required
              />
            </div>
            <div class="transparent pl-6 pr-6">
              <v-btn
                type="submit"
                class="border"
                text
                block
                height="70"
                color="secondary"
                @click="register()"
              >
                <h1 class="font">SIGNUP</h1>
              </v-btn>
            </div>
          </form>
        </v-card>
      </div>
    </center>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card class="text-center">
          <hr>
          <v-card-title>Login Reminder</v-card-title>
          <hr>
          <br>
          <v-card-text>
            <h2 class="myred">{{sms}}</h2>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block outlined color="green darken-1" text @click="dialog = false">Got It</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      firstname: "",
      lastname: "",
      batch: "",
      batchRules: [
        v => !!v || "Batch is required",
        v => (v && v.length <= 4) || "Name must be less  11 numbers",
        v => (v && v.length >= 4) || "Name must be less  11 numbers"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
    username:"",
      passwordRules: [
        v => !!v || "password  is required",
        v => (v && v.length >= 8) || "Name must be greater than  8 character"
      ],

      showpass: false,
      dialog: false,
      sms: "",
      batch: [
        {
          text: "2020"
        },
        {
          text: "2021"
        },
        {
          text: "2022"
        }
      ]
    };
  },
  methods: {
    register() {
      let register = {
        firstname: this.firstname,
        lastname: this.lastname,
        batch: this.batch,
        email: this.email,
        password: this.password,
        username:this.username
      };
      let body = { username: this.username, password: this.password };
      alert(this.firstname);

      if (
        this.firstname != "" &&
        this.lastname != "" &&
        this.batch != "" &&
        this.email != "" &&
        this.password != ""
      ) {
        this.$store
          .dispatch("register", body)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            this.sms = resp.data.sms;
            this.dialog = true;
          });
      }
    }
  }
};
</script>
<style scoped>
.custom {
  margin-top: 10px;
  margin-left: 5%;
  margin-right: 5%;
}
.logindiv {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  height: 100%;

  background-size: cover;
  opacity: 0.8;
}
#login-card {
  position: relative;
  margin-top: -22%;
  left: -50%;
  transform: translate(50%, 50%);
}
.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}
.font {
  text-align: center;
  font-family: fantasy;
  font-size: 50px;
  color: skyblue;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  letter-spacing: 30px;
}
.border {
  border: solid 1px black;
}
#logo {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: solid 1px black;
}
.pad-top {
  position: relative;
  padding-top: 5%;
}
.myred {
  color: red;
}
</style>