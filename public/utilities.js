//	console.log( 'Evaluating utilities.js' )

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'

export const
app = initializeApp(
	{	apiKey				: 'AIzaSyDWQvp05ky9-KqeQ6JjTVnB0uoJTdA6LK4'
	,	authDomain			: 'exp-fb-c223c.firebaseapp.com'
	,	projectId			: 'exp-fb-c223c'
	,	storageBucket		: 'exp-fb-c223c.appspot.com'
	,	messagingSenderId	: '1046625556668'
	,	appId				: '1:1046625556668:web:86e0b84397eb59b27018b9'
	,	measurementId		: 'G-NLBQYBPKPD'
	}
)

import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js'
export const
analytics = getAnalytics( app )

import { 
	getAuth
,	connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'

export const
auth = getAuth( app )

location.hostname === 'localhost' && connectAuthEmulator( auth, 'http://localhost:9099' )



export const
BBoxContains = ( coords, bbox ) => {
	for ( let i = 0; i < coords.length; i++ ) {
		if ( coords[ i ] < bbox[ i ][ 0 ] || bbox[ i ][ 1 ] < coords[ i ] ) return false
	}
	return true
}


export const
IsMouseInDialog = ev => {
	const
	rect = ev.target.getBoundingClientRect()
	return BBoxContains(
		[ ev.clientX, ev.clientY ]
	,	[ [ rect.left, rect.right ], [ rect.top, rect.bottom ] ]
	)
}


export const
E = _ => document.getElementById( _ )

