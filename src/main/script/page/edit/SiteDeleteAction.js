import EventBus from "../../util/EventBus";
import URL from "../../URL";
import EditEvents from './EditEvents';

/**
 * listens for: site-selected-for-delete-event
 *
 * delete site
 *
 * then fires: 'change-log-deleted-event'
 */
export default class SiteDeleteAction {

    constructor() {
        EventBus.addListener(EditEvents.site_delete_selection, this.deleteSite, this);
    }

    deleteSite(event, siteId, siteName) {
        if (confirm("Archive site " + siteName + "?")) {
            $.post(URL.site.delete, { siteId }, d => {
                EventBus.dispatch(EditEvents.site_saved, d);
            }).fail(x => {
                EventBus.dispatch(EditEvents.site_saved, x.status === 403 ? {
                    result: 'FAIL',
                    messages: [`Insufficient privileges to archive site ${siteId}.`]
                } : x.statusText);
            });
        }
    }

}

