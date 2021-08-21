package com.laynester.plugins.extensions.events;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.ItemInteraction;
import com.eu.habbo.plugin.EventHandler;
import com.eu.habbo.plugin.EventListener;
import com.eu.habbo.plugin.events.emulator.EmulatorLoadItemsManagerEvent;
import com.eu.habbo.plugin.events.emulator.EmulatorLoadedEvent;
import com.laynester.plugins.extensions.Plugin;
import com.laynester.plugins.extensions.interactions.InteractionTicTacToeChair;
import com.laynester.plugins.extensions.interactions.InteractionTraxMachine;
import com.laynester.plugins.extensions.rcon.BubbleAlert;
import com.laynester.plugins.extensions.rcon.GiveItem;

public class EmulatorEvents implements EventListener {

    @EventHandler
    public static void onEmulatorLoaded(EmulatorLoadedEvent event) {
        Plugin.Logger("Has loaded");
        Emulator.getRconServer().addRCONMessage("giveitem", GiveItem.class);
        Emulator.getRconServer().addRCONMessage("bubblealert", BubbleAlert.class);
        Emulator.getConfig().register("UIExtAuth.api.port","9999");
        Emulator.getConfig().register("UIExtAuth.token","changeThisToAPassword");
    }

    @EventHandler
    public static void onLoadItemsManager(EmulatorLoadItemsManagerEvent event)
    {
        Emulator.getGameEnvironment().getItemManager().addItemInteraction(new ItemInteraction("trax_machine", InteractionTraxMachine.class));
        Emulator.getGameEnvironment().getItemManager().addItemInteraction(new ItemInteraction("uiext_ttt_chair", InteractionTicTacToeChair.class));
    }
}
