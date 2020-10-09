<template>
    <div>
        <!-- For documentation: https://github.com/grishkovelli/vue-audio-recorder -->
        <audio-recorder
            upload-url="YOUR_API_URL"
            :time="2"
            :headers="headers"
            :before-recording="callback"
            :pause-recording="callback"
            :after-recording="afterRecCallback"
            :select-record="callback"
            :before-upload="callback"
            :successful-upload="callback"
            :failed-upload="callback"
        />
    </div>
</template>
<script>
import Vue from "vue";
import AudioRecorder from "vue-audio-recorder";
Vue.use(AudioRecorder);

export default {
    name: "KAudioRecorder",
    data() {
        return {
            headers: {}
        };
    },
    methods: {
        callback() {},
        afterRecCallback(recData) {
            this.$emit("recAudio", recData.blob);
        }
    }
};
</script>

<style lang="scss">
.ar {
    margin: 0px auto;

    .ar-player {
        display: none;
    }

    .ar-records {
        display: none;
    }
}
</style>
