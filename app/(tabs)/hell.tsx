import React from 'react'
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { IconSymbol } from '@/components/ui/icon-symbol';


export default function TabThreeScreen() {
    return (
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#E0D0D0', dark: '#352626' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#801010"
            name="house.fill"
            style={styles.headerImage}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
            }}>
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          </ThemedText>
        </ThemedView>
        <ThemedText>EVERYTHING IS ON FIRE</ThemedText>
        
    </ParallaxScrollView>
    )
}


const styles = StyleSheet.create({
    headerImage: {
      color: '#CA2020',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });
  