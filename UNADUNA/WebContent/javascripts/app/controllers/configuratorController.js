
angular.module('unadunaModule').controller('unadunaConfiguratorController', function($http, $scope, $filter){
	
	$scope.PostDataResponse = '';
	$scope.radioSelected = 1;
	$scope.colors = ["rosso", "blu", "giallo"];
	$scope.sizes = [720,960];
	$scope.loaderVisible = false;
	
	$scope.SelectFrame = function(){
		$('#spritespin').spritespin("api").updateFrame($scope.radioSelected-1);
	};
	
	$scope.SendData = function(){
		
		var data = {};
		$scope.loaderVisible = true;
		
		data['accessorio'] = $scope.accessorio;
		
		var widthSize = 960;
		var heightSize = 540;
		
		var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
	
		//effettuo la chiamata
		$http.post('https://cnohm5u3jh.execute-api.eu-central-1.amazonaws.com/configuratorstage',data, config)
		.then(function(success){
			
			$scope.PostDataResponse = success.data.responseString;
			
			//ricompongo la stringa base64 dell'immagine spritesheet che ho creato su Lambda
			var image = 'data:image/jpg;base64,';
			for(var i = 0; i < success.data.imageArray.length; i++){
				image = image + success.data.imageArray[i];
			}
			
			var dataSpin = {
					width: widthSize,
	                height: heightSize,
	                source: image,
	                frames: 8,
	                framesX: 8,
	                sense: -1,
	                responsive: false,
	                animate: false,
			};
			$('#spritespin').spritespin(dataSpin);
			$scope.loaderVisible = false;
		});
		
		$scope.nome = "";
		$scope.cognome = "";
		$scope.responseString = "";
		
	};
});