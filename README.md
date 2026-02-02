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

transit app using transitland API

for now use google maps to display map views, but long term i want to use OSM



### API usage & data processing:

Get api calls to transitland working using hardcoded params

Make functions that get data and format it to pass to display layer

make it so ui controls can affect what the api calls are

add google maps display, using an array with objects for each stop,transfer/etc that gets used to drop a pin and draw a line between relevent pins

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

## A1 Reflection
