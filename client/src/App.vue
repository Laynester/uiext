<script>
import TraxWindow from "./components/traxWindow.vue";

export default {
    components: { TraxWindow },
    data() {
        return {
            ready: false,
            toggled: false,
            editor: false,
        };
    },
    mounted: async function () {
        await this.$api.get(`traxEditorConfig.json`).then((res) => {
            this.$store.state.config = res.data;
            this.$api.defaults.headers.common["sso"] = window.TraxConfig.sso;
            this.ready = true;
        });
    },
    methods: {
        toggleTrax() {
            this.toggled = !this.toggled;
        },
    },
};
</script>

<template>
    <div id="le-trax">
        <div
            v-if="$store.state.config.toggle"
            class="le-trax-style-2 le-trax-toggle"
            :style="`left:${$store.state.config.toggle.x}px;top:${$store.state.config.toggle.y}px`"
            @click="toggled = !toggled"
        />
        <TraxWindow v-if="$store.state.config.toggle && toggled" />
    </div>
</template>