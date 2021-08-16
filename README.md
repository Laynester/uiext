# Trax Editor

### Installation
#### 1. Client
**Open "client" in terminal/cmd prompt etc**
```
npm run build
```
It has created **"dist"**
Copy the `<script>`'s from the index.html paste into your cms *or* nitro's index.html

Paste this div above the scripts you just pasted
```
<div id="le-trax"></div>
```

Copy the `<link href=""/>` from index.html to your nitro index.html

Copy the JS/css folders and traxEditorConfig.json created in **"dist"** to your cms/nitro directory

The SSO will be passed similarly to nitro

(for nitro)
```
<script>
  window.TraxConfig = {
    sso: (new URLSearchParams(window.location.search).get('sso') || null)
  }
</script>
```

(for any cms)
```
<script>
  window.TraxConfig = {
    sso: '<?php  $PutYourShitCodeHere; ?>'
  }
</script>
```

### Set the API in traxEditorConfig.json to the subdomain you create in step 2

#### 2. Server
##### You will need to create a reverse proxy in IIS or NGINX etc

###### IIS
Create a subdomain under cloudflare or your domain provider
Create a "Site" in IIS, click URL Rewrite
![image](https://user-images.githubusercontent.com/48771551/129498474-fd9948e8-c422-4a36-910e-77db27fc0ab1.png)

Add a new rule (top right)
![image](https://user-images.githubusercontent.com/48771551/129498482-2f35d4e9-1008-454a-9a82-9124fbcd431d.png)
![image](https://user-images.githubusercontent.com/48771551/129498515-3c23d666-e81a-42a8-b78a-a7b2f8d61b0a.png)

Set the IP Address/url `localhost:9999` *9999 is the default port*
![image](https://user-images.githubusercontent.com/48771551/129498533-b6a9109e-2c8a-4278-8e30-694d7045b581.png)
