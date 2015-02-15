# Strap Connect for Android

## Getting Started

##### You'll need a license key. If you don't have one, contact your account manager or email support@straphq.com.

#### Configure the following Gradle dependencies for your app:

	compile(name:'connect', ext:'aar')
	compile 'org.springframework.android:spring-android-rest-template:1.0.1.RELEASE'
	compile 'com.fasterxml.jackson.core:jackson-databind:2.3.2'
	compile 'com.wu-man:android-oauth-client:0.0.3'

#### Create an Intent and start the Activity wherever you'd like to present the user a list of possible connections:

	Intent strap = new Intent(this, ServiceList.class);
		strap.putExtra("licenseKey", "mylickey");
		strap.putExtra("user_id", "1");

		startActivity(strap);
