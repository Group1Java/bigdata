<template>
  <v-app>
    <!-- 0, 153, 255 -->
    <v-app-bar app color="primary" dark>
      <div v-show="resized">
        <v-app-bar-nav-icon v-if="isLoggedIn && !isStudent" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <h1 @click="redirect('/')" v-show="!resized">PN Request Management System</h1>
      <h1 @click="redirect('/')" v-show="resized">PNRMS</h1>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn text @click="logout">
          <span class="mr-2">log out</span>
          <b>
            <v-icon>mdi-logout</v-icon>
          </b>
        </v-btn>
      </span>
      <span v-else>
        <v-btn text @click="redirect('/')">
          <b>
            <v-icon>mdi-login</v-icon>
          </b>
          <span class="mr-2">Sign In</span>
        </v-btn>
        <v-btn text @click="redirect('/signup')">
          <b>
            <v-icon>mdi-clipboard-account</v-icon>
          </b>
          <span class="mr-2">Sign Up</span>
        </v-btn>
      </span>
    </v-app-bar>
    <v-content>
      <div v-if="isLoggedIn && !isStudent">
        <div v-if="resized && !isStudent">
          <v-navigation-drawer v-model="drawer" absolute left temporary>
            <Resizedbar />
          </v-navigation-drawer>
          <center>
            <div class="wt95">
              <router-view />
            </div>
          </center>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="3" v-if="isLoggedIn && this.$route.name != 'student'">
              <Sidebar />
            </v-col>
            <v-col class="text-center">
              <div class="wt95">
                <center>
                  <router-view />
                </center>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div v-if="!isLoggedIn">
        <center>
          <router-view />
        </center>
      </div>
      <div v-if="isStudent && isLoggedIn">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */
import Sidebar from "./components/Sidebar";
import Resizedbar from "./components/Resizedbar";
export default {
  name: "App",
  components: { Sidebar, Resizedbar },
  data() {
    return {
      drawer: false,
      resized: false
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.handleRoute(this.$route.name)
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isStudent:{
      get: function() {
        return this.$store.getters.isStudent;
      },
      set: function (){
        console.log("ok")
      }
    },
    permission: function() {
      return this.$store.getters.permission;
    }
  },
  update(){
    let myroute = this.$route.name
    if(myroute === "student"){
      this.isStudent = true
    }
    console.log("app route: ", myroute)
  },
  methods: {
    handleRoute(route) {
      if (route == "login" || route == "notfound") {
        this.logout();
      }
      if (route != "student") {
        this.isStudent = false;
      }
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    redirect(fullpath) {
      this.$router.push({ path: fullpath });
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.resized = true;
      } else {
        this.resized = false;
      }
    }
  }
};
</script>
<style scoped>
.wt95 {
  width: 95%;
}
</style>
