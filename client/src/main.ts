import { createApp } from "vue";
import App from "@/App.vue";
import Card from '@/assets/components/ui/Card.vue';
import Button from '@/assets/components/ui/Button.vue';
import Border from '@/assets/components/ui/Border.vue'
import Store from '@/utils/store'
import '@/assets/scss/app.scss';
import moment from 'moment';
import { Lang } from "./utils/Lang";

const momentDurationFormatSetup = require("moment-duration-format");

const app = createApp(App)

app.use(Store);

app.component('UIExtCard', Card);
app.component('UIExtButton', Button);
app.component('UIExtBorder', Border);

app.config.globalProperties.$filters = {
    secondsDuration(value: string)
    {
        //  @ts-ignore
        return moment.duration(value, "seconds").format('mm:ss', { trim: false }) + "min";
    },
    translate(text:string)
    {
        return Lang(text);
    }
};

app.config.globalProperties.$store = Store

app.mount('#uiext-app');

const logo = `%c\n This hotel is using UI-Extensions by Laynester 2021 - Join the discord server: https://discord.gg/Za4Bu6wkar \n`;

window.console.log.apply(console, [
    logo,
    'color: red; background: #000000; padding:3px 0;' ]);
