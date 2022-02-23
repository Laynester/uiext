import { VolumeEvent } from "../communication/incoming/general/VolumeEvent";
import { Services } from "../services/Services";
import store from "./store";

export class TraxPlayer
{
    private _tracks;
    private samples;
    private _ready: boolean = false;
    private _traxLengthInSeconds: number = 0;
    private _playing: boolean = false;
    private _ticker: number = null;
    private _time: number;
    private _timeInSeconds: number = 0;

    private _localLength: number = 0;
    private _localPos: number = 0;

    private _vue = null;

    private _cached = [];

    private _soundString: string = "";

    private timeOffset: number = 0;

    private _volume: number;

    constructor(string: string, vue)
    {
        this._volume = store.state.trax.volume;
        this._vue = vue;
        this.samples = [];
        this.resetTracks();
        this.preload(string);
        Services.getInstance().communication.addListener("volume", this.setVolume.bind(this));
    }

    public setVolume(data: VolumeEvent)
    {
        this._volume = data.volume;

        this._tracks.forEach((e) =>
        {
            e.player.volume = this._volume / 100
        });
        this.samples.forEach(row =>
        {
            row.forEach((sample) =>
            {
                sample.sample.audioObj.volume = this._volume / 100
            })
        });
    }

    private resetTracks()
    {
        var tracks = [];
        for (var i = 0; i < 10; i++)
        {
            tracks.push({
                player: new Audio(),
                timeLeft: 0,
                blocks: 0,
                sample: 0,
                playlist: []
            });
        }

        console.log(this._tracks)

        if (this._tracks)
        {
            this._tracks.forEach(el => { el.player.remove(); el.player.srcObject = null; });
        }

        this._tracks = tracks;

    }

    private getSampleUrl(sampleId: number)
    {
        // @ts-ignore
        return UIExtConfig.sounds + "sound_machine_sample_" + sampleId + ".mp3";
    }

    private getUniqueSamples(tracks)
    {
        var flags = [];
        var output = [];


        tracks.forEach((track, r) =>
        {
            flags[r] = [];
            const row = []
            for (let ind = 0; ind < track.length; ind++)
            {
                if (flags[r][track[ind].piece])
                    continue;

                flags[r][track[ind].piece] = true;
                row.push(track[ind]);
            }
            output.push(row)
        })

        return output;
    }

    private getDuration(sample)
    {
        let sampleURL = this.getSampleUrl(sample.piece);

        if (typeof this._cached[sampleURL] === "undefined")
        {
            this._cached[sampleURL] = new Audio();
            this._cached[sampleURL].src = sampleURL
        }

        let obj = this._cached[sampleURL].cloneNode(false);

        return {
            sampleLength: sample.blocks,
            sample: Object.assign({}, sample),
            audioObj: obj,
            src: obj.src
        };
    }

    private getTrack(sample: string)
    {
        var track = [];

        sample.split(";").forEach(sample =>
        {
            var samplePiece = sample.split(",")[0];
            var blocks = sample.split(",")[1];
            this._localLength += parseInt(sample.split(",")[1]);
            track.push({
                blocks: blocks,
                piece: samplePiece,
            })
        });

        return track;
    }

    private getTracks(song)
    {
        let arr = [];

        this._localLength = 0;

        song.split(':').forEach((row) =>
        {
            if (row.includes(","))
            {
                arr.push(this.getTrack(row))
            }
        });

        return arr;

    }

    private preload(sample: string)
    {
        this._soundString = sample;

        this.resetTracks();

        const tracks = this.getTracks(sample);

        this.getUniqueSamples(tracks).forEach((row, r) =>
        {
            this.samples[r] = []
            row.forEach((sound, s) =>
            {
                this.samples[r][sound.piece] = sound;
                this.samples[r][sound.piece].sample = this.getDuration(sound);
            })
        });

        tracks.forEach((el, r) =>
        {
            const actualTrack = [];

            el.forEach(ele =>
            {
                const repeat = ele.blocks / this.samples[r][ele.piece].sample.sampleLength;
                for (let x = 0; x < repeat; x++)
                {
                    actualTrack.push(ele.piece);
                    for (let l = 0; l < (this.samples[r][ele.piece].sample.sampleLength - 1); l++)
                    {
                        actualTrack.push("0")
                    }
                }
            });

            this._tracks[r].playlist = actualTrack;
        })

        this.calculatePlaytime();
        this.onReady();
    }

    private calculatePlaytime()
    {
        var longestTrack = this._tracks[0].playlist;

        this._tracks.forEach((e) =>
        {
            if (e.playlist.length > longestTrack.length) longestTrack = e.playlist;
        });

        this._traxLengthInSeconds = longestTrack.length * 2;
    }

    private onReady()
    {
        this._ready = true;
    }

    private playNextBeat(track)
    {
        let position = this._localPos;
        if (typeof this.samples[track] !== "undefined" && this.samples[track][this._tracks[track].playlist[position]])
        {
            let tempPos = position - store.state.trax.traxplayer.position + 1;
            if (this.timeOffset && typeof this._tracks[track].playlist[tempPos] !== "undefined")
            {
                console.log('offset')
                console.log(this._tracks[track].playlist, tempPos)
                this._tracks[track].player = this.samples[track][this._tracks[track].playlist[tempPos]].sample.audioObj;
                this._tracks[track].timeLeft = this.samples[track][this._tracks[track].playlist[tempPos]].sample.sampleLength;
                this._tracks[track].blocks = this._tracks[track].playlist[tempPos].blocks;
                this._tracks[track].sample = this._tracks[track].playlist[tempPos].sample;
            } else
            {
                this._tracks[track].player = this.samples[track][this._tracks[track].playlist[position]].sample.audioObj;
                this._tracks[track].timeLeft = this.samples[track][this._tracks[track].playlist[position]].sample.sampleLength;
                this._tracks[track].blocks = this._tracks[track].playlist[position].blocks;
                this._tracks[track].sample = this._tracks[track].playlist[position].sample;
            }
            if (this._tracks[track].sample != 0)
            {
                this._tracks[track].player.currentTime = this.timeOffset;
                this._tracks[track].player.volume = this._volume / 100
                this._tracks[track].player.play();

            }
        }
    }

    private play()
    {
        this._playing = true;
        // @ts-ignore
        store.state.trax.traxplayer.position = 0;
        this._localPos = store.state.trax.traxplayer.position;
        this.timeOffset = store.state.trax.traxplayer.position * 2;
        this.tick(false);
        this._ticker = setInterval(this.tick.bind(this), 2000);
        this._time = setInterval(this.time.bind(this), 1000);

        this._vue.tuned = this._playing;
    }

    private stop()
    {
        this._localPos = 0;
        store.state.trax.traxplayer.position = 0;
        this.timeOffset = 0;
        this._playing = false;
        this.resetPlayer();
        this._vue.tuned = this._playing;
    }

    private tick(move: boolean = true)
    {
        if (this._playing)
        {
            this._tracks.forEach((e, i) =>
            {
                this.playNextBeat(i)
            });
            this.timeOffset = 0;
            if (move) store.state.trax.traxplayer.position += 1;
            this._localPos++;
        }

    }

    private clearElements()
    {

    }

    private time()
    {
        this._timeInSeconds = this._timeInSeconds + 1;
        if (this._timeInSeconds >= this._traxLengthInSeconds)
        {
            this.resetPlayer();
            this.play();
        }
    }

    private resetPlayer()
    {
        clearInterval(this._ticker);
        clearInterval(this._time);
        this._timeInSeconds = 0;
        store.state.trax.traxplayer.position = 0;
        this._tracks.forEach((e) =>
        {
            e.player.pause();
            e.player.remove();
            e.player.srcObject = null;
        });
        this.samples.forEach(row =>
        {
            row.forEach((sample) =>
            {
                sample.sample.audioObj.pause();
                sample.sample.audioObj.remove();
                sample.sample.audioObj.srcObject = null;
            })
        });
    }

}