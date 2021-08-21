package com.laynester.plugins.extensions.interactions;

import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.items.interactions.InteractionDefault;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.rooms.RoomUnit;
import com.eu.habbo.habbohotel.users.Habbo;
import com.laynester.plugins.extensions.utils.SendToAPI;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InteractionTicTacToeChair extends InteractionDefault {
    public InteractionTicTacToeChair(int id, int userId, Item item, String extradata, int limitedStack, int limitedSells) {
        super(id, userId, item, extradata, limitedStack, limitedSells);
    }

    public InteractionTicTacToeChair(ResultSet set, Item baseItem) throws SQLException {
        super(set, baseItem);
    }

    @Override
    public void onWalkOn(RoomUnit roomUnit, Room room, Object[] objects) throws Exception {
        Habbo habbo = room.getHabbo(roomUnit);

        if(habbo == null) return;

        new SendToAPI("game/open/ttt/" + habbo.getHabboInfo().getId());

        super.onWalkOn(roomUnit, room, objects);
    }

    @Override
    public void onWalkOff(RoomUnit roomUnit, Room room, Object[] objects) throws Exception {
        Habbo habbo = room.getHabbo(roomUnit);

        if(habbo == null) return;

        new SendToAPI("game/close/ttt/" + habbo.getHabboInfo().getId());

        super.onWalkOff(roomUnit, room, objects);
    }
}
