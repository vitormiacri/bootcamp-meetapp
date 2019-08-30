import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { parseISO, format, addDays, subDays } from 'date-fns';
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
  const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  // async function loadMore() {
  //   try {
  //     setRefreshing(true);
  //     const nextPage = page + 1;
  //     const response = await api.get('meetups', {
  //       params: { page: nextPage, date: format(date, 'yyyy-MM-dd') },
  //     });

  //     setMeetups(
  //       nextPage >= 2 ? [...meetups, ...response.data] : response.data
  //     );
  //     setPage(page);
  //   } catch (err) {
  //     if (err.response && err.response.data && err.response.data.error) {
  //       Alert.alert('Erro', err.response.data.error);
  //     } else {
  //       Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
  //     }
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // }

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
    try {
      const response = await api.get('meetups', {
        params: { page, date: format(date, 'yyyy-MM-dd') },
      });

      setMeetups(
        page === 1
          ? response.data
          : prevMeetups => [...prevMeetups, ...response.data]
      );
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        Alert.alert('Erro', err.response.data.error);
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // loadMeetups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isFocused]);

  function handleNextDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  function handlePreviusDay() {
    setPage(1);
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
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <MeetupList
            data={meetups}
            keyExtractor={item => String(item.id)}
            refreshing={loading}
            onEndReachedThreshold={0.1}
            onEndReached={() => loadMeetups()}
            onRefresh={() => loadMeetups()}
            renderItem={({ item }) => (
              <Meetup
                isDashboard
                loading={loading}
                onSubmit={() => handleSubscribe(item.id)}
                data={item}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyList>
                <Icon name="mood-bad" size={56} color="#FFF" />
                <EmptyText>Nenhum meetup encontrado para este dia</EmptyText>
              </EmptyList>
            )}
          />
        )}
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
