<script>
import Editor from "./editor/Editor.vue";
import ListView from "./ListView.vue";

export default {
    components: { ListView, Editor },
    data() {
        return {
            editor: false,
        };
    },
    methods: {
        toggleEditor() {
            this.editor = !this.editor;
        },
        toggle() {
            this.$store.state.window.trax = false;
        },
    },
};
</script>

<template>
    <UIExtCard
        v-if="$store.state.window.trax"
        title="Trax"
        theme="0"
        @clicked="toggle()"
        :class="editor ? `trax-window-editor` : `trax-window-list`"
    >
        <ListView v-if="!editor" @toggleEditor="toggleEditor()" />
        <Editor v-else @toggleEditor="toggleEditor()" />
    </UIExtCard>
</template>