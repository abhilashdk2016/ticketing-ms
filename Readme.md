## _Microservices App Using Node JS, Express, React, NATS Server, MongoDB, Docker and Kubernetes_

## Execute the Project
Edit your hosts file and add the below entry
```sh
127.0.0.1 ticketing.dev
```
Create a secret using below command in your Kubernetes cluster: (Docker and Kubernetes Installation is assumed)

```sh
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

Change JWT_KEY as per your requirement.
Install [Skaffold](https://skaffold.dev/docs/install/) for your Operating System

In the root directory of the project run
```sh
skaffold dev
```

Access the Application using ```https://ticketing.dev```
If Chrome shows some error just type ```thisisunsafe```
