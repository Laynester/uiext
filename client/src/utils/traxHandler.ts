// @ts-nocheck
import { Howl } from "howler";
import { CommunicationManager } from "../communication/CommunicationManager";
import { CreateSongComposer } from "../communication/outgoing/trax/CreateSongComposer";

const functions = {
    playSong(songString, length, preview) {
        this.tuned = true;

        const str = songString.split(':');

        if (preview) {
            this.tracker.visible = true;

            // someone fix this plz
            this.tracker.position = 0;
            // plz

            this.tracker.ticker = setInterval(() => {
                this.tracker.position = parseInt(this.tracker.position);
                if (this.tracker.position + 1 < length) {
                    if (this.tracker.position * 26 > this.$refs.tracker.offsetWidth - (26 * 2)) {
                        this.$refs.tracker.scrollTo({
                            top: 0,
                            left:
                                this.$refs.tracker.scrollLeft + 26,
                            behavior: "smooth",
                        });
                    }
                    this.tracker.position += 1;
                } else {
                    this.stopTracking();
                    this.playSong(songString, length, true);
                }
            }, 2000);
        } else
        {
            this.tracker.timer = 0;
            this.tracker.ticker = setInterval(() => {
                if (this.tracker.timer < length) {
                    this.tracker.timer++;
                } else {
                    this.stopTracking();
                    this.playSong(songString, length, false);
                }
            }, 1000);
        }

        str.forEach(eOne => {
            const list = eOne.split(';');

            const arr = [];

            if (list.length >= 1) {
                let position = parseInt(this.tracker.position);

                list.forEach(eTwo => {
                    const split = eTwo.split(',');
                    if (!position) {
                        if (split.length !== 2) return;
                        if (arr.length < length) arr.push(split[0])
                    } else {
                        arr.push(0)
                        position -= 1;
                    }
                })

                if (arr.length) this.playBank(arr);
            }
        });
    },
    playBank(file_names) {
        let self = this;

        let trackerlength = this.tracker.sounds.length + 1;

        let helper = new Howl({
            src: [
                UIExtConfig.sounds +
                "sound_machine_sample_" +
                file_names[0] +
                ".mp3",
            ],
            onend: function () {
                file_names.shift();
                if (file_names.length > 0) {
                    if (self.tuned) return self.playBank(file_names);
                }
            },
        });

        this.tracker.sounds[trackerlength] = helper
        this.tracker.sounds[trackerlength].play();
    },
    setTracks() {
        this.$store.state.trax.tracks = [];
        for (let i = 0; i < 4; i++) {
            const ar = [];
            for (let i = 0; i < 60; i++) {
                ar.push(this.selectedRes);
            }
            this.$store.state.trax.tracks.push(ar);
        }
        this.$forceUpdate();
        this.stopTracking();
        this.stopSong();
        if (this.$store.state.trax.editing) this.setEditingTrack();
    },
    setEditingTrack()
    {
        let songString = this.$store.state.trax.editing.track;

        let song = songString.split(":");

        let rowIndex = 0;
        this.name = this.$store.state.trax.editing.name
        song.forEach((row) =>
        {
            let set = row.split(";");

            if (!set[0].includes(",")) return;
            
            let grouped = 0;

            set.forEach((col,colIndex) =>
            {
                let column = col.split(',');

                if (column.length !== 2) return;

                if (column[0] == "0") return;

                let collection = this.findCollection(column[0]).collectionRet;

                let setCollection = this.findCollection(column[0]).setRet;

                this.$store.state.trax.tracks[rowIndex][colIndex + grouped] = {
                    colour: collection.colour,
                    sound: column[0],
                    set: setCollection.set,
                    id: this.findCollection(column[0]).setInd,
                    hovering: false,
                    grouped: setCollection.set,
                    unique: true,
                };

                if (setCollection.set > 1)
                {
                    console.log(colIndex)
                    for (let i = 1; i < setCollection.set; i++)
                    {
                        this.$store.state.trax.tracks[rowIndex][colIndex + i + grouped] = {
                            colour: collection.colour,
                            sound: column[0],
                            set: setCollection.set,
                            id: this.findCollection(column[0]).setInd,
                            hovering: false,
                            grouped: false,
                            unique: false,
                        }; 
                    }
                }

                grouped += (setCollection.set - 1);

                this.$forceUpdate()
            })

            rowIndex++;
            console.log('row')
        });
    },
    findCollection(sound)
    {
        let collectionRet = null;
        let setRet = null;
        let setInd = 0;
        this.$store.state.trax.collection.forEach((collection) =>
        {
            if (collectionRet) return;
            setInd = 0;
            collection.sets.forEach((set) =>
            {
                if (set.sound == sound)
                {
                    collectionRet = collection;
                    setRet = set;
                    return
                }
                if (!collectionRet) setInd++;
            });
        });
        return {collectionRet, setRet, setInd}
    },
    paginate(type) {
        switch (type) {
        case "next":
            if (this.$store.state.trax.currentPage === this.$store.state.trax.collectionPages) return;
            this.$store.state.trax.currentPage++;
            break;
        case "prev":
            if (this.$store.state.trax.currentPage === 1) return
            this.$store.state.trax.currentPage--;
            break;
        }
        this.$store.state.trax.visibleCollection = this.$store.state.trax.collection.slice(
            (this.$store.state.trax.currentPage - 1) * 6,
            this.$store.state.trax.currentPage * 6
        );
    },
    playSound(id, single) {
        if (!id) return;

        if (this.tuned) return;

        if (!this.sounds['sound_machine_sample_' + id]) { this.sounds['sound_machine_sample_' + id] = new Audio(
            UIExtConfig.sounds + "sound_machine_sample_" + id + ".mp3"
        ); }

        const audio = this.sounds['sound_machine_sample_' + id];

        if (single) {
            this.playing = audio;
            this.playing.currentTime = 0;
            this.playing.play();
            return;
        }
        audio.play();
    },
    stopPlayingSound() {
        this.playing.pause();
        this.playing = null;
    },
    registerSelected(sound, colour, setC, id) {
        this.selected = {
            colour: colour,
            sound: sound,
            set: setC,
            id: id,
            hovering: true,
            grouped: false,
            unique: true,
        };
    },
    setTile(i, ind) {
        let safe = true;

        this.selected.hovering = false;

        this.$forceUpdate();

        if (this.$store.state.trax.tracks[i][ind].colour && !this.$store.state.trax.tracks[i][ind].hovering) {
            this.resetGroup(i, ind, this.$store.state.trax.tracks[i][ind].set);
            return;
        } else {
            for (let ii = 0; ii < this.selected.set; ii++) {
                if (this.$store.state.trax.tracks[i][ind + ii].colour && !this.$store.state.trax.tracks[i][ind].hovering) safe = false;
            }
        }

        if (safe) this.setGroup(i, ind);
    },
    resetGroup(i, ind, set) {
        for (let ii = 0; ii < set; ii++) {
            this.$store.state.trax.tracks[i][ind + ii] = this.selectedRes;
        }

        if (!this.selected.hovering) this.selected = this.selectedRes;

        this.$forceUpdate();
    },
    setGroup(i, ind) {
        for (let ii = 0; ii < this.selected.set; ii++) {
            let g = false;

            if (ii === 0 && this.selected.set >= 1) g = true;

            this.$store.state.trax.tracks[i][ind + ii] = {
                colour: this.selected.colour,
                sound: this.selected.sound,
                set: this.selected.set,
                id: this.selected.id,
                hovering: this.selected.hovering,
                grouped: g,
                unique: g,
            };
        }
        if (!this.selected.hovering) this.selected = this.selectedRes;

        this.$forceUpdate();
    },
    hoverSection(i, ind, leave) {
        if (!this.selected.colour) return;

        if (!leave) {
            this.hovered.i = i;

            this.hovered.ind = ind;

            let safe = true

            for (let ii = 0; ii < this.selected.set; ii++) {
                if (this.$store.state.trax.tracks[i][ind + ii].colour) safe = false;
            }

            if (safe) return this.setGroup(i, ind);
        }

        if (leave && this.$store.state.trax.tracks[i][ind].hovering) {
            return this.resetGroup(
                this.hovered.i,
                this.hovered.ind,
                this.$store.state.trax.tracks[i][ind].set
            );
        }
    },
    stopTracking() {
        clearInterval(this.tracker.ticker);
        this.tracker.visible = false;
        this.tuned = false;
        this.tracker.position = 0;
        if(this.$refs.tracker) this.$refs.tracker.scrollLeft = 0;
        this.tracker.timer = 0;
        this.tracker.sounds = []
    },
    getSongString() {
        let str = "";
        let songLength = 0;

        const song = [];

        this.$store.state.trax.tracks.forEach((e, ind) => {
            const sounds = [];
            let rowLength = 0;

            e.forEach((el, i) => {
                if (el.sound) rowLength = i + 1;
            });

            e.forEach((el, i) => {
                if (!el.sound && rowLength > i) return sounds.push({ track: 0, len: 1 });

                if (el.unique && el.sound) return sounds.push({ track: el.sound, len: el.set });
            });

            if (!rowLength) return;

            if (rowLength > songLength) songLength = rowLength;

            const temp = [];

            sounds.forEach((el) => {
                temp.push(el.track + "," + el.len);
            });

            song.push(ind + 1 + ":" + temp.join(";"));
        });

        str = song.join(":");

        return { string: str, len: songLength };
    },
    stopSong() {
        this.tuned = false;
        if (this.tracker.sounds) this.tracker.sounds.forEach(e => {
            e.pause();
        })
        this.tracker.sounds = [];
        this.stopTracking();
    },
    saveSong: async function () {
        if (!this.getSongString().len) return

        if (!this.name) return;

        let editId = this.$store.state.trax.editing ? this.$store.state.trax.editing.id : 0
        
        CommunicationManager.getInstance().sendMessage(new CreateSongComposer(this.name, this.getSongString().string, this.getSongString().len,editId));
    },
    startDragHandle(e) {
        if (this.playing) return;
        document.onmousemove = this.dragHandle;
        document.onmouseup = this.stopDragHandle;
        this.tracker.offset = e.clientX - this.$refs['tracker-handle'].offsetLeft;
    },
    dragHandle(e) {
        event.preventDefault();

        let offset = e.clientX - this.tracker.position - this.tracker.offset;

        if (offset < 0) {
            offset = 0;
        } else if (offset > this.$refs['tracker'].offsetWidth) {
            offset = this.$refs['tracker'].offsetWidth;
        }

        this.tracker.position = offset;
    },
    stopDragHandle(event) {
        event.preventDefault();
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export { functions }