////////////////////////////////////////////////////////////////	v	Utilities

const
E = _ => document.getElementById( _ )

const
IsMobile = () => window.innerWidth < 768

const
dialogElements = Array.from( document.getElementsByTagName( 'dialog' ) )

dialogElements.forEach(
	dialog => (
		dialog.querySelector( 'i.fa-close' ).onclick = ev => dialog.close()
	)
)

////////////////////////////////////////////////////////////////	v	Route

const
Route = () => {
	const
	AppendTemplate = _ => {
		const
		MAIN = document.querySelector( 'main' )
		MAIN.innerHTML = ''
		MAIN.appendChild( E( _ ).content.cloneNode( true ) )
	}
	const
	AppendIFrame = _ => {
		const
		MAIN = document.querySelector( 'main' )
		MAIN.innerHTML = ''
		MAIN.appendChild( document.createElement( 'iframe' ) ).setAttribute( 'src', _ )
	}

	switch ( location.pathname ) {
	case '/'		: AppendTemplate( 'T_HOME'		); break
	case '/stock'	: AppendTemplate( 'T_STOCK'		); break
	case '/fx'		: AppendTemplate( 'T_FX'		); break
	case '/metal'	: AppendTemplate( 'T_METAL'		); break
	case '/crypto'	: AppendIFrame	( '/crypto.html' ); break
	default			: AppendTemplate( 'T_404'		); break
	}
}
window.addEventListener( 'popstate', Route )

Route()

const
Navigate = page => (
	history.pushState( { page }, null, page )
,	Route()
)
E( 'HOME_B'		).onclick = () => Navigate( '/'			)
E( 'STOCK_B'	).onclick = () => Navigate( '/stock'	)
E( 'FX_B'		).onclick = () => Navigate( '/fx'		)
E( 'METAL_B'	).onclick = () => Navigate( '/metal'	)
E( 'CRYPTO_B'	).onclick = () => Navigate( '/crypto'	)

////////////////////////////////////////////////////////////////	v	Internationalization

import {
	EN
,	JA
} from './i18n.js'

const
langSel = E( 'LANGUAGE_S' )
{	const
	lang = new URLSearchParams( location.search ).get( 'lang' )
	lang && ( langSel.value = lang )
}
const
T = _ => {
	switch ( langSel.value ) {
	case 'en':
		return EN( _ )
	case 'ja':
		return JA( _ )
	default:
		return _
	}
}
langSel.onchange = () => location.search = '?lang=' + langSel.value

const
C = _ => confirm( T( _ ) )

const
TC = _ => E( _ ).textContent = T( _ )

TC( 'GOOGLE_LOGIN_B'	)
TC( 'FACEBOOK_LOGIN_B'	)
TC( 'GITHUB_LOGIN_B'	)
TC( 'EMAIL_LOGIN_B'		)
TC( 'REGISTER_EMAIL_B'	)
TC( 'RESET_PASSWORD_B'	)

TC( 'FORGOT_PASSWORD'	)

TC( 'LOGOUT_B'			)
TC( 'DELETE_B'			)

TC( 'STOCK_B'			)
TC( 'FX_B'				)
TC( 'METAL_B'			)
TC( 'CRYPTO_B'			)

////////////////////////////////////////////////////////////////	v	Auth

import {
	InitializeApp
,	OnAuthStateChanged
,	SendPasswordResetEmail
,	SendEmailVerification
,	DeleteUser
,	SignOut
,	CreateUserWithEmailAndPassword
,	SignInWithEmailAndPassword
,	SignInWithGooglePopup
,	SignInWithGoogleRedirect
,	SignInWithFacebookPopup
,	SignInWithFacebookRedirect
,	SignInWithGitHubPopup
,	SignInWithGitHubRedirect
} from './JP/JS/firebase.js'

InitializeApp(
	{	apiKey				: 'AIzaSyDWQvp05ky9-KqeQ6JjTVnB0uoJTdA6LK4'
	,	authDomain			: 'exp-fb-c223c.firebaseapp.com'
	,	projectId			: 'exp-fb-c223c'
	,	storageBucket		: 'exp-fb-c223c.appspot.com'
	,	messagingSenderId	: '1046625556668'
	,	appId				: '1:1046625556668:web:86e0b84397eb59b27018b9'
	,	measurementId		: 'G-NLBQYBPKPD'
	}
,	( tag, email ) => {	//	REPORTING
		console.log( tag, email )
		switch ( tag ) {
		case 'sendPasswordResetEmail'	:
		case 'sendEmailVerification'	:
		case 'deleteUser'				:
			alert( email + ':\n' + T( tag ) )
			break
		}
	}
,	( tag, er ) => (
		console.log( tag, er )
	,	alert( tag + ':' + er.code + ':\n' + T( er.code ) ?? er.message ) 
	)
)

OnAuthStateChanged(
	user => (
		console.log( 'USER:', user, 'index.html' )
	,	dialogElements.forEach( _ => _.close() )
	,	user
		?	(	user.emailVerified || ( C( 'confirm/sendEmailVerification' ) && SendEmailVerification(), SignOut() )
			,	E( 'DISPLAY_NAME'	).textContent	= user.displayName
			,	E( 'EMAIL'			).textContent	= user.email
			,	E( 'PROVIDERS'		).textContent	= user.providerData.map( _ => _.providerId ).join( '/' )
			,	E( 'USER_B'			).textContent	= user.displayName ?? user.email
			,	E( 'USER_B'			).onclick		= () => E( 'MY_D' ).showModal()
			)
		:	(	E( 'USER_B'			).textContent	= T( 'Sign' )
			,	E( 'USER_B'			).onclick		= () => E( 'LOGIN_D' ).showModal()
			)
	)
)

E( 'LOGOUT_B'			).onclick = () => SignOut()
E( 'DELETE_B'			).onclick = () => C( 'confirm/deleteUser' ) && DeleteUser()

E( 'GOOGLE_LOGIN_B'		).onclick = () => ( IsMobile() ? SignInWithGoogleRedirect	: SignInWithGooglePopup		)()
E( 'FACEBOOK_LOGIN_B'	).onclick = () => ( IsMobile() ? SignInWithFacebookRedirect	: SignInWithFacebookPopup	)()
E( 'GITHUB_LOGIN_B'		).onclick = () => ( IsMobile() ? SignInWithGitHubRedirect	: SignInWithGitHubPopup		)()

E( 'EMAIL_LOGIN_B'		).onclick = () => SignInWithEmailAndPassword		( E( 'EMAIL_I' ).value, E( 'PASSWORD_I' ).value )
E( 'REGISTER_EMAIL_B'	).onclick = () => CreateUserWithEmailAndPassword	( E( 'EMAIL_I' ).value, E( 'PASSWORD_I' ).value )
E( 'RESET_PASSWORD_B'	).onclick = () => SendPasswordResetEmail			( E( 'EMAIL_I' ).value )
