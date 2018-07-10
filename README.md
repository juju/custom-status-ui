## Custom Juju Status UI Example

This is an example project using the [JujuLib JS](https://github.com/juju/js-libjuju) library to create a custom status page using some unique components and some components from the [Juju GUI](https://github.com/juju/juju-gui)

#### To Run

Bootstrap a new controller, or use one from JAAS.

```
$ juju bootstrap google mycontroller
```

Create a read-only user.

```
$ juju add-user status
```

Follow the registration process in a new terminal with a different `$HOME` and **remember the password you've set**.
```
$ export HOME=$(mktemp -d)
$ juju register <token>
```

```
$ juju grant status read default
```

Get the public IP address for the controller, in this case it's: `35.237.218.174`

```
$ juju show-controller mycontroller
api-endpoints: ['35.237.218.174:17070', '10.142.0.2:17070', '252.0.32.1:17070']
```

Get the UUID for the model you'd like to display the status for.

```
$ juju show-model
model-uuid: de202f9e-89a2-488f-8170-6292d3f84716
```

Clone this project and then install the dependencies.

```
git clone git@github.com:juju/custom-status-ui.git
npm install && npm run dev
```

In another terminal window start the status server.

```
CONTROLLERIP=35.237.218.174 MODELUUID=de202f9e-89a2-488f-8170-6292d3f84716 USERNAME=status PASSWORD=thisismypassword node server/server.js
```

Visit
```
http://localhost:1234
```
