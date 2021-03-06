import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  YellowBox,
  RefreshControl,
} from 'react-native';
import {Avatar, Icon, Text} from '@ui-kitten/components';
import {Contents} from './Components/Data';
import HeaderTimeline from './Components/HeaderTimeline';
import Shimmer from '../../Components/Shimmer';
import ViewMore from '../../Components/ViewMore';
import {Loading} from '../../Components/Loading';
import {Color} from '../../Themes/Colors';
import {FontType} from '../../Themes/Fonts';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside']);

function Content(props) {
  const [like, setLike] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [addLike, setAddLike] = React.useState(false);
  const [shimmer, setShimmer] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // React.useEffect(() => {
  //   setShimmer(false);
  //   setTimeout(function load() {
  //     setShimmer(true);
  //   }, 3000);
  // }, []);

  const handleLike = () => {
    setLike(!like);
    if (like === true) {
      setAddLike(true);
    } else {
      setAddLike(false);
    }
  };

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefreshing = React.useCallback(() => {
    setRefreshing(true);
    setShimmer(false);
    wait(200).then(async () => {
      setRefreshing(false);
      setShimmer(true);
    });
  }, [refreshing]);

  const renderData = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 6,
            backgroundColor: 'white',
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefreshing}
              />
            }
            keyExtractor={(i, idx) => idx}
            data={Contents}
            renderItem={({item, index}) => (
              <>
                <View style={style.layoutContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                    }}>
                    <Shimmer
                      visible={shimmer}
                      style={style.Avatar}
                      component={
                        <Avatar source={item.picture} style={style.Avatar} />
                      }
                    />
                    <Shimmer
                      style={style.textName}
                      visible={shimmer}
                      component={
                        <Text style={style.textName}>{item.name}</Text>
                      }
                    />
                  </View>
                  <Shimmer
                    style={style.banner}
                    visible={shimmer}
                    component={
                      <Image style={style.banner} source={item.banner} />
                    }
                  />
                  <View style={{marginTop: 10, marginHorizontal: 15}}>
                    <Shimmer
                      style={style.likeShimmer}
                      visible={shimmer}
                      component={
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity onPress={() => handleLike()}>
                            <Icon
                              fill={like ? 'red' : Color.textHintContent}
                              name={like ? 'heart' : 'heart-outline'}
                              style={{width: 24, height: 24}}
                            />
                          </TouchableOpacity>
                          <Text style={style.textLike}>
                            {addLike ? item.like : item.like + 1} suka
                          </Text>
                        </View>
                      }
                    />
                    <View style={{marginTop: 20}}>
                      <Shimmer
                        style={style.textTitle}
                        visible={shimmer}
                        component={
                          <Text style={style.textTitle}>{item.title}</Text>
                        }
                      />
                      <Shimmer
                        style={style.textContentShimmer}
                        visible={shimmer}
                        component={
                          <>
                            <ViewMore
                              textStyle={{textAlign: 'left', marginTop: 15}}
                              component={
                                <Text style={style.textContent}>
                                  {item.content}
                                </Text>
                              }
                            />
                            <Text style={style.time}>{item.time}</Text>
                          </>
                        }
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </View>
    );
  };

  return isLoading ? <Loading /> : renderData();
}
export default Content;
const style = StyleSheet.create({
  layoutContent0: {
    backgroundColor: 'white',
    height: 200,
    marginTop: 2,
    marginBottom: 5,
  },
  layoutContent: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  Avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  banner: {
    backgroundColor: '#dcdcdd',
    marginTop: 15,
    width: '100%',
    height: 375,
    resizeMode: 'cover',
  },
  textName: {
    marginTop: 6,
    marginLeft: 10,
    fontSize: 13,
    color: Color.textContent,
    fontFamily: FontType.bold,
    width: 100,
    borderRadius: 5,
  },
  textLike: {
    color: Color.textContent,
    fontSize: 11,
    marginLeft: 5,
    marginTop: 4,
  },
  textTitle: {
    fontSize: 14,
    fontFamily: FontType.bold,
    marginBottom: 10,
    color: Color.textContent,
    borderRadius: 5,
    width: '100%',
  },
  textContent: {
    fontSize: 13,
    color: Color.textContent,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 16,
  },
  likeShimmer: {
    width: 100,
    borderRadius: 5,
  },
  textContentShimmer: {
    borderRadius: 5,
    width: '100%',
    height: 50,
  },
  time: {
    fontSize: 11,
    color: Color.textHintContent,
    fontFamily: FontType.regular,
  },
});
