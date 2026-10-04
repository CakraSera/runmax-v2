import { NativeTabs } from "expo-router/unstable-native-tabs";
import { DynamicColorIOS, Platform, useColorScheme, type ColorValue } from "react-native";

type AdaptiveColor = { light: string; dark: string };

const ACCENT = {
  plan: { light: "#F97316", dark: "#FB923C" },
  chat: { light: "#0EA5E9", dark: "#38BDF8" },
} as const;

const MUTED: AdaptiveColor = { light: "#64748B", dark: "#94A3B8" };

/**
 * On iOS 26 the system draws the tab bar with Liquid Glass and flips its
 * appearance at runtime based on the content behind it (there is no callback
 * for this), so icon and label colors must be dynamic. Other platforms resolve
 * through the JS color scheme.
 */
function adaptiveColor({ light, dark }: AdaptiveColor, isDark: boolean): ColorValue {
  return Platform.OS === "ios" ? DynamicColorIOS({ light, dark }) : isDark ? dark : light;
}

export default function TabLayout() {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeTabs
      iconColor={adaptiveColor(MUTED, isDark)}
      labelStyle={{ color: adaptiveColor(MUTED, isDark) }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "dumbbell", selected: "dumbbell.fill" }}
          md="fitness_center"
          selectedColor={adaptiveColor(ACCENT.plan, isDark)}
        />
        <NativeTabs.Trigger.Label selectedStyle={{ color: adaptiveColor(ACCENT.plan, isDark) }}>
          Weekly Plan
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="ai-chat">
        <NativeTabs.Trigger.Icon
          sf={{
            default: "bubble.left.and.bubble.right",
            selected: "bubble.left.and.bubble.right.fill",
          }}
          md={{ default: "chat_bubble_outline", selected: "chat_bubble" }}
          selectedColor={adaptiveColor(ACCENT.chat, isDark)}
        />
        <NativeTabs.Trigger.Label selectedStyle={{ color: adaptiveColor(ACCENT.chat, isDark) }}>
          AI Chat
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
