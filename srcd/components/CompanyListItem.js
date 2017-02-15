/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React,{ Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectedCompany } from '../actions';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../components/common';
class CompanyListItem extends Component {
    onRowPress() {
        this.props.selectedCompany(this.props.company);
        Actions.dashboard();
    }
    render() {
        const { name } = this.props.company;
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
export default connect(null,{selectedCompany})(CompanyListItem);