import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { Container, Slogan, Title } from './styles';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function Signin() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)
      const { data } = await GoogleSignin.signIn()

      if (data?.idToken) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Entrar", "Não foi possível autenticar com a sua conta.")
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title='Entrar com Google'
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}