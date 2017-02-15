/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React from 'react';
import { Text,View,Image,Linking } from 'react-native';
import Card from './card';
import CardSection from './CardSection';
import Button from './Button';
const AlbumDetail = (props) => {
    //passing card the album title with text
    const { thumbnailContainerStyle,imageStyle,headerContentStyle,image,thumbnailStyle,headerTextStyle } = styles;
    return (
        <Card>
            <CardSection>
                <View style={thumbnailContainerStyle}>
                    <Image style={styles.thumbnailStyle} source={{uri : props.album.thumbnail_image}}/>
                </View>
                <View style={styles.headerContentStyle}>
                    <Text style={headerTextStyle}>{props.album.title}</Text>
                    <Text>{props.album.artist}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image style={imageStyle} source={{uri : props.album.image}}/>
            </CardSection>
            <CardSection>
                <Button onPress={() => Linking.openURL(props.album.url)}>
                    Buy Now
                </Button>
            </CardSection>
        </Card>
    );
};
const styles = {
    headerContentStyle : {
        flexDirection : 'column',
        justifyContent : 'space-around'
    },
    headerTextStyle : {
        fontSize : 18
    },
    thumbnailStyle : {
        width : 50,
        height : 50
    },
    thumbnailContainerStyle : {
        justifyContent:'center',
        alignItems : "center",
        marginRight : 10,
        marginLeft : 10
    },
    imageStyle: {
        height : 300,
        flex : 1,
        width : null
    }

}
export default AlbumDetail;