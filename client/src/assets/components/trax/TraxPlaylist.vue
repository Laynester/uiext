<script>
import { TraxPlayer } from "@/utils/TraxPlayer";

export default {
    data() {
        return {
            tuned: false,
            traxplayer: null,
        };
    },
    mounted() {
        this.traxplayer = new TraxPlayer(
            $store.state.trax.playingSong.track,
            this
        );

        this.traxplayer.play();
    },
    unmounted() {
        this.traxplayer.play();
    },
};
</script>

<template>
    <div id="trax-playlist-preview" class="d-none">{{$store.state.trax.playingSong}}</div>
</template>