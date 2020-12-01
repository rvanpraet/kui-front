<template>
    <div>
        <div class="side-menu">
            <aside>
                <k-side-bar></k-side-bar>
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
                    <div class="columns is-multiline is-desktop">
                        <div
                            class="column is-one-quarter-fullhd is-full-desktop"
                        >
                            <h3 class="title is-3">1. Your Design</h3>
                            <!-- If none selected, create new-->
                            <div class="p-1">
                                <p class="mb-3">
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
                                    <design-card
                                        v-bind:imgUrl="design.imageUrl"
                                    ></design-card>
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
                    <div class="columns is-multiline is-desktop">
                        <!-- Intro / Buttons -->
                        <div
                            class="column is-one-quarter-fullhd is-full-desktop"
                        >
                            <h3 class="title is-3">2. Your Audio</h3>
                            <!-- If none selected, create new-->
                            <div class="p-1">
                                <p class="mb-3">
                                    Upload audio you've already recorded, or
                                    record something on the spot.
                                </p>
                                <b-button class="mb-3">
                                    Upload {{ showTrimmer ? "New" : "" }} File
                                    <input
                                        id="upload-file"
                                        type="file"
                                        @change="handleFileChange"
                                    />
                                </b-button>
                                <b-button
                                    type="is-text"
                                    v-if="!showRecorder"
                                    v-on:click="toggleRecorder"
                                    >Record something yourself!</b-button
                                >
                                <b-button
                                    type="is-text"
                                    v-if="showRecorder"
                                    v-on:click="toggleRecorder"
                                    >Hide Recorder</b-button
                                >
                            </div>
                        </div>
                        <!-- End Intro / Buttons -->
                        <!-- Recorder -->
                        <div
                            v-if="showRecorder"
                            class="column is-three-quarters-fullhd is-full-desktop"
                        >
                            <k-audio-recorder
                                v-on:recAudio="handleAudioRec"
                            ></k-audio-recorder>
                        </div>
                        <!-- End Recorder -->

                        <!-- Trimmer -->
                        <div
                            v-if="!showRecorder && showTrimmer"
                            class="column is-three-quarters-fullhd is-full-desktop"
                        >
                            <!-- v-bind:reset="reset" -->
                            <k-audio-trimmer
                                v-bind:audioBlob="fileBlob"
                                ref="audioTrimmer"
                            ></k-audio-trimmer>
                        </div>
                        <!-- Close Trimmer -->
                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="columns is-multiline is-desktop">
                        <!-- Intro / Buttons -->
                        <div class="column is-full-desktop">
                            <h3 class="title is-3">3. Your Image</h3>
                            <k-image-editor></k-image-editor>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="columns is-multiline is-desktop">
                        <!-- Intro / Buttons -->
                        <div class="column is-full-desktop">
                            <h3 class="title is-3">4. Send To Server</h3>
                            <b-button class="mb-3" @click="sendToServer">
                                Send
                            </b-button>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div class="container">
                    <div class="columns is-multiline is-desktop">
                        <!-- Intro / Buttons -->
                        <div class="column is-full-desktop">
                            <h3 class="title is-3">5. Job Status</h3>
                            <k-job-status
                                v-for="jobId in jobIds"
                                :key="jobId"
                                :jobId="jobId"
                            >
                            </k-job-status>
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
import KAudioRecorder from "../../components/audio/KAudioRecorder";
import KAudioTrimmer from "../../components/audio/KAudioTrimmer";
import KImageEditor from "../../components/image/KImageEditor"
import KJobStatus from "../../components/job-status/KJobStatus"
import backendAPI from "@/helpers/backendAPI";
import themes from '@/helpers/themes.json'

export default {
    name: "Create",
    components: {
        kSideBar: KSideBar,
        designCard: DesignCard,
        kAudioRecorder: KAudioRecorder,
        kAudioTrimmer: KAudioTrimmer,
        kImageEditor: KImageEditor,
        kJobStatus: KJobStatus,
    },

    data() {
        return {
            designs: [],
            fileBlob: null,
            showRecorder: false,
            showTrimmer: false,
            jobIds: []
        };
    },

    methods: {
        handleAudioRec(recAudioBlob) {
            console.log("IN AUDIO REC HANDLER", recAudioBlob);
            if (recAudioBlob) {
                this.handleFileChange(null);
                this.fileBlob = recAudioBlob;
                this.showRecorder = false;
                this.showTrimmer = true;
            }
        },
        handleFileChange(e) {
            const file = e ? e.target.files[0] : null;
            this.showTrimmer = false;
            console.log("IN FILE HANDLER", file);
            if (file) {
                const reader = new FileReader();
                // Read File as an ArrayBuffer
                reader.readAsArrayBuffer(file);

                reader.onload = evt => {
                    // Create a Blob providing as first argument a typed array with the file buffer
                    this.fileBlob = new window.Blob([
                        new Uint8Array(evt.target.result)
                    ]);
                    this.showRecorder = false;
                    this.showTrimmer = true;
                };

                reader.onerror = evt => {
                    console.error("An error ocurred reading the file: ", evt);
                };
            }
        },
        resetAudioPlayer() {},
        toggleRecorder() {
            this.showRecorder = !this.showRecorder;
            this.showTrimmer = false;
        },
        toggleTrimmer() {
            this.showTrimmer = !this.showTrimmer;
            this.showRecorder = false;
        },
        sendToServer() {
            const theme = {...themes['default'], ...themes['Basic']};
            const caption = 'Hello World';
            backendAPI.uploadJob(this.fileBlob, theme, caption, this.$refs.audioTrimmer.region, function(err, jobId){
                if (err) {
                    throw err;
                }
                this.jobIds.push(jobId);
            }.bind(this));
        }
    },

    created() {
        fetch("/api/userId/designs")
            .then(res => res.json())
            .then(json => {
                this.designs = json.designs;
            });
    }
    // watch: {
    //     fileBlob(newBlob) {
    //         console.log(newBlob);
    //     }
    // }
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
    margin-bottom: 5rem;
}

#upload-file {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
}
</style>
