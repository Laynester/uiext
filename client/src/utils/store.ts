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
            playlist: {
                songs: null,
                playing: false,
            },
            playingSong: null,
            traxplayer: {
                position: 0
            }
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