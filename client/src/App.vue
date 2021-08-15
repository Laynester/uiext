<script>
import Editor from "./components/editor.vue";
import Main from "./components/main.vue";
import methods from "./utils/functions";

export default {
    components: { Main, Editor },
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
        <div
            class="le-trax-style-1 position-absolute d-flex flex-column"
            v-if="$store.state.config && toggled"
            :style="`width:${$store.state.config.window.width}px;left:${$store.state.config.window.x}px;top:${$store.state.config.window.y}px;`"
        >
            <div
                class="
                    d-flex
                    flex-row
                    justify-content-between
                    mb-1
                    le-trax-ts-1
                "
            >
                <div class="fw-bold align-self-center">Trax</div>
                <div
                    class="le-trax-style-2 le-trax-close"
                    @click="toggled = !toggled"
                />
            </div>
            <div :style="`height:${$store.state.config.window.height}px;`">
                <Main v-if="!editor" />
                <Editor v-else />
            </div>
        </div>
    </div>
</template>