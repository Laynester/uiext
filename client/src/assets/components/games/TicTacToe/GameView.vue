<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import { TicTacToeGameMove } from "@/communication/outgoing/games/TicTacToe/TicTacToeGameMove";
export default {
    methods: {
        clickCell(row, column) {
            if (this.$store.state.games.ttt.board[row][column] !== "") return;

            CommunicationManager.getInstance().sendMessage(
                new TicTacToeGameMove(row, column)
            );
        },
    },
};
</script>

<template>
    <div class="h-100 uiExt-game-ttt">
        <div class="h-100">
            <div
                class="d-flex flex-row w-100 justify-content-center uiExt-game-ttt-board-row"
                v-for="(r,rowInd) in $store.state.games.ttt.board"
                :key="`r${rowInd}`"
            >
                <div
                    class="d-flex flex-row uiExt-game-ttt-board-cell"
                    v-for="(c,colInd) in r"
                    :key="`c${colInd}`"
                    @click="clickCell(rowInd,colInd)"
                >{{ c }}</div>
            </div>
        </div>
        <div class="uiExtSplitter-hor" :theme="$store.state.config.games.ttt.theme" />

        <div class="w-100 d-flex flex-row justify-content-between">
            <div
                :class="{'text-success': $store.state.games.ttt.turn !== $store.state.games.ttt.me}"
            >
                {{$filters.translate('games.ttt.window.player')}}:
                <b>{{$store.state.games.ttt.me == "o" ? 'x' : 'o'}}</b>
            </div>
            <div :class="{'text-success':$store.state.games.ttt.turn == $store.state.games.ttt.me}">
                {{$filters.translate('games.ttt.window.you')}}:
                <b>{{$store.state.games.ttt.me}}</b>
            </div>
        </div>
    </div>
</template>