(function(){if(!window.$mcSite){$mcSite={};$mcSite.popup_form={settings:{base_url:"mc.us17.list-manage.com",list_id:"fa9318b42e",uuid:"bb78271ff493b3d5ad92cac6e"}};}})();
(function () {
    if (window.$mcSite === undefined || window.$mcSite.popup_form === undefined) {
        return;
    }

    if (window.location.href.indexOf("checkout.shopify") >= 0) {
        return;
    }

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        // look for src containing the old embed.js code and bail if it exists
        if (scripts[i].getAttribute("src") === "https://s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js" || scripts[i].getAttribute("src") === "//downloads.mailchimp.com/js/signup-forms/popup/embed.js") {
            return;
        }
    }

    var module = window.$mcSite.popup_form;

    if (module.installed === true) {
        return;
    }

    if (!module.settings) {
        return;
    }

    var settings = module.settings;

    if (!settings.base_url || !settings.uuid || !settings.list_id) {
        return;
    }

    var script = document.createElement("script");

    script.src = "https://downloads.mailchimp.com/js/signup-forms/popup/embed.js";
    script.type = "text/javascript";
    script.onload = function () {
        require(["mojo/signup-forms/Loader"], function (L) { L.start({"baseUrl": settings.base_url, "uuid": settings.uuid, "lid": settings.list_id}); });
    };

    document.body.appendChild(script);

    window.$mcSite.popup_form.installed = true;
}());
