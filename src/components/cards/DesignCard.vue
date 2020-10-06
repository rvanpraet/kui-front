<template>
    <div class="card is-hover-shadow">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="imgUrl" alt="Placeholder image" />
            </figure>
        </div>
        <div class="card-footer">
            <a href="#" class="card-footer-item">Select Design</a>
            <b-dropdown :triggers="['hover']" aria-role="list">
                <a
                    class="card-footer-item"
                    slot="trigger"
                    slot-scope="{ active }"
                >
                    <span>More</span>
                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                </a>

                <b-dropdown-item aria-role="listitem"
                    >Edit Design</b-dropdown-item
                >
                <b-dropdown-item aria-role="listitem"
                    >Delete Design</b-dropdown-item
                >
            </b-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "design-card",
    props: {
        imgUrl: String
    }
};
</script>

<style scoped>
.tag {
    cursor: pointer;
}
</style>
