export const
JA = _ => (
	{	'Sign'											: 'ログイン/メアド登録'

	,	'confirm/deleteUser'							: 'メアドを削除します。この操作は取り消せません。よろしいですか？'
	,	'confirm/sendEmailVerification'					: '入力していただいたメアドにメールを送りますので確認してください。よろしいですか？'

	,	'sendEmailVerification'							: '確認メールをお送りしました。\n送られてきたメールの中のリンクをクリックして確認してからログインしてください。'
	,	'sendPasswordResetEmail'						: 'パスワード再設定メールを送信しました。'
	,	'deleteUser'									: 'メアドを削除しました。'

	,	'auth/account-exists-with-different-credential'	: 'このメアドはすでに他のプロバイダで登録されています。'
	,	'auth/email-already-in-use'						: 'このメアドはすでに使われています。'
	,	'auth/popup-closed-by-user'						: 'ポップアップが閉じられました。'
	,	'auth/too-many-requests'						: 'メールの確認がまだです。メールが見つからない場合は少し経ってから再度ログインを試みてください。'
	,	'auth/invalid-email'							: 'メアドの形式が間違っています。'
	,	'auth/missing-password'							: 'パスワードが入力されていません。'
	,	'auth/weak-password'							: 'パスワードが弱すぎます。最低６文字必要です。'

	,	'auth/wrong-password'							: 'パスワードが間違っています。'			//	メール列挙保護されていない場合
	,	'auth/user-not-found'							: 'メアドが登録されていません。'			//	メール列挙保護されていない場合
	,	'auth/invalid-credential'						: 'メアドかパスワードが間違っています。'	//	メール列挙保護されている場合

	,	'auth/invalid-custom-token'						: 'カスタムトークンが無効です。'	 		//	未確認

	,	'auth/admin-restricted-operation'				: 'このオペレーションは禁止されています'

	,	'GOOGLE_LOGIN_B'								: 'Google でログイン'
	,	'FACEBOOK_LOGIN_B'								: 'Facebook でログイン'
	,	'GITHUB_LOGIN_B'								: 'GitHub でログイン'
	,	'EMAIL_LOGIN_B'									: 'Email でログイン'
	,	'REGISTER_EMAIL_B'								: 'Email を新規登録'
	,	'FORGOT_PASSWORD'								: 'パスワードを忘れた場合は下のボタンを押すと再設定用のメールが送られますのでメール中のリンクをクリックしてパスワードを再設定してください。\nメールアドレスが登録されていない場合は、何も起こりません。'
	,	'RESET_PASSWORD_B'								: 'パスワード再設定メールを送る'

	,	'LOGOUT_B'										: 'ログアウト'
	,	'DELETE_B'										: 'アカウントを削除'

	,	'STOCK_B'										: '株式'
	,	'FX_B'											: '為替(FX)'
	,	'METAL_B'										: '貴金属'
	,	'CRYPTO_B'										: '暗号資産'
	}
)[ _ ]

export const
EN = _ => (
	{	'Sign'											: 'Sign in/up'

	,	'confirm/deleteUser'							: 'Delete mail address. This operation cannot be undone. Are you sure?'
	,	'confirm/sendEmailVerification'					: 'Please confirm that we will send an email to the email address you entered. Are you sure?'

	,	'sendEmailVerification'							: 'We have sent you a confirmation email. \nPlease click on the link in the email you received to confirm and log in.'
	,	'sendPasswordResetEmail'						: 'Password reset email has been sent.'
	,	'deleteUser'									: 'Deleted your mail address.'

	,	'auth/account-exists-with-different-credential'	: 'This mail address is already registered with another provider.'
	,	'auth/email-already-in-use'						: 'This mail address is already in use.'
	,	'auth/popup-closed-by-user'						: 'The popup has been closed.'
	,	'auth/too-many-requests'						: 'The mail has not been confirmed yet. If you cannot find your email, please try to log in again a little later.'
	,	'auth/invalid-email'							: 'The format of your email address is incorrect.'
	,	'auth/missing-password'							: 'The password has not been entered.'
	,	'auth/weak-password'							: 'Password is too weak. It must be at least 6 characters long.'

	,	'auth/wrong-password'							: 'Password is wrong.'
	,	'auth/user-not-found'							: 'No mail address registered.'
	,	'auth/invalid-credential'						: 'Either the mail address or the password is incorrect.'

	,	'auth/invalid-custom-token'						: 'Invalid custom token'

	,	'auth/admin-restricted-operation'				: 'This operation is prohibited'

	,	'GOOGLE_LOGIN_B'								: 'Login with Google'
	,	'FACEBOOK_LOGIN_B'								: 'Login with Facebook'
	,	'GITHUB_LOGIN_B'								: 'Login with GitHub'
	,	'EMAIL_LOGIN_B'									: 'Login with Email'
	,	'REGISTER_EMAIL_B'								: 'Register your Email'
	,	'FORGOT_PASSWORD'								: 'If you forgot your password, click the button below to reset your password. \nIf your email address is not registered, nothing will happen( for security reason ).'
	,	'RESET_PASSWORD_B'								: 'Send password reset mail'

	,	'LOGOUT_B'										: 'Logout'
	,	'DELETE_B'										: 'Delete account'

	,	'STOCK_B'										: 'Stocks'
	,	'FX_B'											: 'Exchange(FX)'
	,	'METAL_B'										: 'Metal'
	,	'CRYPTO_B'										: 'Crypto'
	}
)[ _ ]
