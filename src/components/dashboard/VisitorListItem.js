/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { coustomerDetails,setColor } from '../../actions';
import { Actions } from 'react-native-router-flux';
import { View,Text,TouchableOpacity,Image } from 'react-native';
import Arrow from '../../assets/company_list_arrow.png';
class VisitorListItem extends Component {
    onRowPress() {
        const { customer } = this.props.visitor;
        let mobile = customer.mobile;
        const { color } = this.props;
        this.props.setColor(color[0]);
        const { selected_company } = this.props;
        let slug = selected_company.slug;
        this.props.coustomerDetails({slug,mobile,color : color[0]});
    }
    render() {
        const { customer } = this.props.visitor;
        const { color } = this.props;
        const { name,mobile } = customer;
        const labelText = name.charAt(0).toUpperCase();
        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={{ flexDirection : 'row' }}>
                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60/2,
                        borderWidth : 1,
                        borderColor : color[1],
                        marginTop : 10,
                        marginLeft : 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor : color[0]
                    } }><Text style={ styles.labelStyle }>{labelText}</Text></View>
                    <View style={{ flexDirection : 'column',paddingTop : 18,paddingLeft : 10 }}>
                        <Text style={{ color : '#252928' }}>{customer.name}</Text>
                        <Text style={{ color : '#8e9497' }}>{mobile}</Text>
                    </View>
                    <View style={styles.arrowStyle} >
                        <Image source={Arrow}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    TextStyle : {
        flex : 1,
        fontSize : 16,
        lineHeight : 30,
        color : '#000000',
        paddingLeft : 10,
        paddingTop : 7,
        fontWeight : '400',
        height : 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    /*circle : {

    },*/
    arrowStyle: {
        flex : 1,
        paddingRight : 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    labelStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        color : '#FFFFFF'
    },
};
function mapStateToProps({companies}) {
    const { selected_company } = companies;
    return { selected_company };
}
export default connect(mapStateToProps,{coustomerDetails,setColor})(VisitorListItem);