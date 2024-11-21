import RootNavigator from "./RootNavigator";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./context/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
