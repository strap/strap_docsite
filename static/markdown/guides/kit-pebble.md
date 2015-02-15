# Strap Kit for Pebble

<div class="col-xs-12 text-center">
	<img class="img-responsive text-center col-sm-offset-2 col-xs-12 col-sm-8" src="/img/kit-pebble.png"/>
</div>

## Create your Pebble app from Strap Kit JS

```bash
strapkit platform add pebble
```
And that't it!
### Build
```bash
$ strapkit build
```
OR, to compile for Pebble only, you may specify just Pebble.
```bash
$ strapkit build pebble
```
If you wish to forego using Strap kit to install your app, the compiled binary of your app is available in a "build" folder after running the Strap kit build command.

###Deploy
####Developer mode must be enabled in the Pebble app on your phone! <a href="http://developer.getpebble.com/guides/publishing-tools/developer-connection/" target="_blank">More information</a>.
```bash
$ strapkit install Phones.IP.Goes.Here
```
