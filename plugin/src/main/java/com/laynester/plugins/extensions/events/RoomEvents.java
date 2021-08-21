package com.laynester.plugins.extensions.events;

import com.eu.habbo.Emulator;
import com.eu.habbo.habbohotel.items.Item;
import com.eu.habbo.habbohotel.rooms.FurnitureMovementError;
import com.eu.habbo.habbohotel.rooms.Room;
import com.eu.habbo.habbohotel.users.Habbo;
import com.eu.habbo.habbohotel.users.HabboItem;
import com.eu.habbo.messages.outgoing.generic.alerts.BubbleAlertComposer;
import com.eu.habbo.messages.outgoing.generic.alerts.BubbleAlertKeys;
import com.eu.habbo.plugin.EventHandler;
import com.eu.habbo.plugin.EventListener;
import com.eu.habbo.plugin.events.furniture.FurniturePlacedEvent;
import com.eu.habbo.plugin.events.users.HabboAddedToRoomEvent;
import com.eu.habbo.plugin.events.users.UserExitRoomEvent;
import com.laynester.plugins.extensions.interactions.InteractionTraxMachine;
import com.laynester.plugins.extensions.utils.SendToAPI;
import gnu.trove.set.hash.THashSet;

import java.util.List;

public class RoomEvents implements EventListener {
    @EventHandler
    public static void onHabboAddedToRoom(HabboAddedToRoomEvent event) throws Exception {
        Room room = event.room;
        Habbo habbo = event.habbo;
        new SendToAPI("room/enter/" + room.getId() + "/" + habbo.getHabboInfo().getId());
    }

    @EventHandler
    public static void onUserExitRoom(UserExitRoomEvent event) throws Exception {
        Habbo habbo = event.habbo;
        new SendToAPI("room/leave/" + habbo.getHabboInfo().getCurrentRoom().getId() + "/" + habbo.getHabboInfo().getId());
    }

    @EventHandler
    public static void onFurniturePlace(FurniturePlacedEvent event) throws Exception {
        Room room = event.habbo.getHabboInfo().getCurrentRoom();

        if(room == null) return;

        if(event.furniture instanceof InteractionTraxMachine) {
            if(room.getOwnerId() != event.habbo.getHabboInfo().getId()) {
                event.setCancelled(true);
                return;
            }

            int machines = 0;

            for(HabboItem item : room.getFloorItems()) {
                if(item instanceof  InteractionTraxMachine) {
                    machines++;
                }
            }

            if(machines > 0) {
                event.setCancelled(true);
            }
        }
    }
}
