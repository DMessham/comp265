import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/theme";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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

// TODO: make something that can convert the transitland API stuff to a nicer format so i dont have a repeat of MULT213-a3, 
// where i was doing data stuff in what should have been the view layer.
// also need to figure out how to integrate google maps as a node module, because all the transitland & GTFS modules that i tried have horrible documentation

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


type Props = {
    city: string;
    condition: string;
    routes: routesRow[];
};
// this dummy data is not the best, but most of the values should be there (that lat/long isw stupid tho lol)
export function WeatherHeroPaperView({
    city = "Saskatoon Transit",
    routes = [
        {
            name: "City Center", routeNumber: "8", arrivalTime: 3, nextArrivalTime: 13, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", address: "sun.horizon", arrivalTime: 2, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", address: "sun.horizon", arrivalTime: 2, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "The Meadows", routeNumber: "87", arrivalTime: 2, nextArrivalTime: 32, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", address: "sun.horizon", arrivalTime: 20, nextArrivalTime: 50, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", address: "sun.horizon", arrivalTime: 32, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "Lawson", routeNumber: "30", arrivalTime: 21, nextArrivalTime: 13, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", address: "sun.horizon", arrivalTime: 20, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", address: "sun.horizon", arrivalTime: 20, nextArrivalTime: 62, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        }
    ]
}: Props) {
    return (
        <View style={styles.screen}>
            {/* Top row */}
            <Appbar.Header style={styles.appbar}>
                <View style={styles.topRow}>
                    <View style={styles.tempRow}>
                        {/* TODO add logo */}
                        <Image></Image>
                        <Text variant="displaySmall" style={styles.tempText}>
                            TransitTrak
                        </Text>
                        <Text variant="headlineSmall" style={styles.degreeMark}>
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

                        <IconButton
                            icon="chevron-down"
                            size={18}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onOpenCityMenu}
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
                <View style={styles.illustrationWrap}>
                    <IconSymbol
                        name="sun.horizon"
                        size={150}
                        color="rgba(245, 242, 18, 0.95)"
                    />
                </View>
                {/* TODO: add map */}
            </View>
            <View>
                <TextInput>
                    {/* TODO add search logic */}
                </TextInput>
                <Switch>
                    {/* select route or stops */}
                </Switch>
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

                                </Text>
                                <Button>
                                    {/* Show on map */}
                                </Button>
                            )}
                            style={styles.routesRow}
                        />
                        <View style={styles.stopsCard}>
                            {/* TODO: make hide/show functions work */}
                            <React.Fragment key={row.name + "-stoplistHeader"}>
                                <List.Item
                                    title={row.stops.length + " stops"}
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
                                <React.Fragment key={row.name + "-stop_" + row2.name}>
                                    <List.Item
                                        title={row2.name}
                                        titleStyle={styles.routesDay}
                                        left={() => (
                                            <IconSymbol size={22} name="busstop" color="rgba(255,255,255,0.9)"
                                                style={styles.iconBtnTight} />
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

                        {idx < routes.length - 1 ? (
                            <Divider style={styles.divider} />
                        ) : null}
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
    },

    appbar: {
        backgroundColor: "transparent",
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

    iconBtnTight: {
        width: 24,
        height: 24,
    },

    hero: {
        alignItems: "center",
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
