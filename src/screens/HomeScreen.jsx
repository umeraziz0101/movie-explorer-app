import React, {useCallback} from 'react';
import {BackHandler, ScrollView, StyleSheet} from 'react-native';
import Wrapper from '../components/Wrapper';
import {Loader} from '../components/Loader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';
import {useFocusEffect} from '@react-navigation/native';
import Strings from '../utils/constants/Strings';
import CustomSection from '../components/CustomSection';
import {moviesPopular, moviesPopularToday} from '../data/DataManager';
import MoviesList from '../components/MoviesList';
import MoviesCarousel from '../components/MoviesCarousel';
import Icons from '../utils/assets/Icons';
import CustomIcon from '../components/CustomIcon';

const HomeScreen = ({navigation}) => {
  const {user, loading, logout} = useHomeViewModel(navigation);
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          BackHandler.exitApp();
          return true;
        },
      );

      return () => subscription.remove();
    }, []),
  );

  if (loading || !user) {
    return (
      <Wrapper>
        <Loader visible={true} />
      </Wrapper>
    );
  }
  return (
    <Wrapper top>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CustomHeader /> */}
        <MoviesCarousel movies={moviesPopularToday} onSignOut={logout} />
        <Wrapper>
          <CustomIcon
            name={Icons.backgroundHome}
            size={'100%'}
            fill="none"
            style={StyleSheet.absoluteFill}
          />

          {/* <View style={styles.row}>
            <CustomText>{Strings.texts.name}</CustomText>
            <CustomText>{user.name}</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText>{Strings.texts.Email}</CustomText>
            <CustomText>{user.email}</CustomText>
          </View> */}

          {/* <CustomButton
            buttonText={Strings.buttons.logOut}
            buttonContainerStyle={styles.button}
            onPress={logout}
          /> */}
          {/* <CustomSection sectionTitle={Strings.section.today}>
            <MoviesList data={moviesPopularToday} />
          </CustomSection> */}
          <CustomSection sectionTitle={Strings.section.popularMovies}>
            <MoviesList data={moviesPopular} />
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastMonth}>
            <MoviesList data={moviesPopularToday} />
          </CustomSection>
          <CustomSection sectionTitle={Strings.section.lastSixMonth}>
            <MoviesList data={moviesPopularToday} imageSize={100} gridView />
          </CustomSection>
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  button: {
    marginTop: 18,
  },
});
