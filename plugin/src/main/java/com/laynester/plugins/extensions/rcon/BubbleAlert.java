package com.laynester.plugins.extensions.rcon;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.catalog.CatalogItem;
import com.eu.habbo.habbohotel.catalog.CatalogPage;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.messages.outgoing.generic.alerts.BubbleAlertComposer;
import com.eu.habbo.messages.rcon.RCONMessage;
import com.google.gson.Gson;
import gnu.trove.map.hash.THashMap;

public class BubbleAlert extends RCONMessage<BubbleAlert.JSONBubbleAlert> {

    public BubbleAlert() {
        super(BubbleAlert.JSONBubbleAlert.class);
    }

    @Override
    public void handle(Gson gson, BubbleAlert.JSONBubbleAlert object) {
        Habbo habbo = Emulator.getGameEnvironment().getHabboManager().getHabbo(object.user_id);

        THashMap<String, String> events = new THashMap<String, String>();
        events.put("display", "BUBBLE");
        events.put("image", object.icon);
        events.put("message", object.message);
        if(object.user_two_id > 0 ) events.put("linkUrl", "event:navigator/goto/" + Emulator.getGameEnvironment().getHabboManager().getHabbo(object.user_two_id).getHabboInfo().getCurrentRoom().getId()  + "");

        habbo.getClient().sendResponse(new BubbleAlertComposer("gameinvite", events));
        this.status = 1;
    }

    static class JSONBubbleAlert {
        int user_id;
        String message;
        String icon;
        int user_two_id = 0;
    }
}
