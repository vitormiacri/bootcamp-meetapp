import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { parseISO, isBefore, format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  MeetupList,
  Header,
  HeaderButton,
  HeaderDate,
  EmptyList,
  EmptyText,
} from './styles';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function handleSubscribe(id) {
    try {
      setLoading(true);
      await api.post(`subscription/${id}`);

      Alert.alert('Sucesso!', 'Inscrição realizada.');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadMeetups() {
    setRefreshing(true);
    setLoading(true);
    const response = await api.get('meetups', {
      params: { page, date: format(addDays(date, 1), 'yyyy-MM-dd') },
    });

    const data = response.data.rows;
    // setMeetups(page === 1 ? data : [...meetups, ...data]);
    // console.tron.log(meetups);
    // console.tron.log(page >= 2);
    // const meetupsList = page >= 2 ? [...meetups, ...data] : data;
    // console.tron.log(meetupsList);
    setMeetups(page >= 2 ? [...meetups, ...data] : data);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
    setRefreshing(false);
    // setMeetups(prevMeetupList => [...prevMeetupList, ...data]);
  }

  function refreshList() {
    setPage(1);
    setRefreshing(true);
    loadMeetups();
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  function handleNextDay() {
    // setPage(1);
    // setLoading(true);
    // setRefreshing(true);
    // setDate(addDays(date, 1));
  }

  function handlePreviusDay() {
    // setPage(1);
    // setLoading(true);
    // setRefreshing(true);
    // setDate(subDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <Header>
          <HeaderButton onPress={handlePreviusDay}>
            <Icon name="chevron-left" size={26} color="#fff" />
          </HeaderButton>
          <HeaderDate>{dateFormatted}</HeaderDate>
          <HeaderButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={26} color="#fff" />
          </HeaderButton>
        </Header>
        {/* {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : ( */}
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMeetups()}
          refreshing={refreshing}
          // onRefresh={() => refreshList()}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#FFF" />
          }
          renderItem={({ item }) => (
            <Meetup
              data={item}
              isDashboard
              loading={loading}
              onSubmit={() => handleSubscribe(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList>
              <Icon name="mood-bad" size={56} color="#FFF" />
              <EmptyText>Nenhum meetup encontrado para este dia</EmptyText>
            </EmptyList>
          )}
        />
        {/* )} */}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={22} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
