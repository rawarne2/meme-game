import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const io = require("socket.io-client");

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = "https://6ce4bba4e947.ngrok.io";


const App = () => {
  
  const [isConnected, setIsConnected] = useState(false)
  const [userData, setData] = useState(null)

  useEffect(() => {
    const socket = io(SocketEndpoint, {
      transports: ["websocket"],
    });
    socket.on("connect", () => { setIsConnected(true) })
    socket.on("ping", (data) => { setData(data) })
  }, [])

  return (
    <View style={styles.container}>
      <Text>connected: {isConnected ? "true" : "false"}</Text>
      {userData && <Text>ping response: {userData.data}</Text>}
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});