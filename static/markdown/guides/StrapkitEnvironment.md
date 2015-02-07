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

Now that you have Vagrant and VirtualBox installed, you're ready to try out Strap Kit.
At this point it's a good idea to put the env in a folder away from everything else.
```
mkdir TryStrap
cd TryStrap
```

We'll use Vagrant to setup the Strap Kit development environment.
After running the following commands, you'll be dropped into a fully functioning virtual machine.
```
vagrant init ubuntu/trusty64
vagrant up
vagrant ssh
```

To configure the machine to run Strap Kit, run the following commands, and periodically hit 'y', and [Enter] when prompted. 
```
curl -O http://strapkit-devbox.straphq.com/setup_strapkit.sh && bash setup_strapkit.sh
source ~/.bash_profile
```
After the install process, a Projects folder is created for you. Anything you drop into the Projects folder will exist inside both the development environment and outside. It's a good idea to just do all your work in the Projects folder, so that it's all synced with the Vagrant environment automatically. This means you can navigate to the Projects folder on your computer, and open its files in your favorite text editor just like you're used to!

From here visit the [Strap Kit Documentation](https://docs.straphq.com/docs/flow) pages to learn how to build an app using Strap Kit.

After you're done using Strap Kit, enter the following commands to tear down your session in the Strap Kit development environment and be back to your normal terminal.
```
exit
vagrant halt
```
