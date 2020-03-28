import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import sty from './styles';
import logoPng from '../../assets/logo.png';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}}`

    function navigateToIncidents() {
        navigation.goBack();
    }

    function sendEmail() {
        //expo install expo-mail-composer
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }
    return (
        <View style={sty.container}>
            <View style={sty.header}>
                <Image source={logoPng} />

                <TouchableOpacity
                    onPress={() => navigateToIncidents()}>
                    <Feather name="arrow-left" size={20} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={sty.incident}>
                <Text style={[sty.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
                <Text style={sty.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={sty.incidentProperty}>CASO: </Text>
                <Text style={sty.incidentValue}>{incident.title}</Text>

                <Text style={sty.incidentProperty}>VALOR: </Text>
                <Text style={sty.incidentValue}>{
                    Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={sty.contactBox}>
                <Text style={sty.heroTitle}>Salve o dia!</Text>
                <Text style={sty.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={sty.heroDescription}>Entre em contato:</Text>

                <View style={sty.actions}>
                    <TouchableOpacity
                        style={sty.action}
                        onPress={() => sendWhatsapp()}>

                        <Text style={sty.actionText}>WhatApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={sty.action}
                        onPress={() => sendEmail()}>

                        <Text style={sty.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
