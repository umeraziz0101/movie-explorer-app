import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import Icons from '../utils/assets/Icons';
import CustomImage from './CustomImage';
import Images from '../utils/assets/Images';
import Colors from '../utils/constants/Colors';

const CustomHeader = ({logo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {logo ? (
          <CustomIcon name={Icons.logo} size={50} />
        ) : (
          <View style={styles.iconContainer}>
            <CustomIcon
              name={Icons.back}
              size={35}
              fill={Colors.white_ffffff}
            />
          </View>
        )}
        <CustomImage
          local
          imageSize={40}
          imageCircle
          imageSource={Images.fastX}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    top: 40,
    width: '90%',
    position: 'absolute',
    // backgroundColor: '#aa3',
    // paddingHorizontal: 16,
    // marginHorizontal: 16,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.gray_d9d9d9,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
