const
admin	= require( 'firebase-admin'				)
admin.initializeApp()

const
fs		= admin.firestore()

const {
	log
,	info
,	debug
,	warn
,	error
,	write
} = require( 'firebase-functions/logger'		)

const {
	onRequest
} = require( 'firebase-functions/v2/https'		)

const {
	onSchedule
} = require( 'firebase-functions/v2/scheduler'	)

const
CorsAuth = _ => onRequest(
	( q, s ) => (
		s.set( 'Access-Control-Allow-Origin', '*' )
	,	q.method === 'OPTIONS'
		?	(	s.set( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' )
			,	s.set( 'Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE' )
			,	s.status( 200 ).end()
			)
		:	q.headers.authorization
			?	admin.auth().verifyIdToken( q.headers.authorization.split( 'Bearer ' )[ 1 ] ).then(
					token => _( q, s, token ).catch(
						er => s.status( 502 ).send( er.message )
					)
				).catch( 
					er => s.status( 404 ).send( er.message )
				)
			:	s.status( 403 ).send( 'no auth' )
	)
)

/*
//	async/await Version
const
CorsAuth = _ => onRequest(
	async ( q, s ) => {

console.log( q.method )
		s.set( 'Access-Control-Allow-Origin', '*' )
		if ( q.method === 'OPTIONS' ) {
			s.set( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' )
			s.set( 'Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE' )
			s.status( 200 ).end()
			return
		}

		if ( !q.headers.authorization ) {
			s.status( 403 ).send( 'no auth' )
			return
		}

		const
		token = await admin.auth().verifyIdToken( q.headers.authorization.split( 'Bearer ' )[ 1 ] ).catch(
			er => ( s.status( 403 ).send( 'invalid Bearer' ), null )	//	これやだよなー
		)
		if ( !token ) return

		_( q, s, token ).catch(
			_ => s.status( 502 ).send( _.message )
		)
	}
)
*/

//	CHECK 済み
//	403	q.headers.authorization がない
//	403	Bearer がおかしい
//	502	fetch ができない、（アドレスがおかしいなど）
//	502	fetch したのが ok でない
//	502	json の形がおかしい

const
Fetch = url => fetch( url ).then(
	_ => {
		if ( !_.ok  ) throw new Error( _.statusText )
		return _
	}
)
const
FetchJSON = url => Fetch( url ).then( _ => _.json() )
const
FetchTEXT = url => Fetch( url ).then( _ => _.text() )

exports.tickerGMOCoin	= CorsAuth(
	( q, s, token ) => FetchJSON( 'https://api.coin.z.com/public/v1/ticker' ).then(
		_ => s.send( _ )
	)
)

exports.klinesGMOCoin	= CorsAuth(
	( q, s, token ) => FetchJSON( 'https://api.coin.z.com/public/v1/klines?' + q.originalUrl.split( '?' )[ 1 ] ).then(
		_ => s.send( _ )
	)
)

exports.goldpark		= CorsAuth(
	( q, s, token ) => fs.collection( 'mmc' ).get().then(
		_ => s.send( _.docs.map( _ => _.data().html ) )
	)
)

exports.perMinute		= onSchedule(
	'* * * * *'
,	_ => FetchJSON( 'https://api.coin.z.com/public/v1/ticker' ).then(
		_ => _.data && fs.collection( 'gmo' ).add( _ )
	).catch(
		error
	)
)

exports.perHour			= onSchedule(
	'0 * * * *'	//	Hourly
,	_ => FetchTEXT( 'https://gold.mmc.co.jp/market/g_data' ).then(
		_ => fs.collection( 'mmc' ).doc( String( Math.floor( Date.now() / ( 1000 * 60 * 60 * 24 ) ) ) ).set(
			{ html: _ }
		)
	).catch(
		error
	)
)

exports.perDay			= onSchedule(
	'0 0 * * *'	//	Dayly
,	_ => console.log( _ )
)

