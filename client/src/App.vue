<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import TraxEditor from "./assets/components/trax/TraxEditor.vue";
import Games from "./assets/components/games/Games.vue";

export default {
    components: { TraxEditor, Games },
    mounted() {
        CommunicationManager.getInstance();
    },
};
</script>

<template>
    <div class="position-absolute">
        <template v-if="$store.state.config">
            <TraxEditor />
            <Games />
        </template>
    </div>
</template>