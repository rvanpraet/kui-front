<template>
    <div>
        <div class="side-menu">
            <aside>
                <KSideBar></KSideBar>
            </aside>
        </div>
        <div class="main-container">
            <section>
                <div class="container">
                    <div class="header">
                        <h1 class="title is-1 mb-1">Create</h1>
                    </div>
                    <div>
                        <b-notification
                            type="is-info is-light"
                            aria-close-label="Close notification"
                        >
                            Welcome to Kui, where your music is reborn in
                            stunning visuals. Enjoy this app for free while it
                            doesn't exist!
                        </b-notification>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="colums is-multiline is-desktop">
                        <div
                            class="column is-one-quarter-fullhd is-full-desktop"
                        >
                            <h3 class="title is-3">1. Your Design</h3>
                            <!-- If none selected, create new-->
                            <div class="p-1">
                                <p class="mb-2">
                                    Select a recent design to use or edit, or
                                    start from scratch with a new design.
                                </p>
                                <b-button>New Design</b-button>
                            </div>
                            <!-- If Selected -->
                            <div></div>
                        </div>
                        <div
                            class="column is-three-quarters-fullhd is-full-desktop"
                        >
                            <!-- If has designs and none selected -->
                            <div class="columns is-multiline">
                                <!-- v-for each design coming from backend -->
                                <div
                                    v-for="design in designs"
                                    v-bind:key="design.id"
                                    class="column is-one-third-desktop is-half-tablet"
                                >
                                    <DesignCard
                                        v-bind:imgUrl="design.imageUrl"
                                    ></DesignCard>
                                </div>

                                <!--  -->
                            </div>
                            <!-- If selected or created, show -->
                            <div class="hax-text-centered">
                                <!-- Canvas with design -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="colums is-multiline is-desktop">
                        <div
                            class="column is-one-quarter-fullhd is-full-desktop"
                        >
                            <h3 class="title is-3">2. Your Audio</h3>
                            <!-- If none selected, create new-->
                            <div class="p-1">
                                <p class="mb-2">
                                    Upload audio you've already recorded, or
                                    record something on the spot.
                                </p>
                                <b-button class="mb-2">Upload File</b-button>
                                <b-button type="is-text"
                                    >Record something yourself!</b-button
                                >
                            </div>
                            <!-- If Selected -->
                            <div></div>
                        </div>
                        <div
                            class="column is-three-quarters-fullhd is-full-desktop"
                        >
                            <!-- Open recorder -->
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import KSideBar from "../../components/KSideBar";
import DesignCard from "../../components/cards/DesignCard";

export default {
    name: "Create",
    components: {
        KSideBar,
        DesignCard
    },

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

<style lang="scss">
.side-menu {
    width: 260px;

    aside {
        position: fixed;
        height: 100vh;
        top: auto;
        left: 0;
        width: 260px;
    }
}

.main-container {
    margin-left: 260px;
}

section {
    padding: 0 2rem;
    margin-bottom: 3rem;
}
</style>
