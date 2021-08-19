<script>
import Alert from "../ui/Alert.vue";
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
        :theme="$store.state.config.trax.theme"
        @clicked="toggle()"
        :class="this.$store.state.trax.editor ? `trax-window-editor` : `trax-window-list`"
        center="true"
        ref="card"
    >
        <ListView v-if="!this.$store.state.trax.editor" @toggleEditor="toggleEditor()" />
        <Editor v-else @toggleEditor="toggleEditor()" />
        <Alert
            :theme="$store.state.config.trax.theme"
            :alert="$store.state.trax.alert"
            @clear="$store.state.trax.alert = null"
        />
    </UIExtCard>
</template>