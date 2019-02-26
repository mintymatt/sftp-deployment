#FORK: Provide support for Sublime Text SFTP configuration JSON file

Sublime SFTP: https://wbond.net/sublime_packages/sftp

This repo is unlikely to be kept up-to-date, but by all means you're welcome to drop any issues and I may be able to help. Alternatively, check the [original source Repo](https://github.com/amoussard/sftp-deployment).

What can this repo do?

* Support Sublime SFTP config file `sftp-config.json`
* Support Sublime SFTP config keys

This repo doesn't provide many of the features that Sublime SFTP provides and just simply acts as a bridge between Atom.io/Sublime git projects.

---

#SFTP-Deployment for Atom.io

Spend less time managing file transfers and more time coding. FTP and SFTP support for Atom.io to send and receive files directly in your server.

SFTP-Deployment is a package for Atom.io using [SSH2 client](https://github.com/mscdex/ssh2) and [Node FTP](https://github.com/mscdex/node-ftp) modules written in pure Javascript for [node.js](http://nodejs.org/).

![SFTP-deployment](https://atom.io/assets/packages-d6c259ff67b995961012620be1e26678.gif "SFTP-deployment")

##Features

###Workflows
* Upload/Download current file
* Upload open files (tabs)
* Upload/Download selection from Tree View

###Compatibility
* Supports FTP and SFTP servers
* Password SSH support
* Works on Windows, OS X and Linux

###Integration
* Menu entries and command palette control
* File-based configuration (JSON)
* Colorized output panel with options for automatic hiding

## Installation

1. Search `sftp` or `ftp` in the atom package manager
2. Since the installation is successful, you can generate the configuration file with the command
  * `cmd-shift-p` and search `mapToRemote`
  * Packages menu -> FTP/SFTP -> Map to Remote...
  * Create your own
3. Set your ftp/sftp configuration in this file
4. Use it!

The configuration file **MUST** always be in the root directory of your project.

###Example of configuration file:

####SFTP with user/password :
```
{
    "type": "sftp",
    "host": "example.com",
    "user": "username",
    "password": "password",
    "port": "22",
    "remotePath": "/example/path"
}
```

####SFTP protocol with private key :
```
{
    "type": "sftp",
    "host": "example.com",
    "user": "username",
    "port": "22",
    "remotePath": "/example/path",
    "sshKeyFile": "~/.ssh/id_rsa",
    "passphrase": "your_passphrase"
}
```
The passphrase is optional, only if your key require it.

####FTP protocol :
```
{
  "type": "ftp",
  "host": "example.com",
  "username": "username",
  "password": "password",
  "port": "21",
  "remotePath": "/example/path"
}
```

##Next Versions

###Workflows
* Upload just the changes since your last commit
* See upload/download progress
* Synchronize in both directions

###Integration
* Keyboard shortcuts
* Secure password and passphrase entry

##Versions
* `1.0.1`
  * Fix after Atom update
* `1.0.0`
  * Full refactoring of the package
  * Improve stability
  * Best error management
  * Upload on save
  * Upload/Download selection of files and directories in tree-view
* `0.4.0`
  * Upload/Download of folders
  * Refactoring of code
* `0.3.0`
  * Refactoring of the code
  * Notifications/message system
  * FTP support
  * ST3 package syntax support
  * bugfix
* `0.1.0` Build the first atom package
