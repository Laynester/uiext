package com.laynester.plugins.extensions.rcon;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.catalog.CatalogItem;
import com.eu.habbo.habbohotel.catalog.CatalogPage;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.messages.rcon.RCONMessage;
import com.google.gson.Gson;

public class GiveItem extends RCONMessage<GiveItem.JSONGiveItem> {

    public GiveItem() {
        super(GiveItem.JSONGiveItem.class);
    }

    @Override
    public void handle(Gson gson, GiveItem.JSONGiveItem object) {
        Habbo habbo = Emulator.getGameEnvironment().getHabboManager().getHabbo(object.user_id);
        if (habbo != null && habbo.getHabboInfo().isOnline()) {
            Emulator.getGameEnvironment().getCatalogManager().initialize();
            Emulator.getGameEnvironment().getItemManager().loadSoundTracks();
            CatalogItem item = Emulator.getGameEnvironment().getCatalogManager().getCatalogItem(object.item_id);
            CatalogPage page = Emulator.getGameEnvironment().getCatalogManager().getCatalogPage(item.getPageId());
            Emulator.getGameEnvironment().getCatalogManager().purchaseItem(page,item,habbo,1,item.getExtradata(),true);
        }
        this.status = 2;
    }

    static class JSONGiveItem {
        int user_id;
        int item_id;
    }
}

