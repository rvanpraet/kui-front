<template>
    <div class="container">
        <div class="waveform-wrapper">
            <!-- Waveform -->
            <div id="waveform"></div>

            <!-- Sliders -->
            <div class="audio-slider">
                <b-field>
                    <b-slider
                        v-model="sliderNumbers"
                        type="is-danger"
                        :min="0"
                        :max="100"
                        :step="1"
                        :tooltip="false"
                    >
                    </b-slider>
                </b-field>
            </div>
        </div>

        <!-- Controls -->
        <div class="controls-wrapper">
            <k-audio-trimmer-controls></k-audio-trimmer-controls>
        </div>
    </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import KAudioTrimmerControls from "./KAudioTrimmerControls";

export default {
    name: "KAudioTrimmer",
    components: {
        kAudioTrimmerControls: KAudioTrimmerControls
    },
    props: {
        audioBlob: window.Blob,
        reset: Boolean
    },
    created() {
        this.blob = this.audioBlob;
    },
    data() {
        return {
            blob: this.audioBlob,
            sliderNumbers: [0, 100]
        };
    },
    mounted() {
        this.wavesurfer = WaveSurfer.create({
            container: "#waveform"
            // barWidth: 2,
            // barHeight: 1
            // plugins: [
            //     WaveSurfer.cursor.create({
            //         showTime: true,
            //         opacity: 1,
            //         customShowTimeStyle: {
            //             "background-color": "#000",
            //             color: "#fff",
            //             padding: "2px",
            //             "font-size": "10px"
            //         }
            //     })
            // ]
        });
        this.wavesurfer.loadBlob(this.blob);
        this.wavesurfer.on("ready", () => {
            this.wavesurfer.play();
        });
    },
    beforeDestroy() {
        this.wavesurfer.destroy();
    }
    // watch: {
    //     audioBlob: {
    //         handler: newVal => {
    //             console.log("IN WATCH", newVal);
    //             this.wavesurfer.loadBlob(newVal);
    //             this.wavesurfer.on("ready", () => {
    //                 this.wavesurfer.play();
    //             });
    //         },
    //         deep: true
    //     }
    // }
};
</script>

<style scoped lang="scss">
.waveform-wrapper {
    position: relative;

    .audio-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .b-slider {
            margin: 0;

            .b-slider-track {
                background: transparent;
                height: 8em;

                .b-slider-fill {
                    opacity: 0.25;
                }

                .b-slider-thumb-wrapper {
                    z-index: 5;
                }
            }

            .b-slider-thumb {
                height: 100%;
                width: 0.5rem;
            }
        }
    }
}
</style>
