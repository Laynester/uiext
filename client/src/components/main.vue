<script>
import methods from "../utils/functions";

export default {
    data() {
        return {
            songs: null,
            changed: false,
            selected: {
                name: "The Habhop",
                length: "817",
            },
        };
    },
    mounted: async function () {
        await methods.getAPI("personalsongs").then((res) => {
            this.songs = res.data;
        });
    },
    methods: {
        create() {
            this.$parent.toggleEditor();
        },
        burn: async function () {},
        delete: async function () {},
    },
};
</script>

<template>
    <div class="d-flex flex-row h-100">
        <div class="w-100 me-1 h-100 d-flex flex-column" v-if="songs">
            <div class="h-100 le-trax-songs">
                <div
                    class="le-trax-style-2 le-trax-ts-1 le-trax-songs-item"
                    v-for="(r, i) in songs"
                    :key="i"
                    @click="
                        selected = r;
                        changed = true;
                    "
                >
                    {{ r.name }}
                </div>
            </div>
        </div>
        <div class="w-100 me-1" v-else>You havent created any songs yet!</div>
        <div class="w-100">
            <div class="le-trax-style-3 text-center p-2">
                <b class="d-block">{{ selected.name }}</b>
                {{ selected.length | secondsDuration }}
            </div>
            <div class="mt-1">
                <div
                    class="
                        le-trax-style-2
                        coloured
                        bg-dark
                        text-white text-center
                        le-trax-ts-3
                        px-2
                        fw-bold
                        mb-1
                    "
                    @click="create()"
                >
                    Create a New Song
                </div>
                <div
                    class="
                        le-trax-style-2
                        coloured
                        bg-success
                        text-white text-center
                        le-trax-ts-3
                        px-2
                        fw-bold
                    "
                    :class="{ disabled: !changed }"
                    @click="burn()"
                >
                    Burn song
                </div>
            </div>
        </div>
    </div>
</template>