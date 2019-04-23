require("dotenv").config();

var axios = require("axios");
var request = require("request");

var keys = require("../liri-node-app/key");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const movie = process.argv.slice(3).join("+");
const artist = process.argv.slice(3).join("+");
const song = process.argv.slice(3).join("+");

var moment = require('moment');

 var fs=require('fs');


 
 var value=process.argv[2];
  
 
 

 switch(value){

  case "concert-this":
    console.log("concert-this");
   concertthis();
   break;

   case "spotify-this-song":
   console.log("spotify-this-song");
   spotifythissong(); 
   break;

   case "movie-this":
   console.log("movie-this");
   moviethis();
   break;

     case "do-what-it-says":
     console.log("do-what-it-says");
     dothis(value);
     break;

     default:
     console.log("{Please Enter a Valid value ");
     break;

 }

 function concertthis(){
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
      function(response){
          console.log("==============================");
          console.log("Venue: " + response.data[0].venue.name);
          console.log("City: " + response.data[0].venue.city);
          console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
          console.log("===============================");
      }
  ).catch(function(err) {
    console.log(err);
  });
};

 function spotifythissong(){
 
   spotify.search({type:'track',query: song},function(err,data){
     if(err){
       return console.log("Error occured "+err);
     }else{

    

        for(var i=0 ;i< data.tracks.items.length;i++){
          var songdata=data.tracks.items[i];
          console.log("=============================");
          console.log("Artist: " + songdata.artists[0].name);
       
        console.log("Song: " + songdata.name);
    
        console.log("Preview URL: " + songdata.preview_url);
    
        console.log("Album Name: " + songdata.album.name);
        console.log("=======================");
      

        }
     }
   })

 }
function moviethis(){
  let queryUrl = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  

  axios
  .get(queryUrl)
  .then(function(response) {
    console.log("========================");
    console.log("Title:"+response.data.Title);
      console.log("Release Year:"+response.data.Year);
      console.log("Movie Raiting:"+response.data.imdbraiting);
      console.log("Country:"+response.data.Country);
      console.log("Language:"+response.data.Language);
      console.log("Plot:"+response.data.Plot);
      console.log("Actors:"+response.data.Actors);
      console.log("=========================");
  }).catch(function(err) {
    console.log(err);
  });
}  
      

    

function dothis(){
  fs.readFile("../liri-node-app/random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    console.log("=====================");
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    spotifythissong(dataArr[1]);
    console.log("======================");
  
  });
  
};
