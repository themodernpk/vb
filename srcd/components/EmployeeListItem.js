/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React,{ Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../components/common';
class EmployeeListItem extends Component {
    onRowPress() {
        Actions.employee_edit({ employee : this.props.employee })
    }
    render() {
        const { name } = this.props.employee;
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={ styles.TextStyle }>{name}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    TextStyle : {
        fontSize : 20,
        lineHeight:25,
        color : '#27AE60',
        paddingLeft : 20
    }
}
export default EmployeeListItem;