<script>
import { functions } from "@/utils/traxHandler";
export default {
    data() {
        return {
            tracker: {
                timer: 0,
                ticker: null,
                sounds: [],
            },
        };
    },
    mounted() {
        this.playSong(
            this.$store.state.trax.playingSong.track,
            this.$store.state.trax.playingSong.length,
            false
        );
    },
    unmounted() {
        this.stopSong();
    },
    methods: {
        ...functions,
    },
};
</script>

<template>
    <div id="trax-playlist-preview" class="d-none">{{$store.state.trax.playingSong}}</div>
</template>