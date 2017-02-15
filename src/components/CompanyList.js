/**
 * Created by taranjeet.s on 1/23/2017.
 */
import React, { Component } from 'react';
import { fetchCompanies } from '../actions';
import { connect } from 'react-redux';
import { ListView,View,Text,Image,ScrollView } from 'react-native';
import CompanyListItem from './CompanyListItem';
import Spinner from 'react-native-loading-spinner-overlay';
import CompanyListImage from '../assets/company_list_icon.png';
import Hr from 'react-native-hr';

class CompanyList extends Component {
    componentWillMount() {
        this.props.fetchCompanies();
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }
    createDataSource({ companies }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(companies);
    }
    renderRow(company){
        const colors  = [ ['#bdc2e5','#a7add9'],['#bde5da','#93cebe'],['#e5bdbd','#daa0a0'],['#bde5be','#a8d8a9'],['#b0dcd0','#94cfbf'] ];
        const color = colors[Math.floor(Math.random()*colors.length)];
        return (
            <View>
                <View style={{ height : 2,backgroundColor : '#dae1e5' }} ></View>
                    <CompanyListItem company={ company } color={color} ></CompanyListItem>
            </View>
        );
    }
    render() {
        const { companies } = this.props;
        if(!companies){
            console.log(companies);
            this.props.fetchCompanies();
        }
        const { loading } = this.props;
        if(loading){
            {
                return (
                    <View style={{ flex: 1 }}>
                        <Spinner visible={loading} size="large" />
                    </View>
                );
            }
        }
        else{
            const { viewStyle,imageStyle,textStyle,textViewStyle } = styles;
            return (
                <ScrollView>
                    <View style={viewStyle} >
                        <View style={ imageStyle } >
                            <Image source={CompanyListImage} ></Image>
                        </View>
                        <View style={textViewStyle}>
                            <Text style={textStyle}>Your Companies</Text>
                        </View>
                        <View>
                            <ListView enableEmptySections
                                      dataSource={this.dataSource}
                                      renderRow = {this.renderRow}>
                            </ListView>
                        </View>
                        <View style={{ height : 2,backgroundColor : '#dae1e5' }} ></View>
                    </View>
                </ScrollView>
            );
        }
    }
}
const styles = {
    viewStyle : {
        paddingTop : 100,
        flex : 1
    },
    imageStyle : {
        justifyContent: 'center',
        alignItems : 'center',
    },
    textStyle : {
        fontSize : 20,
        color : '#000000',
        fontWeight : '600'
    },
    textViewStyle : {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom : 20
    }
};
function mapStateToProps(state) {
    const companies = state.companies.companylist;
    const loading = state.companies.loading;
    return {companies,loading};
}

export default connect(mapStateToProps,{ fetchCompanies })(CompanyList);
