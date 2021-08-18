<script>
import Alert from "./Alert.vue";
import Editor from "./editor/Editor.vue";
import ListView from "./ListView.vue";

export default {
    components: { ListView, Editor, Alert },
    methods: {
        toggleEditor() {
            this.$store.state.trax.editor = !this.$store.state.trax.editor;
            setTimeout(() => {
                this.$refs["card"].centerDiv();
            }, 0);
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
        :title="$filters.translate('trax.window.title')"
        theme="0"
        @clicked="toggle()"
        :class="this.$store.state.trax.editor ? `trax-window-editor` : `trax-window-list`"
        center="true"
        ref="card"
    >
        <ListView v-if="!this.$store.state.trax.editor" @toggleEditor="toggleEditor()" />
        <Editor v-else @toggleEditor="toggleEditor()" />
        <Alert />
    </UIExtCard>
</template>