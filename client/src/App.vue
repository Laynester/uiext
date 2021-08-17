<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import TraxEditor from "./assets/components/trax/TraxEditor.vue";

export default {
    components: { TraxEditor },
    mounted() {
        CommunicationManager.getInstance();
    },
};
</script>

<template>
    <div class="position-absolute">
        <TraxEditor />
    </div>
</template>