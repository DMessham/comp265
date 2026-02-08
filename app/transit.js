import { renderMessage, displayStopList, displayListButtonEvent, renderImage, renderTable, elementFromNode } from "./dom.js";
import { fetchStopsLocation, fetchRouteStops, searchRoutes, searchStops, fetchAreaImage} from "./api.js";

export const debugmode=true;

console.log(`app debug mode is`, debugmode)
// Grab references to various parts of the HTML page

const nearbyForm = document.querySelector("#nearby-form");
const nearbyList = document.querySelector("#nearby-list");

const routeForm = document.querySelector("#route-form");
const routeList = document.querySelector("#route-list");

const stopForm = document.querySelector("#stop-form");
const stopOutput = document.querySelector("#stop-output");

const routestopForm = document.querySelector("#routestop-form");
const routestopOutput = document.querySelector("#routestop-output");

// for seeing nearby routes
export function getLocationButton() {
    renderMessage(nearbyList, "Locating…");
    if (debugmode){console.log(`getting location`)}
    
    const radius = 250
    // based off https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
    if ("geolocation" in navigator) {
        let nav = navigator.geolocation
        /* geolocation is available */
        nav.getCurrentPosition(async (position) =>{
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            console.log(`latitude is`, latitude, `longitude is`, longitude)
            // at this point, not loading anymore
            
            renderMessage(nearbyList, `Looking for stops within ${radius}m of ${latitude}, ${longitude}:`);
            let data = await fetchStopsLocation(latitude, longitude, radius);
            renderMessage(nearbyList, "Getting map…");
            let img = await fetchAreaImage(latitude, longitude, radius);
            
            try {
                //check if there is any data and display it
                if (data.length === 0) {
                    renderMessage(nearbyList, `ErrorNo results found within ${radius}m`);
                    return;
                } else {
                    let message = `Found ${data.length} result(s) within ${radius}m of ${latitude}, ${longitude}:`;
                    message += displayStopList(data)
                
                    renderMessage(nearbyList, message);
                }
                renderImage(nearbyList, img)
                
            } catch (err) {
                console.log("error in nearby stops:", err.message, err)
            }
        });
    } else {    
        /* geolocation IS NOT available */
        
        renderMessage(nearbyList, `Error: Location not available from browser, it may be disabled or not supported`);
    }    
});

//search routes
export function routesearch(route) {

    let output = ''

    if (!route) return;

    output == "Loading…";

    try {
        //check if there is any data and display it
        const data = await searchRoutes(route);
        if (debugmode){console.log(`results for search:`, data.length)}
        if (data.length === 0) {
            output == `No results found for "${route}".`;
            return;
        }
        
        let message = `Found ${data.routes.length} result(s) for "${route}":`;

        if (debugmode){console.log(`preparing table for`, route)}
        for (let row=0; row<data.routes.length; row++) {
            let item = data.routes[row]
            const agency_info = item.agency
            const agency_name = `${agency_info.agency_name}` //dont use anything else from transit info right now

            output += [

            ]
        };
        
        
        renderMessage(routeList, message);
        renderTable(routeList, "routeSearchResults", tableArray, headerArray)
        
    } catch (err) {
        console.log(err)
        renderMessage(routeList, `Error - ${err.message}`);
    }
};

// searching all stops
stopForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const stop = document.querySelector("#stop").value.trim();
    if (!stop) return;

    renderMessage(stopOutput, "Loading…");

    try {
        //check if there is any data and display it
        const data = await searchStops(stop);
        if (data.length === 0) {
            renderMessage(stopOutput, `No results found for "${stop}".`);
            return;
        }
        
        let message = `Found ${data.length} result(s) for "${stop}":`;
        
        message += displayStopList(data)
        
        renderMessage(stopOutput, message);
    } catch (err) {
        renderMessage(stopOutput, `Error: ${err.message}`);
    }
});

//for searching stops along a route
routestopForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const routestop = document.querySelector("#routestop").value;
    if (!routestop) return;

    renderMessage(routestopOutput, "Loading…");

    try {
        //check if there is any data and display it
        const data = await fetchRouteStops(routestop);
        if (data.length === 0) {
            renderMessage(routestopOutput, `No results found for "${routestop}".`);
            return;
        }
        
        let message = `Found ${data.length} result(s) for "${routestop}":`;
        
        message += displayStopList(data)

        
        renderMessage(routestopOutput, message);
        
    } catch (err) {
        renderMessage(routestopOutput, `Error: ${err.message}`);
    }
});

