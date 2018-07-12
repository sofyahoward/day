// initializing moment.js
moment().format();

// var database = firebase.database();

//     function addNoteToDataBase(text, userId) {
//         database.ref('notes/' + userId).push({
//             text: text,
//             status: 'active'
//         });
//     }

//     function updateNoteInDatabase(uid, status) {

//     }

//     function displayNotes(notes) {
//         console.log(notes);
//     }

    function addTodoItem(todoItem) {
        $("#todo-list").append("<li><label class='labelToDo'><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + todoItem + "' /> " + todoItem + " <button class='todo-item-delete waves-effect waves-light btn'>Remove</button></label></li>");
        $("#new-todo-item").val("");
      }

    // function initNotes() {
    //     var user = firebase.auth().currentUser;
    //     var notesRef = database.ref('notes/' + user.uid);
    //     notesRef.once('value').then(function(snapshot) {
    //         var notes = snapshot.val();

    //         displayNotes(notes);
            
    //     });
    //     notesRef.on("child_added", function(childSnapshot, prevChildKey) {
    //         var text = childSnapshot.val().text;
    //         addTodoItem(text);
    //     });

    //     // notesRef.on('child_added', function )
    // }
$(document).ready( function(){
    // google searchbar /////////////////////////////////////////////////////////////////////////////////////////
    (function () {
        var cx = '014280645296093928214:imfnxx30oyo';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
    })();

    // weather modal ///////////////////////////////////////////////////////////////////////////////////////
    $('.modal').modal();

    // swipeable tabs //////////////////////////////////////////////////////////////////////////////////////
    $('.tabs').tabs();
    
    // firebase to pull out user specific notes
    var database = firebase.database();
    
    $("#myDayTrigger").click(function initNotes() {
        var user = firebase.auth().currentUser;
        var notesRef = database.ref('notes/' + user.uid);
        notesRef.once('value').then(function(snapshot) {
            var notes = snapshot.val();
            console.log(notes);
            displayNotes(notes);
        
         });
        notesRef.on("child_added", function(childSnapshot, prevChildKey) {
            var text = childSnapshot.val().text;
            $("#todo-list").append("<li id='toDoListItem'><label><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + text + "' /> "+ text +" <button class='todo-item-delete waves-effect waves-light btn deleteItemBtn'>Remove</button></label></li>")
        });

});

    // this adds notes to the database
    function addNoteToDataBase(text, userId) {
        database.ref('notes/' + userId).push({
            text: text,
            status: 'active'
        });
    }
    // this appends notes to the screen upon click of the button to add a new note
    // $("#add-todo-item").click(function addTodoItem(todoItem) {
    //     $("#todo-list").append("<li><label><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + document.getElementById("new-todo-item").value + "' /> "+ document.getElementById("new-todo-item").value +" <button class='todo-item-delete waves-effect waves-light btn'>Remove</button></label></li>");
    //   })


    
    // $("label").click(function updateNoteInDatabaseToCompleted(uid, status) {
    //     //if pressing on the item
    //     //update status to "completed"
    //     database.ref('notes/' + userId).update({
    //         status: 'completed'
    //     });
    // });
    

    function displayNotes(notes) {
        console.log(notes);
        //
    }
    
    

    // function initNotes() {
    //     var user = firebase.auth().currentUser;
    //     var notesRef = database.ref('notes/' + user.uid);
    //     notesRef.once('value').then(function(snapshot) {
    //         var notes = snapshot.val();

    //         displayNotes(notes);
            
    //     });
    //     notesRef.on("child_added", function(childSnapshot, prevChildKey) {
    //         var text = childSnapshot.val().text;
    //         addTodoItem(text);
    //     });

    //     // notesRef.on('child_added', function )
    // }
    // to-do list /////////////////////////////////////////////////////////////////////////////////////////
    // function addTodoItem() {
    //     var todoItem = $("#new-todo-item").val();
    //     $("#todo-list").append("<li><label><input type='checkbox' name='todo-item-done' class='filled-in todo-item-done' value='" + todoItem + "' /> " + todoItem + " <button class='todo-item-delete waves-effect waves-light btn'>Remove</button></label></li>");
    //     $("#new-todo-item").val("");
    //   }
    //   $("#deleteItemBtn").click(console.log("hello"));
    
    // $("#deleteItemBtn").click());


    function addNoteToDataBase(text, userId) {
        database.ref('notes/' + userId).push({
            text: text,
            status: 'active'
        });
    }
    function updateNoteInDatabaseToArchived(userId, status) {
        status: status;
        var user = firebase.auth().currentUser;
        var notesRef = database.ref('notes/' + user.uid);
        database.ref('notes/' + userId).set({
                    status: 'archived'
                });
    }

    function deleteTodoItem(e, item) {
    e.preventDefault();
    $(item).parent().fadeOut('slow', function() { 
        $(item).parent().remove();
      })
      updateNoteInDatabaseToArchived();
  };
      
                            
      function completeTodoItem() {  
        $(this).parent().toggleClass("strike");
      }
      
      $(function() {
        $("#add-todo-item").on('click', function(e){
          e.preventDefault();
        //   addTodoItem()
        var userId = firebase.auth().currentUser.uid;
        var text = $("#new-todo-item").val();
        addNoteToDataBase(text, userId);
        });
        
      //EVENT DELEGATION
      //#todo-list is the event handler because .todo-item-delete doesn't exist when the document loads, it is generated later by a todo entry
      //https://learn.jquery.com/events/event-delegation/
      
        $("#todo-list").on('click', '.todo-item-delete', function(e){
          var item = this; 
          deleteTodoItem(e, item)
        })
        
        $(document).on('click', ".todo-item-done", completeTodoItem)
      
      });

    // generate random quote /////////////////////////////////////////////////////////////////////////////////
    // hold the link to the API endpoint
    var forismaticAPI = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';

    $('#gsc-i-id1').removeAttr('placeholder');
        // generate random quote
        // grab element by ID quote
        // append quote inside the div
        $.getJSON(forismaticAPI, function (data) {
            $("#quote").append('<blockquote>' + data.quoteText + '</blockquote>' + '<p id="author"> —  ' + data.quoteAuthor + '</p>')
        });

        // get geolocation for weather //////////////////////////////////////////////////////////////////////////////////////////////////////
        var geoLocationAPI = "http://api.ipstack.com/170.140.105.75?access_key=0feabad0b36ed7c5509ef1acc3df509c"
        $.getJSON(geoLocationAPI, function (data) {
            $("#language").append(data.location.country_flag_emoji + "<br>" + data.location.languages[0].name)
            $("#weather").append(data.city + " " + data.region_name)
            var lat = data.latitude;
            var long = data.longitude;
            console.log(lat, long)

            // grabbing list of local events from eventbrite ///////////////////////////////////////////////////////////////////////////////////////////////////
            var token = '6A7TOLR2YF2M2YFHJDWA';
            var $events = $("#events");
            
            $.get('https://www.eventbriteapi.com/v3/events/search/?token='+token+'&expand=venue'+'&sort_by=date&location.latitude='+lat+'&location.longitude='+long+'' , function(res) {
                console.log(res);
                if (res.events.length) {
                    var eventList = `<ul class='eventList'>`;
                    for (var i = 0; i < res.events.length; i++) {
                        // limiting event list to 5
                        res.events.length = 5;
                        var event = res.events[i];
                        console.dir(event);

                        var startTime = moment(event.start.local).format("llll");
                        var endTime = moment(event.end.local).format("LT");
                        console.log(event.logo.url);

                        eventList += `<li><div class="col s12 m6">
                        <div class="card sticky-action style="overflow:visible;">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="`+ event.logo.url +`">
                            <span class="card-title"></span>
                        </div>
                        <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">`+event.name.text+`<i class="material-icons right">more_vert</i></span>
                            <p><a class="eventAddress" target="_blank" href="#">`+event.venue.address.localized_address_display+`</a></p>
                        </div>
                        <div class="card-action">
                            <p>`+startTime+ " to " +endTime+`</p>
                            <a id="eventLink" target="_blank" href="`+event.url+`">Register <i class="material-icons md-16">open_in_new</i></a>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">`+event.name.text+`<i class="material-icons right">close</i></span>
                            <p>`+event.description.text+`</p>
                        </div>
                        </div>
                    </div></li>`;

                    // the event times need to be converted to an unstandable format

                    }
                    eventList += `</ul>`;
                    $events.html(eventList);

                } else {
                    $events.html("<p>Sorry, there are no upcoming events in your area.</p>");
                }

                var eventLat = event.venue.latitude;
                    console.log(eventLat);
                var eventLong = event.venue.longitude;
                    console.log(eventLong);

            });

            // darksky weather ////////////////////////////////////////////////////////////////////////////////////
            var proxy = 'https://cryptic-headland-94862.herokuapp.com/';
            var darkSkyAPI = `https://api.darksky.net/forecast/8731619e7a890afa3e28099bc6d36035/${lat},${long}`;

            // dark sky weather API call
            $.ajax({
                url: proxy + darkSkyAPI,
                success: function (res) {
                    console.log(res);

                    console.log(res.daily.data[1].time)
                    var convertedDate1 = new Date(res.daily.data[1].time * 1000);
                    var convertedDate2 = new Date(res.daily.data[2].time * 1000);
                    var convertedDate3 = new Date(res.daily.data[3].time * 1000);
                    var convertedDate4 = new Date(res.daily.data[4].time * 1000);
                    var convertedDate5 = new Date(res.daily.data[5].time * 1000);

                    var dayOfWeek1 = convertedDate1.getDay();
                    var dayOfWeek2 = convertedDate2.getDay();
                    var dayOfWeek3 = convertedDate3.getDay();
                    var dayOfWeek4 = convertedDate4.getDay();
                    var dayOfWeek5 = convertedDate5.getDay();

                    // forecast
                    var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
                    $("#day1").append(weekday[dayOfWeek1] + "<br>" + (Math.round((res.daily.data[1].temperatureHigh + res.daily.data[1].temperatureLow) / 2) * 100) / 100);
                    $("#day2").append(weekday[dayOfWeek2] + "<br>" + (Math.round((res.daily.data[2].temperatureHigh + res.daily.data[2].temperatureLow) / 2) * 100) / 100);
                    $("#day3").append(weekday[dayOfWeek3] + "<br>" + (Math.round((res.daily.data[3].temperatureHigh + res.daily.data[3].temperatureLow) / 2) * 100) / 100);
                    $("#day4").append(weekday[dayOfWeek4] + "<br>" + (Math.round((res.daily.data[4].temperatureHigh + res.daily.data[4].temperatureLow) / 2) * 100) / 100);
                    $("#day5").append(weekday[dayOfWeek5] + "<br>" + (Math.round((res.daily.data[5].temperatureHigh + res.daily.data[5].temperatureLow) / 2) * 100) / 100);

                    // animated weather icons
                    $("#weatherIcon").append("You are in " + data.zip + "<br>" + "It's currently " + Math.round(res.currently.temperature) + "˚F" + '<br>' + "Weather is " + res.currently.summary + "<br>" + "Feels like " + Math.round(res.currently.apparentTemperature) + "˚F" + "<br>");
                    
                    //add to skyicons the weather information
                    var skycons = new Skycons({
                        "color": "#f4511e",
                    });
                    
                    skycons.add(document.getElementById("icon"), res.currently.icon);
                    skycons.add(document.getElementById("icon2"), res.currently.icon);
                    skycons.add(document.getElementById("icon3"), res.daily.data[1].icon);
                    skycons.add(document.getElementById("icon4"), res.daily.data[2].icon);
                    skycons.add(document.getElementById("icon5"), res.daily.data[3].icon);
                    skycons.add(document.getElementById("icon6"), res.daily.data[4].icon);
                    skycons.add(document.getElementById("icon7"), res.daily.data[5].icon);
                    
                    //start animation for weather icons
                    skycons.play();
                }
            }); // closing darksky API call
        }); // closing get for geolocation

    // changing google searchbar placeholder text
    // this is not working :(
    $('#gsc-i-id1').placeholder = 'Search Google';

}); // closing ready function