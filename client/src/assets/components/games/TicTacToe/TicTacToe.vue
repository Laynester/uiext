<script>
import ListView from "./ListView.vue";
import Alert from "../../ui/Alert.vue";
import GameView from "./GameView.vue";
export default {
    components: { ListView, Alert, GameView },
    methods: {
        playing() {
            setTimeout(() => {
                this.$refs["container"].centerDiv();
            }, 30);
        },
    },
    mounted() {
        this.$store.state.games.ttt.alert = null;
    },
};
</script>

<template>
    <UIExtCard
        :title="$filters.translate('games.ttt.window.title')"
        :theme="$store.state.config.games.ttt.theme"
        center="true"
        :class="$store.state.games.ttt.playing ? 'games-window-ttt-board' : 'games-window-ttt'"
        ref="container"
        hideclose="true"
    >
        <Alert
            :theme="$store.state.config.games.ttt.theme"
            :alert="$store.state.games.ttt.alert"
            @clear="$store.state.games.ttt.alert = null"
        />
        <ListView v-if="!$store.state.games.ttt.playing" @recenter="playing()" />
        <GameView v-else />
    </UIExtCard>
</template>