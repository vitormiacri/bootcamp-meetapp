import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { format, addDays, subDays } from 'date-fns';
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

const perPage = 10;

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  async function handleSubscribe(id) {
    try {
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          loading: meetup.id === id,
        }))
      );
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
    if (total && page > total) return;
    try {
      setLoading(true);
      const response = await api.get('meetups', {
        params: { page, date: format(date, 'yyyy-MM-dd') },
      });

      const data = response.data.rows;

      const totalItems = await response.data.count;

      setTotal(Math.ceil(totalItems / perPage));
      setMeetups(page >= 2 ? [...meetups, ...data] : data);
      setPage(page + 1);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function refreshList() {
    setPage(1);
    setTotal(0);
    setLoading(true);
    setRefreshing(true);
    loadMeetups();
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  function handleNextDay() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(addDays(date, 1));
  }

  function handlePreviusDay() {
    setMeetups([]);
    setPage(1);
    setTotal(0);
    setLoading(true);
    setDate(subDays(date, 1));
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
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReachedThreshold={0.2}
          onEndReached={() => loadMeetups()}
          refreshing={refreshing}
          onRefresh={() => refreshList()}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#FFF" />
          }
          renderItem={({ item }) => (
            <Meetup
              isDashboard
              loading={loading}
              onSubmit={() => handleSubscribe(item.id)}
              data={item}
            />
          )}
          ListEmptyComponent={() =>
            !loading && (
              <EmptyList>
                <Icon name="mood-bad" size={56} color="#FFF" />
                <EmptyText>Nenhum meetup encontrado para este dia</EmptyText>
              </EmptyList>
            )
          }
        />
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
