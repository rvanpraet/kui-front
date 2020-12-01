<template>
    <div class="status">
        {{ jobId }}: {{ JSON.stringify(jobStatus, null, 4) }}
    </div>
</template>

<script>

import backendAPI from "@/helpers/backendAPI";

export default {
    name: "KImageEditor",
    components: {
    },
    props: {
        jobId: String
    },
    data() {
        return {
            jobStatus: {},
            pollStatus: null,
        };
    },

    methods: {
        getStatus() {
            backendAPI.jobStatus(this.jobId, function(err, jobStatus){
                if (err) {
                    throw err;
                }

                this.jobStatus = jobStatus;
                if(this.jobStatus.status == "ready") {
                    this.stopPolling();
                }

            }.bind(this));
        },
        stopPolling(){
            clearInterval(this.pollStatus);
            this.pollStatus = null;
        }
    },
    beforeDestroy(){
        this.stopPolling();
    },
    mounted() {
        this.pollStatus = setInterval(this.getStatus, 1000);
    }

};
</script>

<style lang="scss">
</style>
