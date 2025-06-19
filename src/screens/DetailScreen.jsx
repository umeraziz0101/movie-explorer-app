import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {useRoute} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import {useHomeViewModel} from '../viewModels/useHomeViewModel';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';
import CustomIcon from '../components/CustomIcon';
import Icons from '../utils/assets/Icons';

const DetailScreen = () => {
  const {width} = useWindowDimensions();
  const {logout} = useHomeViewModel();
  const {data} = useRoute().params;
  const uri = data.poster_path;
  const year = new Date(data.release_date).getFullYear();
  return (
    <Wrapper top>
      {/* <CustomText>{data.title}</CustomText> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <CustomHeader onSignOut={logout} />
          </View>
          <View style={{height: width * 1.2, width: width}}>
            <ImageBackground
              source={{uri}}
              style={[styles.image, {width}]}
              resizeMode="cover">
              <LinearGradient
                colors={[
                  Colors.opacity_dark_max,
                  Colors.opacity_dark,
                  Colors.opacity_dark,
                ]}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
                style={styles.gradient}
              />

              <View style={styles.textOverlay}>
                <CustomIcon name={Icons.play} size={65} />
                <CustomText
                  textType={Fonts.semiBold}
                  size={14}
                  style={styles.title}>
                  {Strings.texts.playTrailer}
                </CustomText>
              </View>
            </ImageBackground>
          </View>
        </View>
        <Wrapper>
          <CustomText textType={Fonts.semiBold} size={20}>
            {data.title}
          </CustomText>
          <View style={{flexDirection: 'row'}}>
            <CustomText size={12} color={Colors.gray_969696}>
              {year} |
            </CustomText>
            <CustomText size={12} color={Colors.gray_969696}>
              Action/Sci-fi |
            </CustomText>
            <CustomText></CustomText>
            <CustomText></CustomText>
          </View>
        </Wrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',

    borderBottomWidth: 1,
    borderColor: Colors.gray_6c6c6c,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    justifyContent: 'center',
  },
  textOverlay: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    marginTop: 16,
  },
});
