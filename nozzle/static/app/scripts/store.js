"use strict";

App.ApplicationAdapter = DS.RESTAdapter.extend(
    // Mixins
    {
        namespace: 'api',
    }
);
