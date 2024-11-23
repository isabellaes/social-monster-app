import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./context/store";
import RootStackNavigator from "./RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <RootStackNavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
