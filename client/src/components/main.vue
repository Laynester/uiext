<script>
import methods from "../utils/functions";

export default {
    data() {
        return {
            songs: null,
            selected: {
                length: "",
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
                    @click="selected = r"
                >
                    {{ r.name }}
                </div>
            </div>
            <div
                class="le-trax-style-2 mt-1 text-center le-trax-ts-1"
                @click="create()"
            >
                Create a New Song
            </div>
        </div>
        <div class="w-100 me-1" v-else>You havent created any songs yet!</div>
        <div class="le-trax-style-3 w-100 align-self-center">
            {{ selected.length | secondsDuration }}
        </div>
    </div>
</template>