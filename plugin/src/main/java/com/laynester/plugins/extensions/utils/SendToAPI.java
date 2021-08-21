package com.laynester.plugins.extensions.utils;

import com.eu.habbo.Emulator;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class SendToAPI {
    public SendToAPI(String url) throws IOException {
        URL urlSend = new URL("http://127.0.0.1:" + Emulator.getConfig().getValue("UIExtAuth.api.port") + "/api/" + url);

        HttpURLConnection con = (HttpURLConnection) urlSend.openConnection();

        con.setRequestProperty("UIExtAuth", Emulator.getConfig().getValue("UIExtAuth.token"));

        try(InputStream is = con.getInputStream()){}
        catch (IOException ignored){}

        con.disconnect();
    }

    public SendToAPI(String url,String data) throws IOException {
        URL urlSend = new URL("http://127.0.0.1:" + Emulator.getConfig().getValue("UIExtAuth.api.port") + "/" + url);

        HttpURLConnection con = (HttpURLConnection) urlSend.openConnection();

        con.setRequestProperty("UIExtAuth", Emulator.getConfig().getValue("UIExtAuth.token"));

        try(InputStream is = con.getInputStream()){}
        catch (IOException ignored){}

        con.disconnect();
    }
}
