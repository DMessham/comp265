import { Spacing } from "@/constants/theme";
import * as React from "react";
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import {
    Appbar,
    Button,
    Divider,
    IconButton,
    List,
    Switch,
    Text,
    TextInput
} from "react-native-paper";

// For online api stuff
import Client from "transitland-rest-client";

const client = new Client("YOUR_API_KEY_HERE");

// const { feeds } = await client.fetch<FeedResponse>("feeds");

// NOTE: Intentionally broken, I aint inclding my actual api key here lol


// TODO: make something that can convert the transitland API stuff to a nicer format so i dont have a repeat of MULT213-a3, 
// where i was doing data stuff in what should have been the view layer. also this node module was last updated over 2 years ago, still works tho
// also need to figure out how to integrate google maps as a node module because the 2 popular react native modules i tried are broken
type routesRow = {
    name: string;
    routeNumber: string;  // MaterialIcon name, e.g. "weather-cloudy"
    arrivalTime: number;
    nextArrivalTime: number;
    onestopID: string;
    stops: stopListItem[]
};

type stopListItem = {
    name: string;
    address: string;
    arrivalTime: number;
    nextArrivalTime: number;
    latitude: number;
    longitude: number;
    onestopID: string;
    transitID: string;
};

const transitFeedID = "o-c9k0-saskatoontransit"; //saskatoon transit

const apiBaseURL = 'https://transit.land/api/v2/rest'

let onColor = "rgb(95,155,95)"

function showAlert(message:string) {
    if (Platform.OS === 'web') {
        window.alert(message);
    } else {
        Alert.alert(message);
    }
}



let offlineModeStart = true;

type Props = {
    city: string;
    condition: string;
    routes: routesRow[];
};
// this dummy data is not the best, but most of the values should be there (that lat/long isw stupid tho lol)
export function WeatherHeroPaperView({
    city = "Saskatoon",

    routes = [
        {
            name: "8th Street / City Center", routeNumber: "8", arrivalTime: 3, nextArrivalTime: 13, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", address: "23rd St E / 3rd Ave N", arrivalTime: 2, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "Center Mall Terminal O/B", address: "3310 8th Street E", arrivalTime: 2, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "The Meadows / Center Mall", routeNumber: "87", arrivalTime: 2, nextArrivalTime: 32, onestopID: "",
            stops: [
                { name: "Center Mall Terminal I/B", address: "3310 8th Street E", arrivalTime: 20, nextArrivalTime: 50, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", address: "Taylor/Rosewood Gate N", arrivalTime: 32, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "Lawson Heights / City Center", routeNumber: "30", arrivalTime: 21, nextArrivalTime: 13, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", address: "23rd St E / 3rd Ave N", arrivalTime: 20, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "Lawson Terminal O/B", address: "Primrose Dr / Pinehouse Dr", arrivalTime: 20, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        }
    ]
}: Props) {

    const [isOfflineMode, setIsOfflineMode] = useState(offlineModeStart);

    const [routeSearchQuery, onChangeRouteSeach] = React.useState('');
    const [stopSearchQuery, onChangeStopSeach] = React.useState('');

    const toggleSwitch = () => setIsOfflineMode(previousState => !previousState); // copied right from the react native docs lol
    return (
        <View style={styles.screen}>
            {/* Top row */}
            <Appbar.Header style={styles.appbar}>
                <View style={styles.topRow}>
                    <View style={styles.tempRow}>
                            <Image
                            style={styles.logo}
                            source={{
                            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                            }}
                        />
                        <Text variant="displaySmall" style={styles.tempText}>
                            TransitTrak
                        </Text>
                        <Text variant="labelLarge" style={styles.degreeMark}>
                            a0.2.0
                        </Text>
                    </View>

                    <View style={styles.cityRow}>
                        <Text variant="labelLarge" style={styles.cityText}>
                            {city.toUpperCase()}
                        </Text>

                        <IconButton
                            icon="map-marker"
                            size={18}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onOpenCityMenu}
                        />
                        <Text variant="labelLarge" style={styles.cityText}>Offline Mode</Text>
                        <Switch
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isOfflineMode}
                            color={onColor}
                        />
                        <IconButton
                            icon="cog-outline"
                            size={22}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onPressSettings}
                        />
                    </View>

                </View>
            </Appbar.Header>

            {/* Hero Section */}
            <View style={styles.hero}>
                
                    <ActivityIndicator size="large" color={onColor} />
                    <Text  style={styles.hero}>It's taking a while to load maps...</Text>
                    <View style={styles.illustrationWrap}>
                </View>
                {/* TODO: add map */}
            </View>
            <View>
                <TextInput
                    onChangeText={onChangeRouteSeach}
                    onSubmitEditing={() => showAlert('Route Search not yet implemented')}
                    value={routeSearchQuery}
                    enterKeyHint="search"
                    returnKeyType="search"
                    inputMode="search"
                    placeholder="Search Bus Routes" />
            </View>
            <View>
                <TextInput
                    onChangeText={onChangeStopSeach}
                    onSubmitEditing={() => showAlert('Stop Search not yet implemented')}
                    value={stopSearchQuery}
                    enterKeyHint="search"
                    returnKeyType="search"
                    inputMode="search"
                    placeholder="Search Bus Stops" />
                {/* TODO add search logic */}
            </View>

            <ScrollView>
                {/* routes List */}
                {routes.map((row, idx) => (
                    <View style={styles.routesCard}>
                        <React.Fragment key={row.name}>
                            <List.Item
                                title={row.name}
                                titleStyle={styles.routesDay}
                                left={() => (
                                    <Text style={styles.routesTemps}>
                                        {row.routeNumber}

                                    </Text>
                                )}
                                right={() => (
                                    <Text style={styles.routesTemps}>
                                        In {row.arrivalTime} & {row.nextArrivalTime} Minutes
                                        {/* Show on map */}
                                    </Text>

                                )}
                                style={styles.routesRow}
                            />
                            <Button
                                onPress={() => showAlert('map not yet implemented')}
                                textColor="#fff7" >
                                Show on map
                            </Button>
                            <View style={styles.stopsCard}>
                                {/* TODO: make hide/show functions work */}
                                <React.Fragment key={`${row.name}-stoplistHeader`}>
                                    <List.Item
                                        title={`${row.stops.length} stops`}
                                        titleStyle={styles.routesTemps}
                                        right={() => (
                                            <IconButton
                                                icon="chevron-down"
                                                size={22}
                                                iconColor="rgba(255,255,255,0.95)"

                                                style={styles.iconBtnTight}
                                            // onPress={onPressSettings}
                                            />
                                        )}
                                        style={styles.stoplistHeaderRow}
                                    />

                                </React.Fragment>
                                {/* stop list */}
                                {row.stops.map((row2, idx) => (
                                    <React.Fragment key={`${row.name}+${row2.name}-stoplistHeader`}>
                                        <List.Item
                                            title={row2.name}
                                            titleStyle={styles.routesDay}
                                            left={() => (
                                                // <IconSymbol size={22} name="busstop" color="rgba(255,255,255,0.9)"
                                                //     style={styles.iconBtnTight} />
                                                <Image
                                                    style={styles.stopIcon}
                                                    source={{
                                                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                                                    }}
                                                />
                                            )}
                                            right={() => (
                                                <Text style={styles.routesTemps}>
                                                    In {row2.arrivalTime} & {row2.nextArrivalTime} Minutes
                                                </Text>
                                            )}
                                            style={styles.routesRow}
                                        />
                                        {idx < row.stops.length - 1 ? (
                                            <Divider style={styles.divider} />
                                        ) : null}
                                    </React.Fragment>
                                ))}
                            </View>
                        </React.Fragment>
                    </View>

                ))}
            </ScrollView>

        </View>
    );
}

// TODO: clean up styles, and remove weather related references, would also be cool if i could make a landscape/foldable layout work, where the map is on the side instead of the top

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0F2F0A",
        padding: Spacing.lg,
        gap: Spacing.md,
        paddingBottom:0,
    },

    appbar: {
        backgroundColor: "transparent",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    topRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    cityText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    logo: {
        width: 32,
        height: 32,
      },

      stopIcon: {
        width: Spacing.lg,
        height: Spacing.lg,
        marginInlineStart: Spacing.md
      },

    iconBtnTight: {
        width: 24,
        height: 24,
    },

    hero: {
        alignItems: "center",
        color: "rgba(255,255,255,0.95)",
    },

    tempRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    tempText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "300",
    },

    degreeMark: {
        color: "rgba(255,255,255,0.95)",
    },

    metaRight: {
        marginLeft: 14,
        marginTop: 22,
    },

    conditionText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    hiloText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "600",
    },

    illustrationWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    routesCard: {
        borderRadius: 16,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        paddingTop: Spacing.sm,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    stopsCard: {
        borderRadius: 12,
        padding: Spacing.sm,
        paddingTop: 0,
        margin: 0,
        backgroundColor: "rgba(25,25,25,0.5)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.5)",
    },

    routesRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    stoplistHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        margin: 0,
        padding: 0,
    },

    routesDay: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    routesTemps: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    divider: {
        opacity: 0.25,
    },

    hScrollTitle: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
        marginBottom: 10,
    },

    miniCard: {
        width: 120,
        marginRight: 12,
        borderRadius: 16,

        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    miniCardContent: {
        alignItems: "center",
    },

    miniDay: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    miniTemps: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "800",
    },

});

export default WeatherHeroPaperView;
