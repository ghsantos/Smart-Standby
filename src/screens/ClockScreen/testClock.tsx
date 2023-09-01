function test() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text
          style={[
            styles.time,
            {
              fontSize: clockSettings.timeSize,
              color: clockSettings.timeColor,
              fontFamily: clockSettings.timeFont,
            },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {dayTime.format('HH')}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.time,
            {
              fontSize: clockSettings.timeSize,
              color: clockSettings.timeColor,
              fontFamily: clockSettings.timeFont,
            },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          :
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Text
          style={[
            styles.time,
            {
              fontSize: clockSettings.timeSize,
              color: clockSettings.timeColor,
              fontFamily: clockSettings.timeFont,
            },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {dayTime.format('mm')}
        </Text>
      </View>
    </View>
  )
}
