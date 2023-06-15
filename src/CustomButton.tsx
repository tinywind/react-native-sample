import React, { Component, PropsWithChildren, useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

export default function CustomButton({
  style,
  onPress,
  onLongPress,
  children,
}: PropsWithChildren<{
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: null | ((event: GestureResponderEvent) => void);
}>) {
  return (
    <Pressable
      style={[{ alignItems: 'center', justifyContent: 'center', borderStyle: 'solid', borderWidth: 1, borderRadius: 10 }, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={{ color: 'rgba(0, 255, 255, 0.5)' }}
      hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}>
      {children}
    </Pressable>
  );
}
