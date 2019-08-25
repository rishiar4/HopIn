
import React, { Fragment, Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
  StatusBar,
  PermissionsAndroid,
  Keyboard,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Main from './main'
import Drawer from 'react-native-drawer-menu';
import { Easing } from 'react-native'; // Customize easing function (Optional)

import MapView, { Marker, CenterButton } from 'react-native-maps';
import { Icon, Card, ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import BottomDrawer from 'rn-bottom-drawer';
import Geolocation from '@react-native-community/geolocation';




export default class map extends Component {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  };




  myRef = null;

  constructor() {

    setTimeout(e => {

    }, 2000)

    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position.coords.longitude + " " + position.coords.latitude);
        console.log((position.coords.longitude + "," + position.coords.longitude).toString())

        // this.plotDirections((position.coords.latitude+","+position.coords.longitude).toString(),'rohini sec 16')
        this.setState({
          userLocation: {
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString()
          }
        })

      },
      error => alert(error.message),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      { enableHighAccuracy: false, timeout: 5000 }
    );


    super();

    // setTimeout(e=>{
    //   this.plotDirections('28.6304000000,77.21770000000','rohini sec 16')
    // },1000)

    this.getLocationAsync();


  }





  getdistance = (ori, dest) => {
    console.log("==> " + ori + " " + dest)
    return new Promise(resolve => {
      const mode = 'driving'; // 'walking';
      // const origin = "Rohini";
      // const destination = 'Gurgaon Sector 10a';

      let origin = ori;
      let destination = dest;
      //<<Loader here>>
      const APIKEY = 'AIzaSyA7e9CUV-04C6EUONAYI0xAjscjOK7Evqc';
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

      fetch(url)
        .then(response => response.json())
        .then(responseJson => {

          let distance = (responseJson.routes[0].legs[0].distance.value) / 1000;
          let duration = responseJson.routes[0].legs[0].duration.text;
          console.log(duration)
          resolve({ arg1: distance, arg2: duration }); //resolve the promise
        })
    })
  }

  plotDirections = (ori, dest) => {
    console.log(ori, dest)
    const mode = 'driving'; // 'walking';
    // const origin = "Rohini";
    // const destination = 'Gurgaon Sector 10a';

    let origin = ori;
    let destination = dest;
    //<<Loader here>>
    const APIKEY = 'AIzaSyA7e9CUV-04C6EUONAYI0xAjscjOK7Evqc';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          this.setState({
            coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
          });
        }

        let distance = responseJson.routes[0].legs[0].distance.text;
        let duration = responseJson.routes[0].legs[0].duration.text;
        let destination = responseJson.routes[0].legs[0].end_address;

        console.log(responseJson)
        console.log(distance + duration + destination)
        console.log(this.state.coords)
        console.log(this.state.coords[Math.floor(this.state.coords.length / 2)])
        let a = this.state.coords[Math.floor(this.state.coords.length / 2)]
        let tempCoords = {
          center: {
            latitude: a.latitude,
            longitude: a.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }


        }
        // this.setState({gotoRegion:{
        //   latitude:a.latitude,
        //   longitude:a.longitude,
        //   latitudeDelta: 0.4,
        //   longitudeDelta: 0.4,

        // }})
        let b = this.state.coords[this.state.coords.length - 1]
        this._map.animateCamera(tempCoords, 1000);
        this.setState({
          marker: {
            latitude: b.latitude,
            longitude: b.longitude,
          }
        })

        this.setState({
          showTravels: true,
          destination: destination,
          distance: distance,
          duration: duration,

        })

      }).catch(e => { console.warn(e) });
  }


  decode = (t, e) => { for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } }) }

  getLocationAsync = async () => {
    if (Platform.OS === "android") {
      console.log("os : ANdroid");
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Facex Location Permission",
            message:
              "App needs access to your location " +
              "so we can show you directions",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission allowed");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  state = {
    showTravels: false,
    region: {
      latitude: 28.7041,
      // latitude: 37.8025259,

      longitude: 77.1025,
      // longitude: -122.4351431,

      latitudeDelta: 0.6,
      longitudeDelta: 0.6,
    },
    marker: {
      latitude: 100,
      longitude: 100,
    },

    // markers: [
    //   {
    //     coordinate: {
    //       latitude: 28.7041,
    //       longitude: 77.1025,
    //     },
    //     title: "Best Place",
    //     description: "This is the best place in Portland",
    //     id: 1

    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.524698,
    //       longitude: -122.6655507,
    //     },
    //     title: "Second Best Place",
    //     description: "This is the second best place in Portland",
    //     id: 2

    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.5230786,
    //       longitude: -122.6701034,
    //     },
    //     title: "Third Best Place",
    //     description: "This is the third best place in Portland",
    //     id: 3

    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.521016,
    //       longitude: -122.6561917,
    //     },
    //     title: "Fourth Best Place",
    //     description: "This is the fourth best place in Portland",
    //     id: 4

    //   },
    // ]
  };


  onRegionChange = (region) => {
    this.setState({ region });
  }



  BottomDwr = () => {
    let i=1;
    let totalFare=0;
    return (
      <View
      // style={{ position: 'absolute', width: '100%', height: 100, backgroundColor: 'red', top: -20, backgroundColor: 'white', borderRadius: 20 }}
      >
        <View style={{ alignSelf: "center", backgroundColor: '#e5e5e5', width: 40, height: 8, marginTop: 10, borderRadius: 10 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, color: '#c1bfc8' }}>{this.state.distance}</Text>
          <Text style={{ fontSize: 18, color: '#c1bfc8' }}>{this.state.duration} </Text>
        </View>

        {this.state.driver_data2 ? (
          <View>
          <FlatList

            data={this.state.driver_data2}
            renderItem={({ item }) => (
              <View style={{ padding: 10, width: '96%', backgroundColor: 'white', alignSelf: 'center', marginVertical: 10, elevation: 2, borderRadius: 10, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                <View>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={item.icon}
                  />
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>{item.vehicle}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 4, backgroundColor: 'rgba(255,255,153,0.6)' }}>
                    <Icon
                      name='star'
                      type='feather'
                      color='#E7711B'
                      size={18}
                    // containerStyle={{ position: 'absolute', left: 10, top: 16, alignSelf: 'center', justifyContent: 'flex-end' }}
                    // style={{}}
                    />

                    <Text style={{ textAlign: "center", fontSize: 15, fontWeight: '600', color: '#8c8c8c' }}>{item.rating}</Text></View>
                </View>


                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>FROM</Text>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>Point #{i++}</Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>Duration</Text>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>{item.duration}</Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '600', color: '#8c8c8c' }}>PRICE</Text>
                  <Text style={{ textAlign: "center", fontSize: 18, fontWeight: '700', color: '#14152c' }}>₹{((parseInt(item.rate)) * item.distance).toFixed(0)}</Text>
                  {this.saveTotalFare(((parseInt(item.rate)) * item.distance).toFixed(0))}
                </View>

              </View>





            )}
          />
          <View style={{ padding: 10, width: '96%', backgroundColor: '#69E4AF',color:'white', alignSelf: 'center', marginVertical: 15, elevation: 2, borderRadius: 10, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between'}} >
              <Text style={{fontSize:23,color:'white'}}>
          Total Fare 
          </Text>
          <Text style={{fontSize:23,fontWeight:'bold',color:'white'}}>₹{this.state.totalFare}</Text>
               

          </View>
          </View>
          ) : <ActivityIndicator size="large" color="#0000ff" />}



      </View>
    )
  }



  getIcon = (s) => {

    if (s == 'Bus') return require('../assets/bus.png')
    if (s == 'Cab') return require('../assets/taxi.png')
    if (s == 'CNG Auto') return require('../assets/rickshaw.png')
    if (s == 'Auto') return require('../assets/rickshaw.png')
    if (s == 'Bike') return require('../assets/motor-sports.png')
  }



  getDrivers = (num) => {
    fetch("https://nechopin.herokuapp.com/driver/" + num + "/view")
      .then(e => e.json())
      .then((e) => {
        // console.log(e)
        let driver_data = []
        e.forEach(daa => {
          daa.icon = this.getIcon(daa.vehicle)



          driver_data.push(daa);
        })
        console.log(driver_data)

        this.setState({ driver_data: driver_data })

      })
      .then(x => {
        this.Multimarkers();
      })

      .then(() => {
        let a = 0, b = 1;
        let driver_data = []

        this.state.driver_data.forEach(daa => {
          console.log(1)
          let origin = (this.state.waypoints[a].latitude).toString() + "," + (this.state.waypoints[a].longitude).toString()
          let destin = (this.state.waypoints[b].latitude).toString() + "," + (this.state.waypoints[b].longitude).toString()

          let dd = this.getdistance(origin, destin).then(({ arg1, arg2 }) => {
            daa.distance = arg1;
            daa.duration = arg2;
          })


          driver_data.push(daa);
          a += 1;
          b += 1;
        })

        console.log("@@@@")
        console.log(driver_data)

        setTimeout(() => {
          this.setState({ driver_data2: driver_data })
        }, 500)


      })



  }

  Multimarkers = () => {
    let totalP = this.state.coords.length;
    let totalD = this.state.driver_data.length;
    let marker = []
    marker.push(this.state.coords[0]);
    let nn = Math.floor(totalP / totalD);
    let temp = 0;
    for (i = 1; i < totalD; i++) {
      marker.push(this.state.coords[temp + nn])
      temp += nn;
    }
    marker.push(this.state.coords[this.state.coords.length - 1])
    console.log("waypoints" + marker)
    this.setState({ waypoints: marker })


  }


  LocationA = () => {
    this.getDrivers(1);

    let long = this.state.userLocation.long;
    let lat = this.state.userLocation.lat
    this.plotDirections(lat + ',' + long, 'sector 10 a gurgaon')

    //  this.setState({
    //   gotoRegion: {
    //     latitude: 28.7041,
    //     // latitude: 37.8025259,

    //     longitude: 77.1025,
    //     // longitude: -122.4351431,

    //     latitudeDelta: 0.2,
    //     longitudeDelta: 0.2,
    //   },
    //  })

  }


  LocationB = () => {
    this.getDrivers(2);

    let long = this.state.userLocation.long;
    let lat = this.state.userLocation.lat
    this.plotDirections(lat + ',' + long, 'nehru place')

  }

  LocationC = () => {
    this.getDrivers(3);

    let long = this.state.userLocation.long;
    let lat = this.state.userLocation.lat
    this.plotDirections(lat + ',' + long, 'ghaziabad')
  }

  LocationD = () => {
    this.getDrivers(4);

    let long = this.state.userLocation.long;
    let lat = this.state.userLocation.lat
    this.plotDirections(lat + ',' + long, 'noida')

  }



  inputBut = () => {
    this.getDrivers(5);

    let long = this.state.userLocation.long;
    let lat = this.state.userLocation.lat
    this.plotDirections(lat + ',' + long, this.state.text)

  }

    counter=0;
    total=0;
  saveTotalFare=(n)=>{
    
    console.log(this.counter)
    this.counter++;
    this.total+=parseInt(n);

    console.log('total'+this.total)

      if(this.counter==this.state.driver_data.length){

    this.setState({totalFare:this.total})
    console.log("0000")
      }
  }


  render() {




    const list = [
      {
        name: 'Payments',
        icon: 'credit-card',
        page: 'payment'

      },
      {
        name: 'Support',
        icon: 'message-square',
        page: 'support'

      },
      // {
      //   name: 'Setting',
      //   icon: 'settings',
      //   page: 'setting'

      // },

    ]

    var drawerContent = (
      <View style={{ flex: 1, padding: 10, overflow: "hidden" }}>
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700' }}> Menu</Text>
        {
          list.map((l, i) => (
            <TouchableOpacity
              // style={{flexDirection:'row'}}
              onPress={() => { this.props.navigation.navigate(l.page, { name: 'Jane' }); }}>



              <ListItem
                containerStyle={{ position: 'relative', left: 30, }}
                bottomDivider={true}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
              // subtitle={l.subtitle}
              />
              <Icon
                name={l.icon}
                type='feather'
                color='black'
                containerStyle={{ position: 'absolute', left: 10, top: 16, alignSelf: 'center', justifyContent: 'flex-end' }}
              // style={{}}
              />
            </TouchableOpacity>
          ))
        }

      </View>
    );
    // customize drawer's style (Optional)
    var customStyles = {
      drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10
      },
      mask: {}, // style of mask if it is enabled
      main: {} // style of main board
    };




    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (

      <Fragment>
        <StatusBar backgroundColor="#F7F8FB" barStyle="dark-content" />

        <Drawer
          style={styles.container}
          drawerWidth={300}
          drawerContent={drawerContent}
          type={Drawer.types.Default}
          customStyles={{ drawer: styles.drawer }}
          drawerPosition={Drawer.positions.Left}
          onDrawerOpen={() => { console.log('Drawer is opened'); }}
          onDrawerClose={() => { console.log('Drawer is closed') }}
          easingFunc={Easing.ease}
        >
          <View style={{ flex: 1 }}>


            <MapView
              ref={MapView => (this.MapView = MapView)}
              style={styles.map100}
              initialRegion={this.state.region}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress={false}
              showsUserLocation={true}
              showsCompass={false}
              showsPointsOfInterest={false}
              region={this.state.gotoRegion}
              customMapStyle={require('../assets/mapstyle.json')}
              ref={component => this._map = component}
            //  provider="google"
            >

              {/* {this.state.markers.map((marker) =>
                <MapView.Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                />
              )
              } */}

              {this.state.waypoints ? this.state.waypoints.map((marker) =>
                <MapView.Marker
                  key={marker.id}
                  coordinate={marker}
                  image={require('../assets/dot.png')}
                />
              ) : null
              }

              <MapView.Marker
                coordinate={this.state.marker}
                image={require('../assets/x.png')}
              />



              {this.state.coords ? (
                <MapView.Polyline
                  coordinates={[
                    ...this.state.coords
                  ]}
                  strokeColor="#2ecc71" // fallback for when `strokeColors` is not supported by the map-provider

                  strokeWidth={6}
                />
              ) : null}



            </MapView>

            {this.state.showTravels ? null : (

              <View style={this.state.dropShadow ? styles.shadowview : styles.simpleview}>
                <Icon name='search'
                  containerStyle={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
                // style={{}}
                />
                <TextInput
                  ref="this.myRef"
                  style={{ height: 50, borderColor: 'gray', flex: 8 }}
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                  onFocus={() => { this.setState({ dropShadow: true }) }}
                  onBlur={() => { this.setState({ dropShadow: false }) }}
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}

                />

                {this.state.dropShadow ? (<Animatable.View onPress={this.inputBut} animation='slideInRight' style={{ flex: 1.2, backgroundColor: '#1AD992', position: 'relative', right: -5 }}><AnimatedTouchable onPress={this.inputBut} >

                  <Icon
                    onPress={this.inputBut}
                    name='arrow-right'
                    type='feather'
                    color='white'
                    containerStyle={{ position: 'relative', top: 13, alignSelf: 'center', justifyContent: 'flex-end' }}
                  // style={{}}

                  />

                </AnimatedTouchable>
                </Animatable.View>
                ) : null}


              </View>
            )}


            {this.state.showTravels ? <TouchableOpacity onPress={() => { this.setState({ showTravels: false }) }} style={{ position: "absolute", top: 7, left: 7, backgroundColor: 'white', padding: 6, borderRadius: 20, elevation: 10 }}>
              <Icon

                name='x'
                type='feather'
                color='black'
              // containerStyle={{ position: 'relative', top: 13, alignSelf: 'center', justifyContent: 'flex-end' }}
              // style={{}}

              />
            </TouchableOpacity>
              : null}



            {this.state.dropShadow || this.state.showTravels ? null : <Animatable.View animation="slideInUp" style={{ position: 'absolute', bottom: -10, width: "100%", alignSelf: "center" }}>
              <Card title="WHERE YOU WANT TO GO?" containerStyle={{ height: 200 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


                  <TouchableOpacity style={styles.box} onPress={this.LocationA}>
                    <Image
                      style={{ width: 40, height: 40, alignSelf:'center',marginTop:10 }}
                      source={require('../assets/house.png')}
                    />
                    <Text style={styles.boxText} >Home</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.box} onPress={this.LocationB}>
                  <Image
                      style={{ width: 40, height: 40, alignSelf:'center',marginTop:10 }}
                      source={require('../assets/building.png')}
                    />
                    <Text style={styles.boxText}>Office</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.box} onPress={this.LocationC}>
                  <Image
                      style={{ width: 40, height: 40, alignSelf:'center',marginTop:10 }}
                      source={require('../assets/online-store.png')}
                    />
                    <Text style={styles.boxText}>Market</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.box} onPress={this.LocationD}>
                  <Image
                      style={{ width: 40, height: 40, alignSelf:'center',marginTop:10 }}
                      source={require('../assets/coffee-cup.png')}
                    />
                    <Text style={styles.boxText}>Cafe</Text>
                  </TouchableOpacity>

                </View>

              </Card></Animatable.View>}



          </View>
        </Drawer>



        {this.state.showTravels ? (<BottomDrawer containerHeight={700} offset={20} backgroundColor="white" startUp={false} style={{ borderRadius: 10, elevation: 10 }} roundedEdges={true}>
          {this.BottomDwr()}
        </BottomDrawer>) : null}



      </Fragment >

    );
  }
}

// HomeScreen.navigationOptions = {
//   header: null,
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    height: "80%"
  },
  map100: { height: "100%" },

  simpleview: { position: "absolute", top: 50, width: "90%", backgroundColor: "white", alignSelf: "center", paddingHorizontal: 5, borderRadius: 15, flexDirection: 'row', flex: 1, elevation: 2, overflow: 'hidden' },
  shadowview: { position: "absolute", top: 50, width: "90%", backgroundColor: "white", alignSelf: "center", paddingHorizontal: 5, borderRadius: 15, flexDirection: 'row', flex: 1, elevation: 6, overflow: 'hidden' },

  box: {
    width: "23%",
    height: 80,
    backgroundColor: 'white',
    //alignItems:'center',
    borderColor: '#F7F7F7',
    borderWidth: 1,
    elevation: 5,
    justifyContent: 'center',
    borderRadius: 15,
    // elevation:5,
  },
  boxText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#34495e',marginTop:5
    // color: 'white'
  }
});
