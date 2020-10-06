<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                type="is-light"
                open
            >
                <div class="p-1">
                    <div class="block">
                    <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    />
                    </div>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menu">
                            <b-menu-item icon="plus-circle-outline" label="Create"></b-menu-item>
                            <b-menu-item icon="video-outline" label="My Video's"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Account">
                            <b-menu-item icon="cog" label="Settings"></b-menu-item>
                            <b-menu-item icon="notebook" label="Your Plan"></b-menu-item>
                            <b-menu-item icon="logout" label="Logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </section>
    </div>
</template>

<script>
export default {
    name: 'KSideBar',
    data() {
        return {
        expandOnHover: false,
        mobile: "reduce",
        reduce: false
        };
    }
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        padding: 0;
        // min-height: 100vh;
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>