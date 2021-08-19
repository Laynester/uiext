<script>
export default {
    props: ["theme", "alert"],
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
        class="h-100 w-100 uiExt-alert-overlay position-absolute d-flex align-items-center justify-content-center"
        v-if="alert"
    >
        <UIExtCard
            :theme="theme"
            :title="getTitle(alert.type)"
            @clicked="$emit('clear')"
            class="text-center"
        >{{alert.message}}</UIExtCard>
    </div>
</template>