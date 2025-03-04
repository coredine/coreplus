import React, { Component } from 'react'; 
import { StyleSheet, View, Dimensions, PanResponder, Animated, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      bottomHeight    : Dimensions.get('window').height-minHeight, // min height for bottom pane header,
      deviceHeight    : Dimensions.get('window').height,
      isDividerClicked: false,

      dividerHeight : this.props.dividerHeight ? this.props.dividerHeight : 12,
      minHeight : this.props.minHeight ? this.props.minHeight : 230,
      startingHeight : this.props.startingHeight ? this.props.startingHeight : 1000,

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
        let moveY = Math.max(gestureState.moveY, minHeight)
        this.setState({
            bottomHeight    : moveY > (this.state.deviceHeight - minHeight) ? minHeight : this.state.deviceHeight - moveY,
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
      <SafeAreaView style={styles.content}>

        {/* Top View */}
        <Animated.View style = {[{minHeight: this.state.minHeight, flex: 1}, {height: this.state.topHeight}]}>
          { this.props.childOne?this.props.childOne:null }
        </Animated.View>

        {/* Divider */}
        <View style={[{height: this.state.dividerHeight}, this.state.isDividerClicked ? {backgroundColor: '#666'} : {backgroundColor: '#e2e2e2'}]} 
          { ...this._panResponder.panHandlers } />

        {/* Bottom View */}
        <Animated.View style={[{minHeight: this.state.minHeight}, {height: this.state.bottomHeight}]} >
          { this.props.childTwo?this.props.childTwo:null }
        </Animated.View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column'
  },
})