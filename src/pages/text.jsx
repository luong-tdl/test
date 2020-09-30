import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
import * as PNotifyMobile from '@pnotify/mobile';
import * as PNotifyAnimate from '@pnotify/animate';

defaultModules.set(PNotifyBootstrap4, {});
defaultModules.set(PNotifyFontAwesome4, {});
defaultModules.set(PNotifyMobile, {});

// Remove one of the default modules.
notice({
  text: "I don't have the Mobile module.",
  modules: new Map([
    ...[...defaultModules].filter(([mod]) => mod !== PNotifyMobile)
  ])
});

// Add an additional module and options.
notice({
  text: "I use the Animate module in addition to the defaults.",
  modules: new Map([
    ...defaultModules,
    [PNotifyAnimate, {
      inClass: 'fadeInDown',
      outClass: 'fadeOutUp'
    }]
  ])
});

// Don't worry about adding a module that's already in the defaults.
// It's a Map, so only the last instance/options will end up in there.
notice({
  text: "I use the Mobile module with options I specify.",
  modules: new Map([
    ...defaultModules,
    [PNotifyMobile, {
      swipeDismiss: false
    }]
  ])
});
PNotify.info({
    title: 'New Thing',
    text: 'Just to let you know, something happened.'
  });