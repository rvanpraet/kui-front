<template>
    <div id="app">
        <div id="nav">
            <b-navbar>
                <template slot="start">
                    <b-navbar-item>
                        <router-link to="/">Home</router-link>
                    </b-navbar-item>
                    <b-navbar-dropdown label="Info">
                        <b-navbar-item href="#">
                            <router-link to="/about">About</router-link>
                        </b-navbar-item>
                    </b-navbar-dropdown>
                </template>
                <template slot="end">
                    <b-navbar-item tag="div">
                        <div class="buttons">
                            <router-link class="button is-primary" to="/register"><strong>Sign up</strong></router-link>
                            <router-link class="button is-light" to="/my-kui/">Sign In</router-link>
                        </div>
                    </b-navbar-item>
                </template>
            </b-navbar>
        </div>
        <router-view />
    </div>

</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;
    text-align: center;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
