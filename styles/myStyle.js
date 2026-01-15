import { StyleSheet } from "react-native";

export const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textheader: {
    position: "absolute",
    top: 318,
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#0F2C42",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
    width: 297,
    height: 43,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    width: 297,
    height: 43,
  },
  iconBox: {
    backgroundColor: "#ADADAD",
    width: 47,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    height: "100%",
    backgroundColor: "#E4E4E4",
  },
  eyeIcon: {
    padding: 10, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    height: "100%",
  },
});
