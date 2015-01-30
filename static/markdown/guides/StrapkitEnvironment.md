# Installing Strap Kit Dev Environment

We've created a ready-to-go development environment for you to try out Strap Kit using [Vagrant](http://docs.vagrantup.com/v2/why-vagrant/index.html). To use this environment, you'll first need to [install Vagrant](http://www.vagrantup.com/downloads), and also [install VirtualBox](https://www.virtualbox.org/wiki/Downloads) since Vagrant depends on it.

##### Install Vagrant
```
http://www.vagrantup.com/downloads
```

##### Install VirtualBox
```
https://www.virtualbox.org/wiki/Downloads
```

### Using Strap Kit through Vagrant.

Now that you have Vagrant and VirtualBox installed, you're ready to try out Strap Kit. Open your terminal, create a folder to hold your Strap Kit apps, and navigate into it.
```
mkdir TryStrapkit
cd TryStrapkit
mkdir StrapProjects
```

<!---
Use Curl, Wget, or your favorite browser to grab a copy of the Strap Kit development environment.
```
curl -O http://strapkit-devbox.straphq.com/StrapKitBox
```

After downloading the environment, you may check that the file is not corrupt by generating an MD5 hash of your copy with our ours. Run MD5 on the development environment with the following line. The generated hash should match our expected result value.

##### MD5 StrapKitBox
```
md5 StrapKitBox
```

##### Expected MD5 Result Value
```
7456d1052325a038cd0fcf9b19506a76
```

Next we'll use Vagrant to setup the Strap Kit development environment we've provided for you.
```
vagrant init ./StrapKitBox
vagrant up
vagrant ssh
```
-->
Next we'll use Vagrant to setup the Strap Kit development environment we've provided for you.
```
vagrant init http://strapkit-devbox.straphq.com/StrapKitBox
vagrant up
vagrant ssh
```

After running the previous commands, you're now dropped into a fully functioning virtual machine pre-configured to run Strap Kit. Anything you drop into the StrapKitProjects folder will show up in the development environment. It's a good idea to just do all your work in the StrapKitProjects folder, so that it's all synced with the Vagrant environment automagically.

From here visit the [Strap Kit Documentation](https://docs.straphq.com/docs/flow) pages to learn how to build an app using Strap Kit.

After you're done using Strap Kit, enter the following commands to tear down your session in the Strap Kit development environment and be back to your normal terminal.
```
exit
vagrant halt
```
