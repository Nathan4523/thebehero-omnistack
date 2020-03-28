import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import sty from './styles';
import logoPng from '../../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {
    const [incidents, setIncident] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }
        
        setLoading(true);
        
        const response = await api.get(`incidents`, {
            params: { page }
        });

        setIncident([...incidents, ...response.data ]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    function navigateToDetail(incident) {
        navigation.navigate('Details', { incident });
    }

    return (
        <View style={sty.container}>
            <View style={sty.header}>
                <Image source={logoPng} />
                <Text style={sty.headerText}>
                    Total de <Text style={sty.textBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={sty.title}>Bem vindo!</Text>
            <Text style={sty.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={sty.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                // showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={sty.incident}>
                        <Text style={sty.incidentProperty}>ONG: </Text>
                        <Text style={sty.incidentValue}>{incident.name}</Text>

                        <Text style={sty.incidentProperty}>CASO: </Text>
                        <Text style={sty.incidentValue}>{incident.title}</Text>

                        <Text style={sty.incidentProperty}>VALOR: </Text>
                        <Text style={sty.incidentValue}>{
                            Intl.NumberFormat('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={sty.detailButton}
                            onPress={() => navigateToDetail(incident)}>
                            <Text style={sty.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
