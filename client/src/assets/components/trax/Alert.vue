<script>
export default {
    methods: {
        getTitle(string) {
            switch (string) {
                case 0:
                    return "Success!";
                case 1:
                    return "Error!";
                default:
                    return "Alert";
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
            theme="0"
            :title="getTitle($store.state.trax.alert.type)"
            @clicked="$store.state.trax.alert = null"
        >{{$store.state.trax.alert.message}}</UIExtCard>
    </div>
</template>