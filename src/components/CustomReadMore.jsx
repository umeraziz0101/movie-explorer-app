import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import Colors from '../utils/constants/Colors';
import Fonts from '../utils/constants/Fonts';
import Strings from '../utils/constants/Strings';

const CustomReadMore = ({
  children,
  numberOfLines = 3,
  seeMoreText = Strings.texts.readMore,
  seeLessText = Strings.texts.readLess,
  style,
  seeMoreStyle,
  seeLessStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [truncatedText, setTruncatedText] = useState(Strings.texts.empty);

  const onTextLayout = event => {
    const {lines} = event.nativeEvent;
    if (lines.length > numberOfLines && !isExpanded) {
      setShowReadMore(true);

      const visibleLines = lines.slice(0, numberOfLines);
      const lastLine = visibleLines[visibleLines.length - 1];
      const lastLineText = lastLine.text;
      const readMoreLength = seeMoreText.length;
      const truncatedLastLine =
        lastLineText.slice(0, -readMoreLength - 3) + Strings.texts.emptySpace;

      const allVisibleText = visibleLines
        .slice(0, -1)
        .map(line => line.text)
        .join(Strings.texts.empty);
      setTruncatedText(allVisibleText + truncatedLastLine);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <View>
        <CustomText style={style}>{children}</CustomText>
        <TouchableOpacity onPress={toggleExpanded}>
          <CustomText
            style={[
              {
                color: Colors.pink_ff465f,
                fontFamily: Fonts.regular,
                fontSize: 12,
                marginTop: 4,
              },
              seeLessStyle,
            ]}>
            {seeLessText}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <CustomText
        style={style}
        numberOfLines={showReadMore ? undefined : numberOfLines}
        onTextLayout={onTextLayout}>
        {showReadMore ? (
          <>
            {truncatedText}
            <CustomText
              style={[
                {
                  color: Colors.pink_ff465f,
                  fontFamily: Fonts.regular,
                  fontSize: 12,
                },
                seeMoreStyle,
              ]}
              onPress={toggleExpanded}>
              {seeMoreText}
            </CustomText>
          </>
        ) : (
          children
        )}
      </CustomText>
    </View>
  );
};

export default CustomReadMore;
