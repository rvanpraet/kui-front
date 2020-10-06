<template>
    <div class="about">
        <h1>This is an about page</h1>
        <ul id="todos">
            <li v-for="design in designs" v-bind:key="design.id">
                {{ design.imageUrl }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "About",

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
