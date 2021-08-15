<script>
import methods from "./utils/functions";
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
        if (this.$store.state.config) return;
        await methods.getAPI("/traxEditorConfig.json").then((res) => {
            this.$store.state.config = res.data;
            this.$api.defaults.headers.common["sso"] = window.TraxConfig.sso;
            this.ready = true;
        });
    },
    methods: {
        toggleEditor() {
            this.editor = !this.editor;
        },
    },
};
</script>

<template>
    <div id="le-trax">
        <div
            v-if="$store.state.config"
            class="le-trax-style-2 le-trax-toggle"
            :style="`left:${$store.state.config.toggle.x}px;top:${$store.state.config.toggle.y}px`"
            @click="toggled = !toggled"
        />
        <TraxWindow v-if="$store.state.config && toggled" />
    </div>
</template>