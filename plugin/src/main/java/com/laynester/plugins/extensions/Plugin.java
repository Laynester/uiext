package com.laynester.plugins.extensions;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.ItemInteraction;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.plugin.EventHandler;
import com.eu.habbo.plugin.EventListener;
import com.eu.habbo.plugin.HabboPlugin;
import com.eu.habbo.plugin.events.emulator.EmulatorLoadItemsManagerEvent;
import com.eu.habbo.plugin.events.emulator.EmulatorLoadedEvent;
import com.laynester.plugins.extensions.interactions.InteractionTicTacToeChair;
import com.laynester.plugins.extensions.interactions.InteractionTraxMachine;
import com.laynester.plugins.extensions.rcon.GiveItem;
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
        Emulator.getPluginManager().registerEvents(this, this);
    }

    public void onDisable() throws Exception {
        Logger("Has been disabled");
    }

    @EventHandler
    public void onEmulatorLoaded(EmulatorLoadedEvent event) {
        Logger("Has loaded");

        Emulator.getRconServer().addRCONMessage("giveitem", GiveItem.class);
        Emulator.getConfig().register("UIExtAuth.api.port","9999");
        Emulator.getConfig().register("UIExtAuth.token","changeThisToAPassword");
    }

    @EventHandler
    public void onLoadItemsManager(EmulatorLoadItemsManagerEvent event)
    {
        Emulator.getGameEnvironment().getItemManager().addItemInteraction(new ItemInteraction("trax_machine", InteractionTraxMachine.class));
        Emulator.getGameEnvironment().getItemManager().addItemInteraction(new ItemInteraction("uiext_ttt_chair", InteractionTicTacToeChair.class));
    }


    public boolean hasPermission(Habbo habbo, String s) {
        return false;
    }

    public static void Logger(String message) {
        LoggerFactory.getLogger(Plugin.class).info("[?" + ANSI_PURPLE + PN + ANSI_WHITE + "?] " + message);
    }

}
