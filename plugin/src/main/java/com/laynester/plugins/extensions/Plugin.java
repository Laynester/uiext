package com.laynester.plugins.extensions;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.plugin.EventListener;
import com.eu.habbo.plugin.HabboPlugin;
import com.laynester.plugins.extensions.events.EmulatorEvents;
import com.laynester.plugins.extensions.events.RoomEvents;
import com.laynester.plugins.extensions.events.UserEvents;
import org.slf4j.LoggerFactory;


/*
 * Author: Laynester
 */


public class Plugin extends HabboPlugin implements EventListener {

    public static Plugin INSTANCE = null;

    public static String PN = "Extensions";

    public static final String ANSI_PURPLE = "\u001B[35m";

    public static final String ANSI_WHITE = "\u001B[37m";

    public void onEnable() throws Exception {
        INSTANCE = this;
        Logger("Has started");
        Emulator.getPluginManager().registerEvents(this, new EmulatorEvents());
        Emulator.getPluginManager().registerEvents(this, new RoomEvents());
        Emulator.getPluginManager().registerEvents(this, new UserEvents());
    }

    public void onDisable() throws Exception {
        Logger("Has been disabled");
    }

    public boolean hasPermission(Habbo habbo, String s) {
        return false;
    }

    public static void Logger(String message) {
        LoggerFactory.getLogger(Plugin.class).info("[?" + ANSI_PURPLE + PN + ANSI_WHITE + "?] " + message);
    }

}
