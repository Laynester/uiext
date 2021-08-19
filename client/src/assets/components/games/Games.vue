<script>
import TicTacToe from "./TicTacToe/TicTacToe.vue";
export default {
    components: { TicTacToe },
};
</script>

<template>
    <div>
        <TicTacToe v-if="$store.state.window.ttt" />
    </div>
</template>