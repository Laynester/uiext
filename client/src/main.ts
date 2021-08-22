import { createApp } from "vue";
import App from "@/App.vue";
import Card from '@/assets/components/ui/Card.vue';
import Button from '@/assets/components/ui/Button.vue';
import Border from '@/assets/components/ui/Border.vue'
import Store from '@/utils/store'
import '@/assets/scss/app.scss';
import { Lang } from "./utils/Lang";

import * as version from '../package.json';

const app = createApp(App)
app.use(Store);
app.component('UIExtCard', Card);
app.component('UIExtButton', Button);
app.component('UIExtBorder', Border);

app.config.globalProperties.$filters = {
    secondsDuration(value: string)
    {
        const date = new Date(0)
        date.setSeconds(parseInt(value));
        return date.toISOString().substr(11, 8).substring(3) + "min";
    },
    translate(text:string)
    {
        return Lang(text);
    }
};
app.config.globalProperties.$store = Store

app.mount('#uiext-app');

const logo = `%c\n This hotel is using UI-Extensionss (${version.version}) by Laynester 2021 - Join the discord server: https://discord.gg/Za4Bu6wkar \n`;
window.console.log.apply(console, [
    logo,
    'color: red; background: #000000; padding:3px 0;' ]);
