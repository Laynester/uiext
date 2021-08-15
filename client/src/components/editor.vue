<script>
import { functions } from "../utils/traxHandler";

export default {
    data() {
        return {
            collection: [],
            playing: null,
            tracks: [],
            dupeTracks: [],
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
            visibleCollection: [],
            currentPage: 1,
            collectionPages: 0,
            tuned: false,
            name: "",
            hovered: {
                i: 0,
                ind: 0,
            },
            tracker: {
                visible: false,
                ticker: null,
                position: 0,
                sounds: [],
                offset: 0,
            },
            sounds: {},
        };
    },
    mounted() {
        this.setTracks();
        this.load();
    },
    methods: functions,
    beforeDestroy() {
        this.stopSong();
    },
};
</script>

<template>
    <div class="trax-editor" v-if="collection">
        <div class="trax-collections">
            <div
                class="
                    le-trax-style-2
                    me-1
                    px-1
                    coloured
                    bg-dark
                    d-flex
                    align-items-center
                    text-white
                "
                @click="paginate('prev')"
            >
                <i class="fas fa-chevron-left" />
            </div>
            <div
                class="trax-collection le-trax-style-3"
                v-for="(c, i) in visibleCollection"
                :key="i"
            >
                <div
                    class="trax-collection-header text-truncate overflow-hidden"
                >
                    <span class="d-block text-align-center">{{ c.name }}</span>
                </div>
                <div class="trax-collection-grid">
                    <div
                        class="
                            trax-collection-grid-item
                            le-trax-style-2
                            coloured
                        "
                        :style="'background-color:' + c.colour"
                        v-for="(s, ind) in c.sets"
                        :key="'c' + ind"
                        @mouseenter="playSound(s.sound, true)"
                        @mouseleave="stopPlayingSound()"
                        @mousedown="
                            registerSelected(s.sound, c.colour, s.set, ind)
                        "
                    />
                </div>
            </div>
            <div
                class="
                    le-trax-style-2
                    px-1
                    coloured
                    bg-dark
                    d-flex
                    align-items-center
                    text-white
                "
                @click="paginate('next')"
            >
                <i class="fas fa-chevron-right" />
            </div>
        </div>
        <div class="w-100 d-flex flex-row my-1">
            <div class="w-100 me-1 mb-0">
                <input
                    type="text"
                    class="
                        w-100
                        form-control form-control-sm
                        mb-0
                        le-trax-style-4
                    "
                    :placeholder="`My Sick Beatz`"
                    v-model="name"
                />
            </div>
            <div class="justify-content-end d-flex flex-row">
                <button
                    v-if="!tuned"
                    class="
                        le-trax-style-2
                        coloured
                        bg-success
                        me-1
                        text-white
                        px-2
                        le-trax-ts-2
                    "
                    @click="
                        playSong(
                            getSongString().string,
                            getSongString().len,
                            true
                        )
                    "
                >
                    <i class="fas fa-play" />
                </button>
                <button
                    v-if="tuned"
                    class="
                        le-trax-style-2
                        bg-danger
                        me-1
                        text-white
                        px-2
                        coloured
                    "
                    @click="stopSong()"
                    title="Stop Song"
                >
                    <i class="fas fa-stop" />
                </button>
                <button
                    class="bg-dark me-1 text-white px-2 le-trax-ts-2"
                    :class="
                        name ? `le-trax-style-2 coloured` : `le-trax-style-3`
                    "
                    @click="saveSong()"
                >
                    <i class="far fa-save" />
                </button>
                <button
                    class="
                        le-trax-style-2
                        coloured
                        bg-danger
                        me-1
                        text-white
                        px-2
                        le-trax-ts-2
                    "
                    @click="setTracks()"
                >
                    <i class="fas fa-trash-alt" />
                </button>
                <button
                    class="
                        le-trax-style-2
                        coloured
                        bg-warning
                        text-white
                        px-2
                        le-trax-ts-2
                    "
                    @click="$parent.toggleEditor()"
                >
                    <i class="fas fa-sign-out-alt" />
                </button>
            </div>
        </div>
        <div class="position-relative">
            <div class="trax-tracks" ref="tracker">
                <div
                    v-for="(t, i) in tracks"
                    :key="'a' + i"
                    class="trax-track-row d-inline-table"
                >
                    <div class="w-100 d-flex">
                        <div
                            v-for="(s, ind) in t"
                            :key="'b' + ind"
                            :class="
                                `trax-track-item le-trax-style-3 coloured` +
                                (s.grouped ? ' trax-track-grouped' : '') +
                                (s.hovering ? ' hovered' : '')
                            "
                            :data-grouped="s.set"
                            :data-unique="s.unique"
                            :style="'background-color:' + s.colour"
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
                    v-model="tracker.position"
                    style="width: 1563px"
                    :val="tracker.position"
                />
                <div class="position-absolute duped-tracks">
                    <div
                        v-for="(t, i) in tracks"
                        :key="'c' + i"
                        class="trax-track-row d-inline-table duped-row"
                    >
                        <div class="w-100 d-flex">
                            <div
                                v-for="(s, ind) in t"
                                :key="'d' + ind"
                                :class="
                                    `trax-track-item` +
                                    (s.grouped ? ' trax-track-grouped' : '') +
                                    (s.hovering ? ' hovered' : '')
                                "
                                :data-grouped="s.set"
                                :data-unique="s.unique"
                                @mousedown="setTile(i, ind)"
                                @mouseenter="hoverSection(i, ind, false)"
                                @mouseleave="hoverSection(i, ind, true)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>