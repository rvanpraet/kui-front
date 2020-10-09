<template>
    <div class="columns">
        <!-- Play/Restart -->
        <div class="column is-one-third-desktop is-two-fourths-mobile play">
            <b-button
                class="mr-3"
                size="is-medium"
                type="is-danger"
                :icon-left="play ? 'pause' : 'play'"
                v-on:click="togglePlayPause"
            />
            <b-button
                class="mr-3"
                size="is-medium"
                type="is-danger"
                icon-left="restart"
                v-on:click="restart"
            />
        </div>
        <!-- Start/End position -->
        <div class="columns is-one-third-desktop is-hidden-touch">
            <b-field class="column is-half" label="Start time">
                <b-input
                    v-model="value.start"
                    v-cleave="masks.time"
                    @blur="onStartBlur"
                ></b-input>
            </b-field>
            <b-field class="column is-half" label="End time">
                <b-input
                    v-model="value.end"
                    v-cleave="masks.time"
                    @blur="onEndBlur"
                ></b-input>
            </b-field>
        </div>
        <!-- Zoom In/Out -->
        <div class="column is-one-third-desktop is-two-fourths-mobile zoom">
            <b-button
                class="ml-3"
                size="is-medium"
                type="is-danger"
                icon-left="magnify-plus-outline"
                :disabled="zoomIndex === zoom.length - 1"
                v-on:click="zoomIn"
            />
            <b-button
                class="ml-3"
                size="is-medium"
                type="is-danger"
                icon-left="magnify-minus-outline"
                :disabled="zoomIndex === 0"
                v-on:click="zoomOut"
            />
        </div>
    </div>
</template>

<script>
import Cleave from "cleave.js";

const cleave = {
    name: "cleave",
    bind(el, binding) {
        const input = el.querySelector("input");
        input._vCleave = new Cleave(input, binding.value);
    },
    unbind(el) {
        const input = el.querySelector("input");
        input._vCleave.destroy();
    }
};

export default {
    name: "KAudioTrimmerControls",
    directives: { cleave },
    props: {
        value: { type: Object, required: true }
    },
    data() {
        return {
            masks: {
                time: {
                    time: true,
                    timePattern: ["m", "s"]
                }
            },
            play: false,
            zoom: [0, 1, 2, 3, 4],
            zoomIndex: 0
        };
    },
    computed: {
        zoomPrc() {
            return this.zoomIndex * 3;
        }
    },
    methods: {
        correctCleaveResult(result) {
            let complete;
            if (result.length === 1) {
                const end = ":00";
                result[0].length === 1
                    ? (complete = "0".concat(result[0], end))
                    : (complete = result[0].concat(end));
            } else if (result.length === 2) {
                switch (result[1].length) {
                    case 0:
                        complete = result.join(":").concat("00");
                        break;
                    case 1:
                        complete = result.join(":").concat("0");
                        break;
                    default:
                        complete = result.join(":");
                }
            }
            return complete;
        },
        checkValueRange() {
            const sNumber = parseInt(this.value.start.replace(":", ""));
            const eNumber = parseInt(this.value.end.replace(":", ""));
            let temp;
            if (sNumber > eNumber) {
                temp = this.value.start;
                this.value.start = this.value.end;
                this.value.end = temp;
            }
        },
        onStartBlur(e) {
            this.value.start = this.correctCleaveResult(
                e.target._vCleave.properties.result.split(":")
            );
            this.checkValueRange();
            this.$emit("input", this.value);
        },
        onEndBlur(e) {
            this.value.end = this.correctCleaveResult(
                e.target._vCleave.properties.result.split(":")
            );
            this.checkValueRange();
            this.$emit("input", this.value);
        },
        togglePlayPause() {
            this.play = !this.play;
            this.$emit("playPause");
        },
        restart() {
            this.play = true;
            this.$emit("restart");
        },
        zoomIn() {
            if (this.zoomIndex < this.zoom.length) {
                this.zoomIndex++;
                this.$emit("zoomIn", this.zoomPrc);
            }
        },
        zoomOut() {
            if (this.zoomIndex >= 0) {
                this.zoomIndex--;
                this.$emit("zoomOut", this.zoomPrc);
            }
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
