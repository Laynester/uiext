<script>
export default {
    methods: {
        close() {},
    },
};
</script>

<template>
    <UIExtCard
        :title="$filters.translate('nux.pickaroom')"
        :theme="$store.state.config.nux.rooms.theme"
        center="true"
        @clicked="$store.state.user.nux.rooms = null"
        class="nux-rooms-window"
    >
        <div class="d-flex flex-row w-100 h-100">
            <div v-for="(r,i) in $store.state.user.nux.rooms" :key="i" class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <img :src="r.image" class="mx-auto" />
                    <div class="uiExtSplitter-hor" />
                    <b>{{r.name}}</b>
                    <i class="text-muted">{{r.desc}}</i>
                </div>
                <div class="uiExtSplitter-ver" />
            </div>
        </div>
    </UIExtCard>
</template>