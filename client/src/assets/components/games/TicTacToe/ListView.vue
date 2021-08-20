<script>
import { CommunicationManager } from "@/communication/CommunicationManager";
import { GameInviteComposer } from "@/communication/outgoing/games/GameInviteComposer";
import { StartGameComposer } from "@/communication/outgoing/games/StartGameComposer";

export default {
    data() {
        return {
            input: null,
        };
    },
    methods: {
        sendRequest() {
            if (!this.input) return;

            CommunicationManager.getInstance().sendMessage(
                new GameInviteComposer("ttt", this.input)
            );

            this.input = null;
        },
        startGame(id) {
            CommunicationManager.getInstance().sendMessage(
                new StartGameComposer("ttt", id)
            );
            this.$emit("recenter");
        },
        deleteInvite(ind) {
            this.$store.state.games.ttt.invites.splice(ind, 1);
        },
        inviteFriends() {
            CommunicationManager.getInstance().sendMessage(
                new GameInviteComposer("ttt", "", true)
            );
        },
    },
};
</script>

<template>
    <div class="h-100 d-flex flex-column">
        <input
            type="text"
            class="uiExt-input w-100 mb-1"
            :placeholder="$filters.translate('games.ttt.window.request_input')"
            @keyup.enter="sendRequest()"
            v-model="input"
        />
        <div class="uiExtSplitter-hor" />
        <div class="overflow-y-scroll h-100 pe-1" v-if="$store.state.games.ttt.invites.length">
            <div
                class="d-flex flex-row w-100 mb-1"
                v-for="(r,i) in $store.state.games.ttt.invites"
                :key="i"
            >
                <UIExtButton
                    :caption="r.username"
                    :theme="$store.state.config.games.ttt.lists"
                    class="w-100"
                />
                <UIExtButton
                    caption="<i class='fas fa-check'></i>"
                    :theme="$store.state.config.games.ttt.buttons"
                    colour="success"
                    class="px-2 mx-1"
                    @clicked="startGame(r.id);deleteInvite(i)"
                />
                <UIExtButton
                    caption="<i class='fas fa-times'></i>"
                    :theme="$store.state.config.games.ttt.buttons"
                    colour="danger"
                    class="px-2"
                    @clicked="deleteInvite(i)"
                />
            </div>
        </div>
        <div class="w-100 text-center" v-else>{{$filters.translate('games.no_invites')}}</div>
        <div class="mt-auto">
            <UIExtButton
                :caption="$filters.translate('games.invite_friends')"
                :theme="$store.state.config.games.ttt.buttons"
                colour="dark"
                @clicked="inviteFriends()"
                class="mt-1"
            />
        </div>
    </div>
</template>