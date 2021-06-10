import { ApiHelper } from "./api.helper";
import { CacheService } from "./cache";
import { RequestOption } from "./RequestOption";

export function userServiceHelper () {
	return ( () => {
		
		

		let signup=( { name, email, password } ) => {
			let data={ name, email, password };
			return ApiHelper.makeRequest("register", ApiHelper.makeRequestOption( "post", data ))
				.catch( ( res ) => {
					console.log( "some error occured on api", res );
				} );
		};

		let updateProfile=( data ) => {
			
			return ApiHelper.makeRequest( "profile",  ApiHelper.authorize( ApiHelper.makeRequestOption( "PATCH", data ), ApiHelper.getAccessToken() )  )
				
		};

		let getProfile=() => {
			return ApiHelper.makeRequest(`profile`, ApiHelper.authorize(ApiHelper.makeRequestOption( "get" ), ApiHelper.getAccessToken() )) 
			.catch( ( err ) => console.error( "Error occured on getProfile", err ) );
		};

		let logout=() => {
			let auth_info=CacheService.getItem( "auth_info" );

			//check that user is signed
			if ( !!auth_info ) {
				//remove auth_info from cache
				CacheService.removeItem( "auth_info" );

				//go to home;
				window.location=`${window.location.origin}/`;
			}
		};

		let login=( { username: email, password } ) => {
			let data={ email, password };

			return ApiHelper.makeRequest("login", ApiHelper.makeRequestOption( "post", data ) )
				.catch( ( err ) => console.error( "log in failed", err ) );
		};

		return {
			getProfile,
			updateProfile,
			signup,
			login,
			logout,
		};
	} )();
}

