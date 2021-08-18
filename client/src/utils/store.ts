import { createStore } from 'vuex';

export default createStore({
    state: {
        window: {
            trax: false
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
        }
    },
});