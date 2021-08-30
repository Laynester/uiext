package com.laynester.plugins.extensions.events;

import com.eu.habbo.plugin.EventHandler;
import com.eu.habbo.plugin.EventListener;
import com.eu.habbo.plugin.events.users.UserLoginEvent;
import com.eu.habbo.plugin.events.users.UserSavedSettingsEvent;
import com.laynester.plugins.extensions.utils.SendToAPI;

import java.io.IOException;

public class UserEvents implements EventListener {
    @EventHandler
    public static void onHabboSettingsUpdated(UserSavedSettingsEvent event) throws IOException {
        new SendToAPI("user/settings/volume/trax/" + event.habbo.getHabboInfo().getId() + "/" + event.habbo.getHabboStats().volumeTrax);
    }

    @EventHandler
    public static void onUserEnter(UserLoginEvent event) throws IOException {
        new SendToAPI(("user/login/" + event.habbo.getHabboInfo().getId()));
    }
}
