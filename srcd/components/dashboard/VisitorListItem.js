/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { coustomerDetails } from '../../actions';
import { Actions } from 'react-native-router-flux';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import { CardSection } from '../../components/common';
class VisitorListItem extends Component {
    onRowPress() {
        const { customer } = this.props.visitor;
        console.log(customer.mobile);
        let mobile = customer.mobile;
        const { selected_company } = this.props;
        console.log(selected_company.slug);
        let slug = selected_company.slug;
        this.props.coustomerDetails({slug,mobile});
    }
    render() {
        const { customer } = this.props.visitor;
        console.log(customer);
        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={ styles.TextStyle }>{customer.name}</Text>
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
};
function mapStateToProps({companies}) {
    const { selected_company } = companies;
    return { selected_company };
}
export default connect(mapStateToProps,{coustomerDetails})(VisitorListItem);