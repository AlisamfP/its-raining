import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const NotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header">
          404&deg;F
        </Text>
        <Text style={styles.subtitle}>
          Oh no! This page doesn't exist.
        </Text>
        <Link href="/index" style={styles.button} accessibilityRole="link">
          Go Home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#80dfff",
    fontWeight: "600",
  },
});

export default NotFound;
