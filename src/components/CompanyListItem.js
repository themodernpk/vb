/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React,{ Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { selectedCompany } from '../actions';
import { View,Text,TouchableWithoutFeedback,Image,TouchableOpacity } from 'react-native';
import { CardSection } from '../components/common';
import Arrow from '../assets/company_list_arrow.png';
class CompanyListItem extends Component {
    onRowPress() {
        this.props.selectedCompany(this.props.company);
        Actions.dashboard();
    }
    render() {
        const { name } = this.props.company;
        const { color } = this.props;
        const labelText = name.charAt(0).toUpperCase();
        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection style={{ alignSelf : 'center' }}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60/2,
                            borderWidth : 1,
                            borderColor : color[1],
                            marginTop: 10,
                            marginLeft : 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: color[0]
                        }}><Text style={ styles.labelStyle }>{labelText}</Text></View>
                        <Text style={ styles.TextStyle }>{name}</Text>
                        <View style={styles.arrowStyle} >
                            <Image source={Arrow}></Image>
                        </View>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = {
    arrowStyle: {
        flex : 1,
        paddingRight : 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    TextStyle : {
        fontSize : 17,
        lineHeight : 52,
        color : '#000000',
        paddingLeft : 10,
        fontWeight : '400',
        height : 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        color : '#FFFFFF'
    }
}
export default connect(null,{selectedCompany})(CompanyListItem);