<script>
import NuxRooms from "./NuxRooms.vue";
export default {
    components: { NuxRooms },
};
</script>

<template>
    <div>
        <NuxRooms v-if="$store.state.user.nux.rooms" />
    </div>
</template>