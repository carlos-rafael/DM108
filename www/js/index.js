var app = { 
    // Application Constructor 
    initialize: function() { 
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); 
        StatusBar.backgroundColorByHexString("#000");
    }, 
    
    // deviceready Event Handler // // Bind any cordova events here. Common events are: // 'pause', 'resume', etc. 
    onDeviceReady: function() {
         this.receivedEvent('deviceready'); 
    }, 
    
    // Update DOM on a Received Event 
    receivedEvent: function(id) { 
        //get the current token 
        window.FirebasePlugin.getInstanceId( function(token) { 
            console.log(token); 
        }, function(error) { 
            alert(error); 
        } );

        //subscribe to topic "example"
        window.FirebasePlugin.subscribe("example");

        //decide o que acontecerá quando a notificação for clicada pelo usuário
        window.FirebasePlugin.onNotificationOpen( function(notification) { 
            
            //console.log('notificacao é ',notification);
            //alert(JSON.stringify(notification.body)); 
            alert("Continue anotando citações inspiracionais"); 
            }, function(error) { 
                alert(error); 
        } ); 
    } 
};
    
    app.initialize();