<template>
    <div class="columns">
        <!-- Play/Restart -->
        <div class="column is-one-third-desktop is-two-fourths-mobile play">
            <b-button
                type="is-danger"
                :icon-left="play ? 'pause' : 'play'"
                v-on:click="togglePlay"
            />
            <b-button
                type="is-danger"
                icon-left="restart"
                v-on:click="restart"
            />
        </div>
        <!-- Start/End position -->
        <div class="column is-one-third-desktop is-hidden-touch"></div>
        <!-- Zoom In/Out -->
        <div class="column is-one-third-desktop is-two-fourths-mobile zoom">
            <b-button type="is-danger" icon-left="magnify-minus-outline" />
            <b-button type="is-danger" icon-left="magnify-plus-outline" />
        </div>
    </div>
</template>

<script>
export default {
    name: "KAudioTrimmerControls",
    props: {},
    data() {
        return {
            play: false,
            zoom: [0, 1, 2, 3, 4]
        };
    },
    methods: {
        togglePlay() {
            this.play = !this.play;
        },
        restart() {
            return;
            // this.emit$.(restart)
        }
    }
};
</script>

<style scoped lang="scss">
.zoom {
    display: flex;
    flex-direction: row-reverse;
}
</style>
