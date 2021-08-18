<script>
export default {
    methods: {
        getTitle(string) {
            switch (string) {
                case 0:
                    return this.$filters.translate("success");
                case 1:
                    return this.$filters.translate("error");
                default:
                    return this.$filters.translate("alert");
            }
        },
    },
};
</script>

<template>
    <div
        class="h-100 w-100 trax-alert-overlay position-absolute d-flex align-items-center justify-content-center"
        v-if="$store.state.trax.alert"
    >
        <UIExtCard
            :theme="$store.state.config.trax.theme"
            :title="getTitle($store.state.trax.alert.type)"
            @clicked="$store.state.trax.alert = null"
            class="text-align-center"
        >{{$store.state.trax.alert.message}}</UIExtCard>
    </div>
</template>