<template>
    <div class="container">
        <div class="waveform-wrapper mb-5">
            <!-- Waveform -->
            <div id="waveform" @mousedown="onWaveMousedown"></div>

            <!-- Sliders -->
            <!-- <div class="audio-slider">
                <b-field>
                    <b-slider
                        type="is-danger"
                        v-model="sliderNumbers"
                        :min="0"
                        :max="100"
                        :step="1"
                        :tooltip="false"
                    >
                    </b-slider>
                </b-field>
            </div> -->
        </div>

        <!-- Controls -->
        <div class="controls-wrapper">
            <k-audio-trimmer-controls
                :value="region"
                @input="handleTimeChange"
                @playPause="playPause"
                @restart="restart"
                @zoomOut="zoomOut"
                @zoomIn="zoomIn"
            ></k-audio-trimmer-controls>
        </div>
    </div>
</template>

<script>
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";
import KAudioTrimmerControls from "./KAudioTrimmerControls";

export default {
    name: "KAudioTrimmer",
    components: {
        kAudioTrimmerControls: KAudioTrimmerControls
    },
    props: {
        audioBlob: window.Blob
    },
    created() {
        this.blob = this.audioBlob;
    },
    data() {
        return {
            blob: this.audioBlob,
            region: {
                start: "",
                end: ""
            },
            waveRegion: null
        };
    },
    mounted() {
        this.wavesurfer = WaveSurfer.create({
            container: "#waveform",
            cursorColor: "#f14668",
            plugins: [
                RegionsPlugin.create({
                    waveColor: "blue",
                    loop: true
                })
            ],
            waveColor: "#555"
        });
        this.wavesurfer.loadBlob(this.blob);
        this.wavesurfer.on("ready", () => {
            this.wavesurfer.enableDragSelection({});
        });
        this.wavesurfer.on("region-created", region => {
            this.handleRegionChange(region);
        });
        this.wavesurfer.on("region-updated", region => {
            this.handleRegionChange(region);
        });
    },
    methods: {
        handleRegionChange(region) {
            this.waveRegion = region;
            this.region.start = this.parseMinSecNum(region.start);
            this.region.end = this.parseMinSecNum(region.end);
        },
        handleTimeChange(newVal) {
            const newObject = JSON.parse(JSON.stringify(newVal));
            newObject.start = this.parseMinSecStr(newObject.start);
            newObject.end = this.parseMinSecStr(newObject.end);
            this.wavesurfer.clearRegions();
            this.wavesurfer.addRegion({
                start: newObject.start,
                end: newObject.end
            });
        },
        onWaveMousedown() {
            this.wavesurfer.clearRegions();
        },
        parseMinSecNum(val) {
            const addLeadZero = str => {
                str.length === 1 ? (str = "0".concat(str)) : str;
                return str;
            };
            val = Math.floor(val);
            return addLeadZero(Math.floor(val / 60).toString()).concat(
                ":",
                addLeadZero((val % 60).toString())
            );
        },
        parseMinSecStr(val) {
            const temp = val.split(":");
            return parseInt(temp[0]) * 60 + parseInt(temp[1]);
        },
        playPause() {
            this.wavesurfer.playPause();
        },
        restart() {
            this.wavesurfer.stop();
            this.wavesurfer.play(this.waveRegion.start, this.waveRegion.end);
        },
        zoomIn(zoomVal) {
            this.wavesurfer.zoom(zoomVal);
        },
        zoomOut(zoomVal) {
            this.wavesurfer.zoom(zoomVal);
        }
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

<style lang="scss">
.waveform-wrapper {
    position: relative;

    #waveform {
        z-index: 2;
    }

    .wavesurfer-handle {
        width: 0.4em !important;
        background-color: white !important;
        border: 1px solid grey;
        border-radius: 4px;
        opacity: 1 !important;
    }

    .wavesurfer-region {
        background-color: #ffc1ce !important;
        opacity: 0.4;
    }
}
</style>
