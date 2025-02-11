import React, { Component } from 'react'; 
import { StyleSheet, View, Dimensions, PanResponder, Animated, Text } from 'react-native';

/* 
    Source : https://github.com/brucelin0325/react-native-resizable-flex-panes 
    Slightly modified to fit the project's needs
*/
export default class ResizableComponent extends Component {
  constructor(props) {
    super(props);
    const minHeight = this.props.minHeight ? this.props.minHeight : 250;

    this.state = {
      offset          : 0,
      topHeight       : minHeight, // min height for top pane header
      bottomHeight    : minHeight, // min height for bottom pane header,
      deviceHeight    : Dimensions.get('window').height,
      isDividerClicked: false,

      pan             : new Animated.ValueXY()
    }

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the Y position offset when touch start
      onPanResponderGrant: (e, gestureState) => {
        this.setState({
          offset: e.nativeEvent.pageY,
          isDividerClicked: true
        })
      },

      // When we drag the divider, set the bottomHeight (component state) again.
      onPanResponderMove: (e, gestureState) => {
        this.setState({
            bottomHeight    : gestureState.moveY > (this.state.deviceHeight - minHeight) ? minHeight : this.state.deviceHeight - gestureState.moveY,
            offset: e.nativeEvent.pageY
        })
      },

      onPanResponderRelease: (e, gestureState) => {
        // Do something here for the touch end event
        this.setState({
            offset: e.nativeEvent.pageY,
            isDividerClicked: false
        })
      }
    });
  }


  render() {
    return ( 
      <View style={styles.content}>

        {/* Top View */}
        <Animated.View style = {[{backgroundColor: 'pink', minHeight: this.minHeight, flex: 1}, {height: this.state.topHeight}]}>
        { this.props.childOne?this.props.childOne:null }
        </Animated.View>

        {/* Divider */}
        <View style={[{height: 10}, this.state.isDividerClicked ? {backgroundColor: '#666'} : {backgroundColor: '#e2e2e2'}]} 
            {...this._panResponder.panHandlers}
        >
        </View>

        {/* Bottom View */}
        <Animated.View style={[{backgroundColor: 'green', minHeight: this.minHeight}, {height: this.state.bottomHeight}]} >
         {this.props.childTwo?this.props.childTwo:null}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column'
  },
})