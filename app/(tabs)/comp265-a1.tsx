import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/theme";
import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
    Appbar,
    Card,
    Divider,
    IconButton,
    List,
    Text,
} from "react-native-paper";

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
    routeNumber: string;
    arrivalTime: number;
    nextArrivalTime: number;
    latitude: number;
    longitude: number;
    onestopID: string;
    transitID: string;
};

type RouteCard = {
    title: string;
    short: string;  // route number, but its printed 
    nearstop: number;
    nextArrivalTime: number;
};

type Props = {
    city: string;
    condition: string;
    short: number;
    nextArrivalTime: number;
    arrivalTime: number;
    routes: routesRow[];
};

export function WeatherHeroPaperView({
    city = "Saskatoon Transit",
    condition = "City Center",
    short = 8,
    arrivalTime = 20,
    nextArrivalTime = 12,
    routes = [
        {
            name: "City Center", routeNumber: "cloud.sun.bolt.fill", arrivalTime: 19, nextArrivalTime: 10, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "The Meadows", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
            ]
        },
        {
            name: "", routeNumber: "cloud.snow", arrivalTime: 21, nextArrivalTime: 13, onestopID: "",
            stops: [
                { name: "Downtown Terminal West", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" },
                { name: "The Meadows", routeNumber: "sun.horizon", arrivalTime: 20, nextArrivalTime: 12, latitude: -2, longitude: 2, onestopID: "onestopID", transitID: "transitStopID" }
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
                        <Text variant="displayLarge" style={styles.tempText}>
                            TransitTrack
                        </Text>
                        <Text variant="headlineMedium" style={styles.degreeMark}>
                            beta
                        </Text>
                    </View>

                    <View style={styles.cityRow}>
                        <Text variant="labelLarge" style={styles.cityText}>
                            {city.toUpperCase()}
                        </Text>

                        <IconButton
                            routeNumber="map-marker"
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

            {/* Horizontal routes List */}
            <View style={styles.routesListHorizontal}>
                <Text variant="labelLarge" style={styles.hScrollTitle}>
                    Favorite
                </Text>

                <FlatList
                    data={routes}
                    horizontal
                    keyExtractor={(item) => item.name}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.miniCard} mode="contained">
                            <Card.Content style={styles.miniCardContent}>
                                <Text style={styles.miniDay}>{item.name}</Text>

                                <IconSymbol size={22} name={item.routeNumber} color="rgba(255,255,255,0.9)" />

                                <Text style={styles.miniTemps}>
                                    In {item.arrivalTime}/{item.nextArrivalTime} mins
                                </Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>

            {/* Hero Section */}
            <View style={styles.hero}>


                <View style={styles.illustrationWrap}>
                    <IconSymbol
                        name="sun.horizon"
                        size={150}
                        color="rgba(245, 242, 18, 0.95)"
                    />
                </View>
            </View>

            {/* Vertical routes List */}
            <View style={styles.routesCard}>
                {routes.map((row, idx) => (
                    <React.Fragment key={row.name}>
                        <List.Item
                            title={row.name}
                            titleStyle={styles.routesDay}
                            left={() => (
                                <Text style={styles.routesTemps}>
                                    {short}
                                </Text>
                            )}
                            right={() => (
                                <Text style={styles.routesTemps}>
                                    In {row.arrivalTime} & {row.nextArrivalTime} Minutes
                                </Text>
                            )}
                            style={styles.routesRow}
                        />
                        <View style={styles.stopsCard}>

                            <Text variant="labelLarge" style={styles.hScrollTitle}>
                                Stops
                            </Text>
                            {row.stops.map((row2, idx) => (
                                <React.Fragment key={row2.name+"-stop_"+row2.name}>
                                    <List.Item
                                        title={row2.name}
                                        titleStyle={styles.routesDay}
                                        left={() => (
                                            <IconSymbol size={22} name={row2.routeNumber} color="rgba(255,255,255,0.9)" />
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
                ))}
            </View>


        </View>
    );
}

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
        width: 28,
        height: 28,
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

        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    stopsCard: {
        borderRadius: 12,
        padding: Spacing.md,

        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    routesRow: {
        flexDirection: "row",
        alignItems: "center",
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
