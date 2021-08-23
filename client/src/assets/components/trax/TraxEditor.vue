<script>
import Alert from "../ui/Alert.vue";
import Editor from "./editor/Editor.vue";
import ListView from "./ListView.vue";
import { TraxPlayer } from "@/utils/TraxPlayer";

export default {
    components: { ListView, Editor, Alert },
    data() {
        return {
            tuned: false,
            traxplayer: null,
        };
    },
    mounted() {
        this.traxplayer = new TraxPlayer("", this);
    },
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
        preload(song) {
            if (!this.traxplayer) return;
            this.traxplayer.preload(song);
        },
        playSong(song) {
            if (!this.traxplayer) return;
            this.traxplayer.preload(song);
            this.traxplayer.play();
        },
        stopSong() {
            if (!this.traxplayer) return;
            this.traxplayer.stop();
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
        <ListView
            v-if="!this.$store.state.trax.editor"
            @toggleEditor="toggleEditor()"
            :tuned="tuned"
            :timeInSeconds="traxplayer ? traxplayer._timeInSeconds : 0"
            @preload="preload"
            @play="playSong"
            @stop="stopSong"
        />
        <Editor
            v-else
            @toggleEditor="toggleEditor()"
            :tuned="tuned"
            :timeInSeconds="traxplayer ? traxplayer._timeInSeconds : 0"
            @preload="preload"
            @play="playSong"
            @stop="stopSong"
        />
        <Alert
            :theme="$store.state.config.trax.theme"
            :alert="$store.state.trax.alert"
            @clear="$store.state.trax.alert = null"
        />
    </UIExtCard>
</template>