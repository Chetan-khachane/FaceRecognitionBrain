import './App.css';
import Logo from '../Components/Logo/Logo'
import Navigation from '../Components/Navigation/Navigation'
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm'
import React from 'react'
import 'tachyons'
import Particles from 'react-particles-js';
import Rank from '../Components/Rank/Rank';
import FaceRecognition from '../Components/FaceRecognition/FaceRecognition';
import Signin from '../Components/Signin/Signin';
import Register from '../Components/Register/Register';


const params = { //configs for Ts_Particles.js
  particles: {
    number:{
      value:50,
      density:{
        enable : true,
        value_area : 700
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}







class App extends React.Component{

  constructor(){
    super()
    this.state = {
      input : '' , 
      imageUrl : '',
      box : null,
      route : 'signin',
      isSignedIn : false
    }
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value})
  }

  calculateBoundingBox = (response) =>{


    let faces = response.outputs[0].data.regions.map( face => face.region_info.bounding_box)
    const image = document.getElementById('inputImage')

    const width = Number(image.width)
    const height = Number(image.height)


//mapping through all faces we getting and calculating bounding box location relative to image
    faces = faces.map( face => {
        return {
          leftCol : face.left_col * width,
          rightCol : width - (face.right_col * width),
          bottomRow : height - (face.bottom_row * height),
          topRow : face.top_row * height
        }
    })

   
    this.setState({box : faces}) 
  }


  onButtonSubmit  = () => {
    this.setState({imageUrl : this.state.input})

    const raw = JSON.stringify({
      "user_app_id": {
            "user_id": "yy7nwq1hag2i",
            "app_id": "chetan-khachane"
        },
      "inputs": [
        {
          "data": {
            "image": {
              "url": `${this.state.input}` //here all image inoputs are provided to api to process
            }
          }
        }
      ]
    });

    //creating request option for sending to api
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 211b57d0c45c4aada39b6a7e8bdd92f7' //Authorization
      },
      body: raw
    };

    //Calling Clarifai Api
    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", requestOptions)
    .catch(err => console.log('Sorry, we are unable to make request',err) )
    .then( response => response.json())
    .then( response => this.calculateBoundingBox(response))
    .catch(console.log)
  }

  onRouteChange = (route) =>{
    if(route === 'signout')
      this.setState({isSignedIn : false})
    else if (route === 'home')
      this.setState({isSignedIn : true})
    this.setState({route : route})
  }

  render(){
    return(

      <div>
              <Particles className= 'particles'
                params={params} />

              <Navigation  isSignedIn ={this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
              {
                this.state.route === 'home' ?
                <div>
                  <Logo/>
                  <Rank/>
    
                  <ImageLinkForm 
                    onInputChange = {this.onInputChange}
                    onButtonSubmit  = {this.onButtonSubmit}
                  />
                  <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} />
             </div>
                :
                (
                  this.state.route === 'signin' ?
                  <Signin onRouteChange = {this.onRouteChange} />
                  :
                  <Register onRouteChange = {this.onRouteChange}/>
                )
                 
              }
             
      
      </div>
    )
  }

}

export default App;
