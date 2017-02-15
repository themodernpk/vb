/**
 * Created by taranjeet.s on 1/24/2017.
 */
import React, { Component } from 'react';
import VisitorListItem from './VisitorListItem';
import { connect } from 'react-redux';
import { ListView, View,Text } from 'react-native';
import { fetchVisitors } from '../../actions';
import Hr from 'react-native-hr';
import Spinner from 'react-native-loading-spinner-overlay';

class VisitorList extends Component {
    componentWillMount() {
        // const { company_slug } = this.props;
        // this.props.fetchVisitors(company_slug);
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }
    createDataSource({ visitors }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(visitors);
    }
    renderRow(visitor){
        const colors  = [ ['#bdc2e5','#a7add9'],['#bde5da','#93cebe'],['#e5bdbd','#daa0a0'],['#bde5be','#a8d8a9'],['#b0dcd0','#94cfbf'] ];
        const color = colors[Math.floor(Math.random()*colors.length)];
        return (
            <View>
                <VisitorListItem visitor={ visitor } color ={color} ></VisitorListItem>
                <View style={{ height : 2,backgroundColor : '#dae1e5',marginTop : 9 }} ></View>
            </View>
        );

    }
    render() {
        const { visitors } = this.props;
        if(visitors){
            return (
                <View style={{paddingLeft : 5}}>
                    <ListView
                        removeClippedSubviews={false}
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow = {this.renderRow}>
                    </ListView>
                </View>
            );
        }else{
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={true} size="large" />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    const visitors = state.companies.visitorlist;
    return {visitors};
}

export default connect(mapStateToProps,{ fetchVisitors })(VisitorList);
