package com.laynester.plugins.extensions.interactions;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.gameclients.GameClient;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.items.interactions.InteractionDefault;
import com.eu.habbo.habbohotel.rooms.Room;
import com.laynester.plugins.extensions.utils.SendToAPI;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.ResultSet;
import java.sql.SQLException;

public class InteractionTraxMachine extends InteractionDefault {

    public InteractionTraxMachine(int id, int userId, Item item, String extradata, int limitedStack, int limitedSells) {
        super(id, userId, item, extradata, limitedStack, limitedSells);
    }

    public InteractionTraxMachine(ResultSet set, Item baseItem) throws SQLException {
        super(set, baseItem);
    }

    @Override
    public boolean isUsable() {
        return true;
    }

    @Override
    public void onClick(GameClient client, Room room, Object[] objects) throws Exception {
        if (client == null)
            return;
        new SendToAPI("trax/open/" + client.getHabbo().getHabboInfo().getId());

        //super.onClick(client, room, objects);
    }

    @Override
    public void onPickUp(Room room) {
        super.onPickUp(room);
        try {
            new SendToAPI("trax/pickup/" + getRoomId());
        } catch (IOException ignored) {}
    }

}

