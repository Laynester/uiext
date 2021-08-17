# Trax Editor

### Before installation:

Copy the RCON plugin to your emulator plugins folder, and run the **required** database sql in the **required** folder

### Installation

#### 1. Client

**Open "client" in terminal/cmd prompt etc**

```
npm i
npm run build
```

It has created **"dist"**
copy **js** & **css** folders to your nitro **or** cms directory

paste the following into your cms client.php or nitro's index.html

```
<link href="/uiext/app.css" rel="stylesheet">
<div id="uiext-app"></div>
<script>
  var UIExtConfig = {
    ws:"wss://uiext.mydomain.com:2083",
    sounds: "http://127.0.0.1/ms-swf/dcr/hof_furni/mp3/",
    sso: (new URLSearchParams(window.location.search).get('sso') || null)
  }
</script>
<script type="text/javascript" src="/uiext/chunk-vendors.js"></script>
<script type="text/javascript" src="/uiext/app.js"></script>
```

configure "sounds","ws" & "sso"
If you pasted into nitro's index.html, leave the SSO as is.

create a subdomain under cloudflare **or** your domain provider, as you would with **nitro** disable SSL etc.

change **"ws"** to your new subdomain in the script you pasted above ^

change any furni's interaction to "trax_machine" to toggle trax list view

#### 2. Server

**Open "server" in terminal/cmd prompt etc**

```
npm i
npm run start
```

configure your databse details in `ormconfig.json`
configure pricing, ports etc in `config.json`
"cost" is split into **currency**:**amount**

```
"cost": "-1:100,5:20"
=
100 credits(-1) 20 diamonds(5)
```

change `"tokenKey":"changeThisToAPassword",` to a password only to be used between the emulator and the api, you must change this in emulator_settings database table aswell. `UIExtAuth.token`
