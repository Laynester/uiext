<script>
import Editor from "./editor.vue";
import Main from "./main.vue";
import { dragElement } from "../utils/draggable";

export default {
    components: { Main, Editor },
    data() {
        return {
            editor: false,
        };
    },
    mounted() {
        dragElement(this.$refs["trax-editor"], this.$refs["trax-header"]);
    },
    methods: {
        getConfig(opt) {
            switch (opt) {
                case "height":
                    return this.editor
                        ? this.$store.state.config.window.editor.height
                        : this.$store.state.config.window.list.height;
                case "width":
                    return this.editor
                        ? this.$store.state.config.window.editor.width
                        : this.$store.state.config.window.list.width;
            }
        },
    },
};
</script>

<template>
    <div
        ref="trax-editor"
        class="le-trax-style-1 position-absolute d-flex flex-column"
        :style="`width:${getConfig('width')}px;left:${
            $store.state.config.window.x
        }px;top:${$store.state.config.window.y}px;`"
    >
        <div
            class="d-flex flex-row justify-content-between mb-1 le-trax-ts-1"
            ref="trax-header"
        >
            <div class="fw-bold align-self-center">Trax</div>
            <div
                class="le-trax-style-2 le-trax-close"
                @click="this.$parent.toggleEditor()"
            />
        </div>
        <div :style="`height:${getConfig('height')}px;`">
            <Main v-if="!editor" />
            <Editor v-else />
        </div>
    </div>
</template>