import { createStore } from 'vuex';

export default createStore({
    state: {
        lang: null,
        config: null,
        window: {
            trax: false,
            ttt: false
        },
        trax: {
            tracks: [],
            editor: false,
            alert: null,
            songs: null,
            collection: null,
            visibleCollection: [],
            collectionPages: 0,
            currentPage: 1,
            editing: null,
        },
        games: {
            ttt: {
                alert: null,
                playing: false,
                invites: [],
                board: [],
                turn: null,
                me: null
            }
        }
    },
});