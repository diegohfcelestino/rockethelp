import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { VStack, Heading, Icon, useTheme } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";

export function SignIn() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe email e senha");
    }
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        setLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "Email inválido.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "Email ou senha inválido.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Email ou senha inválido.");
        }

        return Alert.alert("Entrar", "Não foi possível acessar");
      });
  }

  const { colors } = useTheme();
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
