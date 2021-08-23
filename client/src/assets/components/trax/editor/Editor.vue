<script>
import { functions } from "@/utils/traxHandler";
import Collections from "./Collections.vue";
export default {
    props: ["tuned", "timeInSeconds"],
    components: { Collections },
    data() {
        return {
            playing: null,
            selected: {},
            selectedRes: {
                colour: "",
                sound: 0,
                set: 0,
                id: 0,
                hovering: false,
                grouped: false,
                unique: true,
            },
            name: "",
            hovered: {
                i: 0,
                ind: 0,
            },
            sounds: [],
        };
    },
    mounted() {
        this.setTracks();
    },
    unmounted() {
        this.$emit("stop");
    },
    methods: functions,
    beforeDestroy() {
        this.stopSong();
    },
};
</script>

<template>
    <div class="trax-editor">
        <Collections v-if="$store.state.trax.collection" />
        <div class="w-100 d-flex flex-row my-1">
            <div class="w-100 me-1 mb-0">
                <input
                    type="text"
                    class="w-100 form-control form-control-sm mb-0"
                    :placeholder="`My Sick Beatz`"
                    v-model="name"
                />
            </div>
            <div class="justify-content-end d-flex flex-row">
                <UIExtButton
                    v-if="!tuned"
                    :theme="$store.state.config.trax.buttons"
                    colour="success"
                    @clicked="playSong(
                            getSongString().string
                        )"
                    caption="<i class='fas fa-play' />"
                    class="px-2 me-1"
                />
                <UIExtButton
                    v-else
                    :theme="$store.state.config.trax.buttons"
                    colour="danger"
                    @clicked="stopSong()"
                    caption="<i class='fas fa-stop' />"
                    class="px-2 me-1"
                />
                <UIExtButton
                    :theme="$store.state.config.trax.lists"
                    @clicked="saveSong()"
                    caption="<i class='far fa-save' />"
                    class="px-2 me-1"
                />
                <UIExtButton
                    :theme="$store.state.config.trax.buttons"
                    colour="danger"
                    @clicked="setTracks()"
                    caption="<i class='fas fa-trash-alt' />"
                    class="px-2 me-1"
                />
                <UIExtButton
                    :theme="$store.state.config.trax.buttons"
                    colour="warning"
                    @clicked="$emit('toggleEditor')"
                    caption="<i class='fas fa-sign-out-alt' />"
                    class="px-2"
                />
            </div>
        </div>
        <div class="position-relative">
            <div class="trax-tracks" ref="tracker">
                <div
                    v-for="(t, i) in $store.state.trax.tracks"
                    :key="'a' + i"
                    class="trax-track-row d-inline-table"
                >
                    <div class="w-100 d-flex">
                        <div
                            v-for="(s, ind) in t"
                            :key="'b' + ind"
                            :class="
                                `trax-track-item uiExt-border` +
                                (s.grouped ? ' trax-track-grouped' : '') +
                                (s.hovering ? ' hovered' : '')
                            "
                            :data-grouped="s.set"
                            :data-unique="s.unique"
                            :style="'background-color:' + s.colour"
                            theme="0"
                            @mousedown="setTile(i, ind)"
                            @mouseenter="hoverSection(i, ind, false)"
                            @mouseleave="hoverSection(i, ind, true)"
                        >
                            <div
                                v-for="(c, ii) in s.set"
                                :key="ii"
                                :class="`trax-icon trax-icon-${s.id + 1}`"
                            />
                        </div>
                    </div>
                </div>
                <input
                    v-if="$refs['tracker']"
                    type="range"
                    min="0"
                    max="59"
                    style="width: 1563px"
                    v-model="$store.state.trax.traxplayer.position"
                    :val="$store.state.trax.traxplayer.position"
                />
            </div>
        </div>
    </div>
</template>