import { apikey } from 'api.keys';

const transitFeedID = "o-c9k0-saskatoontransit"; //saskatoon transit

const apiBaseURL = 'https://transit.land/api/v2/rest'

// api docs: https://www.transit.land/documentation/rest-api/routes

// /api/v2/rest/routes/{route_key} route format, 
// /api/v2/rest/routes/{route_key}.format adds format info

// /api/v2/rest/stops/{route_key}.format get stops


export async function fetchAllRoutes() {
  const res = await fetch(
    `${apiBaseURL}/routes?operator_onestop_id=${transitFeedID}&apikey=${apikey}&limit=50&include_stops=true`
  );

  const data = await res.json();

  console.log('Getting all routes', data);

  return data.results || [];
}

// export async function displayList(route, elementOutput){
//     renderMessage(elementOutput, "Loading…");

//     try {
//         const data = await fetchRouteStops(route);
//         if (data.length === 0) {
//             renderMessage(elementOutput, `No results found for "${route}".`);
//             return;
//         }
        
//         let message = `Found ${data.length} result(s) for ${route}`;
        
//         message += displayStopList(data)
        
//         renderMessage(elementOutput, message);
//     } catch (err) {
//         renderMessage(elementOutput, `Error: ${err.message}`);
//     }
// }

export async function fetchRouteStops(route) {
  const res = await fetch(
    `${apiBaseURL}/stops?operator_onestop_id=${transitFeedID}&served_by_onestop_ids=${route}&apikey=${apikey}&limit=50`
  );

  const data = await res.json();
  console.log('getting first 50 stops on route ID: ', route, data)

  return data.stops || [];
}

export async function fetchAreaImage(lat,lon,rad){
  const res = await fetch(
    `${apiBaseURL}/stops?operator_onestop_id=${transitFeedID}&lat=${lat}&lon=${lon}&radius=${rad}&format=png&apikey=${apikey}`
  );

  console.log(`getting image of area around: ${lat}, ${lon}`, res);

  data = res.url

 console.log(`image url for ${rad} around lat ${lat} lon ${lon}`, data);

  return data || [];
}

export async function fetchStopsLocation(lat, lon, rad) {
  const res = await fetch(
    `${apiBaseURL}/stops?operator_onestop_id=${transitFeedID}&lat=${lat}&lon=${lon}&radius=${rad}&apikey=${apikey}`
  );

  const data = await res.json();

  console.log(`getting stops near: ${lat}, ${lon}`, data);

  return data.stops || [];
}

export async function fetchRoutesByCommonStop(stopID) {
  const res = await fetch(
    `${apiBaseURL}/routes?operator_onestop_id=${transitFeedID}&served_by_onestop_ids=${stopID}&apikey=${apikey}`
  );

  const data = await res.json();
  console.log('getting all Routes using stop ID: ', stopID, data)

  return data.stops || [];
}

export async function fetchStop(stopID) {
  const res = await fetch(
    `${apiBaseURL}/stopa?operator_onestop_id=${transitFeedID}&served_by_onestop_ids=${stopID}&apikey=${apikey}`
  );

  const data = await res.json();
  console.log('getting stop ID: ', stopID, data)

  return data.stops || [];
}

export async function searchRoutes(query) {
  const res = await fetch(
    `${apiBaseURL}/routes?&search=${query}&operator_onestop_id=${transitFeedID}&apikey=${apikey}&include_stops=true&limit=50`
  );

  const data = await res.json();
  console.log('getting all Routes matching:', query, data)

  return data || [];
}

export async function searchStops(query) {
  const res = await fetch(
    `${apiBaseURL}/stops?operator_onestop_id=${transitFeedID}&search=${query}&apikey=${apikey}`
  );

  const data = await res.json();
  console.log('getting all Stops matching:', query, data)

  return data.stops || [];
}
