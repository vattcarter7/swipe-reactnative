import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Deck extends Component {
  position = new Animated.ValueXY();
  panResponder = new PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      this.position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: () => {}
  });

  state = { panResponder: this.panResponder, position: this.position };

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return { ...this.position.getLayout(), transform: [{ rotate }] };
  };

  renderCards = () => {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return this.props.renderCard(item);
    });
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
