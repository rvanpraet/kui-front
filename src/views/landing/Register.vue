<template>
    <div>
        <section class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Welcome to Kui
                    </h1>
                    <h2 class="subtitle">
                        You are just moments away from unleashing your creativity
                    </h2>
                </div>
            </div>
        </section>

        <div class="mt-6 columns is-centered is-mobile">
            <form class="column is-half-mobile is-one-third-desktop">
                <b-field label="Name">
                    <b-input value="Kevin Garvey"></b-input>
                </b-field>

                <b-field label="Email"
                    type="is-danger"
                    message="This email is invalid">
                    <b-input type="email"
                        value="john@"
                        maxlength="30">
                    </b-input>
                </b-field>

                <b-field label="Password"
                    type="is-warning"
                    :message="['Password is too short', 'Password must have at least 8 characters']">
                    <b-input aria-placeholder="123" type="password" maxlength="30"></b-input>
                </b-field>
            </form>
        </div>
    </div>

</template>

<script>
export default {
    name: "Register",

    data() {
        return {
            designs: []
        };
    },

    created() {
        fetch("/api/userId/designs")
            .then(res => res.json())
            .then(json => {
                this.designs = json.designs;
            });
    }
};
</script>

<style lang="scss" scoped>
.registerFormWrap {

    // display: flex;
    // justify-content: center;

    // form {
    //     max-width: 50%;
    // }
}
</style>
