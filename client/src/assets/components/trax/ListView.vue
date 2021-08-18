<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import { RequestSongsComposer } from "@/communication/outgoing/trax/RequestSongsComposer";
import { BurnSongComposer } from "@/communication/outgoing/trax/BurnSongComposer";
import { DeleteSongComposer } from "@/communication/outgoing/trax/DeleteSongComposer";
import { functions } from "@/utils/traxHandler";
import { RequestCollectionsComposer } from "@/communication/outgoing/trax/RequestCollectionsComposer";

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
                timer: 0,
                ticker: null,
                sounds: [],
            },
        };
    },
    mounted() {
        CommunicationManager.getInstance().sendMessage(
            new RequestSongsComposer()
        );
        CommunicationManager.getInstance().sendMessage(
            new RequestCollectionsComposer()
        );
        this.$store.state.trax.editing = null;
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
        editSong() {
            if (!this.selected.id) return;
            this.$store.state.trax.editing = this.selected;
            this.$emit("toggleEditor");
        },
        deleteSong() {
            if (!this.selected.id) return;
            CommunicationManager.getInstance().sendMessage(
                new DeleteSongComposer(this.selected.id)
            );
            this.selected = {
                name: "The Habhop",
                length: "817",
            };
            this.changed = false;
        },
        preview() {
            this.playSong(this.selected.track, this.selected.length * 2, false);
            this.previewing = true;
        },
    },
};
</script>

<template>
    <div class="d-flex flex-row h-100">
        <div
            class="w-100 me-1 h-100 d-flex flex-column"
            v-if="$store.state.trax.songs && $store.state.trax.songs.length"
        >
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
        <div class="w-100 me-1" v-else>{{$filters.translate('trax.window.no_songs')}}</div>
        <div class="uiExtSplitter-ver" />
        <div class="w-100 align-self-center">
            <UIExtButton
                theme="0"
                :caption="$filters.translate('trax.window.create')"
                @clicked="create()"
                colour="dark"
            />
            <UIExtBorder theme="0" class="p-2 text-center my-2" ref="tracker">
                <b class="d-block">{{ selected.name }}</b>
                {{ $filters.secondsDuration(tuned ? tracker.timer : selected.length * 2) }}
                <UIExtButton
                    theme="0"
                    :caption="$filters.translate('trax.window.preview')"
                    @clicked="preview()"
                    colour="success"
                    v-if="!tuned"
                    :class="{'uiExt-button-disabled':!changed}"
                />
                <UIExtButton
                    theme="0"
                    :caption="$filters.translate('trax.window.stop')"
                    @clicked="stopSong()"
                    colour="danger"
                    v-else
                />
            </UIExtBorder>
            <div class="d-flex flex-row justify-content-between">
                <UIExtButton
                    :class="{'uiExt-button-disabled':!changed}"
                    theme="0"
                    caption="<i class='far fa-trash-alt'></i>"
                    @clicked="deleteSong()"
                    colour="danger"
                    class="w-100"
                />
                <UIExtButton
                    :class="{'uiExt-button-disabled':!changed}"
                    theme="0"
                    caption="<i class='fas fa-edit'></i>"
                    @clicked="editSong()"
                    colour="warning"
                    class="w-100 mx-1"
                />
                <UIExtButton
                    :class="{'uiExt-button-disabled':!changed}"
                    theme="0"
                    caption="<i class='fas fa-compact-disc'></i>"
                    @clicked="burn()"
                    colour="success"
                    class="w-100"
                />
            </div>
        </div>
    </div>
</template>