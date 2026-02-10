# Comp 265

This is a repo for my comp265 class work
## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## A1 Plan

Android transit app using transitland API

for now use google maps to display map views, but long term i want to use OSM



### API usage & data processing:

https://www.npmjs.com/package/transitland-rest-client

Get api calls to transitland working using hardcoded params

Make functions that get data and format it to pass to display layer

make it so ui controls can affect what the api calls are

add google maps display, using an array with objects for each stop,transfer/etc that gets used to drop a pin and draw a line between relevent pins

https://www.npmjs.com/package/react-native-maps 

https://www.npmjs.com/package/expo-calendar

https://www.npmjs.com/package/react-native-date-picker


https://www.npmjs.com/package/react-native-render-html // for testing work

https://www.npmjs.com/package/react-native-permissions // to get location perms

https://www.npmjs.com/package/expo-notifications //for nav info, service alerts and reminders

https://www.npmjs.com/package/markdown-to-jsx // for help info 

https://www.npmjs.com/package/expo-speech //headphone alerts for things like what stop to get off

#### useful things i MAY want to use

https://www.npmjs.com/package/minotor //realtime routing!!!

https://www.npmjs.com/package/gtfs-utils

https://www.npmjs.com/package/gtfs-types

https://www.npmjs.com/package/transit-departures-widget

https://www.npmjs.com/package/corequery

https://www.npmjs.com/package/gtfs

https://www.npmjs.com/package/bwip-js //barcode stuff

https://www.npmjs.com/package/gtfs-to-html

https://www.npmjs.com/package/@native-html/css-processor

https://www.npmjs.com/package/@opentripplanner/transit-vehicle-overlay



## long term for future assignemnts

- realtime turn-by-turn navigation processed locally

- bike routing

- use locally cached OSM maps for offline nav

- nightime red-on-black colorscheme option for lowlight

- make it closer to the figma proto from DSGN-210-A3

### Display side:

make a placeholder component to display the api results with minimal formatting

make a component that allows some manual ugly controls to make calls to the api for testing

make components that use to display a list, each type of item, and the parts of each item

make a searchbox

make a timeline syle display for showing schedules

make a set of components for showing a trip, and real time guidence

# A1 Reflection

Had to significatly chage my initial plans, because i realized that those plans were way over ambitious, so i opted to just try and make a ui as similar to my mult213-a3 projct, with minor impovements, and some tweaks to fit asignment requrements.

## What went well:

The in class exmples, and the starter code were very helpful, and saved me having to rewrite a significant amount of basic boilerplate.

Once i got in the groove i was able to hammer out a crude setup that i could spend time refining

## What didnt go well

The biggest challenge was trying to find a node module that:
 -  fit what i was trying to make
 - Did not require ANOTHER account/API key
 - Worked
 - Had documentation
    - and decent example code


The map api ones broke everything and the modules for talking directly to the citys GTFS datasets had 0 docs or assumed you already knew way more than i did. the ali i used for mult213-a1 returned data in a format that was hard to work with, which is why i was trying to get the data directly from the city.

## if i had more time

I would use example data that followed the format returned by the city or the transitland API, so i could acually try it with real data

I would also have liked to have a working map, even just one that worked seperately without interacting with the rest of the app

# A1 self assesment

Components: 4, The offline mode toggle wa a bit of a kludge to meet the requrements, but in the design the only other place it would make sense is a trip settings page, but nav comes later 

3rd party Modules: 3, the transitland api is called, but the (error) response is not used for anything. I got the transitland api to show plain text from it while testing, but i had to excude that from the git so i didnt leak my api key.

Styling: 3, i didd not have time to add proper icons, or make the area for the map view the rigght size, but everyting alse mostly lines up with what i had in mind

Quality: 3, parts of this were less for making something good, and more just thrown in because the assingment said so.

