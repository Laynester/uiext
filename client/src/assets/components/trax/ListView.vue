<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import { RequestSongsComposer } from "@/communication/outgoing/trax/RequestSongsComposer";
import { BurnSongComposer } from "@/communication/outgoing/trax/BurnSongComposer";
import { functions } from "@/utils/traxHandler";

export default {
    data() {
        return {
            songs: null,
            changed: false,
            selected: {
                name: "The Habhop",
                length: "817",
            },
            tuned: false,
            tracker: {
                ticker: null,
            },
        };
    },
    mounted() {
        CommunicationManager.getInstance().sendMessage(
            new RequestSongsComposer()
        );
    },
    methods: {
        ...functions,
        create() {
            this.$emit("toggleEditor");
        },
        burn() {
            if (!this.selected.id) return;
            CommunicationManager.getInstance().sendMessage(
                new BurnSongComposer(this.selected.id)
            );
        },
        delete: async function () {},
        preview() {
            this.playSong(this.selected.track, this.selected.length, false);
            this.previewing = true;
        },
    },
};
</script>

<template>
    <div class="d-flex flex-row h-100">
        <div class="w-100 me-1 h-100 d-flex flex-column" v-if="$store.state.trax.songs">
            <div class="h-100 overflow-y-scroll pe-1">
                <UIExtButton
                    class="mb-1"
                    v-for="(r, i) in $store.state.trax.songs"
                    theme="2"
                    :caption="r.name"
                    :key="i"
                    @clicked="
                        selected = r;
                        changed = true;"
                />
            </div>
        </div>
        <div class="w-100 me-1" v-else>You havent created any songs yet!</div>
        <div class="uiExtSplitter-ver" />
        <div class="w-100 align-self-center">
            <UIExtButton theme="0" caption="Create a New song" @clicked="create()" colour="dark" />
            <UIExtBorder theme="0" class="p-2 text-center my-2" ref="tracker">
                <b class="d-block">{{ selected.name }}</b>
                {{ $filters.secondsDuration(selected.length) }}
                <UIExtButton
                    theme="0"
                    caption="Preview"
                    @clicked="preview()"
                    colour="success"
                    v-if="!tuned"
                />
                <UIExtButton theme="0" caption="Stop" @clicked="stopSong()" colour="danger" v-else />
            </UIExtBorder>
            <UIExtButton
                :class="{'uiExt-button-disabled':!changed}"
                theme="0"
                caption="Burn Song"
                @clicked="burn()"
                colour="success"
            />
        </div>
    </div>
</template>